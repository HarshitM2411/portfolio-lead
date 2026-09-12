# Architecture — Harshit Meena Portfolio

Technical architecture for the v1 personal portfolio. Derived from `docs/context.md` and `docs/problemstatement.md`. Visual system: `docs/design-prompt.md`.

---

## 1. Purpose of this document

Define **how** the site is built so that:

- Content updates are data edits, not layout rewrites
- The app stays frontend-only (no custom backend/DB)
- Scan (90s) and deep-dive readers are both served
- NFRs (SEO, Lighthouse 90+, a11y, mobile-first) are structural, not afterthoughts
- A future CMS or blog can land without redesigning the shell

---

## 2. System overview

```text
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (client)                         │
│  Static HTML/CSS/JS · progressive enhancement · no app server    │
└───────────────────────────────▲─────────────────────────────────┘
                                │ CDN / edge
┌───────────────────────────────┴─────────────────────────────────┐
│                     Vercel (Next.js hosting)                     │
│  Pre-rendered pages (SSG) · static assets · optional Analytics   │
└───────────────────────────────▲─────────────────────────────────┘
                                │ build time
┌───────────────────────────────┴─────────────────────────────────┐
│                   Next.js App Router (build)                     │
│  app/* routes · components · lib · /data + MDX → static output   │
└───────┬─────────────────┬─────────────────┬─────────────────────┘
        │                 │                 │
        ▼                 ▼                 ▼
   /data/*.ts        content/**/*.mdx    /public/*
   (typed records)   (projects/blog)     (resume.pdf, og, images)
        │
        │  (runtime, browser-only, optional)
        ▼
   Third parties: Formspree/Getform/EmailJS · GitHub public API/widgets
                  · mailto: · Vercel Analytics / Plausible
```

**Core idea:** At build time, typed local content is composed into static pages. At runtime, the only “dynamic” touches are optional browser calls to third parties (forms, GitHub widgets, analytics)—never a first-party API or database.

---

## 3. Architectural principles

| Principle | Implication |
|---|---|
| Frontend-only | No Route Handlers for business data, no DB, no auth, no CMS in v1 |
| Content ≠ UI | Sections read from `/data` or MDX; components stay presentational + compositional |
| Hide empty | Sections with empty arrays / missing modules do not render |
| One primary action | Hero emphasizes **View Resume**; contact and socials are secondary |
| Progressive enhancement | Expand/collapse and motion enhance; content and diagrams remain usable without JS/motion |
| Migration-ready | Data shapes and MDX collections should map cleanly to a headless/Git CMS later |
| Light-only v1 | Precision Slate & Electric Cyan; no dark-mode toggle / next-themes in v1 |

---

## 4. Technology stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router) | File-based routes, Metadata API, `next/image` |
| Language | TypeScript | Strict typing for content schemas |
| UI components | **shadcn/ui** | CLI-managed copy-in components under `components/ui`; Radix primitives + CVA; owned source (not a black-box npm UI kit) |
| Styling | Tailwind CSS + shadcn CSS variables | Map **Precision Slate** tokens from `docs/web-design/DESIGN.md` into shadcn vars (`--background` ← `#F8FAFC`, `--foreground` ← `#0F172A`, `--primary` ← `#0284C7`, hairline borders, soft radii) |
| Utilities | `class-variance-authority`, `clsx`, `tailwind-merge` (`cn` in `lib/utils.ts`) | Standard shadcn companion utils |
| Icons | `lucide-react` (shadcn default) | Use sparingly; avoid icon-row clutter |
| Content (structured) | `/data/*.ts` (preferred over loose JSON for types/imports) | Experience, skills, metrics, site config |
| Content (long-form) | MDX under `content/` | Case-study depth, future blog posts |
| Fonts | `next/font` | **Geist** (sans) + **JetBrains Mono** (mono) per web-design DESIGN.md |
| Forms | Formspree / Getform / EmailJS + `mailto:` fallback; shadcn `Input` / `Textarea` / `Label` / `Button` for UI | Config via env (`NEXT_PUBLIC_FORM_*`) |
| Analytics (optional) | `@vercel/analytics` or Plausible | Prefer cookieless where possible |
| Hosting | Vercel | Git-connected deploys; static-friendly |
| Package manager | pnpm / npm / yarn (repo choice) | Lockfile committed |

