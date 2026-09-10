import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GameMode from "./GameMode";
import GameInvitation from "./GameInvitation";
import { ArcadeEngine } from "./arcadeEngine";
import { readSave } from "./arcadeData";
jest.mock("./arcadeRenderer", () => ({ renderArcade: jest.fn() }));
beforeAll(() => {
  window.scrollTo = jest.fn();
  HTMLCanvasElement.prototype.getContext = () => ({});
  global.ResizeObserver = class {
    observe() {}
    disconnect() {}
  };
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});
beforeEach(() => localStorage.clear());
const advance = (g, seconds) => {
  for (let i = 0; i < seconds * 120; i++) g.step(1 / 120);
};

test("invitation decline remains playful and remembered", () => {
  render(
    <MemoryRouter>
      <GameInvitation />
    </MemoryRouter>,
  );
  fireEvent.click(screen.getByRole("button", { name: "No, just browsing" }));
  expect(
    screen.getByText("Boring? Maybe. Efficient? Definitely."),
  ).toBeInTheDocument();
  fireEvent.click(
    screen.getByRole("button", { name: "Dismiss game invitation" }),
  );
  expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
});
test("start, keyboard pause, and field notes return to live play", () => {
  render(
    <MemoryRouter>
      <GameMode />
    </MemoryRouter>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Start adventure" }));
  expect(
    screen.getByRole("button", { name: "Pause game" }),
  ).toBeInTheDocument();
  fireEvent.keyDown(window, { code: "KeyP" });
  expect(
    screen.getByRole("heading", { name: "Signal paused." }),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Back to the action" }));
  fireEvent.keyDown(window, { code: "KeyE" });
  expect(
    screen.getByRole("dialog", { name: "Recovered field notes" }),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Close field notes" }));
  expect(
    screen.getByRole("button", { name: "Pause game" }),
  ).toBeInTheDocument();
});
test("gravity, landing, double jump limit, and pause use physical state", () => {
  const g = new ArcadeEngine();
  advance(g, 0.4);
  expect(g.player.grounded).toBe(true);
  expect(g.player.y + g.player.h).toBe(452);
  g.setInput("jump", true);
  advance(g, 0.15);
  expect(g.player.y).toBeLessThan(410);
  expect(g.player.jumps).toBe(1);
  g.setInput("jump", false);
  advance(g, 0.05);
  g.setInput("jump", true);
  advance(g, 0.05);
  expect(g.player.jumps).toBe(2);
  g.setInput("jump", false);
  advance(g, 0.01);
  g.setInput("jump", true);
  advance(g, 0.01);
  expect(g.player.jumps).toBe(2);
  g.setInput("right", true);
  g.pause();
  const x = g.player.x;
  advance(g, 2);
  expect(g.player.x).toBe(x);
  g.resume();
  advance(g, 0.1);
  expect(g.player.x).toBe(x);
});
test("enemy fire damages, dash protects, and falling respawns at the checkpoint", () => {
  const g = new ArcadeEngine();
  advance(g, 2);
  const health = g.player.hp;
  g.enemyBullets.push({
    x: g.player.x,
    y: g.player.y,
    w: 10,
    h: 10,
    vx: 0,
    vy: 0,
    life: 2,
  });
  advance(g, 0.02);
  expect(g.player.hp).toBe(health - 1);
  g.player.invulnerable = 0;
  g.setInput("dash", true);
  advance(g, 0.02);
  g.damage();
  expect(g.player.hp).toBe(health - 1);
  g.checkpoint = true;
  g.checkpointReached = true;
  g.player.y = 650;
  advance(g, 0.02);
  expect(g.player.x).toBe(1930);
  expect(g.player.hp).toBe(health - 3);
  g.player.hp = 1;
  g.player.y = 650;
  advance(g, 0.02);
  expect(g.state).toBe("dead");
  g.retry();
  expect(g.player.x).toBe(1930);
  expect(g.player.hp).toBe(g.player.maxHp);
});
test("a real projectile destroys an enemy and intel is recovered only once", () => {
  const events = [];
  const g = new ArcadeEngine({ onEvent: (e) => events.push(e) });
  advance(g, 0.4);
  const e = g.level.enemies[0];
  e.x = 230;
  e.min = 230;
  e.max = 230;
  g.setInput("fire", true);
  advance(g, 1);
  expect(e.dead).toBe(true);
  expect(g.score).toBe(100);
  g.discover("project-2");
  g.discover("project-2");
  expect(g.score).toBe(350);
  expect(events.filter((e) => e.type === "discovery")).toHaveLength(1);
});
test.each([0, 1, 2])(
  "stage %i can be completed through movement and combat without changing game state",
  (stage) => {
    const g = new ArcadeEngine({ stage });
    let lastJump = 0;
    for (let f = 0; f < 120 * 100 && g.state === "playing"; f++) {
      const p = g.player;
      const atGap = [
        [745, 805],
        [1545, 1610],
        [2630, 2690],
      ].some(([a, b]) => p.x > a && p.x < b);
      const jump =
        (p.grounded && atGap) ||
        (p.jumps === 1 && p.vy > -60 && !p.grounded) ||
        (g.arena && p.grounded && g.time - lastJump > 0.8);
      if (jump) lastJump = g.time;
      g.setInput("right", !g.arena || g.level.boss.dead || p.x < 3490);
      g.setInput("jump", jump || (p.vy < -65 && g.inputs.jump));
      if (g.previous.jump && p.vy > -70) g.setInput("jump", false);
      g.setInput("fire", true);
      g.step(1 / 120);
    }
    expect(g.state).toBe(stage === 2 ? "won" : "cleared");
    expect(g.level.boss.hp).toBe(0);
    expect(g.player.hp).toBeGreaterThan(0);
    expect(g.discovered.has(`career-${stage}`)).toBe(true);
  },
);
test("corrupted and unsupported save data safely recovers", () => {
  localStorage.setItem("ez-arcade-v1", "broken");
  expect(readSave().stage).toBe(0);
  localStorage.setItem(
    "ez-arcade-v1",
    JSON.stringify({
      version: 1,
      stage: 900,
      records: ["project-0", "project-0", "fake"],
      best: -8,
    }),
  );
  expect(readSave()).toEqual({
    stage: 2,
    checkpoint: false,
    records: ["project-0"],
    best: 0,
    won: false,
  });
});
