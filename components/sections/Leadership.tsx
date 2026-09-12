import type { Leadership } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { Users } from "lucide-react";

type LeadershipSectionProps = {
  leadership: Leadership;
};

export function LeadershipSection({ leadership }: LeadershipSectionProps) {
  return (
    <Section id="leadership" index="04 // Leadership" title="Leadership">
      <div className="flex gap-4 rounded-xl border border-primary/25 bg-card p-6 shadow-soft md:max-w-3xl">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Users className="size-5" aria-hidden />
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {leadership.headline}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {leadership.body}
          </p>
        </div>
      </div>
    </Section>
  );
}
