import type { Leadership } from "@/lib/types";
import { ShieldCheck } from "lucide-react";

type LeadershipSectionProps = {
  leadership: Leadership;
};

export function LeadershipSection({ leadership }: LeadershipSectionProps) {
  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-4 text-white shadow-bento sm:p-8"
    >
      <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full border border-sky-500/20" />
      <div className="relative z-10 space-y-4 md:space-y-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wide text-sky-400">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-500/20 text-sky-300">
              <ShieldCheck className="size-4" aria-hidden />
            </span>
            Leadership
          </div>
          <span className="rounded-full border border-sky-400/30 bg-sky-500/20 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wide text-sky-300">
            Active lead
          </span>
        </div>
        <h3
          id="leadership-heading"
          className="font-heading text-xl font-bold tracking-tight text-white md:text-2xl"
        >
          {leadership.headline}
        </h3>
        <p className="text-xs leading-relaxed text-slate-300 md:text-sm">
          {leadership.body}
        </p>
        <div className="space-y-1.5 border-t border-slate-800 pt-3 font-mono text-[11px] text-slate-300 md:text-xs">
          <p className="flex items-start gap-2.5">
            <span className="font-bold text-sky-400">&gt;</span>
            Sprint planning, system design reviews, and code ownership
          </p>
          <p className="flex items-start gap-2.5">
            <span className="font-bold text-sky-400">&gt;</span>
            Mentorship across a 9-engineer pod and prior junior cohort
          </p>
          <p className="hidden items-start gap-2.5 md:flex">
            <span className="font-bold text-sky-400">&gt;</span>
            End-to-end delivery of enterprise platforms
          </p>
        </div>
      </div>
      <div className="relative z-10 mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 font-mono text-[10px] text-slate-400 md:mt-6 md:pt-4 md:text-xs">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Air India · 9-engineer pod
        </span>
        <span className="font-semibold text-sky-400">2025 — PRESENT</span>
      </div>
    </section>
  );
}
