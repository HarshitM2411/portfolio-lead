import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { AgenticMatchingDiagram } from "@/components/diagrams/AgenticMatchingDiagram";
import { RagMatchingDiagram } from "@/components/diagrams/RagMatchingDiagram";
import type { ProjectSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProjectsSectionProps = {
  projects: ProjectSummary[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <Section
      id="projects"
      index="Projects"
      title="Applied AI Architectural Blueprints"
      meta={`${projects.length} case studies`}
      className="py-8 md:py-16"
    >
      <div className="space-y-3 md:space-y-8">
        {projects.map((p, i) => (
          <article
            key={p.id}
            className="space-y-4 overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-bento backdrop-blur-xl sm:p-9"
          >
            <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-4 lg:flex-row lg:items-center lg:gap-3 lg:pb-5">
              <div>
                <p className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-wide text-sky-600 md:text-xs">
                  <span>Project {String(i + 1).padStart(2, "0")}</span>
                  <span className="text-slate-300">·</span>
                  <span>{p.featured ? "Agentic workflow" : "Knowledge platform"}</span>
                </p>
                <h3 className="mt-1 font-heading text-base font-bold text-[#090D16] sm:text-2xl">
                  {p.title}
                </h3>
              </div>
              {p.featured ? (
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[10px] font-semibold text-emerald-800 shadow-sm md:px-3.5 md:py-1.5 md:text-xs">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  Featured
                </span>
              ) : (
                <span className="inline-flex shrink-0 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-mono text-[10px] font-semibold text-slate-700 md:text-xs">
                  Case study
                </span>
              )}
            </div>

            <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
              {p.summary}
            </p>

            {p.diagram === "agentic-profile-matching" ? (
              <AgenticMatchingDiagram />
            ) : null}
            {p.diagram === "rag-profile-matching" ? (
              <RagMatchingDiagram />
            ) : null}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              <Decon label="Problem" body={p.problem} />
              <Decon label="Architecture" body={p.approach} />
              <div className="space-y-2 rounded-2xl border border-slate-200/80 bg-slate-50 p-3.5 md:p-5">
                <span className="font-mono text-[10px] font-bold tracking-wide text-slate-500 md:text-[11px]">
                  Stack
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-[11px] font-medium text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-indigo-50/50 p-3.5 md:p-5">
                <span className="font-mono text-[10px] font-bold tracking-wide text-sky-800 md:text-[11px]">
                  Outcome
                </span>
                <p className="text-xs leading-relaxed font-medium text-sky-950">
                  {p.outcome}
                </p>
              </div>
            </div>

            {p.featured ? (
              <div className="pt-1">
                <Link
                  href={`/projects/${p.slug}`}
                  className={cn(
                    "inline-flex font-mono text-[11px] font-bold text-sky-700 hover:text-[#2563EB]",
                  )}
                >
                  Full case study →
                </Link>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}

function Decon({ label, body }: { label: string; body: string }) {
  return (
    <div className="space-y-2 rounded-2xl border border-slate-200/80 bg-slate-50 p-3.5 md:p-5">
      <span className="font-mono text-[10px] font-bold tracking-wide text-slate-500 md:text-[11px]">
        {label}
      </span>
      <p className="text-xs leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}
