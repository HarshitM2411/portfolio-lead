import type { NowItem } from "@/lib/types";
import type { Education } from "@/lib/types";
import { Section } from "@/components/layout/Section";

type NowEducationProps = {
  now: NowItem[];
  education: Education;
  showNow: boolean;
  showEducation: boolean;
};

/** Combined exploring + education row matching design mocks. */
export function NowEducationSection({
  now,
  education,
  showNow,
  showEducation,
}: NowEducationProps) {
  if (!showNow && !showEducation) return null;

  return (
    <Section id="now" index="08 // Growth" title="Exploring & education">
      <div className="grid gap-4 md:grid-cols-2">
        {showNow ? (
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <h3 className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              What I&apos;m exploring
            </h3>
            <ul className="mt-3 space-y-2">
              {now.map((item) => (
                <li
                  key={item.text.slice(0, 32)}
                  className="text-sm leading-relaxed text-[var(--text-secondary)]"
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {showEducation ? (
          <div
            id="education"
            className="scroll-mt-24 rounded-xl border border-border bg-card p-5 shadow-soft"
          >
            <h3 className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              Education
            </h3>
            <p className="mt-3 text-base font-semibold text-foreground">
              {education.school}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {education.degree} in {education.field} · {education.location}
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              Aug 2016 – June 2020
              {education.detail ? ` · ${education.detail}` : ""}
            </p>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
