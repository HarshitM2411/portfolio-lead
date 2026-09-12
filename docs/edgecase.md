# Edge Cases — Harshit Meena Portfolio

Catalog of edge cases, expected handling, and verification. Derived from `docs/architecture.md` (§14, §17–18), `docs/implementation.md` (phase exits), and locked product decisions in `docs/context.md`.

**Legend**

| Status | Meaning |
|---|---|
| Locked | Decision made; implement exactly this way |
| Resolved by architecture | Pattern is structural; no open product choice |
| Process | Owner habit / checklist, not code |
| Open | Still choose at launch (does not block building) |
| Optional | Only if Phase 10 feature is enabled |

---

## 1. Summary table

| ID | Edge case | Status | Expected handling |
|---|---|---|---|
| EC-01 | Contact form with no backend | Locked | Third-party form (Formspree/Getform/EmailJS) + always-visible `mailto:` |
| EC-02 | Resume PDF out of sync with site | Locked | PDF in `/public` is download SoT; manual sync; no PDF codegen in v1 |
| EC-03 | Long vs short project copy | Locked | Compact + expandable on home; deep `/projects/[slug]` for featured |
| EC-04 | Adding a new job/project later | Resolved | Append `/data` (and MDX if featured); zero layout rewrites |
| EC-05 | Phone number on a public site | Locked | Omit or click-to-reveal; never raw number at rest |
| EC-06 | Empty future sections | Resolved | Do not render when data empty |
| EC-07 | Analytics vs privacy/cookies | Optional | Prefer cookieless; else lightweight notice |
| EC-08 | Domain (`vercel.app` vs custom) | Open | Drive canonical/OG via `NEXT_PUBLIC_SITE_URL` |
| EC-09 | Content goes stale after job change | Process | Owner update checklist; optional `lastUpdated` later |
| EC-10 | Competing hero CTAs | Locked | Single primary: **View Resume** |
| EC-11 | Animated/interactive diagrams | Resolved | Static diagram is source of meaning; motion optional |
| EC-12 | Uneven experience bullet counts | Resolved | Timeline UI tolerates 2 vs 4–5 bullets |
| EC-13 | Missing resume file | Resolved | Keep PDF in repo; broken CTA is a release blocker |
| EC-14 | Unknown route | Resolved | Branded `not-found` + link home |
| EC-15 | Project slug without MDX/content | Resolved | `notFound()` on `/projects/[slug]` |
| EC-16 | Form provider down / bad endpoint | Resolved | Inline error + mailto fallback |
| EC-17 | JS disabled / hydration fail | Resolved | Core copy + static diagrams still readable |
| EC-18 | `prefers-reduced-motion` | Resolved | No essential info only in animation |
| EC-19 | Narrow mobile (~360px) | Resolved | Single column; timeline/metrics remain legible |
| EC-20 | Very long skill lists / tag overflow | Resolved | Wrap chips; no horizontal page scroll |
| EC-21 | Missing env vars | Resolved | Document; form/OG may degrade; fix before prod |
| EC-22 | Color mode / `prefers-color-scheme` | Locked | **Light-only** Precision Slate; no dark toggle in v1 |
| EC-23 | GitHub API rate limit / widget fail | Optional | Prefer static links; degrade panel or hide |
| EC-24 | Testimonials/certs/blog empty at launch | Resolved | Same as EC-06 — hide |
| EC-25 | Multiple featured projects | Resolved | Support N featured; don’t force equal depth on all three |
| EC-26 | Resume open vs download UX | Locked | One consistent behavior site-wide (pick open-or-download and stick to it) |
| EC-27 | Scrapers / PII in PDF | Process | PDF may contain contact info intentionally; homepage phone still gated |
| EC-28 | CSP / third-party form embeds | Optional | Tighten headers if embeds break; forms via simple POST preferred |
| EC-29 | Preview vs production URLs | Resolved | Env per Vercel environment; don’t hardcode domain in content |
| EC-30 | Out-of-scope feature pressure | Locked | No backend, CMS admin, auth, PDF codegen, alternate UI kits, light mode |

---

