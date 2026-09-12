"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/layout/Section";
import type { Experience } from "@/lib/types";

type ExperienceSectionProps = {
  experience: Experience[];
};

function formatRange(start: string, end: string) {
  const fmt = (iso: string) => {
    if (iso === "Present") return "Present";
    const [y, m] = iso.split("-");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[Number(m) - 1]} ${y}`;
  };
  return `${fmt(start)} – ${fmt(end)}`;
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <Section id="experience" index="05 // Experience" title="Career timeline">
      <Accordion className="relative space-y-0 border-l border-border pl-6">
        {experience.map((job) => (
          <AccordionItem
            key={job.id}
            value={job.id}
            className="relative border-b-0 not-last:mb-6"
          >
            <span
              aria-hidden
              className="absolute top-3 -left-[1.625rem] size-2.5 rounded-full border-2 border-primary bg-background"
            />
            <AccordionTrigger className="items-start py-2 hover:no-underline">
              <div className="flex w-full flex-col gap-1 pr-4 text-left sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <span className="block text-base font-semibold text-foreground">
                    {job.role}
                  </span>
                  <span className="block text-sm text-[var(--text-secondary)]">
                    {job.company} · {job.location}
                  </span>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {formatRange(job.start, job.end)}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="mt-1 list-disc space-y-2 pl-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                {job.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 48)}>{bullet}</li>
                ))}
              </ul>
              {job.stack?.length ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.stack.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
