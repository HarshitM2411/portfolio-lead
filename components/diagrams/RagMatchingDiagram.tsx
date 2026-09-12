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
      className="rounded-xl border border-border bg-background p-4 md:p-6"
    >
      <div className="grid gap-3 md:grid-cols-3">
        {stages.map((stage, i) => (
          <div
            key={stage.title}
            className="relative rounded-lg border border-border bg-card p-4 shadow-soft"
          >
            <p className="font-mono text-[11px] text-primary">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h4 className="mt-2 text-sm font-semibold text-foreground">
              {stage.title}
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {stage.detail}
            </p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] text-muted-foreground">
        Chunking → hybrid retrieval → grounded LLM match reasoning
      </figcaption>
    </figure>
  );
}