## 2. Detailed cases

### EC-01 — Contact without a backend

**Why it matters:** Users must message Harshit; there is no first-party API.

**Handling:**
- Contact UI uses shadcn form controls
- Submit to `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree / Getform / EmailJS)
- Always show `mailto:` fallback
- No Next.js Route Handler required for v1

**Verify:** Successful submit in preview; mailto works if endpoint unset; no implied custom server validation.

**Implementation phase:** 6

---

### EC-02 — Resume PDF vs site content drift

**Why it matters:** Hero CTA promises a resume; site bullets may diverge after edits.

**Handling:**
- `/public/resume.pdf` is the download source of truth for v1
- Site copy lives in `/data`; owner syncs both before launch/content freeze
- No automated PDF generation (out of scope)

**Verify:** Phase 9 content freeze checklist — dates, metrics, title, contact match PDF.

**Implementation phase:** 4 (wire), 9 (freeze)

---

### EC-03 — Long vs short project descriptions

**Why it matters:** Recruiters need scan; engineers need depth.

**Handling:**
- Home: compact card + expand (Problem → Approach → Stack → Outcome)
- Featured: static diagram and/or `/projects/[slug]` MDX
- Non-featured may stay compact-only

**Verify:** All three projects scannable collapsed; at least one featured path has real architecture detail (`eval.md` S2).

**Implementation phase:** 5

---

### EC-04 — Adding jobs/projects later

**Why it matters:** Success criterion S4 / maintainability.

**Handling:**
- New job → `data/experience.ts`
- New compact project → `data/projects.ts`
- New featured case study → data + `content/projects/*.mdx` + optional diagram
- No new section React component unless introducing a **new section type**

**Verify:** One-file edit test in `eval.md` §7.

**Implementation phase:** 2 (model), ongoing

---

### EC-05 — Phone visibility / spam

**Why it matters:** Public HTML numbers get scraped.

**Handling:**
- Default: omit phone **or** click-to-reveal client island
- Do not leave raw number in initial static HTML if reveal strategy is chosen
- Email + LinkedIn + form remain primary contact paths

**Verify:** View-source / disable JS: no unprotected phone if reveal pattern used.

**Implementation phase:** 6

---

### EC-06 / EC-24 — Empty optional sections

**Why it matters:** Empty Blog / Testimonials / Certifications / GitHub look broken.

**Handling:**
- `hasContent` gates in `lib/content.ts`
- `page.tsx` skips section entirely
- No “coming soon” empty cards by default

**Verify:** Set arrays to `[]` / disable flags → section DOM absent.

**Implementation phase:** 3, 6, 10

---

### EC-07 — Analytics and cookies

**Why it matters:** Privacy expectations; banner clutter fights design restraint.

**Handling:**
- Prefer Vercel Analytics or Plausible cookieless
- If cookie-based tool used → minimal notice component
- Analytics is Phase 10 optional — not required for v1 pass

**Verify:** No banner if cookieless; if cookies, notice present and dismissible/accessible.

**Implementation phase:** 10

---

### EC-08 — Domain choice

**Why it matters:** Canonical URLs, sitemap, OG absolute links.

**Handling:**
- Architecture supports both `*.vercel.app` and custom domains
- Single source: `NEXT_PUBLIC_SITE_URL`
- Do not hardcode production host in components

**Verify:** After domain attach, update env; re-check sitemap + OG debugger.

**Implementation phase:** 7, 9

---

### EC-09 — Content freshness

**Why it matters:** Static site won’t update itself after a job change.

**Handling:**
- Process: update `/data` + resume PDF together
- Optional later: `lastUpdated` on `site.ts` (not required v1)

**Verify:** Owner can follow a short update checklist (pointed from launch notes).

**Implementation phase:** Process / 9

---

### EC-10 — Competing CTAs

**Why it matters:** Diluted hero fails 90s scan.

**Handling:**
- Primary: **View Resume**
- Secondary: Contact (quieter)
- GitHub / LinkedIn: icon or text links, not equal buttons

**Verify:** Blind scan test (`eval.md` S1).

**Implementation phase:** 4

---

### EC-11 / EC-17 / EC-18 — Diagrams, JS, reduced motion

**Why it matters:** Deep-dive value and a11y must not depend on animation.

**Handling:**
- Static SVG/image (or static DOM diagram) carries meaning
- One load motion max is enhancement only
- `prefers-reduced-motion: reduce` → static fallback
- Core case-study text readable without client JS

**Verify:** Reduced-motion OS setting; optional JS-disabled spot check on featured project.

**Implementation phase:** 5, 8

---

### EC-12 — Uneven timeline content

**Why it matters:** Real jobs have 2–5 bullets; UI must not look broken.

**Handling:**
- Accordion/Collapsible per role
- No fixed equal-height assumption that clips or huge empty panels

**Verify:** Temporarily give one role 2 bullets and another 5; layout stays coherent.

**Implementation phase:** 4

---

### EC-13 — Missing resume file

**Why it matters:** Primary CTA 404s — trust failure.

**Handling:**
- Commit `public/resume.pdf`
- Treat missing file as release blocker
- Optional: simple CI/file-existence check later

**Verify:** CTA on production returns 200 for PDF.

**Implementation phase:** 4, 9

---

### EC-14 — Unknown routes

**Why it matters:** Bad shares / typos still need credibility.

**Handling:**
- `app/not-found.tsx` — hairline panel, mono error code, link home
- Matches Systems Engineer visual language

**Verify:** Visit `/this-does-not-exist`.

**Implementation phase:** 7

---

### EC-15 — Invalid or incomplete project slug

**Why it matters:** Deep links may be bookmarked before content exists.

**Handling:**
- `generateStaticParams` from known projects
- Missing content → `notFound()`

**Verify:** Hit a bogus `/projects/not-a-real-slug`.

**Implementation phase:** 5

---

### EC-16 — Form provider failure

**Why it matters:** Network/provider errors shouldn’t dead-end the user.

**Handling:**
- Inline error message
- Mailto remains visible and usable
- Don’t fake “sent” on failure

**Verify:** Temporarily break endpoint in preview; confirm error + mailto.

**Implementation phase:** 6

---

### EC-19 — Narrow viewports

**Why it matters:** Many recruiters scan on phones.

**Handling:**
- Mobile-first; ~360px minimum target
- Asymmetric grid → single column
- Timeline keeps connector language; metrics wrap (e.g. 2×2)

**Verify:** 360 / 768 widths in Phase 8 responsive pass.

**Implementation phase:** 3–8

---

### EC-20 — Skill / tag overflow

**Why it matters:** Long AI/Cloud lists can blow horizontal layout.

**Handling:**
- Wrapping badge/chip clusters
- No page-level horizontal scroll

**Verify:** Skills section at 360px and desktop.

**Implementation phase:** 4

---

### EC-21 / EC-29 — Env and preview URLs

**Why it matters:** Wrong canonical/OG on previews; form missing in prod.

**Handling:**
- `.env.example` documents required public vars
- Set per Vercel environment
- Preview may use preview URL as `NEXT_PUBLIC_SITE_URL`

**Verify:** Launch checklist includes env confirmation.

**Implementation phase:** 0, 7, 9

---

### EC-22 — Color mode / `prefers-color-scheme`

**Why it matters:** OS may prefer dark; product chose luminous light canvas.

**Handling:**
- Ship Precision Slate light tokens at root
- Do not add dark theme or toggle in v1
- Accept OS dark preference without flipping the site

**Verify:** No theme switcher; site remains light slate/cyan.

**Implementation phase:** 1

---

### EC-23 — GitHub presence failures

**Why it matters:** API limits or embed failures shouldn’t break home.

**Handling:**
- Prefer static links first
- If widget/fetch fails → hide panel or show links-only fallback
- No GitHub token in v1 unless explicitly accepted later

**Verify:** With feature enabled, broken network doesn’t crash `/`.

**Implementation phase:** 10

---

### EC-25 — Multiple featured projects

**Why it matters:** Not every project needs equal depth.

**Handling:**
- `featured` flag on project records
- Diagrams/MDX only where flagged
- Home still lists all projects compactly

**Verify:** One featured vs two featured both work without empty diagram slots on non-featured.

**Implementation phase:** 5

---

### EC-26 — Resume open vs download

**Why it matters:** Inconsistent buttons confuse.

**Handling:**
- Choose one: `download` attribute **or** open in new tab
- Same behavior for hero and footer/contact

**Verify:** Both CTAs behave identically.

**Implementation phase:** 4, 6

---

### EC-27 — PII surface area

**Why it matters:** Spam and privacy.

**Handling:**
- Homepage: gate phone (EC-05)
- PDF may include fuller contact intentionally
- Form data processed by third party (review provider privacy)

**Verify:** Homepage scrape surface minimized; PDF intentional.

**Implementation phase:** 6, 9

---

### EC-28 — Third-party embeds vs CSP

**Why it matters:** Strict headers can break forms/widgets.

**Handling:**
- Prefer simple form POST over heavy iframes
- If CSP tightened later, allowlist provider domains
- Default Vercel headers OK for v1 unless embeds require more

**Verify:** Form works on production after any header changes.

**Implementation phase:** 6, 9–10

---

### EC-30 — Scope creep

**Why it matters:** Breaks frontend-only architecture and timeline.

**Handling — explicitly refuse in v1:**
- Backend APIs, auth, database
- CMS/admin UI
- Real-time chat/presence
- Auto PDF generation from site data
- MUI/Chakra/Ant (shadcn only)
- Light/dark theme system

**Verify:** Architecture compliance in `eval.md` §6.

**Implementation phase:** All

---

## 3. Error & empty state matrix (quick ref)

| State | UI / system response |
|---|---|
| Empty optional section | Omit from DOM |
| Unknown URL | Branded 404 |
| Bad project slug | `notFound()` |
| Form error | Message + mailto |
| Missing PDF | Block release; fix asset |
| Reduced motion | Static fallback |
| No form env | Mailto-only path still clear |
| No blog posts | No blog nav/section |

---

## 4. Test checklist (edge-case pass)

Run before Phase 9 sign-off (and on production smoke):

- [ ] EC-01 Form success + mailto fallback
- [ ] EC-02 Content freeze PDF ↔ site
- [ ] EC-03 Compact/expand + featured depth
- [ ] EC-04 Add job via data file only
- [ ] EC-05 Phone gated or absent
- [ ] EC-06 Empty testimonials/certs/blog → hidden
- [ ] EC-10 Single primary CTA
- [ ] EC-11/18 Diagram + reduced motion
- [ ] EC-12 Uneven bullets
- [ ] EC-13 Resume 200
- [ ] EC-14 404 page
- [ ] EC-15 Bad project slug
- [ ] EC-16 Broken form endpoint
- [ ] EC-19 360px layout
- [ ] EC-22 No dark toggle (light-only)
- [ ] EC-30 No out-of-scope backend/CMS

Optional if enabled: EC-07, EC-23, print `/resume`, blog empty-hide.

---

## 5. Mapping to implementation phases

| Phase | Edge cases to actively handle |
|---|---|
| 0 | EC-21 (env example) |
| 1 | EC-22 |
| 2 | EC-04, EC-06 |
| 3 | EC-06, EC-19 (shell) |
| 4 | EC-10, EC-12, EC-13, EC-20, EC-26 |
| 5 | EC-03, EC-11, EC-15, EC-25 |
| 6 | EC-01, EC-05, EC-16, EC-24, EC-26, EC-27 |
| 7 | EC-08, EC-14, EC-29 |
| 8 | EC-17, EC-18, EC-19 |
| 9 | EC-02, EC-08, EC-09, EC-13, EC-21, EC-30 |
| 10 | EC-07, EC-23, blog/print optionals |

---

## Related docs

- `docs/architecture.md` — architectural responses and out-of-scope
- `docs/implementation.md` — when to implement each handling
- `docs/eval.md` — how to score pass/fail
- `docs/context.md` — locked product decisions
- `docs/problemstatement.md` — original edge-case list
