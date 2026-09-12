# Design Prompt — Harshit Meena Portfolio

**Canonical visual system (v1):** **Precision Slate & Electric Cyan** — light mode.

| Reference | Path |
|---|---|
| Design tokens & principles | `docs/web-design/DESIGN.md` |
| Desktop HTML mock | `docs/web-design/code.html` |
| Desktop screenshot | `docs/web-design/screen.png` (if present) |
| Responsive tokens & principles | `docs/responsive-design/DESIGN.md` |
| Mobile HTML mock | `docs/responsive-design/code.html` |
| Mobile screenshot | `docs/responsive-design/screen.png` (if present) |

Product scope still follows `docs/problemstatement.md` / `docs/context.md`. This file is the **UI direction summary** for implementation; when in conflict with the older dark “Systems Engineer” draft, **prefer the web-design / responsive-design sources above**.

---

## Visual direction

High-precision systems architecture + executive polish: cool slate canvas, electric cyan accents, Geist + JetBrains Mono, hairline borders, soft technical radii, frosted glass nav — **not** a dark terminal aesthetic and **not** generic purple SaaS.

### Color (implement these)

| Role | Token | Value |
|---|---|---|
| Canvas | `bg-base` | `#F8FAFC` |
| Subtle | `bg-subtle` | `#F1F5F9` |
| Surface / cards | `bg-surface` | `#FFFFFF` |
| Frost nav | `bg-frost` | `rgba(255,255,255,0.75)` |
| Text primary | `text-primary` | `#0F172A` |
| Text secondary | `text-secondary` | `#334155` / `#475569` |
| Text muted | `text-muted` | `#64748B` |
| Accent / links | `accent-primary` | `#0284C7` |
| Accent secondary | `accent-secondary` | `#2563EB` |
| Accent hover | `accent-vibrant` | `#0EA5E9` |
| Accent subtle | `accent-subtle` | `#E0F2FE` |
| Border hairline | `border-hairline` | `#E2E8F0` |
| Border medium | `border-medium` | `#CBD5E1` |

Map into shadcn CSS variables in Phase 1 (`--background`, `--foreground`, `--primary`, `--border`, `--radius`, etc.).

### Typography

- **Sans:** Geist — display/headlines/body (tight tracking on display: `-0.03em` → `-0.015em`)
- **Mono:** JetBrains Mono — dates, stack tags, metrics, section indices, telemetry labels only
- Tabular nums on metrics: `font-feature-settings: "tnum" 1`
- Scale: follow `DESIGN.md` (display 56/36 mobile, headline-lg/md/sm, body-lg/md/sm, label-md/sm)

### Layout & responsive

- Container max `1200px`; gutters: mobile `1rem`, tablet `2rem`, desktop `2.5rem`
- Desktop ≥1024: 12-col; tablet 768–1023: 8-col; mobile ≤767: 4-col, full-width stacks
- Ratios: 8:4 content/sidebar; 4:4:4 case-study modules where mock uses them
- Match `docs/web-design/code.html` for desktop structure and `docs/responsive-design/code.html` for mobile patterns

### Elevation & shape

- Prefer hairline `#E2E8F0` + cool ambient shadows from DESIGN.md (not heavy muddy shadows)
- Soft Technical radii: micro `4px`, medium `8px`, containers `12px`; full radius only for status dots/avatars
- Frosted header: blur + hairline (Level 3 in DESIGN.md)

### Motion

- Micro-interactions 120–200ms ease-out
- Prefer one purposeful load moment; respect `prefers-reduced-motion`
- Diagrams must stay legible without animation

---

## Product decisions (UI)

| Decision | Choice |
|---|---|
| Primary hero CTA | **Download CV / View Resume** (static PDF). Contact secondary. Socials quiet. |
| Color mode | **Light only** for v1 (Precision Slate). No dark-mode toggle. |
| Contact | Form (third-party) + `mailto:` fallback |
| Phone | Hidden by default / click-to-reveal |
| Resume | Static PDF in `/public` |
| Empty sections | Do not render |

---

## Sections (scan → depth)

Align section **content** with `docs/context.md`. Align section **presentation** with the HTML mocks (hero + telemetry sidebar, metrics row, narrative, timeline, AI blueprints, stack grid, exploring + education, contact form, footer).

1. Hero — name, title, value prop, primary Resume CTA, secondary Contact, socials; optional status/meta panel as in mock
2. Impact metrics strip
3. About / narrative (+ optional side panel)
4. Leadership callout (can sit in narrative/side panel if mock folds it)
5. Experience timeline (vertical connectors, expandable bullets, stack tags)
6. AI/LLM case studies (flow/blueprint + cards)
7. Technical skills (grouped tag clusters)
8. Now / exploring + Education
9. Contact form + quick reach
10. Footer

---

## What to avoid

- Dark-only / near-black canvas (superseded)
- Warm cream + terracotta + serif combo
- Purple-on-white / purple-to-indigo default AI look
- Generic identical soft-shadow card kits without the cool slate/cyan system
- Literal terminal/hacker aesthetic
- Inventing a second visual language that ignores `docs/web-design/*` and `docs/responsive-design/*`

---

## Implementation note

Phase 1+ should theme **shadcn/ui** to these tokens and visually match the mocks — not the previous dark `#0E1116` / `#4FA3D1` prompt.
