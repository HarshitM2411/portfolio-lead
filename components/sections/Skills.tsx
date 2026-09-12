import type { SkillCategory, SkillGroup } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

type SkillsSectionProps = {
  skills: SkillGroup[];
};

const labels: Record<SkillCategory, string> = {
  Languages: "[ LANG: PRIMARY_SYNTAX ]",
  Backend: "[ BACKEND: RUNTIMES & PROTOCOLS ]",
  Frontend: "[ CLIENT: INTERFACES ]",
  Databases: "[ STORAGE: PERSISTENCE & CACHE ]",
  "AI/LLM": "[ AI / LLM: AGENTIC & RAG ]",
  "Cloud & DevOps": "[ CLOUD & DEVOPS: TOPOLOGY ]",
  "Observability & Testing": "[ OBSERVABILITY & TESTING ]",
  Practices: "[ PRACTICES: GOVERNANCE ]",
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  const total = skills.reduce((n, g) => n + g.items.length, 0);
  const ordered = [...skills].sort((a, b) => {
    if (a.category === "AI/LLM") return -1;
    if (b.category === "AI/LLM") return 1;
    return 0;
  });

  return (
    <Section
      id="skills"
      index="[04_STACK_INDEX]"
      title="Technical Stack & Architectural Arsenal"
      meta={`TOTAL COMPONENT MODULES: ${String(total).padStart(2, "0")}`}
      className="py-8 md:py-14"
    >
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {ordered.map((group) => {
          const featured = group.category === "AI/LLM";
          return (
            <article
              key={group.category}
              className={cn(
                "space-y-2 rounded-2xl p-3.5 shadow-bento md:space-y-4 md:p-6",
                featured
                  ? "relative border-2 border-sky-400 bg-gradient-to-br from-sky-50/90 via-white to-indigo-50/40"
                  : "border border-slate-200/80 bg-white/90 backdrop-blur-md transition-all hover:border-slate-300",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-between border-b pb-2 font-mono text-[10px] font-bold md:pb-2.5 md:text-xs",
                  featured
                    ? "border-sky-200 text-sky-900"
                    : "border-slate-100 text-sky-700",
                )}
              >
                <span>{labels[group.category]}</span>
                {featured ? (
                  <span className="rounded-full border border-sky-300 bg-sky-100 px-2 py-0.5 text-[9px] font-bold text-sky-700 md:px-2.5 md:text-[10px]">
                    CORE FOCUS
                  </span>
                ) : (
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-400">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "rounded-lg border px-2.5 py-1 font-mono text-[11px] transition-all md:px-3 md:text-xs",
                      featured
                        ? "border-sky-200 bg-white font-medium text-slate-800 shadow-sm"
                        : "border-slate-200/80 bg-slate-50 text-slate-600 hover:border-sky-400 hover:text-[#090D16]",
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
