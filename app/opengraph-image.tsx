import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          backgroundColor: "#FAFAFD",
          color: "#090D16",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#2563EB",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: -1.5 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 28, color: "#475569", maxWidth: 900 }}>
            {site.title}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 20, color: "#64748B" }}>
          Distributed systems · AI / LLM · Agentic workflows
        </div>
      </div>
    ),
    { ...size },
  );
}
