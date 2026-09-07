import React from "react";
import { Col, Row } from "react-bootstrap";

export const skillGroups = [
  {
    title: "Data Engineering",
    items: [
      "ETL/ELT design",
      "Incremental ingestion",
      "Data modeling",
      "Pipeline orchestration",
      "Medallion architecture",
    ],
  },
  {
    title: "Languages & Databases",
    items: [
      "Python",
      "SQL (T-SQL, PostgreSQL, MS SQL Server)",
      "PySpark",
      "pandas",
      "scikit-learn",
    ],
  },
  {
    title: "Cloud & Platform",
    items: [
      "Azure",
      "GCP (Vertex AI, BigQuery, Cloud Run)",
      "AWS (EMR, S3, IAM)",
      "Docker",
    ],
  },
  {
    title: "AI & Agent Integration",
    items: [
      "LangGraph",
      "Google ADK",
      "Vertex AI",
      "MCP",
      "LangChain",
      "litellm",
      "RAG",
      "RAGAS evaluation",
      "NL2SQL",
    ],
  },
  {
    title: "Payments Domain",
    items: [
      "ACH/EFT settlement",
      "Transaction reconciliation",
      "Financial data integrity",
      "Regulatory compliance",
    ],
  },
];

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {skillGroups.map((group) => (
        <Col md={12} key={group.title} className="skill-group">
          <h3 className="skill-group-title">{group.title}</h3>
          <div className="skill-tag-row">
            {group.items.map((item) => (
              <span className="skill-tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;
