/** Static architecture diagram — fully legible without JS/motion. */
export function AgenticMatchingDiagram() {
  const stages = [
    { id: "01", title: "[Candidate Input]", detail: "Resume / Spec JSON", tag: "Schema Verified" },
    { id: "02", title: "[Embedding Node]", detail: "text-embedding pipeline", tag: "Dense Vector", accent: true },
    { id: "03", title: "[Vector Index]", detail: "HNSW nearest filter", tag: "Top-k Retrieve" },
    {
      id: "04",
      title: "[Agentic Evaluator]",
      detail: "LangGraph re-ranking chain",
      tag: "Deterministic Graph",
      hero: true,
    },
    { id: "05", title: "[Scored Matrix]", detail: "JSON confidence matrix", tag: "Ranked output", result: true },
  ];

  return (
    <figure
      aria-label="Agentic profile matching pipeline from ingest to scored matrix"
      className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-3.5 text-white shadow-inner md:p-6"
    >
      <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-[10px] text-slate-400 md:mb-4 md:pb-2 md:text-[11px]">
        <span className="font-semibold tracking-wider text-sky-400 uppercase">
          TOPOLOGY: ASYNCHRONOUS AGENTIC EVALUATION PIPELINE
        </span>
        <span className="hidden sm:inline">LANGGRAPH • VECTOR STORE • EVALUATOR</span>
      </div>

      {/* Mobile stacked flow */}
      <div className="flex flex-col items-center gap-1.5 py-1 font-mono md:hidden">
        {stages.map((stage, i) => (
          <div key={stage.id} className="flex w-full flex-col items-center gap-1.5">
            <div
              className={
                stage.hero
                  ? "flex w-full items-center justify-between rounded-xl border-2 border-sky-400 bg-gradient-to-r from-sky-900/90 to-blue-900 px-3 py-2 shadow-md shadow-sky-500/20"
                  : stage.result
                    ? "flex w-full items-center justify-between rounded-xl border border-teal-500/80 bg-slate-800/90 px-3 py-2"
                    : "flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2"
              }
            >
              <span className={`text-xs font-semibold ${stage.result ? "text-teal-300" : "text-white"}`}>
                {stage.title}
              </span>
              <span
                className={
                  stage.hero
                    ? "rounded bg-sky-600 px-2 py-0.5 text-[10px] font-bold text-sky-100"
                    : "rounded border border-sky-800 bg-sky-950 px-2 py-0.5 text-[10px] text-sky-300"
                }
              >
                {stage.tag}
              </span>
            </div>
            {i < stages.length - 1 ? (
              <span className="text-[10px] text-sky-400" aria-hidden>
                ↓
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {/* Desktop horizontal flow */}
      <div className="hidden min-w-0 items-center justify-between gap-2 overflow-x-auto py-3 font-mono md:flex">
        {stages.map((stage, i) => (
          <div key={stage.id} className="flex min-w-0 flex-1 items-center gap-2">
            <div
              className={
                stage.hero
                  ? "relative flex-1 scale-105 rounded-xl border-2 border-sky-400 bg-gradient-to-b from-sky-900/80 to-blue-950 p-4 text-center shadow-xl shadow-sky-500/20"
                  : stage.result
                    ? "flex-1 rounded-xl border border-teal-500/70 bg-slate-800/90 p-4 text-center shadow-lg"
                    : "flex-1 rounded-xl border border-slate-700/80 bg-slate-800/90 p-4 text-center shadow-lg transition-colors hover:border-sky-400"
              }
            >
              <div
                className={
                  stage.hero
                    ? "flex items-center justify-center gap-1 text-[10px] font-bold text-sky-300 uppercase"
                    : stage.accent
                      ? "text-[10px] font-semibold text-sky-400 uppercase"
                      : stage.result
                        ? "text-[10px] font-semibold text-teal-400 uppercase"
                        : "text-[10px] font-semibold text-slate-400 uppercase"
                }
              >
                {stage.hero ? (
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
                ) : null}
                STAGE {stage.id}
                {stage.hero ? " :: LLM AGENT" : ""}
              </div>
              <div className={`mt-1 text-xs font-bold ${stage.result ? "text-teal-300" : "text-white"}`}>
                {stage.title}
              </div>
              <div className="mt-0.5 text-[11px] text-slate-400">{stage.detail}</div>
              <div
                className={
                  stage.hero
                    ? "mt-2 inline-block rounded bg-sky-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-sm"
                    : stage.result
                      ? "mt-2 inline-block rounded border border-teal-700 bg-teal-950 px-2 py-0.5 text-[9px] font-bold text-teal-300"
                      : "mt-2 inline-block rounded bg-slate-700 px-2 py-0.5 text-[9px] text-slate-300"
                }
              >
                {stage.tag}
              </div>
            </div>
            {i < stages.length - 1 ? (
              <div className="flex flex-col items-center px-1 text-sky-400">
                <span className="text-xs">▶</span>
                <span className="text-[9px] text-slate-500">flow</span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-center font-mono text-[10px] text-slate-500 md:mt-3 md:text-[11px]">
        Multi-step agentic workflow with retrieval, evaluation, and ranked structured output
      </figcaption>
    </figure>
  );
}
