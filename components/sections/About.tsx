import { Section } from "@/components/layout/Section";

type AboutSectionProps = {
  paragraphs: string[];
  embedded?: boolean;
};

export function AboutSection({ paragraphs, embedded = false }: AboutSectionProps) {
  const card = (
    <div className="flex h-full flex-col justify-between space-y-6 rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-bento backdrop-blur-xl sm:p-9">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
              <span className="font-mono text-xs font-semibold tracking-wider text-[#2563EB] uppercase">
                [01_PERSPECTIVE]
              </span>
            </div>
            <h2
              id="about-heading"
              className="font-heading text-2xl font-bold tracking-tight text-[#090D16] sm:text-3xl"
            >
              Distributed Backbone to Autonomous Agent Execution
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 md:text-base">
            {paragraphs.map((p, i) => (
              <p key={p.slice(0, 24)}>
                {i === 0 ? emphasizePhrase(p, "agentic") : p}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 border-t border-slate-100 pt-4 font-mono text-xs">
          <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            PATTERNS: EVENT-DRIVEN
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
            <span className="h-2 w-2 rounded-full bg-indigo-600" />
            PARADIGM: AGENTIC MULTI-NODE
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 font-semibold text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            SCOPE: 100K+ USERS
          </span>
        </div>
      </div>
  );

  if (embedded) return card;

  return (
    <Section id="about" hideHeader className="py-6 md:py-10">
      {card}
    </Section>
  );
}

function emphasizePhrase(text: string, needle: string) {
  const idx = text.toLowerCase().indexOf(needle);
  if (idx === -1) return text;
  const end = text.indexOf(" ", idx);
  const stop = end === -1 ? idx + needle.length : Math.min(end + 12, text.length);
  return (
    <>
      {text.slice(0, idx)}
      <span className="rounded border border-sky-100 bg-sky-50 px-1.5 py-0.5 font-bold text-[#090D16]">
        {text.slice(idx, stop)}
      </span>
      {text.slice(stop)}
    </>
  );
}
