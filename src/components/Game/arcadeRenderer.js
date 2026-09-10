import { WIDTH, HEIGHT } from "./arcadeEngine";
import { missions } from "./arcadeData";

const palettes = [
  {
    rock: "#233f43",
    side: "#182e36",
    edge: "#8ccbb2",
    deep: "#122934",
    far: "#254952",
    mid: "#325b5c",
    leaf: "#447968",
  },
  {
    rock: "#484158",
    side: "#302d46",
    edge: "#b7aad9",
    deep: "#24243b",
    far: "#393950",
    mid: "#54516c",
    leaf: "#777092",
  },
  {
    rock: "#504343",
    side: "#322c35",
    edge: "#dea975",
    deep: "#292735",
    far: "#413340",
    mid: "#645052",
    leaf: "#977663",
  },
];
const noise = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
function rect(c, color, x, y, w, h) {
  c.fillStyle = color;
  c.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h));
}
function line(c, color, x, y, w, h = 2) {
  rect(c, color, x, y, w, h);
}
function text(c, value, x, y, size = 10, color = "#e5eedc", align = "left") {
  c.fillStyle = color;
  c.font = `${size}px monospace`;
  c.textAlign = align;
  c.fillText(value, Math.round(x), Math.round(y));
}

function building(c, x, base, w, h, palette, windows = true) {
  rect(c, palette, x, base - h, w, h);
  rect(c, palette, x + 8, base - h - 12, w - 16, 12);
  if (windows)
    for (let col = 0; col < w / 19 - 1; col++)
      for (let row = 0; row < h / 26 - 1; row++) {
        if (noise(x + col * 17 + row * 29) > 0.48)
          rect(
            c,
            "#baae8580",
            x + 10 + col * 19,
            base - h + 15 + row * 26,
            5,
            9,
          );
      }
}
function tree(c, x, y, size, pal) {
  rect(c, pal.side, x - 5 * size, y - 65 * size, 10 * size, 65 * size);
  for (let j = 0; j < 4; j++) {
    rect(
      c,
      pal.leaf,
      x - (35 - j * 6) * size,
      y - (70 + j * 16) * size,
      (70 - j * 12) * size,
      22 * size,
    );
  }
  rect(c, pal.edge + "50", x - 30 * size, y - 91 * size, 37 * size, 4 * size);
}
function background(c, stage, cam, time) {
  const m = missions[stage],
    pal = palettes[stage];
  const gradient = c.createLinearGradient(0, 0, 0, HEIGHT);
  gradient.addColorStop(0, m.sky[0]);
  gradient.addColorStop(0.72, m.sky[1]);
  gradient.addColorStop(1, m.sky[2]);
  c.fillStyle = gradient;
  c.fillRect(0, 0, WIDTH, HEIGHT);
  // Pixel clouds, light shafts, and distant architecture move at different depths.
  rect(c, "#e1d6aa35", 680 - cam * 0.025, 67, 74, 74);
  rect(c, "#eee1b84d", 689 - cam * 0.025, 58, 56, 92);
  rect(c, "#fff0bf", 697 - cam * 0.025, 66, 40, 68);
  rect(c, "#f4d9a8", 689 - cam * 0.025, 75, 56, 50);
  for (let i = 0; i < 12; i++) {
    const x =
      ((((i * 193 - cam * 0.06 + time * 1.6) % 1240) + 1240) % 1240) - 150;
    const y = 80 + noise(i) * 115;
    rect(c, "#c1ccb31b", x, y, 60 + noise(i + 9) * 90, 10);
    rect(c, "#c1ccb319", x + 18, y - 8, 58, 8);
  }
  for (let i = -2; i < 14; i++) {
    const x = i * 122 - ((cam * 0.16) % 122);
    const h = 70 + noise(i + Math.floor((cam * 0.16) / 122) + stage * 30) * 180;
    building(c, x, 355, 94, h, pal.far, false);
  }
  rect(c, "#fff0c40b", 0, 270, WIDTH, 1);
  for (let i = -1; i < 9; i++) {
    const n = i + Math.floor((cam * 0.35) / 182),
      x = i * 182 - ((cam * 0.35) % 182);
    const h = 75 + noise(n + 40) * 165;
    building(c, x, 433, 95, h, pal.mid);
    if (stage === 0 && n % 2 === 0) tree(c, x + 145, 434, 0.68, pal);
    if (stage === 1) {
      rect(c, pal.far, x + 105, 300, 22, 134);
      rect(c, pal.mid, x + 100, 298, 32, 8);
    }
    if (stage === 2) {
      rect(c, pal.far, x + 120, 225, 18, 207);
      rect(c, "#ca8b6330", x + 126, 225, 3, 207);
    }
  }
  const river = c.createLinearGradient(0, 435, 0, HEIGHT);
  river.addColorStop(0, "#143c4260");
  river.addColorStop(1, pal.deep);
  c.fillStyle = river;
  c.fillRect(0, 435, WIDTH, 105);
  for (let i = 0; i < 30; i++) {
    const x = (i * 89 + time * (8 + (i % 3) * 5) - cam * 0.3) % 1100;
    rect(c, m.color + "30", x, 470 + ((i * 13) % 68), 18 + (i % 5) * 8, 2);
  }
  for (let i = 0; i < 14; i++) {
    const x = (i * 173 + time * 12 - cam * 0.2) % 1050;
    rect(
      c,
      "#dfffd685",
      x,
      170 + ((i * 43) % 254) + Math.sin(time + i) * 8,
      2,
      2,
    );
  }
}