**Explicitly not in stack (v1):** Prisma/DB, Auth.js, tRPC, custom API routes for content, Sanity/Contentful/Decap, PDF generation libraries, alternate component libraries (MUI, Chakra, Ant Design, raw Radix-only without shadcn).

**shadcn usage rules:** Add only components that sections need (`npx shadcn@latest add …`). Restyle to Precision Slate & Electric Cyan (cool slate canvas, cyan primary, hairline borders, soft-technical radii per DESIGN.md)—do not ship stock shadcn purple or the old dark theme. Light-only v1: no next-themes dark toggle.

---

## 5. Rendering & delivery model

### 5.1 Default: Static Site Generation (SSG)

- Home and secondary routes are **statically generated** at build time from `/data` and MDX.
- No server runtime required for page HTML.
- Revalidation / ISR is unnecessary for v1 unless a public GitHub fetch is later moved to build-time caching; prefer build-time or client-side for optional GitHub presence.

### 5.2 Client components (sparingly)

Use `"use client"` only where interaction requires it:

- Timeline expand/collapse
- Project case-study expand / tabs
- Phone click-to-reveal
- Contact form client UX (if not a pure HTML form POST to Formspree)
- Reduced-motion-aware load animation

Everything else (layout shell, section chrome, typography, SEO metadata, most lists) should stay **Server Components** for smaller JS and better Lighthouse Performance.

### 5.3 Assets

| Asset | Location | Delivery |
|---|---|---|
| Resume PDF | `/public/resume.pdf` (or versioned name) | Direct static download; primary CTA target |
| OG image | `/public/og.png` (or generated via `opengraph-image.tsx`) | Linked in Metadata API |
| Diagrams | `/public/diagrams/*` or inline SVG components | Static, fully legible without JS |
| Images | `/public` or `content` + `next/image` | Optimized; explicit sizes/alt |

---

## 6. Repository layout (target)

```text
portfolio/
├── app/
│   ├── layout.tsx              # root shell, fonts, metadata defaults, analytics
│   ├── page.tsx                # home: composes sections from data
│   ├── not-found.tsx           # 404
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── opengraph-image.tsx     # optional code-generated OG
│   ├── resume/
│   │   └── page.tsx            # optional print-friendly view
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx        # optional dedicated case-study route
│   └── blog/                   # future-ready; may ship empty/unlinked
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── layout/                 # Header, Footer, Section, Container
│   ├── sections/               # Hero, Metrics, About, Leadership, Experience, …
│   ├── ui/                     # shadcn/ui primitives (button, accordion, badge, …)
│   └── diagrams/               # Static architecture diagrams for top projects
├── components.json             # shadcn CLI config (aliases, style, RSC, Tailwind)
├── content/
│   ├── projects/               # *.mdx case studies (optional depth)
│   └── blog/                   # *.mdx posts (future)
├── data/
│   ├── site.ts                 # name, title, links, CTAs, location, form config keys
│   ├── about.ts
│   ├── metrics.ts
│   ├── leadership.ts
│   ├── experience.ts
│   ├── skills.ts
│   ├── projects.ts             # index/metadata; body may live in MDX
│   ├── education.ts
│   ├── now.ts
│   ├── testimonials.ts         # may be []
│   ├── certifications.ts       # may be []
│   └── github.ts               # username, pinned repo slugs (optional)
├── lib/
│   ├── utils.ts                # shadcn `cn()` helper (clsx + tailwind-merge)
│   ├── content.ts              # loaders, filters, “hasContent” helpers
│   ├── mdx.ts                  # MDX compile helpers if used
│   ├── types.ts                # shared content contracts
│   └── constants.ts
├── public/
│   ├── resume.pdf
│   ├── og.png
│   └── diagrams/
├── docs/
│   ├── problemstatement.md
│   ├── context.md
│   ├── design-prompt.md
│   └── architecture.md
└── …
```

Folder names can be adjusted; the **boundaries** matter: `data` / `content` vs `components` vs `app`.

---

## 7. Routing map

