import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillInstagram,
  AiTwotoneStar
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="">  BREAK THE ICE </span> 
            </h1>
            <p className="home-about-body">
            I began my Bachelor’s in Computer Science driven by my family’s economic situation. 
            Little did I know, I’d quickly fall in love with programming and the systems behind it. 
            This curiosity led me to explore a variety of fields, including web development, software 
            engineering, data analysis, automation scripting (Python), and database management — and 
            eventually to building the pipelines and platforms everything else runs on.
              <br />
              <br />
              These days I build data platforms end to end with
              <i>
                <b className="purple"> Python, SQL, Azure, and GCP, </b>
              </i>
              along with the agent layers that sit on top of them —
              <i>
                <b className="purple"> LangGraph, MCP, and Vertex AI. </b>
              </i>
              The rule I work by: if I can’t measure whether a system works, I haven’t finished 
              building it. I believe in the power of data and technology to make a meaningful impact.
              <br />
              <br />
              Looking back at my journey, I’m proud to say I’m on a path that’s not only enriching me but also
              those I care about. Feel free to reach out to discuss project collaborations, networking, or 
              just to hear me passionately explain why Real Madrid is the greatest football club in history. 
              <i>
                <b className="purple"> Hala Madrid! </b> ⚽👑 
              </i>
              <br />
              <br />
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/ezhilan03"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/ezhilan-chinnasamy"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://public.tableau.com/app/profile/ezhilan2612"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiTwotoneStar />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/_.pinkman_/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
