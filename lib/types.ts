/**
 * Shared content contracts for portfolio data modules.
 * Adding a job/project/skill = edit the matching file under /data — not layout code.
 */

export type SiteConfig = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  /** Never render raw at rest — click-to-reveal or omit in UI. */
  phone?: string;
  socials: {
    github: string;
    linkedin: string;
  };
  resumePath: string;
  primaryCta: "resume";
};

export type Metric = {
  id: string;
  value: string;
  label: string;
  emphasize?: boolean;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string | "Present";
  bullets: string[];
  stack?: string[];
};

export type SkillCategory =
  | "Languages"
  | "Backend"
  | "Frontend"
  | "Databases"
  | "AI/LLM"
  | "Cloud & DevOps"
  | "Observability & Testing"
  | "Practices";

export type SkillGroup = {
  category: SkillCategory;
  items: string[];
};

export type ProjectSummary = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  problem: string;
  approach: string;
  outcome: string;
  featured?: boolean;
  diagram?: string;
  mdxPath?: string;
};

export type Education = {
  school: string;
  degree: string;
  field: string;
  location: string;
  start: string;
  end: string;
  detail?: string;
};

export type NowItem = {
  text: string;
};

export type Leadership = {
  headline: string;
  body: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer?: string;
  year?: string;
};

export type GitHubConfig = {
  enabled: boolean;
  username: string;
  profileUrl: string;
  pinnedRepoSlugs?: string[];
};
