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
import fintechRag from "../../Assets/Projects/fintech-rag-release.svg";
import fitnessPlatform from "../../Assets/Projects/fitness-platform.svg";
import reconEngine from "../../Assets/Projects/recon-engine-release.svg";

export const projects = [
  {"title": "Merchant onboarding application", "description": "Partner-specific files and manual merchant entry made onboarding repetitive and prone to corrections. I built an application that brought ingestion, validation and partner processing into a repeatable workflow for operations.", "ghLink": "https://github.com/ezhilan03/portfolio/tree/main/docs/professional-work/merchant-onboarding", "category": "Professional Work", "stack": ["Python", "API integration", "Validation", "Regression testing"], "image": professional0},
  {"title": "Incremental Azure data platform", "description": "Different operational datasets needed different refresh schedules, while reporting and analytics needed a consistent downstream foundation. I designed a layered Azure data lake and ADF workflows to connect those needs.", "ghLink": "https://github.com/ezhilan03/portfolio/tree/main/docs/professional-work/adf-data-lake", "category": "Professional Work", "stack": ["Azure Data Factory", "SQL", "Incremental ingestion", "Data lakes"], "image": professional1},
  {"title": "Settlement automation and billing controls", "description": "Credit/debit settlement work crossed internal operations, offshore engineering and an external EFT processor. Recurring billing also needed partner-specific calculations and explanations when reports disagreed.", "ghLink": "https://github.com/ezhilan03/portfolio/tree/main/docs/professional-work/settlement-automation", "category": "Professional Work", "stack": ["Payments", "SQL / Python", "API / SFTP", "Cross-team delivery"], "image": professional2},
  {"title": "Self-service analytics chatbot", "description": "Recurring requests for data and insights placed work on the data team. I built a self-service analytics chatbot so business users could ask questions and receive answers through the application.", "ghLink": "https://github.com/ezhilan03/portfolio/tree/main/docs/professional-work/self-service-analytics", "category": "Professional Work", "stack": ["Google ADK", "Vertex AI", "BigQuery", "NL2SQL / BQML"], "image": professional3},
  {
    title: "Fintech Hybrid RAG Engine",
    description: "Released on-demand AWS demo: versioned ingestion, traceable answers and tested recovery over synthetic payment policies.",
    ghLink: "https://github.com/ezhilan03/fintech-rag",
    caseStudyLink: "https://github.com/ezhilan03/portfolio/tree/main/docs/projects/fintech-rag",
    stack: ["Python", "PostgreSQL", "pgvector", "BM25", "RAGAS", "Docker", "Terraform", "GitHub Actions", "AWS"],
    bullets: ["Built versioned document ingestion and hybrid BM25/pgvector retrieval with validated citations and explicit abstention; verified 84 tests, seven retrieval cases and eight controlled-context grounding cases.", "Deployed an on-demand AWS demo with Docker, Terraform and GitHub Actions OIDC; verified live queries, encrypted backup restoration, dependency recovery and automatic shutdown."],
    category: "AI & Agents",
    image: fintechRag,
  },
  {
    title: "Multi-Agent Financial Reconciliation Engine",
    description: "Released AWS batch project with durable payment allocation, safe replay, human review and verified backup recovery.",
    ghLink: "https://github.com/ezhilan03/recon-engine",
    caseStudyLink: "https://github.com/ezhilan03/portfolio/tree/main/docs/projects/recon-engine",
    stack: ["Python", "SQL", "LangGraph", "MCP", "PostgreSQL", "Docker", "Terraform", "AWS"],
    bullets: ["Built deterministic ledger-to-settlement matching with durable allocation guards, replay-safe ingestion, LangGraph investigation tools and human-review routing.", "Shipped an AWS batch demo processing 500 synthetic transactions and 531 settlement lines; verified backup restoration and duplicate-safe replay, with 383 transactions matched and 117 retained for review."],
    category: "AI & Agents",
    image: reconEngine,
  },
  {
    title: "Fitness Data Platform",
    description: "Synthetic wearable data with point-in-time history, daily and weekly summaries, tested orchestration and an on-demand AWS deployment.",
    ghLink: "https://github.com/ezhilan03/fitness-data-platform",
    caseStudyLink: "https://github.com/ezhilan03/portfolio/tree/main/docs/projects/fitness-data-platform",
    stack: ["Python", "SQL", "dbt", "DuckDB", "Airflow", "Docker", "Terraform", "AWS Fargate", "Lambda", "GitHub Actions"],
    bullets: ["Preserved source revisions and knowledge timestamps; verified corrections, late arrivals, device identity, missing values and incremental/full-refresh parity across eight dbt scenarios.", "Executed seven Airflow intervals with retry recovery and two backfills; deployed container batches and an IAM-authenticated summary API with private versioned storage and SQS failure alerts."],
    category: "Data Engineering",
    image: fitnessPlatform,
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
