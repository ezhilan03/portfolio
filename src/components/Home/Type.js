import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "SQL & Data Modeling",
          "Pipeline Automation",
          "Multi-Agent Integration",
          "AI Solutions Architect",
          "Data & ML Engineer",
          "Full Stack Engineer",
          "Software Engineer",
          "Data & Business Analyst",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
