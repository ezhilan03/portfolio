import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiArrowDown,
  FiDatabase,
  FiCreditCard,
  FiUsers,
} from "react-icons/fi";
import Home2 from "./Home2";
import { projects } from "../Projects/projectData";
import { characters } from "../Game/gameData";
import Techstack from "../About/Techstack";
import lamp from "../../Assets/copper-lamp.png";
const focus = [
  [
    FiDatabase,
    "Data platforms & reliability",
    "Building dependable data flows that support reporting, reconciliation and operational decisions.",
  ],
  [
    FiCreditCard,
    "Payments & reconciliation",
    "Connecting payment data and exception handling to clearer financial operations.",
  ],
  [
    FiUsers,
    "Cross-team delivery",
    "Translating business requirements into coordinated technical delivery across teams and vendors.",
  ],
];
export default function Home() {
  const [lampOn, setLampOn] = useState(false);
  return (
    <>
      <section className="copper-hero page-shell">
        <div className="copper-intro">
          <h1>
            Ezhilan
            <br />
            Chinnasamy
          </h1>
          <p className="copper-role">Data Engineer</p>
          <p className="copper-positioning">
            Data pipelines, payments systems and applied AI.
          </p>
          <div className="copper-actions">
            <a className="button primary" href="#experience">
              View experience <FiArrowDown />
            </a>
            <a className="button copper-outline" href="#work">
              Selected projects <FiArrowUpRight />
            </a>
          </div>
        </div>
        <button
          className={`copper-lamp ${lampOn ? "is-lit" : ""}`}
          onClick={() => setLampOn(!lampOn)}
          aria-label="Desk lamp"
          aria-pressed={lampOn}
        >
          <span className="lamp-glow" aria-hidden="true" />
          <img
            src={lamp}
            alt="Copper desk lamp beside an ink-blue notebook"
            width="1024"
            height="1024"
          />
          <span className="lamp-hint">
            {lampOn ? "A little more light." : "A little light?"}
          </span>
        </button>
      </section>
      <section
        className="copper-focus page-shell"
        aria-labelledby="focus-title"
      >
        <h2 id="focus-title">Professional focus</h2>
        <div className="focus-grid">
          {focus.map(([Icon, title, text]) => (
            <div className="focus-item" key={title}>
              <Icon aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        className="copper-experience page-shell"
        id="experience"
        aria-labelledby="experience-title"
      >
        <div className="copper-section-heading">
          <h2 id="experience-title">Work Experience</h2>
          <Link className="text-link" to="/resume">
            View resume <FiArrowUpRight />
          </Link>
        </div>
        {[...characters].reverse().map((job) => (
          <article className="experience-entry" key={job.id}>
            <div className="experience-meta">
              <p className="experience-date">{job.period}</p>
              <h3>{job.company}</h3>
              <p className="experience-role">{job.role}</p>
            </div>
            <div className="experience-evidence">
              <p>{job.description}</p>
              <p>{job.evidence}</p>
              <p className="experience-kit">{job.kit.join(" · ")}</p>
            </div>
          </article>
        ))}
      </section>
      <section
        className="copper-work page-shell"
        id="work"
        aria-labelledby="work-title"
      >
        <div className="copper-section-heading">
          <h2 id="work-title">Selected projects</h2>
          <Link className="text-link" to="/project">
            All {projects.length} projects <FiArrowUpRight />
          </Link>
        </div>
        {["Multi-Agent Financial Reconciliation Engine", "Fintech Hybrid RAG Engine"].map((title) => projects.find((project) => project.title === title)).map((project, index) => (
          <article className="editorial-project" key={project.title}>
            <div className="editorial-project-intro">
              <span className="eyebrow">
                0{index + 1} / {project.category}
              </span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            {index === 0 && (
              <figure className="recon-flow">
                <figcaption>Architecture overview</figcaption>
                <div className="flow-steps">
                  <span>Transactions</span>
                  <b aria-hidden="true">→</b>
                  <span className="flow-matcher">Deterministic matcher</span>
                  <b aria-hidden="true">→</b>
                  <div className="flow-outcomes">
                    <span>Matched</span>
                    <span>Investigation → Human review</span>
                  </div>
                </div>
              </figure>
            )}
            <ul className="editorial-evidence">
              {project.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="editorial-stack">{project.stack.join(" · ")}</p>
            <a
              className="text-link"
              href={project.ghLink}
              target="_blank"
              rel="noreferrer"
            >
              Explore on GitHub <FiArrowUpRight />
            </a>
          </article>
        ))}
      </section>
      <section
        className="copper-toolkit page-shell"
        aria-labelledby="toolkit-title"
      >
        <h2 id="toolkit-title">Toolkit</h2>
        <Techstack />
      </section>
      <Home2 />
    </>
  );
}
