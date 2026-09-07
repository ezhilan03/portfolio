import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import Home2 from "./Home2";
import DataSculpture from "./DataSculpture";
import { projects } from "../Projects/projectData";
import ProjectCard from "../Projects/ProjectCards";
const roles = [
  "AI Solutions Architect",
  "Data & ML Engineer",
  "Full Stack Engineer",
  "Software Engineer",
  "Data & Business Analyst",
];
export default function Home() {
  return (
    <>
      <section className="hero page-shell">
        <div className="hero-topline">
          <span className="eyebrow">
            <span className="status-dot" />
            Data Engineer
          </span>
          <span className="eyebrow hero-location">
            Dallas, TX <span>↗</span>
          </span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-greeting">
              Hi There!{" "}
              <span role="img" aria-label="waving hand">
                👋🏻
              </span>
            </p>
            <h1>
              <span className="intro-word">I'M</span> Ezhilan
              <br />
              <span className="surname">
                Chinnasamy<span className="name-dot">.</span>
              </span>
            </h1>
            <h2>Data Engineer</h2>
            <div className="hero-actions">
              <Link className="button primary" to="/project">
                Projects <FiArrowUpRight />
              </Link>
              <Link className="text-link" to="/resume">
                Resume <FiArrowUpRight />
              </Link>
            </div>
          </div>
          <DataSculpture />
        </div>
        <div className="hero-bottom">
          <a className="scroll-link" href="#about">
            LET ME BREAK THE ICE <FiArrowDownRight />
          </a>
          <span className="small-mono">Python · SQL · Azure · GCP</span>
        </div>
      </section>
      <div className="roles-strip" aria-label="Roles">
        {roles.map((role) => (
          <span key={role}>
            {role}
            <span aria-hidden="true">✳</span>
          </span>
        ))}
      </div>
      <section className="selected-work page-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / Projects</span>
            <h2>
              My Recent <em>Works</em>
            </h2>
          </div>
          <Link className="text-link" to="/project">
            All projects <span className="count">08</span>
            <FiArrowUpRight />
          </Link>
        </div>
        <p className="section-subtitle">
          Here are a few projects I've worked on recently.
        </p>
        <div className="featured-grid">
          {projects.slice(0, 2).map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              index={index}
              compact
            />
          ))}
        </div>
      </section>
      <Home2 />
    </>
  );
}
