import { makeLevel } from "./arcadeData";

export const WIDTH = 960;
export const HEIGHT = 540;
export const overlaps = (a, b) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Simulation is independent of rendering, the DOM, and frame rate.
export class ArcadeEngine {
  constructor({
    stage = 0,
    checkpoint = false,
    assist = false,
    discovered = [],
    onEvent = () => {},
  } = {}) {
    this.onEvent = onEvent;
    this.viewWidth = WIDTH;
    this.assist = assist;
    this.discovered = new Set(discovered);
    this.score = 0;
    this.deaths = 0;
    this.inputs = {};
    this.effects = [];
    this.load(stage, checkpoint);
  }
  load(stage, checkpoint = false) {
    this.stage = stage;
    this.level = makeLevel(stage);
    this.time = 0;
    this.state = "playing";
    this.checkpoint = checkpoint;
    this.arena = false;
    this.bullets = [];
    this.enemyBullets = [];
    this.particles = [];
    this.shake = 0;
    this.inputs = {};
    this.previous = {};
    this.pressed = {};
    this.player = {
      x: checkpoint ? 1930 : 100,
      y: 390,
      w: 24,
      h: 42,
      vx: 0,
      vy: 0,
      dir: 1,
      hp: this.assist ? 10 : 6,
      maxHp: this.assist ? 10 : 6,
      jumps: 0,
      grounded: false,
      coyote: 0,
      jumpBuffer: 0,
      invulnerable: 1.2,
      shot: 0,
      dash: 0,
      dashCooldown: 0,
      weapon: checkpoint ? 2 : 1,
      step: 0,
    };
    this.camera = checkpoint ? 1600 : 0;
    this.checkpointReached = checkpoint;
    this.emit("stage", { stage, checkpoint });
  }
  emit(type, values = {}) {
    this.onEvent({ type, ...values });
  }
  setInput(key, down) {
    if (down && !this.inputs[key]) this.pressed[key] = true;
    this.inputs[key] = down;
  }
  clearInput() {
    this.inputs = {};
    this.previous = {};
    this.pressed = {};
  }
  pause() {
    if (this.state === "playing") {
      this.state = "paused";
      this.clearInput();
    }
  }
  resume() {
    if (this.state === "paused") {
      this.state = "playing";
      this.clearInput();
    }
  }
  retry() {
    this.deaths++;
    this.load(this.stage, this.checkpoint);
  }
  next() {
    if (this.stage < 2) this.load(this.stage + 1);
  }
  discover(id) {
    if (this.discovered.has(id)) return;
    this.discovered.add(id);
    this.score += 250;
    this.emit("discovery", { id });
  }
  burst(x, y, color, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + this.time;
      const speed = 45 + ((i * 37) % 135);
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 35,
        life: 0.3 + (i % 5) * 0.08,
        color,
        size: 2 + (i % 3),
      });
    }
  }
  damage(amount = 1, fall = false) {
    const p = this.player;
    if (
      this.state !== "playing" ||
      (!fall && (p.invulnerable > 0 || p.dash > 0))
    )
      return;
    p.hp = Math.max(0, p.hp - amount);
    p.invulnerable = 1.6;
    this.shake = 0.2;
    this.emit("hurt");
    this.burst(p.x + 12, p.y + 20, "#ff897b");
    if (p.hp <= 0) {
      this.state = "dead";
      this.clearInput();
      this.emit("death");
    } else if (fall) {
      p.x = this.arena ? 3250 : this.checkpoint ? 1930 : 100;
      p.y = 350;
      p.vx = 0;
      p.vy = 0;
      p.jumps = 0;
      p.dash = 0;
      this.clearInput();
      this.camera = clamp(p.x - 240, 0, this.level.width - this.viewWidth);
    } else {
      p.vy = -180;
    }
  }
  shootEnemy(x, y, angle, speed = 190, kind = "orb") {
    this.enemyBullets.push({
      x,
      y,
      w: kind === "wave" ? 30 : 10,
      h: kind === "wave" ? 15 : 10,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 5,
      kind,
    });
  }
  shootPlayer() {
    const p = this.player;
    let dx = p.dir,
      dy = 0;
    if (this.inputs.up) {
      dy = -1;
      dx = this.inputs.left || this.inputs.right ? p.dir : 0;
    }
    const base = Math.atan2(dy, dx);
    const angles = p.weapon === 2 ? [base - 0.13, base, base + 0.13] : [base];
    angles.forEach((angle) =>
      this.bullets.push({
        x: p.x + 12 + Math.cos(angle) * 20,
        y: p.y + 17 + Math.sin(angle) * 18,
        w: 10,
        h: 5,
        vx: Math.cos(angle) * 640,
        vy: Math.sin(angle) * 640,
        life: 1.15,
      }),
    );
    p.shot = p.weapon === 2 ? 0.23 : 0.17;
    this.emit("shot");
  }
  step(dt) {
    if (this.state !== "playing") return;
    dt = Math.min(0.035, Math.max(0, dt));
    this.time += dt;
    const p = this.player,
      input = { ...this.inputs, ...this.pressed };
    p.invulnerable = Math.max(0, p.invulnerable - dt);
    p.shot -= dt;
    p.dashCooldown -= dt;
    p.dash -= dt;
    this.shake = Math.max(0, this.shake - dt);
    if (input.jump && !this.previous.jump) p.jumpBuffer = 0.13;
    else p.jumpBuffer = Math.max(0, p.jumpBuffer - dt);
    if (p.grounded) p.coyote = 0.1;
    else p.coyote = Math.max(0, p.coyote - dt);
    if (p.jumpBuffer > 0 && (p.coyote > 0 || p.jumps < 2)) {
      p.vy = -490;
      p.jumps = p.coyote > 0 ? 1 : p.jumps + 1;
      p.grounded = false;
      p.coyote = 0;
      p.jumpBuffer = 0;
      this.burst(p.x + 12, p.y + 42, "#b8ddd4", 6);
      this.emit("jump");
    }
    if (!input.jump && this.previous.jump && p.vy < -210) p.vy = -210;
    let direction = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    if (direction) p.dir = direction;
    if (input.dash && !this.previous.dash && p.dashCooldown <= 0) {
      p.dash = 0.18;
      p.dashCooldown = 1.15;
      p.vy = 0;
      this.emit("dash");
    }
    p.vx = p.dash > 0 ? p.dir * 640 : direction * 235;
    if (p.dash > 0) {
      p.vy = 0;
      this.particles.push({
        x: p.x + 12,
        y: p.y + 22,
        vx: 0,
        vy: 0,
        life: 0.17,
        color: "#b5f8db",
        size: 10,
      });
    } else p.vy = Math.min(760, p.vy + 1380 * dt);
    p.x = clamp(
      p.x + p.vx * dt,
      this.arena && !this.level.boss.dead ? 3210 : 0,
      this.level.width - p.w,
    );
    const oldBottom = p.y + p.h;
    p.y += p.vy * dt;
    p.grounded = false;
    if (p.vy >= 0)
      for (const platform of this.level.platforms) {
        if (
          p.x + p.w > platform.x &&
          p.x < platform.x + platform.w &&
          oldBottom <= platform.y + 2 &&
          p.y + p.h >= platform.y
        ) {
          p.y = platform.y - p.h;
          p.vy = 0;
          p.grounded = true;
          p.jumps = 0;
        }
      }
    if (p.grounded && direction) {
      p.step += dt * 12;
    }
    if (input.fire && p.shot <= 0) this.shootPlayer();
    if (p.y > HEIGHT + 80) this.damage(2, true);
    if (p.x > 180 && !this.discovered.has(`career-${this.stage}`))
      this.discover(`career-${this.stage}`);
    if (p.x >= 1910 && !this.checkpointReached) {
      this.checkpoint = true;
      this.checkpointReached = true;
      p.hp = p.maxHp;
      this.emit("checkpoint", { stage: this.stage });
      this.burst(1920, 420, "#99f4cf", 25);
    }
    for (const item of this.level.pickups) {
      if (
        !item.taken &&
        overlaps(p, { ...item, y: item.y + Math.sin(this.time * 3) * 4 })
      ) {
        item.taken = true;
        this.burst(item.x + 12, item.y + 12, "#ffcf7d", 18);
        if (item.type === "record") this.discover(item.id);
        if (item.type === "weapon") {
          p.weapon = 2;
          this.emit("upgrade");
        }
        if (item.type === "health") {
          p.hp = Math.min(p.maxHp, p.hp + 3);
          this.emit("health");
        }
      }
    }
    for (const e of this.level.enemies) {
      if (e.dead || Math.abs(e.x - p.x) > WIDTH) continue;
      e.hit = Math.max(0, e.hit - dt);
      if (e.type === "drone") {
        e.x += e.dir * 55 * dt;
        e.y = e.baseY + Math.sin(this.time * 2 + e.phase) * 30;
      }
      if (e.type === "walker") e.x += e.dir * (42 + this.stage * 8) * dt;
      if (e.x < e.min) {
        e.x = e.min;
        e.dir = 1;
      }
      if (e.x > e.max) {
        e.x = e.max;
        e.dir = -1;
      }
      e.shot -= dt;
      if (e.shot <= 0 && p.x > 260 && Math.abs(e.x - p.x) < 630) {
        e.shot = (this.assist ? 2.5 : 1.8) - this.stage * 0.14;
        const angle = Math.atan2(p.y + 18 - (e.y + 16), p.x + 12 - (e.x + 15));
        this.shootEnemy(e.x + 15, e.y + 16, angle, this.assist ? 145 : 185);
      }
      if (overlaps(p, e)) this.damage();
    }
    const boss = this.level.boss;
    if (p.x > 3210 && !boss.active && !boss.dead) {
      boss.active = true;
      this.arena = true;
      this.emit("boss");
    }
    if (boss.active && !boss.dead) {
      boss.time += dt;
      boss.hit = Math.max(0, boss.hit - dt);
      boss.timer -= dt;
      boss.y = 315 + Math.sin(boss.time * 1.4) * 44;
      if (boss.timer <= 0) {
        boss.timer =
          (boss.hp < boss.maxHp * 0.45 ? 1.05 : 1.55) + (this.assist ? 0.6 : 0);
        const aim = Math.atan2(
          p.y + 18 - (boss.y + 55),
          p.x + 12 - (boss.x + 40),
        );
        const count = this.stage === 2 ? 5 : 3;
        for (let i = 0; i < count; i++)
          this.shootEnemy(
            boss.x + 30,
            boss.y + 55,
            aim + (i - (count - 1) / 2) * 0.22,
            this.assist ? 150 : 195,
          );
        if (this.stage > 0) this.shootEnemy(boss.x, 435, Math.PI, 240, "wave");
        this.emit("bossShot");
      }
      if (overlaps(p, boss)) this.damage();
    }
    for (const shot of this.bullets) {
      shot.x += shot.vx * dt;
      shot.y += shot.vy * dt;
      shot.life -= dt;
      for (const e of this.level.enemies)
        if (!e.dead && shot.life > 0 && overlaps(shot, e)) {
          shot.life = 0;
          e.hp--;
          e.hit = 0.13;
          this.burst(shot.x, shot.y, "#ffd08c", 4);
          if (e.hp <= 0) {
            e.dead = true;
            this.score += 100;
            this.burst(e.x + 15, e.y + 15, "#ffb680", 20);
            this.emit("kill");
          }
        }
      if (boss.active && !boss.dead && shot.life > 0 && overlaps(shot, boss)) {
        shot.life = 0;
        boss.hp--;
        boss.hit = 0.1;
        this.burst(shot.x, shot.y, "#ffe2a7", 4);
        if (boss.hp <= 0) {
          boss.dead = true;
          this.score += 1500;
          this.enemyBullets = [];
          this.shake = 0.5;
          this.burst(boss.x + 55, boss.y + 55, "#ffd997", 60);
          this.emit("bossDefeated");
        }
      }
    }
    for (const shot of this.enemyBullets) {
      shot.x += shot.vx * dt;
      shot.y += shot.vy * dt;
      shot.life -= dt;
      if (shot.life > 0 && overlaps(shot, p)) {
        this.damage();
        shot.life = 0;
      }
    }
    this.bullets = this.bullets.filter((b) => b.life > 0);
    this.enemyBullets = this.enemyBullets.filter((b) => b.life > 0);
    for (const part of this.particles) {
      part.x += part.vx * dt;
      part.y += part.vy * dt;
      part.vy += 130 * dt;
      part.life -= dt;
    }
    this.particles = this.particles.filter((part) => part.life > 0);
    if (boss.dead && p.x > 4070 && this.state === "playing") {
      this.state = this.stage === 2 ? "won" : "cleared";
      this.clearInput();
      this.emit(this.state, { stage: this.stage, score: this.score });
    }
    const target = clamp(
      p.x - this.viewWidth * 0.32,
      0,
      this.level.width - this.viewWidth,
    );
    this.camera += (target - this.camera) * Math.min(1, dt * 8);
    this.previous = { ...input };
    this.pressed = {};
  }
  snapshot() {
    return {
      stage: this.stage,
      hp: this.player.hp,
      maxHp: this.player.maxHp,
      score: this.score,
      progress: Math.min(
        100,
        Math.round((this.player.x / (this.level.width - 100)) * 100),
      ),
      weapon: this.player.weapon,
      boss:
        this.level.boss.active && !this.level.boss.dead
          ? Math.max(
              0,
              Math.ceil((this.level.boss.hp / this.level.boss.maxHp) * 100),
            )
          : null,
      dashReady: this.player.dashCooldown <= 0,
      records: this.discovered.size,
      state: this.state,
    };
  }
}
