/** Static architecture diagram — fully legible without JS/motion. */
export function RagMatchingDiagram() {
  const stages = [
    { title: "Chunk & embed", detail: "Resume pipelines · sentence-transformers" },
    { title: "Hybrid filter", detail: "Skills + semantic retrieval · ChromaDB" },
    { title: "LLM reason", detail: "Match explanations over JDs · Groq" },
  ];

  return (
    <figure
      aria-label="RAG-based profile matching stages"
      className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white md:p-6"
    >
      <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-[10px] text-slate-400 md:text-[11px]">
        <span className="font-semibold tracking-wider text-sky-400 uppercase">
          TOPOLOGY: HYBRID RAG RETRIEVAL
        </span>
        <span className="text-emerald-400">FLOW: GROUNDED</span>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {stages.map((stage, i) => (
          <div
            key={stage.title}
            className="rounded-xl border border-slate-700 bg-slate-800/90 p-4"
          >
            <p className="font-mono text-[11px] text-sky-400">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h4 className="mt-2 text-sm font-semibold text-white">{stage.title}</h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{stage.detail}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] text-slate-500">
        Chunking → hybrid retrieval → grounded LLM match reasoning
      </figcaption>
    </figure>
  );
}
