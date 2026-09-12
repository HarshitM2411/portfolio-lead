import type { SkillGroup } from "@/lib/types";

/**
 * Technical skills — categories must match resume exactly.
 * Content updates: edit items in the matching group here only.
 */
export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL"],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "GraphQL",
      "WebSockets (Socket.IO)",
      "gRPC",
      "Microservices",
      "BullMQ",
      "Kafka",
      "Event-Driven Architecture",
    ],
  },
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js (SSR / ISR)",
      "Angular",
      "Redux Toolkit",
      "React Query (TanStack)",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Databases",
    items: [
      "MongoDB (Atlas, Aggregation, Change Streams, Vector Search)",
      "PostgreSQL (pgvector)",
      "Redis",
      "Elasticsearch",
    ],
  },
  {
    category: "AI/LLM",
    items: [
      "OpenAI & Anthropic (Claude) APIs",
      "LangChain",
      "LangGraph",
      "RAG",
      "Hybrid Search (BM25 + kNN, RRF, Reranking)",
      "Embeddings",
      "Agentic AI",
      "Function/Tool Calling",
      "MCP",
      "Prompt Engineering",
      "LLM Evals & Observability (LangSmith)",
      "Guardrails",
      "Semantic Caching",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, SQS, Lambda, ECS, CloudWatch)",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Jenkins",
      "CI/CD",
      "Terraform",
      "Nginx",
    ],
  },
  {
    category: "Observability & Testing",
    items: [
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
      "Jest",
      "Supertest",
      "Postman",
      "Swagger/OpenAPI",
    ],
  },
  {
    category: "Practices",
    items: [
      "System Design (HLD/LLD)",
      "Distributed Systems (idempotency, DLQs, rate limiting, caching)",
      "TDD",
      "Code Reviews",
      "Agile/Scrum",
      "Mentorship",
    ],
  },
];
