import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowUp } from "react-icons/fi";
export const socials = [
  ["GitHub", "https://github.com/ezhilan03"],
  ["LinkedIn", "https://www.linkedin.com/in/ezhilan-chinnasamy"],
  ["Tableau", "https://public.tableau.com/app/profile/ezhilan2612"],
  ["Instagram", "https://www.instagram.com/_.pinkman_/"],
];
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="wordmark" to="/" aria-label="EZ Home">
          ez<span>.</span>
        </Link>
        <p>Copyright © {new Date().getFullYear()}</p>
        <div className="footer-socials">
          {socials.map(([name, url]) => (
            <a href={url} key={name} target="_blank" rel="noreferrer">
              {name}
              <FiArrowUpRight />
            </a>
          ))}
        </div>
        <a
          className="icon-button"
          href="#main-content"
          aria-label="Back to top"
        >
          <FiArrowUp />
        </a>
      </div>
    </footer>
  );
}