function terrain(c, p, cam, stage) {
  const pal = palettes[stage],
    x = p.x - cam;
  rect(c, pal.side, x, p.y, p.w, p.h);
  rect(c, pal.rock, x, p.y + 6, p.w, Math.min(p.h - 6, 45));
  rect(c, pal.edge, x, p.y, p.w, 4);
  rect(c, "#10242b", x, p.y + 4, p.w, 3);
  for (let i = 0; i < p.w / 32; i++) {
    const wx = p.x + i * 32;
    rect(c, pal.side, x + i * 32, p.y + 11, 2, Math.min(p.h, 32));
    rect(c, "#ffffff0f", x + i * 32 + 5, p.y + 13, 16, 2);
    if (p.h > 40 && noise(wx) > 0.52) {
      rect(c, pal.leaf, x + i * 32, p.y - 6, 3, 8);
      rect(c, pal.leaf, x + i * 32 - 4, p.y - 3, 5, 3);
    }
    if (p.h < 40 && i % 3 === 0) {
      rect(c, pal.edge + "65", x + i * 32 + 8, p.y + p.h, 3, 15 + (i % 4) * 5);
    }
  }
  if (p.h > 40) {
    line(c, pal.deep, x, p.y + 55, p.w, 4);
    for (let i = 0; i < p.w / 65; i++)
      rect(c, pal.rock, x + i * 65 + 12, p.y + 66, 30, 5);
  } else {
    rect(c, pal.deep, x + 8, p.y + p.h, p.w - 16, 4);
  }
}

