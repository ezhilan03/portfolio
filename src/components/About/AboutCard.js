import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hey people, I'm <span className="purple">Ezhilan Chinnasamy</span>{" "}
            (you can call me "EZ" – it’s as easy as I make data look!).
            I'm from <span className="">Dallas, TX</span>, and I currently
            <br />
            work as a <span className="purple">Data Analyst</span> at Pay with
            Spire. I hold a Master's (MS)
            <br />
            in Business Analytics and Artificial
            Intelligence from{" "}
            <span className="purple">The University of Texas at Dallas</span>.
            <br />
            <br />
            Other activities I enjoy:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Catching sunrises and sunsets across the globe 🌅
            </li>
            <li className="about-activity">
              <ImPointRight /> Casual networking (a.k.a. making new friends,
              lol!)
            </li>
            <li className="about-activity">
              <ImPointRight /> Work out to stay sharp both mentally and
              physically 🏋️
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Data is my playground, and insights are my goalposts."
          </p>
          <footer className="blockquote-footer">GPT 4.0</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
