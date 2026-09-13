import React from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiGrid, FiList, FiX } from "react-icons/fi";
import { projects } from "./projectData";
import ProjectCard from "./ProjectCards";
export default function Projects() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const category = params.get("category") || "All projects";
  const layout = params.get("view") === "list" ? "list" : "grid";
  const change = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };
  const filtered = projects.filter(
    (project) =>
      (category === "All projects" || category === project.category) &&
      `${project.title} ${project.description} ${(project.stack || []).join(" ")} ${(project.bullets || []).join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <section className="page-shell projects-page">
      <div className="page-intro">
        <span className="eyebrow">01 / Projects</span>
        <h1>
          My Recent <em>Works</em>
          <sup>{String(projects.length).padStart(2, "0")}</sup>
        </h1>
        <p>Here are a few projects I've worked on recently.</p>
      </div>
      <div className="project-toolbar">
        <div className="filter-tabs" aria-label="Filter projects">
          {["All projects", ...new Set(projects.map(project => project.category))].map((label) => (
            <button
              key={label}
              aria-pressed={category === label}
              onClick={() =>
                change("category", label === "All projects" ? "" : label)
              }
            >
              {label}
              <span>
                {label === "All projects" ? projects.length : projects.filter(project => project.category === label).length}
              </span>
            </button>
          ))}
        </div>
        <div className="project-tools">
          <div className="search-field">
            <FiSearch />
            <input
              type="search"
              aria-label="Search projects"
              placeholder="Search projects…"
              value={query}
              onChange={(event) => change("q", event.target.value)}
            />
            {query && (
              <button onClick={() => change("q", "")} aria-label="Clear search">
                <FiX />
              </button>
            )}
          </div>
          <div className="view-toggle" aria-label="Project layout">
            <button
              aria-label="Grid view"
              aria-pressed={layout === "grid"}
              onClick={() => change("view", "")}
            >
              <FiGrid />
            </button>
            <button
              aria-label="List view"
              aria-pressed={layout === "list"}
              onClick={() => change("view", "list")}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>
      <p className="result-count small-mono" role="status">
        {filtered.length} of {projects.length} projects
      </p>
      <div className={`projects-grid ${layout === "list" ? "list-view" : ""}`}>
        {filtered.map((project) => (
          <ProjectCard
            key={project.title}
            {...project}
            index={projects.indexOf(project)}
          />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>No projects found.</h2>
          <p>Try a different keyword or reset the filters.</p>
          <button className="button primary" onClick={() => setParams({})}>
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
