import type { SiteConfig } from "@/lib/types";

/**
 * Site-wide identity & CTAs.
 * Content updates: edit this file (and /public resume PDF) — not layout components.
 */
export const site: SiteConfig = {
  name: "Harshit Meena",
  title: "Lead Software Engineer | AI/LLM & Agentic Systems",
  tagline:
    "6+ years scaling distributed MERN / Node.js systems on AWS to 100K+ users — now driving production GenAI: LLM orchestration, agentic workflows, and RAG pipelines with a focus on evaluation, observability, and cost efficiency.",
  location: "Gurugram, India",
  email: "meenaharshit30@gmail.com",
  phone: "+91-9871737281",
  socials: {
    github: "https://github.com/HarshitM2411/",
    linkedin: "https://linkedin.com/in/harshitmeena",
  },
  resumePath: "/resume.pdf",
  primaryCta: "resume",
};