function runner(c, p, cam, time, stage) {
  const x = Math.round(p.x - cam + 12),
    y = Math.round(p.y),
    colors = ["#8bdfc1", "#bda9ed", "#e6b375"];
  if (p.invulnerable > 0 && Math.floor(time * 14) % 2 === 0)
    c.globalAlpha = 0.4;
  c.save();
  c.translate(x, y);
  c.scale(p.dir, 1);
  const stride = p.grounded && Math.abs(p.vx) > 0 ? Math.sin(p.step) * 5 : 0;
  // Animated body parts form the original playable sprite.
  rect(c, "#10282d", -9, 26, 17, 11);
  rect(c, "#31424b", -8 - stride * 0.3, 32, 6, 9);
  rect(c, "#172931", 2 + stride * 0.3, 32, 6, 9);
  rect(c, "#e5c195", -9 - stride * 0.3, 40, 9, 3);
  rect(c, "#e5c195", 2 + stride * 0.3, 40, 10, 3);
  rect(c, colors[stage], -10, 16, 21, 14);
  rect(c, "#406767", -7, 17, 7, 12);
  rect(c, "#bd8e65", -7, 4, 17, 14);
  rect(c, "#e1b183", 0, 7, 12, 10);
  rect(c, "#172a32", -9, 0, 20, 7);
  rect(c, "#24303a", -11, 4, 5, 8);
  rect(c, stage === 0 ? "#e7a17d" : colors[stage], -9, 6, 22, 3);
  rect(c, "#172b31", 8, 10, 3, 3);
  if (stage > 0) {
    rect(c, "#304251", 1, 9, 12, 2);
    rect(c, "#a7c3bf", 3, 9, 3, 3);
  }
  if (stage === 2) rect(c, "#674c43", 1, 15, 9, 3);
  const tail = 4 + Math.sin(time * 14) * 3;
  rect(c, colors[stage], -18, 13, 10, 4);
  rect(c, colors[stage], -22, 14 + tail * 0.3, 7, 4);
  rect(c, "#dab188", 7, 19, 11, 5);
  rect(c, "#10252d", 13, 16, 19, 7);
  rect(c, "#718f91", 15, 16, 17, 3);
  rect(c, "#e6cd8a", 30, 18, 4, 3);
  rect(c, "#e2cc93", -5, 27, 16, 3);
  if (p.shot > 0.12) {
    rect(c, "#fff6c0", 34, 15, 8, 8);
    rect(c, "#f8bb76", 42, 18, 6, 3);
  }
  c.restore();
  c.globalAlpha = 1;
}

function enemy(c, e, cam, time) {
  const x = e.x - cam,
    y = e.y,
    hit = e.hit > 0;
  if (e.type === "drone") {
    rect(c, hit ? "#fff0ba" : "#566f76", x + 5, y + 9, 26, 17);
    rect(c, "#1b343f", x + 11, y + 14, 15, 8);
    rect(c, "#ff9c7d", x + 15, y + 16, 7, 3);
    rect(c, "#a3b2a6", x - 2, y + 4, 14, 4);
    rect(c, "#a3b2a6", x + 25, y + 4, 14, 4);
    rect(c, "#314f5b", x + 3, y + 8, 5, 8);
    rect(c, "#314f5b", x + 29, y + 8, 5, 8);
    rect(c, "#c5dfc775", x - 5, y + Math.sin(time * 40) * 2, 21, 2);
    rect(c, "#c5dfc775", x + 21, y + Math.sin(time * 40) * 2, 21, 2);
    rect(c, "#edbd88", x + 15, y + 26, 6, 5);
  } else {
    rect(c, "#152b34", x + 2, y + 24, 26, 8);
    rect(c, hit ? "#fff0ba" : "#7c8c85", x + 3, y + 8, 24, 18);
    rect(c, "#344c53", x + 7, y, 18, 11);
    rect(c, "#f79575", x + 8, y + 5, 10, 3);
    rect(c, "#213b42", x + (e.dir < 0 ? -7 : 21), y + 12, 17, 6);
    rect(c, "#c5b286", x + 7, y + 20, 16, 3);
    if (e.type === "walker") {
      rect(c, "#34454d", x + 3, y + 30, 7, 3);
      rect(c, "#34454d", x + 21, y + 30, 7, 3);
    } else {
      rect(c, "#bac3a4", x, y + 29, 30, 3);
    }
  }
}

