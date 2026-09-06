# Portfolio Website — Problem Statement

## 1. Objective

Build a personal portfolio website for **Harshit Meena** (Lead Software Engineer — MERN, Distributed Systems, AI/LLM & Agentic Systems) that lets a hiring manager, recruiter, or engineering lead understand his experience, technical depth, and impact within minutes, and take an action (download resume, message him, view a project, connect on LinkedIn).

## 2. Target Audience

- Hiring managers / recruiters doing a 60–90 second scan.
- Engineering leads doing a deeper technical read (system design, AI/LLM depth).
- Peers / potential collaborators looking at project work or writing.

Design and content must satisfy the fast-scan reader AND the deep-dive reader at the same time (skimmable structure + expandable depth).

## 3. Constraints (as given)

| Constraint | Detail |
|---|---|
| Frontend only | No backend server, no database |
| Framework | Next.js (App Router) |
| UI components | [shadcn/ui](https://ui.shadcn.com) (copy-in components on Tailwind + Radix); theme tokens remapped to the Systems Engineer palette — not stock shadcn defaults |
| Hosting | Vercel |
| Content updates | Must be easy to add/remove/edit sections, projects, experience entries in the future without a rebuild of architecture — i.e. scalable/maintainable content model |
| Design | Owner is confident about visual direction — this doc covers content/structure/technical scope; design options are provided separately below |

## 4. Core Principle: "Frontend-only" ≠ "No dynamic content"

Since there's no DB/backend, content still needs a scalable home. Recommended approach:
- All structured content (experience, projects, skills, education) lives in typed local data files (`/data/*.ts` or `.json`) or as MDX files (one file per project/blog post) — not hardcoded inside JSX.
- Adding a new job, project, or skill = adding one object/file, not touching layout code.
- If a future "no-code edit" need arises, this structure can migrate later to a headless CMS (Contentful/Sanity) or Git-based CMS (e.g. Decap CMS) without a redesign — but that is explicitly **out of scope for v1**.

## 5. Required Sections (derived from resume)

1. **Hero** — Name, title ("Lead Software Engineer | AI/LLM & Agentic Systems"), one-line value proposition, primary CTAs (View Resume, Contact, GitHub/LinkedIn).
2. **Summary / About** — the 6+ years narrative: distributed systems → AI/LLM/agentic systems pivot.
3. **Experience (Career Timeline)** — Air India, UniCommerce, Edfora (FIITJEE), Wingify — each with role, dates, location, and 2–4 bullet impact points. Should read as a timeline, not a wall of text.
4. **Impact Metrics / Highlights** — pull out the strongest numbers as a scannable strip: 100K users scaled, 9-person team led, ~25–40% efficiency/cost improvements, 200K+ plans, 1M+ data points, etc. Recruiters weigh this heavily and it's currently buried in bullets.
5. **Technical Skills** — grouped exactly as on resume (Languages, Backend, Frontend, Databases, AI/LLM, Cloud & DevOps, Observability & Testing, Practices) — but rendered visually (icon grid / tag clusters), not a plain list.
6. **AI/LLM Projects (Case Studies)** — Agentic Profile Matching, RAG-Based Profile Matching, Resume Analyser. Each should ideally get a mini case-study treatment: Problem → Approach/Architecture → Stack → Outcome. This is the most differentiating content given the "AI/LLM & Agentic Systems" positioning — don't let it read as three one-line bullets.
7. **Education** — DTU B.Tech, IT, CGPA.
8. **Contact / Footer** — email, phone (optional to display), LinkedIn, GitHub, resume download (PDF), location.

## 6. Recommended Additions (missing from resume but expected for a Senior/Lead SWE portfolio)

- **GitHub presence**: link + optionally embed pinned repos or contribution graph (via GitHub's public API/widgets — still frontend-only, no backend needed).
- **Resume PDF download** — a static file in `/public`, always in sync with site content.
- **Project case-study depth**: for at least the top 1–2 AI projects, add architecture diagrams or a short "how it works" walkthrough. This is what separates a senior candidate from a list of tools.
- **Leadership/mentorship callout** — team of 9, mentoring juniors — this deserves its own visible moment, not just a bullet inside Air India's entry, since it signals Lead-level scope.
- **Now/Currently exploring** section — 1–2 lines on what he's currently learning/building (signals active growth, common in senior engineer portfolios).
- **Testimonials/recommendations** (optional) — short quotes from managers/peers if available (LinkedIn recommendations can be repurposed as static text).
- **Blog / Writing (optional, future-ready)** — even if empty at launch, structuring the site (via MDX collection) so a `/blog` can be added later without rearchitecting.
- **Contact form** — since there's no backend, use a static-friendly form service (Formspree, EmailJS, Getform, or a `mailto:` link as the simplest fallback). Needs explicit decision.
- **Open Source / Certifications** (if any exist) — placeholder section, can stay hidden if empty.

## 7. Non-Functional Requirements

- **SEO**: proper `<title>`, meta description, Open Graph + Twitter card tags, `sitemap.xml`, `robots.txt`. Use Next.js Metadata API.
- **Performance**: target Lighthouse 90+ across the board; optimize images via `next/image`; avoid heavy unused JS.
- **Accessibility**: semantic HTML, color contrast, visible focus states, alt text, keyboard navigation, respects `prefers-reduced-motion`.
- **Responsiveness**: mobile-first; must work well from ~360px width up to large desktop.
- **Analytics** (optional but recommended): Vercel Analytics or Plausible — frontend-only, no backend needed.
- **Dark/Light mode** (optional, decide explicitly — not assumed by default).
- **Social share preview**: custom OG image so links shared on LinkedIn/Twitter look intentional.
- **404 page** and graceful empty/error states even with no backend.
- **Print-friendly resume view** (optional) — a clean `/resume` route that prints well, complementing the PDF download.

## 8. Edge Cases & Open Questions

| # | Edge Case | Why it matters | Needs decision? |
|---|---|---|---|
| 1 | Contact form with no backend | Form submissions need a third-party handler (Formspree/EmailJS) or fallback to `mailto:` | Yes |
| 2 | Resume PDF goes out of sync with site content | Decide: PDF is source of truth downloadable as-is, or auto-generate not needed for v1 | Yes |
| 3 | Long project descriptions vs. scannability | Use expandable/"read more" cards or a dedicated case-study page per project | Yes |
| 4 | Adding a new job/project later | Data-driven structure (see §4) so it's a content change, not a code change | Resolved by architecture |
| 5 | Phone number visibility | Public phone number on internet = spam risk; consider hiding or requiring click-to-reveal | Yes |
| 6 | Empty future sections (blog, testimonials, certifications) | Should not render broken/empty UI — conditionally render sections only when data exists | Resolved by architecture |
| 7 | Analytics/privacy | If analytics added, needs a lightweight, privacy-respecting cookie notice if using cookie-based tools | Yes, if analytics added |
| 8 | Domain name | vercel.app subdomain vs custom domain (e.g. harshitmeena.dev) | Yes |
| 9 | Content freshness (skills, current role) | Since it's static, needs a personal reminder/process to update after job changes | Process, not code |
| 10 | Multiple CTAs competing for attention | Decide ONE primary CTA (e.g. "View Resume" or "Contact Me") to avoid diluted hero | Yes |
| 11 | Accessibility of animations/interactive AI project demos | Any interactive diagram must degrade gracefully without JS/motion | Resolved by build standard |

## 9. Explicitly Out of Scope (v1)

- Backend APIs, authentication, database.
- CMS/admin panel for non-technical content editing.
- Real-time features (chat, live status).
- Automated resume-PDF generation from site data.

## 10. Success Criteria

- A hiring manager can, within 90 seconds of landing, state: what he does, how many years, what stack, one standout project, and how to contact him.
- A technical reviewer can find real architectural detail on at least the top AI/LLM project.
- Lighthouse scores 90+ (Performance, Accessibility, Best Practices, SEO).
- Adding a new job or project requires editing/adding one data file — zero layout/component changes.
