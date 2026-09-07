import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiSearch, FiX } from "react-icons/fi";
import { projects } from "./Projects/projectData";
export default function CommandMenu({ open, onClose }) {
  const dialog = useRef(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (open) {
      setQuery("");
      dialog.current.showModal();
    } else if (dialog.current.open) dialog.current.close();
  }, [open]);
  const pages = [
    ["Home", "/"],
    ["About", "/about"],
    ["Projects", "/project"],
    ["Resume", "/resume"],
    ["Game mode", "/play"],
  ].filter(([name]) => name.toLowerCase().includes(query.toLowerCase()));
  const matches = projects.filter((project) =>
    `${project.title} ${project.description} ${(project.stack || []).join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <dialog
      ref={dialog}
      className="command-dialog"
      aria-label="Search pages and projects"
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      <div className="command-search">
        <FiSearch />
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search pages, projects, technologies…"
          aria-label="Search pages and projects"
        />
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close search"
        >
          <FiX />
        </button>
      </div>
      <div className="command-results">
        {pages.length > 0 && (
          <>
            <p className="eyebrow">Pages</p>
            {pages.map(([name, path]) => (
              <Link key={path} to={path} onClick={onClose}>
                {name}
                <span>↵</span>
              </Link>
            ))}
          </>
        )}
        {matches.length > 0 && (
          <>
            <p className="eyebrow">Projects</p>
            {matches.map((project) => (
              <Link
                key={project.title}
                to={`/project?q=${encodeURIComponent(project.title)}`}
                onClick={onClose}
              >
                {project.title}
                <FiArrowUpRight />
              </Link>
            ))}
          </>
        )}
        {!pages.length && !matches.length && (
          <p className="empty-state">
            No results. Try a project name or technology.
          </p>
        )}
      </div>
      <div className="command-hint">
        Tab to navigate <span>Esc to close</span>
      </div>
    </dialog>
  );
}
