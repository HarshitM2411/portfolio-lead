import type { Metric } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { Sparkline } from "@/components/ui/sparkline";
import { cn } from "@/lib/utils";
import { Activity, Brain, Gauge, TrendingDown, Users } from "lucide-react";

type MetricsSectionProps = {
  metrics: Metric[];
};

const meta: Record<
  string,
  {
    kicker: string;
    icon: typeof Gauge;
    variant: "plain" | "hero" | "wide";
    spark?: "up" | "down";
    hover: string;
    badge?: string;
  }
> = {
  users: {
    kicker: "CONCURRENT SCALE",
    icon: Gauge,
    variant: "plain",
    spark: "up",
    hover: "hover:border-sky-300",
    badge: "PEAK",
  },
  team: {
    kicker: "LEAD SCOPE & GOVERNANCE",
    icon: Users,
    variant: "hero",
    hover: "",
    badge: "ACTIVE LEAD",
  },
  "shipping-cost": {
    kicker: "INFRA COST EFFICIENCY",
    icon: TrendingDown,
    variant: "plain",
    spark: "down",
    hover: "hover:border-emerald-300",
    badge: "REDUCTION",
  },
  plans: {
    kicker: "AI PIPELINE VOLUME",
    icon: Brain,
    variant: "wide",
    hover: "hover:border-sky-300",
  },
  datapoints: {
    kicker: "REAL-TIME DATA THROUGHPUT",
    icon: Activity,
    variant: "wide",
    hover: "hover:border-indigo-300",
  },
};

export function MetricsSection({ metrics }: MetricsSectionProps) {
  const tiles = metrics.filter((m) => m.id !== "years");

  return (
    <Section id="metrics" hideHeader className="py-4 md:py-8">
      <div className="mb-2.5 flex items-center justify-between px-0.5 font-mono text-[11px] text-slate-500 uppercase md:mb-5 md:text-xs">
        <div className="flex items-center gap-2">
          <Activity className="hidden size-4 text-sky-600 md:inline" aria-hidden />
          <span className="font-bold tracking-wider text-slate-500 md:font-semibold md:text-[#090D16]">
            // AGGREGATED RUNTIME TELEMETRY
          </span>
        </div>
        <span className="flex items-center gap-1 font-semibold text-sky-600 md:text-[11px] md:text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500 md:hidden" />
          AUDITED PRODUCTION METRICS
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
        {tiles.map((m) => {
          const conf = meta[m.id] ?? {
            kicker: m.label,
            icon: Gauge,
            variant: "plain" as const,
            hover: "hover:border-sky-300",
          };
          const Icon = conf.icon;
          const hero = conf.variant === "hero";
          const wide = conf.variant === "wide";

          return (
            <article
              key={m.id}
              className={cn(
                "hover-lift group flex flex-col justify-between rounded-2xl p-3.5 shadow-bento md:p-6",
                hero
                  ? "relative overflow-hidden bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white"
                  : "border border-slate-200/80 bg-white/90 backdrop-blur-md",
                conf.hover,
                wide ? "col-span-2 lg:col-span-6" : "lg:col-span-4",
              )}
            >
              {hero ? (
                <div className="pointer-events-none absolute -right-8 -bottom-8 h-44 w-44 rounded-full bg-white/10 blur-xl transition-transform duration-700 group-hover:scale-125" />
              ) : null}
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-mono text-[10px] font-semibold tracking-wider uppercase md:text-[11px]",
                      hero ? "font-bold text-sky-100" : "text-slate-500",
                    )}
                  >
                    {conf.kicker}
                  </span>
                  {hero ? (
                    <span className="rounded-full bg-white/20 px-1.5 py-0.5 font-mono text-[9px] font-bold backdrop-blur-md md:px-2.5 md:py-1 md:text-[10px]">
                      {conf.badge}
                    </span>
                  ) : (
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-lg",
                        m.id === "shipping-cost"
                          ? "bg-emerald-50 text-emerald-600"
                          : m.id === "datapoints"
                            ? "text-indigo-600"
                            : "bg-sky-50 text-sky-600",
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                    </span>
                  )}
                </div>
                <div className="my-1.5 flex items-baseline gap-2 md:my-4">
                  <p
                    className={cn(
                      "font-mono text-2xl font-extrabold tracking-tight font-tabular md:text-4xl",
                      hero
                        ? "text-3xl text-white md:text-5xl"
                        : m.id === "shipping-cost"
                          ? "text-emerald-600"
                          : "text-[#090D16] group-hover:text-[#2563EB]",
                    )}
                  >
                    {m.value}
                    {m.id === "team" ? (
                      <span className="ml-1 text-sm font-semibold text-sky-100 md:hidden">
                        ENG
                      </span>
                    ) : null}
                  </p>
                  {conf.badge && !hero ? (
                    <span className="hidden rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-600 md:inline">
                      {conf.badge}
                    </span>
                  ) : null}
                  {m.id === "team" ? (
                    <span className="hidden text-sm font-semibold text-sky-100 md:inline">
                      Engineers in Pod
                    </span>
                  ) : null}
                </div>
                <p
                  className={cn(
                    "text-[11px] font-medium md:text-xs md:leading-relaxed",
                    hero ? "text-sky-100" : "text-slate-600",
                  )}
                >
                  {m.label}
                </p>
              </div>
              {conf.spark ? (
                <div className="mt-1 h-5 w-full overflow-hidden opacity-75 transition-opacity group-hover:opacity-100 md:mt-3 md:mb-0 md:h-8">
                  <Sparkline trend={conf.spark} className="h-full w-full" />
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
