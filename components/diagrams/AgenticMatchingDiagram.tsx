/** Static architecture diagram — fully legible without JS/motion. */
export function AgenticMatchingDiagram() {
  const steps = [
    { id: "01", title: "Ingest", desc: "Resume + JD intake" },
    { id: "02", title: "Retrieve", desc: "Tool-calling retrieval" },
    { id: "03", title: "Reason", desc: "LangGraph agent steps" },
    { id: "04", title: "Rank", desc: "Structured outputs" },
    { id: "05", title: "Serve", desc: "MCP + React dashboard" },
  ];

  return (
    <figure
      aria-label="Agentic profile matching pipeline from ingest to dashboard"
      className="overflow-x-auto rounded-xl border border-border bg-background p-4 md:p-6"
    >
      <svg
        viewBox="0 0 900 160"
        className="mx-auto h-auto w-full min-w-[640px] max-w-4xl"
        role="img"
      >
        <title>Agentic Profile Matching flow</title>
        {steps.map((step, i) => {
          const x = 20 + i * 176;
          return (
            <g key={step.id}>
              {i < steps.length - 1 ? (
                <line
                  x1={x + 140}
                  y1={70}
                  x2={x + 168}
                  y2={70}
                  stroke="#0284C7"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />
              ) : null}
              <rect
                x={x}
                y={24}
                width={140}
                height={112}
                rx="8"
                fill="#FFFFFF"
                stroke="#E2E8F0"
              />
              <text
                x={x + 16}
                y={52}
                className="fill-[#0284C7]"
                style={{ fontFamily: "ui-monospace, monospace", fontSize: 12 }}
              >
                {step.id}
              </text>
              <text
                x={x + 16}
                y={78}
                className="fill-[#0F172A]"
                style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, fontWeight: 600 }}
              >
                {step.title}
              </text>
              <text
                x={x + 16}
                y={104}
                className="fill-[#64748B]"
                style={{ fontFamily: "system-ui, sans-serif", fontSize: 12 }}
              >
                {step.desc}
              </text>
            </g>
          );
        })}
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="#0284C7" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mt-3 text-center font-mono text-[11px] text-muted-foreground">
        Multi-step agentic workflow with tool calling, structured ranking, and MCP exposure
      </figcaption>
    </figure>
  );
}
