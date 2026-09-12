import type { Metric } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

type MetricsSectionProps = {
  metrics: Metric[];
};

/** Phase 3 stub — polish in Phase 4. */
export function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <Section id="metrics" index="02 // Impact" title="Impact metrics">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {metrics.map((m) => (
          <li
            key={m.id}
            className={cn(
              "rounded-xl border border-border bg-card p-4 shadow-soft",
              m.emphasize && "border-primary/40 ring-1 ring-primary/20",
            )}
          >
            <p
              className={cn(
                "font-mono text-2xl font-semibold font-tabular",
                m.emphasize ? "text-primary" : "text-foreground",
              )}
            >
              {m.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
