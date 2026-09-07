import { skillGroups } from "../About/Techstack";
export const characters = [
  {
    id: "ranger",
    alias: "The Cloud Ranger",
    role: "Software Engineer",
    company: "Ernst & Young Global Delivery Services",
    period: "Feb 2021 – Oct 2022",
    chapter: "2021 · THE ORIGIN",
    ability: "Distributed pipeline craft",
    kit: ["PySpark", "AWS EMR", "AWS S3"],
    description:
      "Built and scaled distributed PySpark batch pipelines on AWS EMR to process multi-terabyte unstructured log files, optimizing Hadoop cluster resource allocation to drive a 24% increase in pipeline data throughput.",
    stats: [
      ["Throughput", "+24%"],
      ["Query performance", "+35%"],
    ],
    attribute: "Systems thinking",
    evidence:
      "Architected a secure cloud migration framework to transition legacy, multi-tenant database infrastructure into an AWS S3 data lake, boosting query performance by 35%.",
  },
  {
    id: "scholar",
    alias: "The Archive Scholar",
    role: "Student Worker",
    company: "The University of Texas at Dallas",
    period: "Jun 2024 – Sep 2024",
    chapter: "2024 · THE DISCOVERY",
    ability: "Knowledge sharing",
    kit: ["Data integration", "Research", "Responsive applications"],
    description:
      "Developed an automated data integration pipeline harmonizing public records, then trained 50+ student researchers on it, accelerating project delivery 30%.",
    stats: [
      ["Researchers trained", "50+"],
      ["Project delivery", "+30%"],
    ],
    attribute: "Teaching & collaboration",
    evidence:
      "Delivered a responsive timeline application mapping 5 decades of Texas tech history from 100k+ fragmented data points — one interface adopted across departments to streamline research workflows.",
  },
  {
    id: "architect",
    alias: "The Data Architect",
    role: "Business Intelligence Analyst",
    company: "Pay with Spire",
    period: "Sep 2024 – Jun 2026",
    chapter: "2024–26 · THE EVOLUTION",
    ability: "Automation & agent integration",
    kit: ["Python", "Azure", "Google ADK", "Vertex AI"],
    description:
      "Designed a bronze/silver/gold Azure data lake fed by ADF pipelines processing 2M records daily across multiple systems — the single data surface behind multi-team wallboards, marketing automation, and AI agents.",
    stats: [
      ["Records / day", "2M"],
      ["Reporting turnaround", "−65%"],
    ],
    attribute: "Cross-team leadership",
    evidence:
      "Led delivery of an AI-powered credit/debit reconciliation system, designing the domain architecture, managing vendor API/SFTP integration and coordinating a 3-team, cross-vendor build, freeing $160K/year of manual-labor budget.",
  },
];
export const stages = [
  ["Character select", "Choose your chapter", "⚔"],
  ["Character sheet", "Trace the progression", "▤"],
  ["Quest log", "Explore the work", "⚑"],
  ["Inventory", "Equip your abilities", "◈"],
  ["NPC guild", "Meet the allies", "♜"],
  ["Final boss", "Tame the data chaos", "☠"],
];
export const questNames = [
  "The Archive of Answers",
  "The Reconciliation Rift",
  "The Merchant’s Forecast",
  "The Recommendation Relic",
  "The Dimensionality Labyrinth",
  "The Health Oracle",
  "The Fraud Sentinel",
  "The Founder’s Compass",
];
export const abilityNames = [
  "Pipeline Alchemy",
  "The Language Codex",
  "Cloudwalking",
  "Agent Summoning",
  "The Payment Ward",
];
export const abilities = skillGroups.flatMap((group, groupIndex) =>
  group.items.map((name) => ({ name, group: group.title, groupIndex })),
);
export const testimonials = [];
export const encounters = [
  {
    title: "The Tangled Pipeline",
    problem:
      "Raw records arrive in different formats. The pipeline needs a dependable shape before anyone can analyze it.",
    options: [
      "ETL/ELT design",
      "Skip the transformation",
      "Add more dashboards",
    ],
    answer: "ETL/ELT design",
    explanation:
      "ETL/ELT design gives ingestion and transformation a repeatable structure. The bronze/silver/gold data lake at Spire is one example from my work.",
  },
  {
    title: "The Hallucination Wraith",
    problem:
      "An answer sounds convincing. How do you check whether a retrieval system actually supports it?",
    options: [
      "Trust the confident tone",
      "RAGAS evaluation",
      "Increase the font size",
    ],
    answer: "RAGAS evaluation",
    explanation:
      "RAGAS evaluation helped trace retrieval failures to BM25 index pollution in the Fintech Hybrid RAG Engine. A passing-looking answer is not enough.",
  },
  {
    title: "The Reconciliation Golem",
    problem:
      "Most transactions match predictably. A few exceptions need investigation. Where should agent reasoning go?",
    options: [
      "Run an agent on everything",
      "Ignore every exception",
      "Deterministic matching + agent exceptions",
    ],
    answer: "Deterministic matching + agent exceptions",
    explanation:
      "The reconciliation engine puts a deterministic matcher first and reserves the LangGraph investigator for exceptions, with a human-in-the-loop gate.",
  },
];
const initial = {
  version: 1,
  character: "ranger",
  stage: 0,
  completed: [],
  viewedQuests: [],
  equipped: [],
  bossRound: 0,
};
export function freshProgress() {
  return { ...initial, completed: [], viewedQuests: [], equipped: [] };
}
export function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem("ez-adventure-v1"));
    if (saved?.version !== 1) return freshProgress();
    return {
      ...freshProgress(),
      character: characters.some((c) => c.id === saved.character)
        ? saved.character
        : "ranger",
      stage: Number.isInteger(saved.stage)
        ? Math.max(0, Math.min(5, saved.stage))
        : 0,
      completed: Array.isArray(saved.completed)
        ? [
            ...new Set(
              saved.completed.filter(
                (x) => Number.isInteger(x) && x >= 0 && x < 6,
              ),
            ),
          ]
        : [],
      viewedQuests: Array.isArray(saved.viewedQuests)
        ? [
            ...new Set(
              saved.viewedQuests.filter(
                (x) => Number.isInteger(x) && x >= 0 && x < 8,
              ),
            ),
          ]
        : [],
      equipped: Array.isArray(saved.equipped)
        ? saved.equipped
            .filter((x) => abilities.some((a) => a.name === x))
            .slice(0, 3)
        : [],
      bossRound: Number.isInteger(saved.bossRound)
        ? Math.max(0, Math.min(3, saved.bossRound))
        : 0,
    };
  } catch {
    return freshProgress();
  }
}
export function getXp(progress) {
  return (
    progress.completed.length * 100 +
    progress.viewedQuests.length * 25 +
    progress.equipped.length * 10 +
    progress.bossRound * 50
  );
}
export function careerMonths() {
  // Month intervals are merged to avoid counting Sep 2024 twice.
  const months = new Set();
  [
    [2021, 1, 2022, 9],
    [2024, 5, 2024, 8],
    [2024, 8, 2026, 5],
  ].forEach(([sy, sm, ey, em]) => {
    for (let m = sy * 12 + sm; m <= ey * 12 + em; m++) months.add(m);
  });
  return months.size;
}
