# Design Prompt — Harshit Meena Portfolio ("Systems Engineer" direction)

Use this prompt as-is with Google Stitch to generate the portfolio UI.

Aligned with `docs/problemstatement.md`: skimmable for a 60–90s recruiter scan, deep enough for an engineering lead, frontend-only / static-friendly.

---

## Prompt

Design a personal portfolio website for **Harshit Meena**, Lead Software Engineer specializing in MERN, distributed systems, and applied AI/LLM & agentic systems. The audience is hiring managers, recruiters, and engineering leads. The design should feel like **infrastructure clarity** — the visual language of observability dashboards and architecture diagrams — not a generic creative portfolio. Precision, restraint, and systems-thinking should come through in the layout itself, not decoration.

**Success bar for the first viewport + early scroll:** within ~90 seconds a hiring manager should be able to state what he does, years of experience, stack signal, one standout project, and how to contact him. Hierarchy and CTA weight must make that scan effortless; depth lives further down for technical readers.

### Visual Direction: "Systems Engineer"

**Color palette**
- Background: `#0E1116` (near-black, slightly blue-tinted, not pure black)
- Primary text: `#F4F5F7`
- Secondary text / borders / dividers: `#8A93A3`
- Accent (single, used sparingly): `#4FA3D1` — a calm signal-blue like a healthy status indicator. Use only for: active nav state, hover on links, one highlighted metric, connector nodes on the timeline/diagrams, primary CTA outline/fill as needed for contrast.
- No decorative gradients. No secondary accent colors. No drop shadows — use `1px` hairline borders instead of shadows to separate surfaces.
- Atmosphere without breaking restraint: a subtle grid, blueprint, or noise texture on the background is allowed so the page does not feel like a flat void. Keep it quiet — never compete with content.

**Typography**
- One distinctive grotesk sans-serif for all headings and body copy (e.g. IBM Plex Sans, Geist, or Space Grotesk — not Inter, Roboto, Arial, or system defaults), with a deliberate type scale of at least 5 distinct sizes and clear hierarchy.
- A monospace face (e.g. JetBrains Mono or IBM Plex Mono) reserved ONLY for genuinely technical labels: dates, stack/tech tags, metrics, section index numbers. Never used for headlines or body prose.
- Body line length under ~75 characters. Generous line-height on body text.

**Layout**
- Asymmetric panel grid, not centered single-column blocks. Sections should feel like connected system components.
- Use `1px` hairline borders to group content, not rounded cards with shadows. Border-radius should be minimal (0–4px) and consistent, only where it serves a purpose.
- Experience section: rendered as a literal vertical timeline with a connecting line and small connector nodes at each role (like a process/status timeline), not a stacked list of paragraphs.
- AI/LLM project case studies: rendered as connected blocks — Problem → Approach/Architecture → Stack → Outcome — visually linked like a flow/system diagram, not plain bullet text. For the top 1–2 projects, include space for a static architecture / “how it works” diagram panel (legible without animation).
- One deliberate motion moment on page load (e.g. the timeline line drawing itself in). No scroll-triggered fade-ins on every section, no hover animation on every card — motion should be rare and purposeful. Provide a static fallback when `prefers-reduced-motion` is set.

**What to avoid**
- No warm cream background with terracotta/serif combo.
- No purple-on-white / purple-to-indigo SaaS look.
- No generic SaaS card kit (identical rounded cards with soft grey shadows).
- No tracked-out ALL-CAPS eyebrow labels above every heading.
- No middle-dot-separated meta strings, no spaced-em-dash labels, no arrow (→) appended to every link/button.
- Avoid a literal terminal/hacker aesthetic (blinking cursor, green-on-black) — this should read as senior/credible, not gimmicky.
- No cards in the hero. Prefer hairline panels over card chrome everywhere else; cards only where expand/collapse interaction needs a clear container.

### Explicit product decisions (do not leave open in the UI)

| Decision | Choice for this design |
|---|---|
| Primary hero CTA | **View Resume** (downloads static PDF). Contact is secondary (link or quieter button). GitHub / LinkedIn are icon/text links, not competing CTAs. |
| Color mode | **Dark only** for v1. Do not design a light-mode toggle or half-finished light variant. |
| Contact | Design a contact block with email + a simple form region meant for a static third-party embed (Formspree / Getform / EmailJS). Include success/error states that a third-party form can drive. Also show a `mailto:` fallback link. Do not imply a custom backend. |
| Phone | **Hidden by default** — click-to-reveal or omit from the default footer. Never show a raw number in plain text at rest. |
| Resume | Static PDF download from `/public` (affordance labeled clearly as Download / View Resume). Do not design an in-page “fake resume” as the primary download path. Optional separate `/resume` print-friendly layout is a bonus deliverable (see below). |
| Empty sections | Blog, Testimonials, Open Source / Certifications: **do not render** when empty. Design the component pattern so they can appear later without leaving gaps; optional quiet “coming soon” only if explicitly needed for a wireframe — default is hide. |

### Pages / Sections to Design (suggested order for scan → depth)

