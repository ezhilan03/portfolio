import React from "react";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
export default function About() {
  return (
    <section className="page-shell about-page">
      <div className="page-intro">
        <span className="eyebrow">02 / About</span>
        <h1>
          Know Who <em>I AM</em>
        </h1>
      </div>
      <div className="about-layout">
        <Aboutcard />
        <aside className="about-visual">
          <span className="small-mono">Ezhilan Chinnasamy / EZ</span>
          <img
            src={laptopImg}
            alt="Illustration of a developer working at a laptop"
          />
          <span className="small-mono">Dallas, TX ↗</span>
        </aside>
      </div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">The toolkit</span>
          <h2>
            Professional <em>Skillset</em>
          </h2>
        </div>
      </div>
      <Techstack />
    </section>
  );
}
