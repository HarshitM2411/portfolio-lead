# Implementation Plan — Harshit Meena Portfolio

Phase-wise build plan derived from `docs/architecture.md`. Visual rules: `docs/design-prompt.md`. Product scope: `docs/context.md` / `docs/problemstatement.md`.

**Approach:** Ship a working vertical slice early (scaffold → content model → home shell), then fill sections scan→depth, then deepen projects, then harden SEO/a11y/perf and deploy.

---

## Overview

| Phase | Name | Goal | Depends on |
|---|---|---|---|
| 0 | Foundations | Next.js + Tailwind + fonts + git/Vercel-ready repo | — |
| 1 | Design system & shadcn | Tokens + baseline UI primitives (Systems Engineer look) | 0 |
| 2 | Content model | Types, `/data` modules, loaders, skip-empty helpers | 0 |
| 3 | App shell & home composition | Layout, Section primitives, orchestrated `/` | 1, 2 |
| 4 | Core sections (scan layer) | Hero → Metrics → About → Leadership → Experience → Skills | 3 |
| 5 | Projects & depth | Case studies on home + diagrams + `/projects/[slug]` | 3, 4 |
| 6 | Closing sections & contact | Now, Education, Contact/Footer, resume PDF, form | 3, 4 |
| 7 | SEO, 404, metadata | Metadata API, OG, sitemap, robots, not-found | 4–6 |
| 8 | Quality bar | A11y, motion, responsive, Lighthouse 90+ | 5–7 |
| 9 | Launch | Vercel production + env + content freeze checklist | 8 |
| 10 | Optional / stretch | GitHub panel, analytics, `/resume` print, blog shell | 9 (or parallel after 7) |

**Definition of done (v1):** Architecture success criteria met — 90s scan clarity, architectural depth on top AI project, Lighthouse 90+, one-file content edits.

---

## Phase 0 — Foundations

**Goal:** Runnable Next.js App Router app with TypeScript, Tailwind, and project folder boundaries.

### Tasks
- [ ] Scaffold Next.js (App Router, TypeScript, ESLint, Tailwind, `app/` directory)
- [ ] Choose package manager; commit lockfile
- [ ] Wire `next/font` placeholders for grotesk + mono (final faces per design prompt)
- [ ] Create empty target dirs: `components/{layout,sections,ui,diagrams}`, `data/`, `content/{projects,blog}`, `lib/`, `public/`
- [ ] Baseline `app/layout.tsx` + empty `app/page.tsx`
- [ ] `.env.example` with `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_FORM_ENDPOINT`
- [ ] Confirm `next dev` / `next build` succeed

### Deliverables
- Bootable repo matching architecture layout skeleton
- No business UI yet

### Exit criteria
- Clean production build
- Folder boundaries exist and are documented by presence (match architecture §6)

---

## Phase 1 — Design system & shadcn/ui

**Goal:** Dark-only Systems Engineer theme via shadcn tokens; lean primitive set ready for sections.

### Tasks
- [ ] Init shadcn (`components.json`, RSC, Tailwind aliases, `lib/utils.ts` / `cn`)
- [ ] Map Precision Slate palette into `app/globals.css` shadcn vars (from `docs/web-design/DESIGN.md`):
  - background `#F8FAFC`, foreground `#0F172A`, muted `#64748B`, border `#E2E8F0`, primary `#0284C7`
  - `--radius` soft-technical (`0.25rem`–`0.75rem`)
- [ ] Light-only root theme — **do not** add `next-themes` dark toggle
- [ ] Add only baseline primitives: `button`, `badge`, `separator`, `accordion` and/or `collapsible`, `input`, `textarea`, `label`
- [ ] Restyle defaults to match web-design / responsive-design mocks (cool slate, cyan CTAs, hairline borders, frosted nav-ready tokens)
- [ ] Optional quiet grid/atmosphere on canvas if mock implies it — keep subtle
- [ ] Verify primary `#0284C7` contrast on white/canvas surfaces

### Deliverables
- Themed shadcn kit in `components/ui`
- Living token source in `globals.css`

### Exit criteria
- Primitives render on a throwaway preview page (or Story-less sandbox section) with correct **light** Precision Slate look
- No Inter-as-primary / stock shadcn purple / old dark `#0E1116` theme

---

## Phase 2 — Content model

**Goal:** Typed content layer so UI never hardcodes resume facts.

### Tasks
- [ ] Implement `lib/types.ts` from architecture §8.2 (`SiteConfig`, `Metric`, `Experience`, `SkillGroup`, `ProjectSummary`, etc.)
- [ ] Create `/data` modules (start with real or placeholder content):
  - `site.ts`, `about.ts`, `metrics.ts`, `leadership.ts`, `experience.ts`, `skills.ts`, `projects.ts`, `education.ts`, `now.ts`
  - `testimonials.ts`, `certifications.ts`, `github.ts` as empty/`[]` / disabled
