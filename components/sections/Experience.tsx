"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/layout/Section";
import { formatRange } from "@/lib/format";
import type { Experience } from "@/lib/types";
import { cn } from "@/lib/utils";

type ExperienceSectionProps = {
  experience: Experience[];
};

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const first = experience[0];
  const last = experience[experience.length - 1];
  const trace =
    first && last
      ? `TRACE: ${last.start.slice(0, 4)} → PRESENT`
      : "TRACE: CAREER";

  return (
    <Section
      id="experience"
      index="[02_CAREER_TRACK]"
      title="Engineering & Systems Timeline"
      meta={trace}
      className="py-8 md:py-16"
    >
      <div className="relative space-y-3.5 pl-5 sm:pl-10 md:space-y-8">
        <div className="absolute top-3 bottom-3 left-2 w-[2px] bg-gradient-to-b from-sky-500 via-indigo-400 to-slate-200 sm:top-4 sm:bottom-4 sm:left-4 sm:w-0.5" />
        {experience.map((job, i) => {
          const current = i === 0;
          return (
            <article key={job.id} className="group relative">
              <span
                aria-hidden
                className={cn(
                  "absolute top-3.5 -left-5 h-3 w-3 rounded-full shadow-sm sm:top-5 sm:-left-10 sm:h-5 sm:w-5 sm:border-4 sm:bg-white",
                  current
                    ? "bg-sky-600 ring-4 ring-sky-100 sm:border-sky-500 sm:ring-4 sm:ring-sky-100"
                    : "bg-slate-300 ring-4 ring-white sm:border-slate-300",
                )}
              />
              <div
                className={cn(
                  "rounded-2xl border bg-white/95 p-3.5 shadow-bento backdrop-blur-md transition-all duration-300 hover-lift sm:p-8",
                  current
                    ? "border-2 border-sky-400/80"
                    : "border-slate-200/80 hover:border-slate-300",
                )}
              >
                <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:pb-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h3 className="text-sm font-bold text-[#090D16] sm:text-2xl">
                      {job.company}
                    </h3>
                    {current ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 font-mono text-[10px] font-bold text-sky-700 uppercase sm:text-[11px]">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
                        CURRENT_STATION
                      </span>
                    ) : null}
                  </div>
                  <p className="font-mono text-[10px] font-medium text-slate-500 sm:text-xs">
                    {formatRange(job.start, job.end)} • {job.location.toUpperCase()}
                  </p>
                </div>
                <p
                  className={cn(
                    "mt-3 font-mono text-xs font-bold sm:mt-4 sm:text-base",
                    current ? "text-[#2563EB]" : "text-[#090D16]",
                  )}
                >
                  {job.role}
                </p>

                <div className="mt-2 hidden md:block">
                  <JobBullets bullets={job.bullets} current={current} />
                  <JobStack stack={job.stack} current={current} />
                </div>

                <Accordion className="md:hidden">
                  <AccordionItem value={job.id} className="border-0">
                    <AccordionTrigger className="py-1 font-mono text-[11px] font-semibold text-sky-700 hover:no-underline">
                      [+] VIEW ARCHITECTURE METRICS
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 rounded-xl border-t border-slate-100 bg-slate-50/90 p-2.5 text-xs text-slate-600">
                        <JobBullets bullets={job.bullets} current={current} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="md:hidden">
                  <JobStack stack={job.stack} current={current} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function JobBullets({
  bullets,
  current,
}: {
  bullets: string[];
  current: boolean;
}) {
  return (
    <ul className="mt-3 space-y-2 pl-1 text-sm leading-relaxed text-slate-600">
      {bullets.map((bullet) => (
        <li key={bullet.slice(0, 48)} className="flex items-start gap-2.5">
          <span
            className={cn(
              "mt-0.5 font-mono text-xs font-bold",
              current ? "text-sky-600" : "text-slate-400",
            )}
          >
            &gt;
          </span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

function JobStack({
  stack,
  current,
}: {
  stack?: string[];
  current: boolean;
}) {
  if (!stack?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-slate-100 pt-3 sm:mt-5 sm:gap-2 sm:pt-4">
      <span className="mr-1 hidden font-mono text-xs text-slate-400 uppercase sm:inline">
        TECH_SPECS:
      </span>
      {stack.map((t, i) => (
        <span
          key={t}
          className={cn(
            "rounded-lg bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-700 sm:px-2.5 sm:py-1 sm:text-xs",
            current && i === stack.length - 1 && "border border-sky-200 bg-sky-50 font-semibold text-sky-700",
          )}
        >
          {t}
        </span>
      ))}
    </div>
  );
}
