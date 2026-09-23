import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiArrowUpRight, FiSearch, FiSun, FiMoon } from "react-icons/fi";

export default function Navbar({ theme, onTheme, onSearch }) {
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="wordmark" to="/" aria-label="EZ Home">
          EZ<span>.</span>
        </Link>
        <nav
          className="main-nav"
          id="main-navigation"
          aria-label="Main navigation"
        >
          {[
            ["/project", "Work"],
            ["/#experience", "Experience"],
            ["/about", "About"],
            ["/resume", "Resume"],
          ].map(([path, label]) => (
            <NavLink end={path === "/"} key={path} to={path}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
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
        </div>
      </div>
    </header>
  );
}
