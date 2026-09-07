import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
export default function ProjectCards({
  image,
  title,
  description,
  stack,
  bullets,
  ghLink,
  index = 0,
}) {
  return (
    <article className="work-card">
      <a
        className="project-image-link"
        href={ghLink}
        target="_blank"
        rel="noreferrer"
        aria-label={`View ${title} on GitHub`}
      >
        <div className="project-image">
          <img src={image} alt={title} loading="lazy" />
          <span className="image-arrow">
            <FiArrowUpRight />
          </span>
        </div>
      </a>
      <div className="project-body">
        <div className="project-topline">
          <span className="small-mono">
            {String(index + 1).padStart(2, "0")} /
          </span>
          <a href={ghLink} target="_blank" rel="noreferrer">
            GitHub <FiArrowUpRight />
          </a>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        {stack && (
          <div className="project-stack">
            {stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        )}
        {bullets && (
          <details className="project-details">
            <summary>
              Technical details <span>+</span>
            </summary>
            <ul>
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </article>
  );
}
