import { Section } from "@/components/layout/Section";

type AboutSectionProps = {
  paragraphs: string[];
};

export function AboutSection({ paragraphs }: AboutSectionProps) {
  return (
    <Section id="about" index="03 // About" title="From distributed systems to agentic AI">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-[var(--text-secondary)] lg:col-span-8">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <aside className="h-fit rounded-xl border border-border bg-card p-5 shadow-soft lg:col-span-4">
          <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            Pivot
          </p>
          <ol className="mt-3 space-y-3 font-mono text-xs text-[var(--text-secondary)]">
            <li>
              <span className="text-primary">01</span> Distributed MERN / Node on
              AWS
            </li>
            <li>
              <span className="text-primary">02</span> Workflow &amp; platform
              scale to 100K+
            </li>
            <li>
              <span className="text-primary">03</span> Production GenAI — agents,
              RAG, evals
            </li>
          </ol>
        </aside>
      </div>
    </Section>
  );
}