- [ ] Implement `lib/content.ts`: loaders + `hasContent_*` helpers (arrays, optional objects, featured projects)
- [ ] Enforce skill categories exactly as resume list
- [ ] Document in a short comment or README snippet: “add job = edit `experience.ts` only”

### Deliverables
- Compiling typed data modules
- Skip-empty helpers ready for `page.tsx`

### Exit criteria
- Typecheck passes
- Empty optional modules do not force UI to render placeholders

---

## Phase 3 — App shell & home composition

**Goal:** Home page orchestrates sections in scan→depth order with shared layout chrome.

### Tasks
- [ ] Build `components/layout`: `Header` (anchor nav, quiet), `Footer` stub, `Container`, `Section` (id, optional index, title, children)
- [ ] Semantic landmarks: `header`, `main`, `nav`, `footer`
- [ ] `app/page.tsx`: import data → conditional section render in order:
  1. Hero 2. Metrics 3. About 4. Leadership 5. Experience 6. Skills 7. Projects 8. Now 9. GitHub (if enabled) 10. Education 11. Contact
- [ ] Anchor IDs for in-page nav (`#experience`, `#projects`, `#contact`, …)
- [ ] Mobile-first container widths; asymmetric panel grid utilities for desktop
- [ ] Keep section bodies as stubs that read props from data (wire real UI in Phases 4–6)

### Deliverables
- Composed `/` with correct order and skip-empty behavior
- Shared `Section` primitive

### Exit criteria
- Toggling a data module to empty removes that section with no layout hole
- Keyboard-focusable header links to anchors

---

## Phase 4 — Core sections (scan layer)

**Goal:** Recruiter can complete the 90s scan without projects deep-dive yet.

### Tasks
- [ ] **Hero** — brand-first name; title `Lead Software Engineer | AI/LLM & Agentic Systems`; one-line value prop; primary `Button` → resume path; secondary Contact; quiet GitHub/LinkedIn. No cards, no metrics in hero
- [ ] **Metrics** — 4–6 dashboard tiles; mono numerals; one optional accent metric
- [ ] **About** — short narrative; generous whitespace; no card chrome
- [ ] **Leadership** — dedicated callout (team of ~9 / mentorship)
- [ ] **Experience** — vertical timeline + connector nodes; Accordion/Collapsible for 2–4 bullets; tolerate uneven lengths
- [ ] **Skills** — category clusters with restyled `Badge` chips
- [ ] Drop `public/resume.pdf` (even a placeholder) and wire Hero CTA
- [ ] One purposeful load motion hook point (implement lightly or stub for Phase 8)

### Deliverables
- Scan-critical sections live on `/`
- Resume download works

### Exit criteria
- Blind 90s test: role, years signal, stack signal from skills, path to contact/resume are obvious
- Responsive from ~360px; timeline remains legible on mobile

---

## Phase 5 — Projects & technical depth

**Goal:** AI/LLM case studies differentiate; top projects have architecture depth.

### Tasks
- [ ] **Projects** section — compact cards for all three: Agentic Profile Matching, RAG-Based Profile Matching, Resume Analyser
- [ ] Expanded state: Problem → Approach/Architecture → Stack → Outcome (Accordion/Collapsible or equivalent)
- [ ] Mark `featured` on top 1–2 projects
- [ ] Static diagram(s) in `components/diagrams` or `/public/diagrams` — fully legible without JS
- [ ] MDX pipeline (`lib/mdx.ts` + `content/projects/*.mdx`) for featured long-form
- [ ] Route `app/projects/[slug]/page.tsx` + `generateStaticParams` from `data/projects.ts`
- [ ] Missing MDX/slug → `notFound()`
- [ ] Home cards link to deep pages for featured items

### Deliverables
- Expandable home case studies
- At least one deep project page with static architecture treatment

### Exit criteria
- Technical reviewer can explain top project architecture from the site alone
- Diagrams remain readable with JS disabled / reduced motion

---

## Phase 6 — Closing sections & contact

**Goal:** Conversion paths complete without a backend.

### Tasks
- [ ] **Now** panel (1–2 lines) when `now.ts` has content
- [ ] **Education** — DTU / B.Tech IT / CGPA; low visual weight
- [ ] **Contact** — email, location, socials, resume download again
- [ ] Form UI with shadcn `Input` / `Textarea` / `Label` / `Button` → Formspree/Getform/EmailJS via `NEXT_PUBLIC_FORM_ENDPOINT`
- [ ] Success/error states + always-visible `mailto:` fallback
- [ ] Phone: omit or click-to-reveal client island (no raw number at rest)
- [ ] Finalize `Footer` (legal-quiet, links, location)
- [ ] Optional: leave testimonials/certs gated by empty data (no UI)

### Deliverables
- Working contact path (third-party or mailto)
- Complete home page content arc

