import professional0 from "../../Assets/Projects/merchant-onboarding.svg";
import professional1 from "../../Assets/Projects/adf-data-lake.svg";
import professional2 from "../../Assets/Projects/settlement-automation.svg";
import professional3 from "../../Assets/Projects/self-service-analytics.svg";
import stroke from "../../Assets/Projects/stroke.webp";
import startup from "../../Assets/Projects/startup.webp";
import dimensionality from "../../Assets/Projects/dimensionality.webp";
import walmart from "../../Assets/Projects/Wallmart.webp";
import credit from "../../Assets/Projects/credit.webp";
import ecommerce from "../../Assets/Projects/e-commerce.webp";
import fintechRag from "../../Assets/Projects/fintech-rag.png";
import reconEngine from "../../Assets/Projects/recon-engine.png";

export const projects = [
  {"title": "Merchant onboarding application", "description": "Partner-specific files and manual merchant entry made onboarding repetitive and prone to corrections. I built an application that brought ingestion, validation and partner processing into a repeatable workflow for operations.", "ghLink": "https://github.com/ezhilan03/portfolio/tree/main/docs/professional-work/merchant-onboarding", "category": "Professional Work", "stack": ["Python", "API integration", "Validation", "Regression testing"], "image": professional0},
  {"title": "Incremental Azure data platform", "description": "Different operational datasets needed different refresh schedules, while reporting and analytics needed a consistent downstream foundation. I designed a layered Azure data lake and ADF workflows to connect those needs.", "ghLink": "https://github.com/ezhilan03/portfolio/tree/main/docs/professional-work/adf-data-lake", "category": "Professional Work", "stack": ["Azure Data Factory", "SQL", "Incremental ingestion", "Data lakes"], "image": professional1},
  {"title": "Settlement automation and billing controls", "description": "Credit/debit settlement work crossed internal operations, offshore engineering and an external EFT processor. Recurring billing also needed partner-specific calculations and explanations when reports disagreed.", "ghLink": "https://github.com/ezhilan03/portfolio/tree/main/docs/professional-work/settlement-automation", "category": "Professional Work", "stack": ["Payments", "SQL / Python", "API / SFTP", "Cross-team delivery"], "image": professional2},
  {"title": "Self-service analytics chatbot", "description": "Recurring requests for data and insights placed work on the data team. I built a self-service analytics chatbot so business users could ask questions and receive answers through the application.", "ghLink": "https://github.com/ezhilan03/portfolio/tree/main/docs/professional-work/self-service-analytics", "category": "Professional Work", "stack": ["Google ADK", "Vertex AI", "BigQuery", "NL2SQL / BQML"], "image": professional3},
  {
    title: "Fintech Hybrid RAG Engine",
    description:
      "Hybrid retrieval engine over PostgreSQL for ACH compliance Q&A, evaluated end to end with RAGAS.",
    ghLink: "https://github.com/ezhilan03/fintech-rag",
    stack: [
      "Python",
      "PostgreSQL",
      "pgvector (HNSW)",
      "BM25",
      "RAGAS",
      "Docker",
      "Cloud Run",
    ],
    bullets: [
      "Hybrid retrieval pipeline over PostgreSQL — BM25 + pgvector (HNSW) with reciprocal rank fusion — for ACH compliance Q&A; retrieval fixes improved context recall from 0.410 to 0.603 (+47% relative).",
      "RAGAS evaluation harness (faithfulness 0.829) that traced retrieval failures to BM25 index pollution and resolved them through query-type-aware weighting.",
    ],
    category: "AI & Agents",
    image: fintechRag,
  },
  {
    title: "Multi-Agent Financial Reconciliation Engine",
    description:
      "Deterministic matcher fronting a LangGraph multi-agent investigator, escalating only the exceptions that need reasoning.",
    ghLink: "https://github.com/ezhilan03/recon-engine",
    stack: ["Python", "LangGraph", "MCP", "litellm", "PostgreSQL", "Docker"],
    bullets: [
      "Deterministic matcher fronting a LangGraph multi-agent investigator with MCP tools and human-in-the-loop gate; 83.3% accuracy across ~80% of volume, reserving agent reasoning for exceptions.",
      "Ground-truth evaluation harness that caught two regressions from plausible-looking fixes; measured confidence inversely correlated with correctness, adding a deterministic value threshold independent of model confidence.",
    ],
    category: "AI & Agents",
    image: reconEngine,
  },
  {
    title: "Walmart Sales Forecasting",
    description:
      "A comprehensive project leveraging historical sales data to predict future sales for Walmart. Using advanced regression models like Ridge Regression and Gradient Boosting, this project achieved an impressive R² score of 0.975. It helps optimize inventory and streamline supply chain management.",
    ghLink: "https://github.com/ezhilan03/Walmart-Sales-Forecasting",
    category: "Machine Learning",
    image: walmart,
  },
  {
    title: "Ecommerce Recommendation System",
    description:
      "An innovative recommendation engine built for e-commerce platforms. This system analyzes user behavior and purchase history to suggest personalized product recommendations, enhancing user experience and boosting sales efficiency.",
    ghLink: "https://github.com/ezhilan03/Ecommerce-recommendation-system",
    category: "Machine Learning",
    image: ecommerce,
  },
  {
    title: "Curse of Dimensionality Mercedes-Benz Greener Manufacturing",
    description:
      "A project tackling high-dimensional data in the automotive industry, focusing on optimizing manufacturing processes for greener outcomes. Implemented dimensionality reduction techniques to improve model performance and provide actionable insights for sustainability.",
    ghLink:
      "https://github.com/ezhilan03/Curse-of-Dimensionality---Mercedes-Benz-Greener-Manufacturing",
    category: "Machine Learning",
    image: dimensionality,
  },
  {
    title: "Stroke Prediction",
    description:
      "A data-driven approach to predict the likelihood of strokes based on individual health metrics. This project uses machine learning algorithms to assess risk factors, aiding early diagnosis and preventive healthcare interventions.",
    ghLink: "https://github.com/ezhilan03/Stroke-prediction",
    category: "Machine Learning",
    image: stroke,
  },
  {
    title: "Credit Card Fraud Detection on Imbalanced Dataset",
    description:
      "Designed to detect fraudulent credit card transactions by addressing the challenges of imbalanced datasets. Applied techniques like SMOTE and advanced classifiers to improve detection rates while minimizing false positives.",
    ghLink:
      "https://github.com/ezhilan03/Credit-Card-Fraud-Detection-on-Imbalanced-dataset",
    category: "Machine Learning",
    image: credit,
  },
  {
    title: "Performance Prediction of Start-ups USA",
    description:
      "A predictive model to determine the success or failure probability of startups in the USA. By analyzing critical business factors and historical data, this project provides insights into startup performance, assisting investors and entrepreneurs in making informed decisions.",
    ghLink:
      "https://github.com/ezhilan03/Performace_Prediction_of_Start-ups_USA",
    category: "Machine Learning",
    image: startup,
  },
];
