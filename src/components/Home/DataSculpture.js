import React, { useState } from "react";
const labels = [
  "SQL & Data Modeling",
  "Pipeline Automation",
  "Multi-Agent Integration",
];
export default function DataSculpture() {
  const [active, setActive] = useState(0);
  return (
    <div className={`data-sculpture stage-${active}`}>
      <div className="sculpture-top">
        <span>Python / SQL / Cloud</span>
        <span className="tiny-cross">+</span>
      </div>
      <div className="sculpture-canvas" aria-hidden="true">
        <svg viewBox="0 0 560 450" className="orbit-svg">
          <defs>
            <radialGradient id="sphere-fill" cx="35%" cy="30%">
              <stop offset="0" stopColor="#dadfd3" />
              <stop offset=".72" stopColor="#a0b09a" />
              <stop offset="1" stopColor="#4b6751" />
            </radialGradient>
            <clipPath id="sphere-clip">
              <circle cx="280" cy="220" r="142" />
            </clipPath>
          </defs>
          <ellipse
            className="outer-orbit"
            cx="280"
            cy="220"
            rx="250"
            ry="77"
            transform="rotate(-29 280 220)"
          />
          <circle cx="280" cy="220" r="142" fill="url(#sphere-fill)" />
          <g clipPath="url(#sphere-clip)" className="globe-lines">
            {Array.from({ length: 19 }, (_, i) => (
              <ellipse
                key={`h${i}`}
                cx="280"
                cy={78 + i * 16}
                rx="142"
                ry="24"
              />
            ))}
            {Array.from({ length: 11 }, (_, i) => (
              <ellipse
                key={`v${i}`}
                cx="280"
                cy="220"
                rx={14 + i * 13}
                ry="142"
              />
            ))}
            <path d="M110 75L450 365M90 140L430 430M170 20L490 310" />
          </g>
          <ellipse
            className="front-orbit"
            cx="280"
            cy="220"
            rx="250"
            ry="77"
            transform="rotate(-29 280 220)"
            pathLength="100"
          />
          <g className="orbit-point">
            <circle cx="76" cy="337" r="8" />
            <circle cx="76" cy="337" r="16" className="point-ring" />
          </g>
          <circle cx="486" cy="102" r="5" fill="#244b3b" />
          <path className="guide" d="M45 90h70v45M442 318v46h70" />
          <text x="45" y="78">
            01 / DATA
          </text>
          <text x="433" y="386">
            03 / AI
          </text>
        </svg>
        <div className="sculpture-chip chip-a">
          SQL <span>↗</span>
        </div>
        <div className="sculpture-chip chip-b">
          MCP <span>↗</span>
        </div>
      </div>
      <div className="sculpture-controls" aria-label="Explore specialties">
        {labels.map((label, index) => (
          <button
            key={label}
            aria-label={label}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            <span>0{index + 1}</span>
            <span className="stage-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