### Exit criteria
- Form submit succeeds against provider in a preview env **or** mailto path is clearly usable if form deferred
- No empty Blog/Testimonials/Cert blocks rendered

---

## Phase 7 — SEO, 404, metadata

**Goal:** Shareable, crawlable, intentional previews.

### Tasks
- [ ] Root `metadata` in `layout.tsx` (title template, description, metadataBase from `NEXT_PUBLIC_SITE_URL`)
- [ ] Open Graph + Twitter card fields
- [ ] Custom OG: `opengraph-image.tsx` and/or `/public/og.png` (name, title, accent)
- [ ] `app/sitemap.ts` — `/`, project slugs, future blog when present
- [ ] `app/robots.ts`
- [ ] `app/not-found.tsx` — on-brand 404 (hairline panel, mono code, home link)
- [ ] Favicon / app icons

### Deliverables
- Complete metadata surface
- Branded 404

### Exit criteria
- LinkedIn/Twitter card debugger shows intentional preview
- Sitemap lists all public static routes

---

## Phase 8 — Quality bar (a11y, motion, performance)

**Goal:** Hit NFR targets before calling v1 done.

### Tasks
- [ ] Audit heading hierarchy and landmarks
- [ ] Visible `:focus-visible` on all interactive controls
- [ ] Keyboard through timeline + project expand/collapse + form
- [ ] `prefers-reduced-motion`: static fallback for load animation
- [ ] Contrast pass (including primary links/buttons)
- [ ] Mobile pass at 360 / 768 / 1024 / 1440
- [ ] Trim unused shadcn components/deps; keep client islands minimal
- [ ] `next/image` for any raster assets; no layout shift from fonts
- [ ] Lighthouse (mobile + desktop): Performance, Accessibility, Best Practices, SEO each **≥ 90**
- [ ] Fix regressions until green

### Deliverables
- Lighthouse evidence (saved scores or CI note)
- Motion/a11y checklist signed off

### Exit criteria
- Architecture §22 checklist satisfied for quality criteria
- No known critical a11y blockers

---

## Phase 9 — Launch

**Goal:** Production on Vercel with correct env and content freeze.

### Tasks
- [ ] Connect repo to Vercel; set env vars (`NEXT_PUBLIC_SITE_URL`, form endpoint)
- [ ] Production deploy from main; verify PDF, form, OG, 404
- [ ] Decide domain: keep `*.vercel.app` or attach custom domain; update `NEXT_PUBLIC_SITE_URL`
- [ ] Content freeze checklist: resume PDF ↔ site bullets ↔ metrics ↔ experience dates
- [ ] Smoke test primary CTA and contact on production URL
- [ ] Optional: simple “how to update content” note for owner (points at `/data`)

### Deliverables
- Live production URL
- Env configured; form + resume verified live

### Exit criteria
- All four success criteria demonstrable on production
- No placeholder lorem in visible sections

---

## Phase 10 — Optional / stretch (post-v1 or parallel)

Do **not** block launch on these.

| Item | Tasks | Notes |
|---|---|---|
| GitHub presence | Enable `github.ts`; static links or build-time/client widget | Prefer static links first |
| Analytics | Vercel Analytics or Plausible; cookie notice only if required | Prefer cookieless |
| Print `/resume` | `app/resume/page.tsx` + `@media print` from same `/data` | Complements PDF |
| Blog shell | `content/blog` + `/blog` routes; hide nav until posts exist | MDX-ready |
| Testimonials | Fill `testimonials.ts` when quotes available | Conditional render already supported |

---

## Cross-phase rules (always on)

1. **No backend** — no content APIs, auth, DB, or PDF codegen.
2. **Content ≠ UI** — copy and jobs live in `/data` or MDX only.
3. **Hide empty** — never ship empty section chrome.
4. **One primary CTA** — View Resume in hero.
5. **shadcn lean** — add primitives only when a section needs them; restyle to design prompt.
6. **Server Components default** — `"use client"` only for expand/collapse, form UX, phone reveal, motion.
7. **Do not invent** light mode, CMS admin, or alternate UI kits.

---

## Suggested milestone demos

| After phase | Show |
|---|---|
| 1 | Themed buttons/badges on dark canvas |
| 3 | Empty-but-ordered home skeleton with anchors |
| 4 | Recruiter scan path + resume download |
| 5 | Featured project architecture depth |
| 6 | Full page + contact submit |
| 8 | Lighthouse ≥ 90 report |
| 9 | Production URL walkthrough |

---

## Tracking

Copy this file’s checkboxes into issues/milestones (one issue per phase, or one per section in Phases 4–6). Keep `docs/architecture.md` as the technical source of truth when implementation choices conflict with convenience.

---

## Related docs

- `docs/architecture.md` — system design, stack, content contracts
- `docs/context.md` — product decisions and success criteria
- `docs/problemstatement.md` — full scope and edge cases
- `docs/design-prompt.md` — visual direction for UI implementation
