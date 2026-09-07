import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FiArrowUpRight,
  FiSearch,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function Navbar({ theme, onTheme, onSearch }) {
  const [expanded, setExpanded] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="wordmark" to="/" aria-label="EZ Home">
          ez<span>.</span>
        </Link>
        <nav
          className={expanded ? "main-nav is-open" : "main-nav"}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {[
            ["/", "Home"],
            ["/about", "About"],
            ["/project", "Projects"],
            ["/resume", "Resume"],
          ].map(([path, label]) => (
            <NavLink
              end={path === "/"}
              key={path}
              to={path}
              onClick={() => setExpanded(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <Link
            className="game-entry-link"
            to="/play"
            aria-label="Enter game mode"
          >
            ✦ <span>Play</span>
          </Link>
          <button
            className="icon-button search-toggle"
            onClick={onSearch}
            aria-label="Search pages and projects"
          >
            <FiSearch />
            <kbd>⌘ K</kbd>
          </button>
          <button
            className="icon-button"
            onClick={onTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>
          <a
            className="nav-connect"
            href="https://www.linkedin.com/in/ezhilan-chinnasamy"
            target="_blank"
            rel="noreferrer"
          >
            Connect <FiArrowUpRight />
          </a>
          <button
            className="icon-button menu-toggle"
            aria-label={expanded ? "Close navigation" : "Open navigation"}
            aria-expanded={expanded}
            aria-controls="main-navigation"
            onClick={() => setExpanded(!expanded)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setExpanded(false);
            }}
          >
            {expanded ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