| Route | Purpose | v1 |
|---|---|---|
| `/` | Single-page portfolio (all primary sections) | Required |
| `/projects/[slug]` | Deep case study (architecture, long MDX) | Recommended for top 1–2 AI projects; home keeps compact/expandable cards |
| `/resume` | Print-optimized resume view | Optional |
| `/blog`, `/blog/[slug]` | Writing | Future-ready structure; hide nav/links when no posts |
| `not-found` | Consistent 404 | Required |

**Home as the product:** Recruiter success criteria are satisfied on `/` without requiring secondary navigations. Deep routes support engineering-lead depth without bloating the first viewport.

**Project depth strategy (locked):**

1. Home: compact project cards + expandable Problem → Approach → Stack → Outcome
2. Top projects: link to `/projects/[slug]` and/or inline static diagram panel
3. No backend; slug list comes from `data/projects.ts` + matching MDX files

---

## 8. Content layer (detailed)

### 8.1 Why typed `/data` modules

- Importable in Server Components with full TypeScript checking
- Co-locate enums/unions (skill categories, project status)
- Easy “add one object” workflow matching success criterion #4
- Straightforward later map to CMS document types

Prefer `.ts` exporting `const` + `satisfies` / explicit types over untyped `.json`.

### 8.2 Suggested TypeScript contracts

```ts
// lib/types.ts (illustrative)

export type SiteConfig = {
  name: string;
  title: string; // "Lead Software Engineer | AI/LLM & Agentic Systems"
  tagline: string;
  location: string;
  email: string;
  phone?: string; // never rendered raw by default
  socials: { github: string; linkedin: string };
  resumePath: string; // "/resume.pdf"
  primaryCta: "resume"; // locked
  formEndpoint?: string; // public Formspree/Getform URL
};

export type Metric = {
  id: string;
  value: string; // "100K", "~25–40%"
  label: string;
  emphasize?: boolean; // at most one accent highlight
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string; // ISO or display-ready; keep consistent
  end: string | "Present";
  bullets: string[]; // 2–4 typical; UI must tolerate variance
};

export type SkillCategory =
  | "Languages"
  | "Backend"
  | "Frontend"
  | "Databases"
  | "AI/LLM"
  | "Cloud & DevOps"
  | "Observability & Testing"
  | "Practices";

export type SkillGroup = {
  category: SkillCategory;
  items: string[];
};

export type ProjectSummary = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  problem: string;
  approach: string;
  outcome: string;
  featured?: boolean; // diagram / deep page
  diagram?: string; // path or component key
  mdxPath?: string;
};

export type Education = {
  school: string;
  degree: string;
  field: string;
  detail?: string; // CGPA
};

export type NowItem = { text: string };
export type Leadership = { headline: string; body: string };
export type Testimonial = { quote: string; author: string; role?: string };
```

### 8.3 MDX usage

| Content | Format | Rationale |
|---|---|---|
| Jobs, skills, metrics, site links | `/data/*.ts` | Short, structured, frequently tweaked |
| Featured case-study body | `content/projects/*.mdx` | Long prose + headings + optional components |
| Blog posts | `content/blog/*.mdx` | Future; same pipeline |

MDX frontmatter should include at least: `title`, `slug`, `description`, `stack`, `featured`.

### 8.4 Conditional section rendering

```text
page.tsx
  → load all data modules
  → for each section: if !hasContent(data) skip
  → render Section wrappers in scan→depth order
```

`hasContent` rules:

- Arrays: `length > 0`
- Optional objects (`leadership`, `now`): required fields non-empty
- Blog: only if one or more published MDX files
- GitHub panel: only if `github.ts` configured and feature enabled

### 8.5 Adding content later (operational contract)

| Change | Touch |
|---|---|
| New job | Append object in `data/experience.ts` |
| New metric | Append in `data/metrics.ts` |
| New skill | Edit group in `data/skills.ts` |
| New project (compact) | Append in `data/projects.ts` |
| New featured case study | `data/projects.ts` + `content/projects/slug.mdx` + optional diagram |
| New blog post | Add MDX under `content/blog/` (nav appears when collection non-empty) |
| Resume update | Replace `/public/resume.pdf` **and** keep site bullets in sync manually (v1 process) |

No new React section component unless introducing a **new section type**.

---

## 9. UI composition architecture

### 9.1 Layering

