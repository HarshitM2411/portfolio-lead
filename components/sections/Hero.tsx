import type { Education } from "@/lib/types";
import type { SiteConfig } from "@/lib/types";
import { Container } from "@/components/layout/Container";
import { ArrowUpRight, FileText, GraduationCap, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  site: SiteConfig;
  education?: Education;
  engineersLed?: string;
  years?: string;
  currentCompany?: string;
};

export function HeroSection({
  site,
  education,
  engineersLed = "9",
  years = "6+",
  currentCompany,
}: HeroSectionProps) {
  const titleParts = site.title.split("|").map((p) => p.trim());
  const role = titleParts[0] ?? "Lead Software Engineer";
  const specialty = titleParts[1] ?? "AI/LLM & Agentic Systems";

  return (
    <section id="overview" className="scroll-mt-20 pt-4 pb-8 md:scroll-mt-32 md:pt-4 md:pb-14">
      <Container>
        <div className="grid grid-cols-1 items-start gap-3.5 lg:grid-cols-12 lg:gap-6">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-bento backdrop-blur-xl sm:p-10 lg:col-span-8">
            <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-bl from-sky-400/20 via-indigo-400/10 to-transparent blur-xl md:-top-24 md:-right-24 md:h-72 md:w-72 md:blur-2xl" />
            <div className="relative z-10 space-y-4 md:space-y-6">
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2.5">
                <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-white shadow-sm md:px-3 md:py-1 md:text-xs">
                  {role}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-sky-800 md:gap-1.5 md:px-3 md:py-1 md:text-xs">
                  {specialty}
                </span>
                <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-[10px] text-indigo-700 md:px-2.5 md:py-1 md:text-xs">
                  {years} years
                </span>
              </div>

              <div className="space-y-1.5 md:space-y-3">
                <h1 className="font-heading text-3xl leading-tight font-extrabold tracking-tight text-[#090D16] sm:text-6xl sm:leading-[1.08]">
                  {site.name}
                </h1>
                <p className="max-w-2xl text-[13.5px] leading-relaxed text-slate-600 md:text-lg md:leading-relaxed lg:text-xl">
                  {highlightYears(site.tagline, years)}
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-1 md:flex-row md:flex-wrap md:items-center md:gap-3 md:pt-2">
                <a href={site.resumePath} className={heroCtaClass}>
                  <FileText className="size-4" aria-hidden />
                  View resume
                </a>
                <a href="#contact" className={heroCtaClass}>
                  <Mail className="size-4" aria-hidden />
                  Contact me
                </a>
                <div className="grid grid-cols-3 gap-1.5 md:flex md:items-center md:gap-1.5 md:rounded-xl md:border md:border-slate-200 md:bg-slate-100/90 md:p-1">
                  <HeroLink href={`mailto:${site.email}`} label="Email" icon={Mail} />
                  <HeroLink href={site.socials.github} label="GitHub" external />
                  <HeroLink href={site.socials.linkedin} label="LinkedIn" external />
                </div>
              </div>

              <div className="hidden flex-wrap items-center gap-4 border-t border-slate-100 pt-4 font-mono text-xs text-slate-500 md:flex">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  {engineersLed}-Engineer Pod Lead{currentCompany ? ` @ ${currentCompany}` : ""}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  100K+ users on MyAI
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  Multi-Agent RAG Orchestration
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 lg:col-span-4 lg:space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-bento backdrop-blur-md md:rounded-3xl md:p-6 md:backdrop-blur-xl">
              <div className="grid grid-cols-1 gap-2 font-mono text-[11px] md:gap-3 md:text-xs">
                <RadarRow
                  label="Current role"
                  value={currentCompany ? currentCompany : "Lead role"}
                  valueClass="text-[#2563EB]"
                />
                <RadarRow label="Location" value={site.location} />
              </div>
            </div>

            {education ? (
              <div className="relative hidden overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-bento lg:block">
                <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-sky-500/20 blur-xl" />
                <div className="mb-2 flex items-center justify-between font-mono text-xs text-slate-400">
                  <span>DTU alumnus · 2016–2020</span>
                  <GraduationCap className="size-4 text-sky-400" aria-hidden />
                </div>
                <p className="mb-1 text-sm font-bold text-slate-100">{education.school}</p>
                <p className="mb-2 font-mono text-xs text-sky-300">
                  {education.degree} in {education.field}
                </p>
                <p className="text-xs leading-relaxed text-slate-400">
                  {education.detail ? `${education.detail}. ` : ""}
                  Foundations in distributed computing, systems architecture, and algorithms.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

const heroCtaClass =
  "cta-gradient inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-bold tracking-wide text-white shadow-sm transition-all hover:opacity-95 hover:shadow-lg hover:shadow-sky-500/25 active:scale-[0.98] md:w-auto md:px-5 md:py-3";

function highlightYears(tagline: string, years: string) {
  const needle = `${years} years`;
  const idx = tagline.toLowerCase().indexOf(needle.toLowerCase());
  if (idx === -1) return tagline;
  return (
    <>
      {tagline.slice(0, idx)}
      <span className="font-semibold text-[#090D16] underline decoration-sky-300 decoration-2 underline-offset-4">
        {tagline.slice(idx, idx + needle.length)}
      </span>
      {tagline.slice(idx + needle.length)}
    </>
  );
}

function HeroLink({
  href,
  label,
  icon: Icon,
  external,
}: {
  href: string;
  label: string;
  icon?: typeof Mail;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 font-mono text-[11px] font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:bg-white hover:text-[#2563EB]",
        "md:rounded-lg md:border-0 md:bg-white md:px-3 md:py-2 md:text-xs md:font-normal md:text-slate-600",
      )}
    >
      {Icon ? <Icon className="size-3.5 text-sky-600 md:hidden" aria-hidden /> : null}
      <span>{label}</span>
      {external ? (
        <ArrowUpRight className="hidden size-3.5 text-slate-400 md:inline" aria-hidden />
      ) : null}
    </a>
  );
}

function RadarRow({
  label,
  value,
  className,
  valueClass,
}: {
  label: string;
  value: string;
  className?: string;
  valueClass?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-1.5 md:rounded-xl md:p-2",
        className,
      )}
    >
      <span className="text-slate-500">{label}:</span>
      <span className={cn("font-bold text-[#090D16]", valueClass)}>{value}</span>
    </div>
  );
}