1. **Hero** — Brand-first: **Harshit Meena** as the dominant name signal. Title exactly: `Lead Software Engineer | AI/LLM & Agentic Systems`. One-sentence value proposition (6+ years: distributed systems → AI/LLM/agentic). ONE primary CTA: **View Resume**. Secondary: Contact link + quiet GitHub / LinkedIn. First viewport budget: name, title, one sentence, CTA group, optional quiet atmospheric plane — no stats strip, no project list, no address block in the hero.
2. **Impact metrics strip** — Immediately after hero (or tightly under it) so numbers are not buried in experience bullets. Scannable row/grid of 4–6 standout figures (e.g. “100K users scaled”, “9 engineers led”, “~25–40% efficiency/cost gains”, “200K+ plans”, “1M+ data points”). Dashboard-like: thin borders, monospace numerals, plain-language labels. One metric may use the accent color.
3. **About / Summary** — Short narrative: distributed systems → AI/LLM/agentic pivot. Generous whitespace, no card chrome.
4. **Leadership / mentorship callout** — Its own visible moment (not only a buried Air India bullet): leading a team of ~9, mentoring juniors. Compact panel — one headline + one short supporting line — so Lead-level scope is obvious on a fast scan.
5. **Experience timeline** — Vertical connected timeline: Air India, UniCommerce, Edfora (FIITJEE), Wingify. Each entry: role, dates, location, expandable/collapsible 2–4 impact bullets. Must tolerate uneven bullet counts without looking broken.
6. **Technical skills** — Grouped exactly: Languages, Backend, Frontend, Databases, AI/LLM, Cloud & DevOps, Observability & Testing, Practices. Bordered tag chips under monospace category labels (icon grid or tag clusters — not a plain paragraph list).
7. **AI/LLM project case studies** — Agentic Profile Matching, RAG-Based Profile Matching, Resume Analyser. Each: Problem → Approach/Architecture → Stack → Outcome. Compact vs expanded states. For at least the top 1–2 projects, include a dedicated static architecture / “how it works” diagram area (nodes + connectors, hairline style) that remains fully legible without JS/motion.
8. **Now / Currently exploring** — One short panel (1–2 lines) on what he is learning or building now. Low visual weight; signals active growth.
9. **GitHub presence (optional panel)** — Beyond footer links: a quiet module for pinned repos and/or a contribution-graph embed placeholder (frontend-only / public API or widget). If omitted at launch, same hide-when-empty rule as other future sections.
10. **Education** — Minimal: DTU, B.Tech IT, CGPA. Single line or light panel.
11. **Contact / footer** — Email, resume download, GitHub, LinkedIn, location. Form embed placeholder + `mailto:` fallback. Phone only via click-to-reveal if included. Optional quiet slots for future Blog / Testimonials / Certifications — not shown empty.

### Optional / future-ready (design the pattern, not empty UI)

- **Testimonials** — Short quote block (manager/peer) when content exists.
- **Blog index** — List/detail pattern suitable for later MDX posts; hide entirely at launch if empty.
- **Open Source / Certifications** — Same conditional visibility.
- **Print-friendly `/resume`** — Clean, light-on-content layout optimized for print (complement PDF download), same identity, minimal chrome.

### Responsive Requirements
- Mobile-first: clean from ~360px through desktop (1440px+).
- On mobile, asymmetric panel grid collapses to a single clear column while preserving hairline borders and connected-node language (same aesthetic, not a different mobile theme).
- Timeline and diagram layouts need a legible mobile variant (vertical stack with connector line intact).
- Metrics strip: wrap to 2×2 or stacked tiles on small screens without losing monospace numeral hierarchy.

### Edge Cases to Account for in the Design

- **Empty/future sections**: hide when no data; no broken empty cards or large blank gaps.
- **Variable content length**: timeline bullets and project copy vary — layouts must stay even when one entry has 2 bullets and another has 4–5.
- **Long vs. short project case studies**: compact card + expanded case-study (and diagram) states.
- **No backend contact form**: third-party embed + `mailto:` fallback; realistic success/error only as far as the embed supports.
- **Resume PDF sync**: primary path is Download PDF, not a duplicated rich in-page resume that can drift.
- **Phone scraping**: click-to-reveal or omit.
- **Dark-only**: do not ship a light variant in this pass.
- **Social share (OG image)**: on-brand image — name, title, accent, minimal — for LinkedIn/Twitter.
- **404 / not-found**: hairline panel, monospace error code, link home.
- **Accessibility**: `#4FA3D1` on `#0E1116` must meet contrast for text/links (adjust accent brightness if needed while keeping the signal-blue feel); visible focus rings; reduced-motion static fallback for the load animation; semantic structure implied by the layout (clear headings, link affordances).
- **Diagrams without JS/motion**: architecture diagrams fully readable as static graphics.
- **Modular components**: timeline entry, metric tile, skill chip, project compact/expanded, leadership callout, “now” panel — repeatable so new jobs/projects are content additions, not redesigns.

### Deliverables Requested from Stitch
- Full-page desktop design (Hero through Footer), section order as above
- Mobile responsive version of the same page
- Component states: project card compact vs. expanded (incl. architecture diagram treatment), timeline entry collapsed vs. expanded
- Leadership callout + Now panel as distinct modules
- Contact block with form-embed region + mailto fallback + optional phone reveal
- 404 / not-found page
- Open Graph share image concept
- Optional: print-friendly `/resume` layout
