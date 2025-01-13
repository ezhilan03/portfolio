import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiPython,
  DiJavascript1,
  DiReact,
  DiCss3,
  DiGit,
  DiMysql,
  DiMsqlServer,
  DiMongodb,
  DiGoogleAnalytics,
  DiJira,
} from "react-icons/di";
import {
  SiMicrosoftexcel,
  SiAdobe,
  SiTableau,
  SiPowerbi,
  SiApachehadoop,
  SiSalesforce,
  SiApachehive,
  SiFigma,
  SiPostman,
  SiHtml5,
} from "react-icons/si";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {/* Programming Languages */}
      <Col xs={4} md={2} className="tech-icons">
        <DiPython />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiJavascript1 />
      </Col>

      {/* Frontend Technologies */}
      <Col xs={4} md={2} className="tech-icons">
        <DiReact />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiCss3 />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiHtml5 />
      </Col>

      {/* Databases */}
      <Col xs={4} md={2} className="tech-icons">
        <DiMysql />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiMsqlServer />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiMongodb />
      </Col>

      {/* Analytics and Tools */}
      <Col xs={4} md={2} className="tech-icons">
        <DiGoogleAnalytics />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiJira />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiGit />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostman />
      </Col>

      {/* Data and Visualization Tools */}
      <Col xs={4} md={2} className="tech-icons">
        <SiTableau />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPowerbi />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMicrosoftexcel />
      </Col>

      {/* Big Data and Cloud */}
      <Col xs={4} md={2} className="tech-icons">
        <SiApachehadoop />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiApachehive />
      </Col>

      {/* Design Tools */}
      <Col xs={4} md={2} className="tech-icons">
        <SiFigma />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiAdobe />
      </Col>

      {/* CRM Tools */}
      <Col xs={4} md={2} className="tech-icons">
        <SiSalesforce />
      </Col>
    </Row>
  );
}

export default Techstack;
