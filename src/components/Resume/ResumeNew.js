import React from "react";
import { FiDownload, FiArrowUpRight } from "react-icons/fi";
import pdf from "../../Assets/EZHILAN-CHINNASAMY-Resume.pdf";
export default function ResumeNew() {
  return (
    <section className="page-shell resume-page">
      <div className="section-heading">
        <div className="page-intro">
          <span className="eyebrow">03 / Resume</span>
          <h1>
            Resume<span className="name-dot">.</span>
          </h1>
        </div>
        <div className="resume-actions">
          <a className="text-link" href={pdf} target="_blank" rel="noreferrer">
            Open PDF <FiArrowUpRight />
          </a>
          <a
            className="button primary"
            href={pdf}
            download="EZHILAN-CHINNASAMY-Resume.pdf"
          >
            Download CV <FiDownload />
          </a>
        </div>
      </div>
      <div className="resume-frame">
        <div className="resume-caption">
          <span>Ezhilan Chinnasamy</span>
          <span className="small-mono">PDF / Resume</span>
        </div>
        <object
          data={`${pdf}#view=FitH`}
          type="application/pdf"
          aria-label="Ezhilan Chinnasamy resume"
          title="Ezhilan Chinnasamy resume"
        >
          <div className="empty-state">
            <p>Your browser cannot display this PDF inline.</p>
            <a
              className="button primary"
              href={pdf}
              target="_blank"
              rel="noreferrer"
            >
              Open PDF <FiArrowUpRight />
            </a>
          </div>
        </object>
      </div>
      <p className="resume-note">
        Use Open PDF to view the résumé in a separate tab, or Download CV to
        save a copy.
      </p>
    </section>
  );
}