```text
app/page.tsx
  └── Section orchestrator (order, anchors, skip-empty)
        └── components/sections/*          (domain composition)
              └── components/ui/*          (shadcn primitives)
                    └── app/globals.css    (shadcn + design-prompt tokens)
```

- **`components/ui`:** only shadcn-generated (or lightly edited) primitives — do not put page sections here.
- **`components/sections` / `layout`:** portfolio-specific composition built *on top of* shadcn.
- Prefer shadcn primitives for interactive/accessible building blocks; custom markup for asymmetric panels, timeline chrome, and architecture diagrams that are not generic widgets.

### 9.2 Recommended shadcn primitives (add as needed)

| Primitive | Portfolio use |
|---|---|
| `Button` | Primary CTA (View Resume), secondary Contact, form submit |
| `Badge` | Skill tags, stack chips (restyle to bordered hairline chips) |
| `Accordion` or `Collapsible` | Experience timeline bullets; project compact → expanded |
| `Separator` | Hairline section/panel dividers |
| `Input`, `Textarea`, `Label` | Contact form fields |
| `Card` | Only where expand/collapse needs a clear interactive container — restyle heavily (no soft shadow SaaS look); **never in hero** |
| `NavigationMenu` / plain links | Header nav if multi-anchor; keep minimal |
| `Tooltip` | Optional affordances (e.g. phone reveal hint) — use sparingly |

Do not add large unused shadcn surfaces (tables, data calendars, carousels, chart kits) that hurt the lean JS budget.

### 9.3 Section → data mapping

| Section component | Data source | Notes |
|---|---|---|
| `Hero` | `site.ts` | Brand-first name; one primary CTA (`Button`) |
| `Metrics` | `metrics.ts` | Immediately after hero |
| `About` | `about.ts` | Narrative only |
| `Leadership` | `leadership.ts` | Own moment; not only an experience bullet |
| `Experience` | `experience.ts` | Timeline + Accordion/Collapsible |
| `Skills` | `skills.ts` | Fixed category set; `Badge` clusters |
| `Projects` | `projects.ts` (+ MDX) | Compact / expanded; link to deep route |
| `Now` | `now.ts` | 1–2 lines |
| `GitHub` | `github.ts` + client fetch/widget | Optional |
| `Education` | `education.ts` | Low visual weight |
| `Testimonials` | `testimonials.ts` | Optional |
| `Contact` + `Footer` | `site.ts` | shadcn form controls + mailto + socials |

### 9.4 Interaction patterns

| Pattern | Behavior | A11y |
|---|---|---|
| Timeline entry | Collapsed summary → expand bullets (shadcn Accordion/Collapsible) | Radix keyboard/`aria-expanded` via shadcn |
| Project card | Compact → expanded case study | Same; focus management |
| Phone reveal | Hidden → reveal on explicit action | Do not put raw number in initial HTML if avoiding scrape (reveal via client state or `data-` + user gesture) |
| Motion | One load moment (e.g. timeline draw) | CSS/`@media (prefers-reduced-motion: reduce)` static fallback |
| Diagrams | Static SVG/image first | Interactive enhancements optional, never required for meaning |

### 9.5 Styling architecture (shadcn + Precision Slate tokens)

- Initialize shadcn with RSC + Tailwind; commit `components.json`.
- In `app/globals.css`, map Precision Slate & Electric Cyan onto shadcn semantic variables, e.g.:
  - `--background` ← `#F8FAFC` (`bg-base`)
  - `--foreground` ← `#0F172A` (`text-primary`)
  - `--muted-foreground` ← `#64748B`
  - `--card` ← `#FFFFFF`
  - `--border` ← `#E2E8F0`
  - `--primary` ← `#0284C7` (cyan accent)
  - `--radius` ← soft-technical (`0.25rem`–`0.75rem` per DESIGN.md)
- Follow elevation/shadow tokens from `docs/web-design/DESIGN.md` (cool ambient, not muddy).
- Layout: max container `1200px`; breakpoints per DESIGN.md (mobile ≤767, tablet 768–1023, desktop ≥1024).
- Mono (JetBrains Mono) only for dates, tags, metrics, indices.
- Shared `Section` layout primitive; frosted glass header as in mocks.
- Light-only: do not wire `next-themes` dark mode in v1.
- Visual QA against `docs/web-design/code.html` and `docs/responsive-design/code.html`.

