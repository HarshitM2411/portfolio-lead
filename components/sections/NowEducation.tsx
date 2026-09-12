import type { NowItem } from "@/lib/types";
import type { Education } from "@/lib/types";
import { formatRange } from "@/lib/format";
import { GraduationCap } from "lucide-react";
import { Container } from "@/components/layout/Container";

type NowEducationProps = {
  now: NowItem[];
  education: Education;
  showNow: boolean;
  showEducation: boolean;
};

export function NowEducationSection({
  now,
  education,
  showNow,
  showEducation,
}: NowEducationProps) {
  if (!showNow && !showEducation) return null;

  return (
    <section id="now" className="scroll-mt-20 py-6 md:scroll-mt-32 md:py-10">
      <Container>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-6">
          {showNow ? (
            <article className="relative space-y-1.5 overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-sky-50/60 via-white to-white p-4 shadow-bento md:space-y-4 md:rounded-3xl md:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 md:pb-3">
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wide text-sky-800 md:text-xs md:text-sky-700">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500" />
                  </span>
                  Now
                </span>
                <span className="font-mono text-[10px] text-slate-400">In progress</span>
              </div>
              <h3 className="hidden font-heading text-xl font-bold tracking-tight text-[#090D16] sm:block sm:text-2xl">
                What I&apos;m Exploring &amp; Prototyping
              </h3>
              {now.map((item) => (
                <p
                  key={item.text.slice(0, 32)}
                  className="text-xs leading-relaxed text-slate-600 md:text-sm"
                >
                  {item.text}
                </p>
              ))}
              <p className="hidden items-center gap-2 pt-2 font-mono text-xs text-slate-500 md:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
                Experimental / lab work
              </p>
            </article>
          ) : null}

          {showEducation ? (
            <article
              id="education"
              className="scroll-mt-24 space-y-1 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-bento backdrop-blur-md md:space-y-4 md:rounded-3xl md:p-8"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 md:pb-3">
                <span className="font-mono text-[10px] font-bold tracking-wide text-slate-500 md:text-xs">
                  Education
                </span>
                <GraduationCap className="hidden size-5 text-slate-400 md:block" aria-hidden />
                <span className="font-mono text-[10px] font-semibold text-[#2563EB] md:hidden">
                  {formatRange(education.start, education.end)}
                </span>
              </div>
              <div className="mt-1 space-y-1">
                <p className="text-sm font-bold tracking-tight text-[#090D16] md:text-2xl">
                  {education.school}
                </p>
                <p className="font-mono text-xs font-semibold text-[#2563EB] md:text-sm">
                  {education.degree} in {education.field}
                </p>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
                {education.location}
                {education.detail ? ` · ${education.detail}` : ""}
              </p>
              <p className="hidden items-center gap-2 pt-2 font-mono text-xs text-slate-500 md:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {formatRange(education.start, education.end)}
              </p>
            </article>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