function bossSprite(c, b, cam, time, stage) {
  const x = b.x - cam,
    y = b.y;
  c.save();
  if (b.dead) {
    c.globalAlpha = 0.25;
    c.translate(x + 55, 452);
    c.rotate(0.3);
    c.translate(-x - 55, -y - 85);
  }
  const color =
    b.hit > 0 ? "#ffedb2" : ["#7d9d92", "#9585ad", "#b99b7a"][stage];
  rect(c, "#152830", x - 18, y + 17, 27, 70);
  rect(c, "#152830", x + 101, y + 17, 27, 70);
  rect(c, color, x - 13, y + 20, 21, 45);
  rect(c, color, x + 102, y + 20, 21, 45);
  rect(c, "#203a41", x, y + 16, 110, 84);
  rect(c, color, x + 7, y + 7, 96, 20);
  rect(c, color, x + 5, y + 33, 100, 42);
  rect(c, "#263c42", x + 20, y + 34, 70, 48);
  rect(c, "#cf9c6c", x + 29, y + 42, 52, 35);
  rect(c, b.timer < 0.3 ? "#fff7c5" : "#e67362", x + 39, y + 49, 32, 21);
  rect(c, "#fff0b1", x + 46, y + 54, 18, 10);
  rect(c, color, x + 20, y - 15, 70, 26);
  rect(c, "#132a33", x + 27, y - 6, 56, 13);
  rect(c, "#ffe1a0", x + 31, y - 3, 17, 6);
  rect(c, "#ffe1a0", x + 63, y - 3, 17, 6);
  rect(c, color, x + 12, y + 85, 25, 24);
  rect(c, color, x + 75, y + 85, 25, 24);
  rect(c, "#19313a", x + 6, y + 107, 38, 9);
  rect(c, "#19313a", x + 70, y + 107, 38, 9);
  rect(c, "#e0b779", x - 20, y + 63, 30, 20);
  rect(c, "#e0b779", x + 100, y + 63, 30, 20);
  if (!b.dead) {
    const flame = 7 + Math.sin(time * 23) * 5;
    rect(c, "#f1d7a2", x + 20, y + 113, 9, flame);
    rect(c, "#f1d7a2", x + 83, y + 113, 9, flame);
  }
  c.restore();
}

function beacon(c, x, y, active, color, time) {
  rect(c, "#142e36", x - 10, y - 43, 20, 43);
  rect(c, "#76988c", x - 13, y - 47, 26, 6);
  rect(c, active ? color : "#47616b", x - 7, y - 40, 14, 27);
  rect(c, "#183841", x - 3, y - 33, 6, 13);
  rect(c, "#9abaa1", x - 15, y - 4, 30, 4);
  if (active) {
    c.globalAlpha = 0.1 + Math.sin(time * 3) * 0.04;
    rect(c, color, x - 17, y - 95, 34, 95);
    c.globalAlpha = 1;
  }
}

