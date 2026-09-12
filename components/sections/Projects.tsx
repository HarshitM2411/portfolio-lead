"use client";

import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import { AgenticMatchingDiagram } from "@/components/diagrams/AgenticMatchingDiagram";
import { RagMatchingDiagram } from "@/components/diagrams/RagMatchingDiagram";
import type { ProjectSummary } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type ProjectsSectionProps = {
  projects: ProjectSummary[];
};

function Diagram({ id }: { id?: string }) {
  if (id === "agentic-profile-matching") return <AgenticMatchingDiagram />;
  if (id === "rag-profile-matching") return <RagMatchingDiagram />;
  return null;
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <Section id="projects" index="07 // AI Projects" title="AI / LLM case studies">
      <ul className="grid gap-4 lg:grid-cols-1">
        {projects.map((p) => (
          <li key={p.id}>
            <Collapsible
              defaultOpen={Boolean(p.featured)}
              className="rounded-xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-card"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm text-[var(--text-secondary)]">
                    {p.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="inline-flex rounded-[4px] border border-[#BAE6FD] bg-[#F0F9FF] px-2 py-0.5 font-mono text-[11px] font-medium text-[#0369A1]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <CollapsibleTrigger
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "shrink-0 gap-1",
                  )}
                >
                  Details
                  <ChevronDown className="size-3.5" aria-hidden />
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="mt-5 border-t border-border pt-5">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {(
                    [
                      ["Problem", p.problem],
                      ["Approach", p.approach],
                      ["Stack", p.stack.join(" · ")],
                      ["Outcome", p.outcome],
                    ] as const
                  ).map(([label, body]) => (
                    <div key={label} className="rounded-lg border border-border bg-background p-4">
                      <p className="font-mono text-[11px] tracking-wide text-primary uppercase">
                        {label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {body}
                      </p>
                    </div>
                  ))}
                </div>

                {p.featured && p.diagram ? (
                  <div className="mt-5">
                    <p className="mb-3 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                      How it works
                    </p>
                    <Diagram id={p.diagram} />
                  </div>
                ) : null}

                {p.featured ? (
                  <div className="mt-5">
                    <Link
                      href={`/projects/${p.slug}`}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                    >
                      Full case study
                    </Link>
                  </div>
                ) : null}
              </CollapsibleContent>
            </Collapsible>
          </li>
        ))}
      </ul>
    </Section>
  );
}