---

## 10. Integrations (frontend-only)

### 10.1 Contact form

```text
User → Contact form (HTML or light client)
     → POST/submit to Formspree | Getform | EmailJS
     → Success/error UI from response
Fallback: mailto: link always visible
```

- Store endpoint / public key in `NEXT_PUBLIC_*` env vars (safe for client)
- No Next.js Route Handler required for v1
- Do not design UX that implies server-side validation beyond what the provider returns

### 10.2 Resume

- Primary: `<a href="/resume.pdf" download>` (or open in new tab—pick one UX and keep consistent)
- PDF is download source of truth; site content kept in sync by process, not codegen
- Optional `/resume` route reads the **same** `/data` modules for a print stylesheet (`@media print`)

### 10.3 GitHub presence (optional)

Options (pick one implementation style):

1. **Static links only** — simplest, zero runtime dependency
2. **Build-time fetch** — script or `generateStaticParams`-adjacent fetch in build to bake pinned repo metadata into static props (needs network at build; cache carefully)
3. **Client widget** — official contribution graph / shields-style embeds

Never proxy GitHub through a custom backend in v1.

### 10.4 Analytics (optional)

| Tool | Privacy note |
|---|---|
| Vercel Analytics | First-party-ish on Vercel; check cookie posture |
| Plausible | Often cookieless; preferred if avoiding consent banners |

If cookies are used, architecture must include a minimal consent/notice component; if cookieless, skip banner.

---

## 11. SEO & metadata architecture

```text
app/layout.tsx          → default title template, description, icons
app/page.tsx            → page-level overrides if needed
app/opengraph-image.*   → OG image
app/twitter-image.*     → optional
app/sitemap.ts          → `/`, deep project routes, blog slugs when present
app/robots.ts           → allow crawl; sitemap URL
```

Requirements:

- Unique `<title>` and meta description
- Open Graph + Twitter card tags
- Custom OG artwork (name, title, accent)—intentional LinkedIn/Twitter previews
- Semantic landmarks: `header`, `main`, `nav`, `footer`, heading hierarchy per section

---

## 12. Performance architecture

Target: **Lighthouse 90+** (Performance, Accessibility, Best Practices, SEO).

| Technique | Application |
|---|---|
| SSG | Default for all marketing pages |
| Server Components by default | Minimize client JS |
| `next/font` | Self-hosted, no layout shift |
| `next/image` | Responsive images, modern formats |
| Code-split client islands | Only interactive sections hydrated |
| No heavy animation libraries by default | CSS / small primitives for one motion moment |
| Avoid unused deps | Add shadcn components only as needed; no chart/calendar/data-table bloat |
| Static PDF / diagrams | Cacheable on CDN |

---

## 13. Accessibility architecture

- Color contrast: accent `#4FA3D1` on `#0E1116` verified for text/UI; adjust token if needed while keeping signal-blue intent
- Visible `:focus-visible` styles on all interactive elements
- Keyboard support for all expand/collapse and form controls
- Alt text for informative images; decorative SVGs `aria-hidden`
- `prefers-reduced-motion` disables non-essential animation
- Diagrams convey structure in static form (text labels + DOM/SVG order)

---

## 14. Error & empty states

| State | Handling |
|---|---|
| Unknown route | `app/not-found.tsx` — on-brand 404, link home |
| Empty optional section | Omit from DOM entirely |
| Form provider failure | Inline error + mailto fallback |
| Missing resume file | CI/build check or obvious broken link prevention (keep file in repo) |
| MDX missing for slug | `notFound()` on `/projects/[slug]` |

---

## 15. Environment & configuration

| Variable | Purpose | Public? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, sitemap, OG absolute URLs | Yes |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Formspree/Getform action URL | Yes |
| `NEXT_PUBLIC_GA` / analytics ids | Only if used | Yes |
| GitHub token | **Avoid in v1**; use public unauthenticated limits or build-time only if needed | Prefer none |

No secrets that require a server to keep hidden should be introduced—those would force backend scope.

---

## 16. Deployment architecture (Vercel)

