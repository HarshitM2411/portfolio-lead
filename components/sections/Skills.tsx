import type { SkillGroup } from "@/lib/types";
import { Section } from "@/components/layout/Section";

type SkillsSectionProps = {
  skills: SkillGroup[];
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Section id="skills" index="06 // Stack" title="Technical skills">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-border bg-card p-5 shadow-soft"
          >
            <h3 className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              {group.category}
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex max-w-full rounded-[4px] border border-[#BAE6FD] bg-[#F0F9FF] px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide text-[#0369A1]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
