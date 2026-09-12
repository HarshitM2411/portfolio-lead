# Portfolio — Harshit Meena

Next.js (App Router) personal portfolio. Visual system: **Precision Slate & Electric Cyan** (`docs/web-design/`, `docs/responsive-design/`).

## Env

Copy `.env.example` → `.env`:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (set after Vercel deploy) |

Contact uses **mailto** to `meenaharshit30@gmail.com` (opens the visitor’s email app). No form backend.
## Routes

| Path | Notes |
|---|---|
| `/` | Portfolio |
| `/resume` | Print-friendly resume |
| `/blog` | Shell (hidden from footer until posts exist) |
| `/projects/[slug]` | Featured case studies |
| `/dev/ui` | Phase 1 component sandbox |

## Content updates

Structured content lives in `data/*.ts` — **not** inside section JSX.

| Change | Edit |
|---|---|
| New job | `data/experience.ts` only |
| Metric | `data/metrics.ts` |
| Skill | `data/skills.ts` |
| Project | `data/projects.ts` (+ `content/projects/*.mdx` if featured) |
| Blog post | `content/blog/*.md` or `.mdx` with frontmatter |
| Site links / email | `data/site.ts` |
| Resume PDF | replace `public/resume.pdf` and keep `/data` in sync |

Empty arrays (testimonials, certifications) hide those sections. Blog footer link appears only when published posts exist.