```text
git push → Vercel build (next build)
        → Static assets + pre-rendered HTML uploaded to CDN
        → Optional custom domain DNS → Vercel
```

- Preview deployments per PR
- Production: `main` (or chosen default branch)
- Domain: open decision (`*.vercel.app` vs custom such as `harshitmeena.dev`)—architecture supports both via `NEXT_PUBLIC_SITE_URL`
- Headers: default Vercel security headers sufficient for static portfolio; tighten CSP later if embeds require it

---

## 17. Security & privacy (static site)

- No user accounts; no PII storage on first-party infra
- Phone not in initial crawlable plaintext if click-to-reveal chosen
- Form data handled by third-party processor (review their DPA/privacy)
- Dependency hygiene: lockfile + periodic audit
- Resume PDF may contain contact info—acceptable as intentional download, not homepage scrape surface

---

## 18. Edge cases → architectural response

| # | Edge case | Architecture response |
|---|---|---|
| 1 | Contact without backend | Third-party form + mailto; config in env/`site.ts` |
| 2 | Resume vs site drift | PDF is download SoT; manual sync process; no PDF codegen in v1 |
| 3 | Long vs short projects | Compact/expanded UI + optional `/projects/[slug]` |
| 4 | New job/project | Append data/MDX only |
| 5 | Phone spam | Click-to-reveal client pattern or omit |
| 6 | Empty future sections | Conditional render |
| 7 | Analytics cookies | Prefer cookieless; else notice component |
| 8 | Domain | Env-driven canonical URL |
| 9 | Content freshness | Owner process; optional “last updated” field in `site.ts` later |
| 10 | Competing CTAs | Single primary CTA in `site.ts` / Hero |
| 11 | Diagram a11y | Static SVG/image required path |

---

## 19. Future migration path (out of scope, designed for)

Without changing section components:

1. Replace `/data` loaders in `lib/content.ts` with CMS SDK fetches (build-time)
2. Keep the same TypeScript DTOs—map CMS fields → existing types
3. MDX blog can move to CMS rich text or remain Git-based (Decap)
4. Still no need for client-side auth on the public site

---

## 20. Out of scope (do not invent in architecture)

- First-party REST/GraphQL APIs for portfolio content
- Authentication / admin CMS UI
- Database
- Real-time chat or presence
- Automated PDF generation from site data
- Alternate full UI kits (MUI, Chakra, Ant Design) — **shadcn/ui** is the chosen component layer
- Light/dark theme system (v1) — **light-only** Precision Slate; no dark toggle

---

## 21. Build sequence (implementation order)

Suggested order so architecture stays coherent:

1. Scaffold Next.js App Router + Tailwind + `next/font` + root layout
2. Init **shadcn/ui** (`components.json`, `lib/utils.ts`, `globals.css` tokens mapped to **Precision Slate** / `docs/web-design/DESIGN.md`); add baseline primitives (`button`, `badge`, `separator`, `accordion`/`collapsible`, form controls)
3. Define `lib/types.ts` + empty `/data` modules
4. `Section` / layout primitives + Home composition with skip-empty
5. Hero → Metrics → About → Leadership → Experience → Skills → Projects → Now → Education → Contact (compose with shadcn)
6. Resume in `/public` + primary CTA wiring
7. Contact form third-party + mailto
8. Featured project diagram + optional `/projects/[slug]`
9. SEO (`metadata`, OG, sitemap, robots) + `not-found`
10. A11y/motion pass + Lighthouse fixes (trim unused shadcn deps)
11. Optional: GitHub panel, analytics, `/resume` print, blog shell

---

## 22. Success criteria → architecture checklist

| Success criterion | Architectural proof |
|---|---|
| 90s scan clarity | Section order + metrics early + single primary CTA + skimmable timeline |
| Technical depth on top AI project | Featured flag + diagram + MDX/deep route |
| Lighthouse 90+ | SSG, server-first, image/font optimization, lean client islands, minimal shadcn surface |
| One-file content edits | `/data` + MDX; sections data-driven |

---

## Related docs

- `docs/problemstatement.md` — problem, NFRs, edge cases, scope
- `docs/context.md` — condensed product context and locked decisions
- `docs/design-prompt.md` — visual language and UI presentation rules
