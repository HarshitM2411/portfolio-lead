import type { ProjectSummary } from "@/lib/types";

/**
 * AI/LLM project case studies.
 * Content updates: append here for a compact card; add content/projects/*.mdx for featured depth.
 */
export const projects: ProjectSummary[] = [
  {
    id: "agentic-profile-matching",
    slug: "agentic-profile-matching",
    title: "Agentic Profile Matching",
    summary:
      "Multi-step LLM agentic workflows for candidate matching with tool-calling, structured outputs, and ranked recommendations.",
    stack: [
      "LangGraph",
      "LangChain",
      "FastAPI",
      "ChromaDB",
      "Groq",
      "MCP",
      "React",
    ],
    problem:
      "Candidate matching needed multi-step reasoning — resume retrieval, tool use, and ranked recommendations — not a single prompt.",
    approach:
      "Built LangGraph/LangChain agentic workflows with tool-calling agents, structured outputs, resume retrieval, and MCP tooling, exposed through a React dashboard.",
    outcome:
      "End-to-end agentic matching pipeline with ranked recommendations and dashboard visibility for operators.",
    featured: true,
    diagram: "agentic-profile-matching",
  },
  {
    id: "rag-profile-matching",
    slug: "rag-based-profile-matching",
    title: "RAG-Based Profile Matching",
    summary:
      "RAG matching engine with chunking/embedding pipelines, hybrid skill filtering, and LLM-generated match reasoning.",
    stack: [
      "FastAPI",
      "ChromaDB",
      "sentence-transformers",
      "Groq",
      "React",
      "TypeScript",
    ],
    problem:
      "Job–resume matching required semantic retrieval and explainable LLM reasoning over job descriptions.",
    approach:
      "Built resume chunking/embedding pipelines, hybrid skill filtering, and semantic ranking that produce LLM-generated match reasoning.",
    outcome:
      "RAG matching engine that surfaces ranked candidates with grounded match explanations.",
    featured: true,
    diagram: "rag-profile-matching",
  },
  {
    id: "resume-analyser",
    slug: "resume-analyser",
    title: "Resume Analyser",
    summary:
      "LLM tool-calling resume assistant for read/search/summarise flows over PDF/DOCX/TXT.",
    stack: [
      "Python",
      "Streamlit",
      "Groq",
      "Llama 3.3",
      "pdfplumber",
      "python-docx",
    ],
    problem:
      "Resume files needed scoped read/search/summarise tooling without exposing unconstrained filesystem access.",
    approach:
      "Built an LLM tool-calling assistant with scoped filesystem tools over PDF/DOCX/TXT and generated summary outputs.",
    outcome:
      "Interactive Streamlit assistant for resume read/search/summarise workflows.",
    featured: false,
  },
];
