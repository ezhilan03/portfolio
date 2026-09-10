import { characters } from "./gameData";
import { projects } from "../Projects/projectData";

export const missions = [
  {
    name: "Cloud ruins",
    subtitle: "Where the signal began",
    boss: "The Gatekeeper",
    color: "#8be4cb",
    sky: ["#102a36", "#326667", "#c49d76"],
    character: characters[0],
    projects: [2, 3, 4],
  },
  {
    name: "The archive city",
    subtitle: "Find what was lost",
    boss: "Archive Sentinel",
    color: "#bca4f2",
    sky: ["#222039", "#656084", "#d3a38c"],
    character: characters[1],
    projects: [5, 6, 7],
  },
  {
    name: "The data foundry",
    subtitle: "Break the deadline",
    boss: "The Deadline Engine",
    color: "#ffc17d",
    sky: ["#211f2b", "#624449", "#c18458"],
    character: characters[2],
    projects: [0, 1],
  },
];

export const records = [
  ...characters.map((c, i) => ({
    id: `career-${i}`,
    type: "Career signal",
    title: c.role,
    subtitle: `${c.company} · ${c.period}`,
    description: c.description,
    detail: c.evidence,
    tags: c.kit,
  })),
  ...projects.map((p, i) => ({
    id: `project-${i}`,
    type: "Recovered project",
    title: p.title,
    subtitle: p.category,
    description: p.description,
    detail: p.bullets?.join("\n\n"),
    tags: p.stack || [],
    href: p.ghLink,
  })),
];

export function readSave() {
  const fresh = {
    stage: 0,
    checkpoint: false,
    records: [],
    best: 0,
    won: false,
  };
  try {
    const raw = JSON.parse(localStorage.getItem("ez-arcade-v1"));
    if (!raw || raw.version !== 1) return fresh;
    return {
      stage: Number.isInteger(raw.stage)
        ? Math.max(0, Math.min(2, raw.stage))
        : 0,
      checkpoint: raw.checkpoint === true,
      records: Array.isArray(raw.records)
        ? [
            ...new Set(
              raw.records.filter((id) => records.some((r) => r.id === id)),
            ),
          ]
        : [],
      best: Number.isFinite(raw.best) ? Math.max(0, Math.floor(raw.best)) : 0,
      won: raw.won === true,
    };
  } catch {
    return fresh;
  }
}

export function makeLevel(stage) {
  const platforms = [
    [0, 452, 800, 100],
    [930, 452, 670, 100],
    [1750, 452, 930, 100],
    [2820, 452, 1380, 100],
    [310, 350, 190, 20],
    [630, 276, 170, 20],
    [990, 350, 170, 20],
    [1250, 285, 170, 20],
    [1520, 330, 230, 20],
    [1840, 354, 170, 20],
    [2170, 310, 210, 20],
    [2540, 340, 160, 20],
    [2660, 255, 220, 20],
    [2920, 340, 140, 20],
  ].map(([x, y, w, h]) => ({ x, y, w, h }));
  const enemies = [
    [530, 420, "walker", 490, 735],
    [820, 276, "drone", 760, 910],
    [1120, 420, "walker", 980, 1240],
    [1330, 253, "turret", 1330, 1330],
    [1500, 216, "drone", 1430, 1630],
    [2000, 420, "walker", 1870, 2120],
    [2270, 278, "turret", 2270, 2270],
    [2590, 200, "drone", 2480, 2680],
    [2940, 420, "walker", 2870, 3090],
  ].map(([x, y, type, min, max], i) => ({
    x,
    y,
    w: type === "drone" ? 36 : 30,
    h: 32,
    type,
    min,
    max,
    baseY: y,
    dir: -1,
    hp: type === "turret" ? 5 : 3,
    shot: 1.3 + i * 0.17,
    phase: i,
    hit: 0,
    dead: false,
  }));
  const cachePositions = [
    [704, 244],
    [1350, 251],
    [2740, 221],
  ];
  const pickups = missions[stage].projects.map((p, i) => ({
    x: cachePositions[i][0],
    y: cachePositions[i][1],
    w: 24,
    h: 26,
    type: "record",
    id: `project-${p}`,
    taken: false,
  }));
  pickups.push(
    { x: 1040, y: 412, w: 24, h: 24, type: "weapon", taken: false },
    { x: 2410, y: 412, w: 24, h: 24, type: "health", taken: false },
  );
  return {
    width: 4200,
    platforms,
    enemies,
    pickups,
    boss: {
      x: 3790,
      y: 337,
      w: 110,
      h: 110,
      hp: stage === 2 ? 90 : stage === 1 ? 58 : 42,
      maxHp: stage === 2 ? 90 : stage === 1 ? 58 : 42,
      timer: 2.2,
      time: 0,
      hit: 0,
      active: false,
      dead: false,
    },
  };
}
