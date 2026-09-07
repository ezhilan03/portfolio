import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import stroke from "../../Assets/Projects/stroke.webp";
import startup from "../../Assets/Projects/startup.webp";
import dimensionality from "../../Assets/Projects/dimensionality.webp";
import walmart from "../../Assets/Projects/Wallmart.webp";
import credit from "../../Assets/Projects/credit.webp";
import ecommerce from "../../Assets/Projects/e-commerce.webp";
import fintechRag from "../../Assets/Projects/fintech-rag.png";
import reconEngine from "../../Assets/Projects/recon-engine.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={fintechRag}
              isBlog={false}
              title="Fintech Hybrid RAG Engine"
              description="Hybrid retrieval engine over PostgreSQL for ACH compliance Q&A, evaluated end to end with RAGAS."
              stack={[
                "Python",
                "PostgreSQL",
                "pgvector (HNSW)",
                "BM25",
                "RAGAS",
                "Docker",
                "Cloud Run",
              ]}
              bullets={[
                "Hybrid retrieval pipeline over PostgreSQL — BM25 + pgvector (HNSW) with reciprocal rank fusion — for ACH compliance Q&A; clause-level chunking delivered +47% recall over recursive, tuned for compliance recall.",
                "RAGAS evaluation harness (faithfulness 0.829) that traced retrieval failures to BM25 index pollution and resolved them through query-type-aware weighting.",
              ]}
              ghLink="https://github.com/ezhilan03/fintech-rag"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={reconEngine}
              isBlog={false}
              title="Multi-Agent Financial Reconciliation Engine"
              description="Deterministic matcher fronting a LangGraph multi-agent investigator, escalating only the exceptions that need reasoning."
              stack={[
                "Python",
                "LangGraph",
                "MCP",
                "litellm",
                "PostgreSQL",
                "Docker",
              ]}
              bullets={[
                "Deterministic matcher fronting a LangGraph multi-agent investigator with MCP tools and human-in-the-loop gate; 83.3% accuracy across ~80% of volume, reserving agent reasoning for exceptions.",
                "Ground-truth evaluation harness that caught two regressions from plausible-looking fixes; measured confidence inversely correlated with correctness, dropping self-reported confidence from routing.",
              ]}
              ghLink="https://github.com/ezhilan03/recon-engine"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={walmart}
              isBlog={false}
              title="Walmart Sales Forecasting"
              description="A comprehensive project leveraging historical sales data to predict future sales for Walmart. Using advanced regression models like Ridge Regression and Gradient Boosting, this project achieved an impressive R² score of 0.975. It helps optimize inventory and streamline supply chain management."
              ghLink="https://github.com/ezhilan03/Walmart-Sales-Forecasting"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ecommerce}
              isBlog={false}
              title="Ecommerce Recommendation System"
              description="An innovative recommendation engine built for e-commerce platforms. This system analyzes user behavior and purchase history to suggest personalized product recommendations, enhancing user experience and boosting sales efficiency."
              ghLink="https://github.com/ezhilan03/Ecommerce-recommendation-system"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={dimensionality}
              isBlog={false}
              title="Curse of Dimensionality Mercedes-Benz Greener Manufacturing"
              description="A project tackling high-dimensional data in the automotive industry, focusing on optimizing manufacturing processes for greener outcomes. Implemented dimensionality reduction techniques to improve model performance and provide actionable insights for sustainability."
              ghLink="https://github.com/ezhilan03/Curse-of-Dimensionality---Mercedes-Benz-Greener-Manufacturing"           
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={stroke}
              isBlog={false}
              title="Stroke Prediction"
              description="A data-driven approach to predict the likelihood of strokes based on individual health metrics. This project uses machine learning algorithms to assess risk factors, aiding early diagnosis and preventive healthcare interventions."
              ghLink="https://github.com/ezhilan03/Stroke-prediction"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={credit}
              isBlog={false}
              title="Credit Card Fraud Detection on Imbalanced Dataset"
              description="Designed to detect fraudulent credit card transactions by addressing the challenges of imbalanced datasets. Applied techniques like SMOTE and advanced classifiers to improve detection rates while minimizing false positives."
              ghLink="https://github.com/ezhilan03/Credit-Card-Fraud-Detection-on-Imbalanced-dataset"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={startup}
              isBlog={false}
              title="Performance Prediction of Start-ups USA"
              description="A predictive model to determine the success or failure probability of startups in the USA. By analyzing critical business factors and historical data, this project provides insights into startup performance, assisting investors and entrepreneurs in making informed decisions."
              ghLink="https://github.com/ezhilan03/Performace_Prediction_of_Start-ups_USA"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
