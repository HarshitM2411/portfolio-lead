# Project Context — Harshit Meena Portfolio

Grounding brief for building and extending this site. Source of truth for *what* and *why*: `docs/problemstatement.md`. Visual direction: `docs/design-prompt.md`.

---

## Who & why

**Owner:** Harshit Meena — Lead Software Engineer (MERN, distributed systems, AI/LLM & agentic systems).

**Goal:** A personal portfolio where a hiring manager, recruiter, or engineering lead can grasp experience, technical depth, and impact within minutes, then act (download resume, contact, view a project, connect on LinkedIn).

**Dual audience:**
- Fast scan (60–90s): recruiters / hiring managers
- Deep dive: engineering leads (system design, AI/LLM detail)
- Secondary: peers / collaborators

Content and layout must be skimmable *and* expandable — not one or the other.

---

## Stack & hard constraints

| Constraint | Detail |
|---|---|
| Frontend only | No backend server, no database |
| Framework | Next.js (App Router) |
| UI library | **shadcn/ui** — primitives live in `components/ui` (Tailwind + Radix); restyle via CSS variables to match `docs/design-prompt.md` |
| Hosting | Vercel |
| Content model | Scalable local data — easy to add/edit jobs, projects, skills without touching layout |
| Design | “Systems Engineer” direction in `docs/design-prompt.md` — not inventing a new visual system |

**Out of scope (v1):** backend APIs, auth, DB, CMS/admin, real-time features, auto-generated resume PDF from site data.

---

## Content architecture

“Frontend-only” ≠ hardcoded JSX.

- Structured content (experience, projects, skills, education, metrics, etc.) lives in typed `/data/*` (`.ts` / `.json`) and/or MDX (one file per project/post).
- Adding a job/project/skill = one object or file; **zero** layout/component rewrites.
- Conditionally render sections only when data exists (no empty/broken UI for blog, testimonials, certs).
- Future CMS (Contentful/Sanity/Decap) is a migration path, not v1.

---

## Site sections (v1)

**Required**
1. **Hero** — Name; title `Lead Software Engineer | AI/LLM & Agentic Systems`; one-line value prop; CTAs
2. **Impact metrics** — Scannable strip (e.g. 100K users, 9-person team, ~25–40% gains, 200K+ plans, 1M+ data points)
3. **About / Summary** — 6+ years narrative: distributed systems → AI/LLM/agentic
4. **Experience timeline** — Air India, UniCommerce, Edfora (FIITJEE), Wingify; role, dates, location, 2–4 impact bullets each
5. **Technical skills** — Groups: Languages, Backend, Frontend, Databases, AI/LLM, Cloud & DevOps, Observability & Testing, Practices (visual tags/clusters, not a plain list)
6. **AI/LLM case studies** — Agentic Profile Matching, RAG-Based Profile Matching, Resume Analyser; Problem → Approach/Architecture → Stack → Outcome
7. **Education** — DTU, B.Tech IT, CGPA
8. **Contact / footer** — Email, LinkedIn, GitHub, resume PDF, location; phone optional/gated

**Strongly recommended**
- Leadership/mentorship callout (team of ~9) as its own moment
- Now / currently exploring (1–2 lines)
- Resume PDF in `/public`
- Architecture / “how it works” depth for top 1–2 AI projects
- GitHub presence (links; optional pinned repos / contribution graph via public API or widgets)
- Contact form via third-party (Formspree / EmailJS / Getform) or `mailto:` fallback

**Optional / future-ready (hide when empty)**
- Testimonials, blog (MDX-ready `/blog`), open source / certifications
- Print-friendly `/resume` route

**Suggested scan → depth order:** Hero → Impact metrics → About → Leadership → Experience → Skills → AI case studies → Now → (GitHub) → Education → Contact

---

## Locked product decisions

| Topic | Decision |
|---|---|
| Primary hero CTA | **View Resume** (static PDF). Contact secondary; GitHub/LinkedIn quiet links |
| Color mode | **Dark only** for v1 |
| Contact | Third-party form embed + `mailto:` fallback; no custom backend |
| Phone | Hidden by default (click-to-reveal or omit) |
| Resume | Static PDF in `/public` is the download source of truth for v1 |
| Empty sections | Do not render |
| Project depth | Expandable case studies; dedicated detail/diagram for top projects as needed |
| Domain | Open — `*.vercel.app` vs custom (e.g. harshitmeena.dev) |

---

## Non-functional requirements

- **SEO:** Next.js Metadata API — title, description, OG + Twitter, `sitemap.xml`, `robots.txt`; custom OG image
- **Performance:** Lighthouse 90+; `next/image`; minimal unused JS
- **A11y:** Semantic HTML, contrast, focus states, alt text, keyboard nav, `prefers-reduced-motion`; diagrams legible without JS/motion
- **Responsive:** Mobile-first, ~360px → large desktop
- **Analytics (optional):** Vercel Analytics or Plausible; privacy/cookie notice only if cookie-based tools are used
- **404** and graceful empty/error states

---

## Success criteria

1. In **90 seconds**, a hiring manager can state: what he does, years of experience, stack signal, one standout project, how to contact him.
2. A technical reviewer finds real architectural detail on at least the top AI/LLM project.
3. Lighthouse **90+** (Performance, Accessibility, Best Practices, SEO).
4. New job or project = edit/add **one data file**; no layout changes.

---

## Related docs

- `docs/problemstatement.md` — full problem, edge cases, scope
- `docs/design-prompt.md` — Stitch / UI visual system and section presentation
