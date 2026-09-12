/**
 * Content loaders & skip-empty helpers.
 *
 * Operational contract (architecture §8.5):
 * - New job        → edit/append `data/experience.ts` only
 * - New metric     → `data/metrics.ts`
 * - New skill      → `data/skills.ts`
 * - New project    → `data/projects.ts` (+ MDX under content/projects if featured)
 * - New blog post  → `content/blog/*.mdx` (future)
 * - Resume update  → replace `/public/resume.pdf` and keep /data in sync
 *
 * Never hardcode resume facts inside section JSX.
 */

import { about } from "@/data/about";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { github } from "@/data/github";
import { leadership } from "@/data/leadership";
import { metrics } from "@/data/metrics";
import { now } from "@/data/now";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { skills } from "@/data/skills";
import { testimonials } from "@/data/testimonials";
import type {
  Education,
  Experience,
  GitHubConfig,
  Leadership,
  Metric,
  NowItem,
  ProjectSummary,
  SkillGroup,
  SiteConfig,
  Testimonial,
  Certification,
} from "@/lib/types";

export function hasContentArray<T>(items: readonly T[] | null | undefined): boolean {
  return Array.isArray(items) && items.length > 0;
}

export function hasLeadership(data: Leadership | null | undefined): boolean {
  return Boolean(data?.headline?.trim() && data?.body?.trim());
}

export function hasEducation(data: Education | null | undefined): boolean {
  return Boolean(data?.school?.trim() && data?.degree?.trim());
}

export function hasAbout(
  data: { paragraphs: string[] } | null | undefined,
): boolean {
  return hasContentArray(data?.paragraphs?.filter((p) => p.trim()));
}

export function hasGitHubPanel(config: GitHubConfig | null | undefined): boolean {
  return Boolean(config?.enabled && config.username?.trim());
}

export function getFeaturedProjects(
  items: ProjectSummary[] = projects,
): ProjectSummary[] {
  return items.filter((p) => p.featured);
}

export type PortfolioContent = {
  site: SiteConfig;
  about: typeof about;
  metrics: Metric[];
  leadership: Leadership;
  experience: Experience[];
  skills: SkillGroup[];
  projects: ProjectSummary[];
  education: Education;
  now: NowItem[];
  testimonials: Testimonial[];
  certifications: Certification[];
  github: GitHubConfig;
};

export function getPortfolioContent(): PortfolioContent {
  return {
    site,
    about,
    metrics,
    leadership,
    experience,
    skills,
    projects,
    education,
    now,
    testimonials,
    certifications,
    github,
  };
}

/** Which home sections should render (skip-empty). */
export function getVisibleSections(content: PortfolioContent = getPortfolioContent()) {
  return {
    hero: true,
    metrics: hasContentArray(content.metrics),
    about: hasAbout(content.about),
    leadership: hasLeadership(content.leadership),
    experience: hasContentArray(content.experience),
    skills: hasContentArray(content.skills),
    projects: hasContentArray(content.projects),
    now: hasContentArray(content.now),
    github: hasGitHubPanel(content.github),
    education: hasEducation(content.education),
    testimonials: hasContentArray(content.testimonials),
    certifications: hasContentArray(content.certifications),
    contact: true,
  };
}