export function renderArcade(ctx, game, now = 0) {
  const c = ctx,
    time = game.state === "playing" ? game.time : now;
  const cam = Math.round(game.camera),
    stage = game.stage,
    m = missions[stage];
  c.save();
  c.imageSmoothingEnabled = false;
  background(c, stage, cam, time);
  if (game.shake > 0 && !game.reducedMotion)
    c.translate(
      Math.sin(time * 150) * game.shake * 9,
      Math.cos(time * 183) * game.shake * 5,
    );
  // Waterfall channels descend into actual jumpable gaps.
  [820, 1630, 2720].forEach((x) => {
    const sx = x - cam;
    rect(c, m.color + "24", sx, 453, 56, 90);
    for (let j = 0; j < 7; j++)
      rect(
        c,
        m.color + "70",
        sx + 5 + j * 7,
        455 + ((time * 130 + j * 18) % 80),
        2,
        17,
      );
  });
  game.level.platforms
    .filter((p) => p.x + p.w > cam && p.x < cam + WIDTH)
    .forEach((p) => terrain(c, p, cam, stage));
  // Signs live in the level, where the relevant control is first useful.
  if (cam < 550) {
    text(c, "DOUBLE JUMP", 377 - cam, 322, 10, m.color, "center");
    text(c, "SPACE / K", 377 - cam, 337, 8, "#a0bcb5", "center");
    rect(c, "#6a9586", 228 - cam, 397, 3, 55);
    rect(c, "#18373f", 209 - cam, 383, 43, 20);
    text(c, "→", 230 - cam, 397, 16, "#e4d6a3", "center");
  }
  beacon(c, 1910 - cam, 452, game.checkpoint, m.color, time);
  if (Math.abs(1910 - cam - 480) < 500)
    text(c, "CHECKPOINT", 1910 - cam, 388, 9, m.color, "center");
  // Career hologram: a piece of the real biography is recovered by passing it.
  if (cam < 400) {
    c.globalAlpha = 0.65;
    runner(
      c,
      {
        x: 210,
        y: 410,
        w: 24,
        h: 42,
        dir: -1,
        vx: 0,
        grounded: true,
        step: 0,
        shot: 0,
        invulnerable: 0,
      },
      cam,
      time,
      stage,
    );
    c.globalAlpha = 1;
    text(c, "SIGNAL", 223 - cam, 395, 8, m.color, "center");
  }
  for (const item of game.level.pickups)
    if (!item.taken) {
      const x = item.x - cam,
        y = item.y + Math.sin(time * 3) * 4;
      if (item.type === "record") {
        rect(c, m.color + "20", x - 8, y - 8, 40, 42);
        rect(c, "#e8d8a5", x + 3, y, 18, 25);
        rect(c, "#39515a", x + 7, y + 4, 10, 17);
        rect(c, m.color, x + 9, y + 7, 7, 2);
        rect(c, m.color, x + 9, y + 12, 7, 2);
        rect(c, m.color, x + 9, y + 17, 5, 2);
        text(c, "INTEL", x + 12, y - 13, 8, "#e4d7ac", "center");
      } else {
        rect(c, item.type === "health" ? "#8cd9ae" : "#efc182", x, y, 24, 24);
        rect(c, "#264148", x + 3, y + 3, 18, 18);
        text(
          c,
          item.type === "health" ? "+" : "S",
          x + 12,
          y + 17,
          15,
          item.type === "health" ? "#a8e5bd" : "#f8d398",
          "center",
        );
      }
    }
  game.level.enemies
    .filter((e) => !e.dead && e.x > cam - 60 && e.x < cam + WIDTH + 60)
    .forEach((e) => enemy(c, e, cam, time));
  const boss = game.level.boss;
  if (boss.x < cam + WIDTH + 150) bossSprite(c, boss, cam, time, stage);
  if (game.arena && !boss.dead) {
    for (let i = 0; i < 8; i++)
      rect(c, "#ed9b7850", 3200 - cam, 240 + i * 28, 5, 20);
  }
  const gateX = 4090 - cam;
  rect(c, "#24424a", gateX - 35, 325, 70, 127);
  rect(c, "#557477", gateX - 30, 320, 60, 7);
  rect(c, boss.dead ? m.color + "75" : "#68817735", gateX - 24, 333, 48, 116);
  for (let i = 0; i < 8; i++)
    rect(
      c,
      boss.dead ? "#defbe5" : "#506774",
      gateX - 22,
      335 + ((i * 17 + time * 25) % 111),
      44,
      2,
    );
  text(
    c,
    boss.dead ? "EXTRACT →" : "LOCKED",
    gateX,
    305,
    10,
    boss.dead ? "#e8e8bc" : "#9baea6",
    "center",
  );
  if (game.state !== "dead") runner(c, game.player, cam, time, stage);
  for (const b of game.bullets) {
    rect(c, "#edc78370", b.x - cam - b.vx * 0.012, b.y, 14, 5);
    rect(c, "#fff7bd", b.x - cam, b.y, b.w, b.h);
  }
  for (const b of game.enemyBullets) {
    rect(c, "#fc8d5e50", b.x - cam - 3, b.y - 3, b.w + 6, b.h + 6);
    rect(c, "#ffbb79", b.x - cam, b.y, b.w, b.h);
    rect(c, "#fff0b7", b.x - cam + 2, b.y + 2, b.w - 4, b.h - 4);
  }
  for (const p of game.particles) {
    c.globalAlpha = Math.min(1, p.life * 3);
    rect(c, p.color, p.x - cam, p.y, p.size, p.size);
  }
  c.globalAlpha = 1;
  if (cam < 150) text(c, "MOVE →", 128 - cam, 486, 9, "#a8c8b4");
  if (game.arena && boss.dead)
    text(
      c,
      "GATE OPEN. KEEP MOVING →",
      game.viewWidth / 2,
      480,
      12,
      "#f0dab1",
      "center",
    );
  c.restore();
}
