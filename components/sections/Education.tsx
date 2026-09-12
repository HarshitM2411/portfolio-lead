import type { Education } from "@/lib/types";
import { Section } from "@/components/layout/Section";

type EducationSectionProps = {
  education: Education;
};

/** Phase 3 stub — Phase 6 polish. */
export function EducationSection({ education }: EducationSectionProps) {
  return (
    <Section id="education" index="09 // Education" title="Education">
      <div className="rounded-xl border border-border bg-card p-5 shadow-soft md:max-w-xl">
        <h3 className="font-semibold text-foreground">{education.school}</h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          {education.degree} in {education.field}
        </p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {education.start} – {education.end}
          {education.detail ? ` · ${education.detail}` : ""}
        </p>
      </div>
    </Section>
  );
}
