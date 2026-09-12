# Evaluation Guide — Harshit Meena Portfolio

How to **judge** whether the build meets architecture and implementation goals. Use after Phases 4–9 (and again on production). Sources: `docs/architecture.md`, `docs/implementation.md`.

**Pass rule for v1:** All **P0** checks pass. **P1** should pass before calling quality done (Phase 8). **P2** is stretch / Phase 10.

---

## 1. Success criteria (architecture §22)

| ID | Criterion | How to evaluate | Pass |
|---|---|---|---|
| S1 | **90s scan clarity** | Blind test below (§2) | Tester answers all five prompts correctly without help |
| S2 | **Technical depth** | Open top featured AI/LLM project (home expanded + `/projects/[slug]` if present) | Can explain problem, approach/architecture, stack, outcome; static diagram readable |
| S3 | **Lighthouse 90+** | Chrome Lighthouse on production URL, Mobile + Desktop | Performance, Accessibility, Best Practices, SEO each ≥ 90 |
| S4 | **One-file content edits** | Add a fake job in `data/experience.ts` only; rebuild/refresh | New entry appears; no section component changes required |

---

## 2. Blind 90-second scan test (S1)

**Setup:** Fresh browser profile or private window. Open `/`. Timer **90 seconds**. No scrolling instructions beyond “use the page as a recruiter would.”

**After time expires, the tester must state:**

1. What does he do? (role / positioning — Lead SWE, AI/LLM & agentic signal)
2. Roughly how many years / seniority signal?
3. What stack or skill areas stand out?
4. One standout project name or outcome?
5. How do you contact him or get the resume?

**Fail if:** Primary CTA unclear, metrics buried/missing, competing equal-weight CTAs, or contact/resume not findable in time.

**Also check (quick):**
- [ ] Hero shows **Harshit Meena** as dominant brand signal
- [ ] Title matches: `Lead Software Engineer | AI/LLM & Agentic Systems`
- [ ] Primary CTA is **View Resume** (Contact secondary; socials quiet)
- [ ] Impact metrics appear early (immediately after / tight under hero)
- [ ] No stats/projects/address clutter inside the first viewport hero budget

---

## 3. Phase gate checklist

Use at the end of each implementation phase before starting the next.

### Phase 0 — Foundations
- [ ] `next build` succeeds
- [ ] Folders match architecture layout (`app`, `components/*`, `data`, `content`, `lib`, `public`)
- [ ] `.env.example` lists `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_FORM_ENDPOINT`

### Phase 1 — Design system & shadcn
- [ ] Light-only Precision Slate; no dark-mode toggle
- [ ] Tokens map to Precision Slate (`docs/web-design/DESIGN.md`), not stock shadcn purple
- [ ] Soft-technical radii + cool ambient elevation per DESIGN.md
- [ ] Baseline primitives present only as needed (`button`, `badge`, `separator`, accordion/collapsible, form controls)
- [ ] Primary `#0284C7` contrast acceptable on `#F8FAFC` / white

### Phase 2 — Content model
- [ ] `lib/types.ts` + `/data/*.ts` compile
- [ ] Empty optional modules (`testimonials`, `certifications`, disabled github) do not force UI
- [ ] Skill categories match resume set exactly

### Phase 3 — App shell
- [ ] Home section order: Hero → Metrics → About → Leadership → Experience → Skills → Projects → Now → (GitHub) → Education → Contact
- [ ] Emptying a data module removes that section (no blank chrome)
- [ ] Landmarks: `header`, `main`, `nav`, `footer`; anchors work

### Phase 4 — Scan sections
- [ ] Hero / Metrics / About / Leadership / Experience / Skills implemented from data
- [ ] Timeline expandable; uneven bullet counts don’t break layout
- [ ] `/public/resume.pdf` downloads via primary CTA

### Phase 5 — Projects & depth
- [ ] Three AI projects with Problem → Approach → Stack → Outcome
- [ ] Compact + expanded states
- [ ] Featured project has static diagram and/or deep route
- [ ] Unknown project slug → 404 / `notFound()`

### Phase 6 — Contact & closing
- [ ] Now + Education render when data present
- [ ] Form posts to third-party **or** mailto clearly works; mailto always available as fallback
- [ ] Phone omitted or click-to-reveal (not raw at rest)
- [ ] No empty Blog/Testimonials/Cert sections visible

### Phase 7 — SEO & 404
- [ ] Title + description + OG/Twitter tags present
- [ ] Custom OG preview looks intentional (LinkedIn/Twitter debugger)
- [ ] `sitemap` + `robots` correct for public routes
- [ ] Branded `not-found` page with home link

### Phase 8 — Quality bar
- [ ] Keyboard: nav, accordion/collapsible, form, focus-visible
- [ ] `prefers-reduced-motion` kills non-essential animation
- [ ] Diagrams legible with JS disabled / motion reduced
- [ ] Responsive: 360 / 768 / 1024 / 1440
- [ ] Lighthouse ≥ 90 all four categories (S3)
- [ ] No heavy unused shadcn surfaces

### Phase 9 — Launch
- [ ] Production URL live; env vars set
- [ ] Resume + form + OG + 404 verified on production
- [ ] Content freeze: PDF ↔ experience/metrics/skills aligned
- [ ] No lorem/placeholders in visible UI

### Phase 10 — Optional (P2)
- [ ] GitHub / analytics / `/resume` print / blog only if scoped; still hide-when-empty

---

## 4. Functional evaluation matrix

| Area | Checks | Priority |
|---|---|---|
| Hero | Brand, title, tagline, single primary CTA, secondary contact/socials | P0 |
| Metrics | 4–6 scannable figures; mono numerals; early placement | P0 |
| About | Distributed → AI/LLM narrative readable | P0 |
| Leadership | Own callout, not only buried bullet | P0 |
| Experience | Timeline UI; 4 roles; expand bullets; mobile connector legible | P0 |
| Skills | All 8 category groups; tag/chip UI | P0 |
| Projects | 3 case studies; expand; featured depth | P0 |
| Education | DTU / B.Tech IT / CGPA | P0 |
| Resume PDF | Reachable, downloads, file present in `/public` | P0 |
| Contact | Email + form and/or mailto; success/error if form used | P0 |
| Now | Shows when data exists | P1 |
| Deep project route | SSG slugs; content matches featured | P1 |
| Static diagrams | Meaningful without animation | P1 |
| 404 | On-brand | P1 |
| SEO/OG | Metadata + share preview | P1 |
| GitHub panel | Optional; no broken empty state | P2 |
| Analytics | Optional; privacy notice if cookies | P2 |
| Print `/resume` | Optional | P2 |
| Blog | Optional; hidden when empty | P2 |

---

## 5. Non-functional evaluation

### 5.1 Performance
- [ ] SSG pages (View Source / no loading spinner for core content)
- [ ] Server Components default; client JS limited to interactive islands
- [ ] `next/font` / `next/image` used appropriately
- [ ] Lighthouse Performance ≥ 90 (mobile)

### 5.2 Accessibility
- [ ] Semantic headings in order per section
- [ ] Contrast: text and primary controls on light canvas
- [ ] Focus visible; full keyboard path
- [ ] Form labels associated
- [ ] Informative images have alt; decorative SVG `aria-hidden`
- [ ] Reduced motion respected
- [ ] Lighthouse Accessibility ≥ 90

### 5.3 SEO & share
- [ ] Unique title/description
- [ ] OG + Twitter tags
- [ ] Canonical / `metadataBase` from `NEXT_PUBLIC_SITE_URL`
- [ ] Sitemap includes `/` and project slugs
- [ ] Lighthouse SEO ≥ 90

### 5.4 Responsiveness
- [ ] Usable at ~360px: single column, timeline intact, metrics wrap cleanly
- [ ] Desktop asymmetric panel language preserved (not a totally different theme)

### 5.5 Design-system fidelity (spot check)
- [ ] Light-only Precision Slate & Electric Cyan look
- [ ] shadcn used but restyled (not default SaaS kit)
- [ ] No Inter-as-primary / purple gradient / cream-terracotta clichés
- [ ] Mono reserved for dates, tags, metrics, indices
- [ ] Visual QA vs `docs/web-design/code.html` / `docs/responsive-design/code.html`

---

## 6. Architecture compliance eval

| Rule | Test | Pass |
|---|---|---|
| Frontend-only | No first-party content API/DB/auth in repo | No backend scope creep |
| Content ≠ UI | Grep sections for hardcoded employer/project strings that belong in `/data` | Copy lives in data/MDX |
| Hide empty | Set testimonials to `[]`, reload | Section absent |
| One primary CTA | Inspect hero | Resume primary only |
| shadcn lean | List `components/ui` | No unused tables/charts/carousels |
| Light-only | UI inspection | No theme toggle |
| Progressive enhancement | Disable JS or block hydration for diagram/critical copy | Core content still readable |

---

## 7. Content maintainability eval (S4)

**Procedure:**
1. Duplicate an experience entry with a unique company name in `data/experience.ts` only.
2. Run dev/build; confirm it appears on the timeline.
3. Revert.
4. Optionally add a non-featured project object only in `data/projects.ts`; confirm compact card appears.
5. Confirm README/docs still say: new job/project = data file, not layout rewrite.

**Fail if:** Editing layout/section components was required for a normal content add.

---

## 8. Integration eval

| Integration | Test | Pass |
|---|---|---|
| Resume | Click primary CTA on prod | PDF opens/downloads |
| Form | Submit valid message | Success UI; message received at provider |
| Form failure | Invalid endpoint or offline | Error UI + mailto still usable |
| Mailto | Click fallback | Mail client opens with address |
| OG | Paste URL in LinkedIn/Twitter card validator | Custom image + title |
| Env | Wrong/missing `NEXT_PUBLIC_SITE_URL` on preview | Document expected breakage (canonical/OG); fix before prod |

---

## 9. Production launch eval (Phase 9)

- [ ] Production URL matches intended domain decision
- [ ] Env vars set on Vercel
- [ ] Smoke: home, project deep link, resume, contact, 404
- [ ] Content freeze checklist signed (PDF ↔ site)
- [ ] S1–S4 all pass on production, not only localhost

---

## 10. Scoring summary (optional)

| Category | Weight | Score (0–100) | Notes |
|---|---|---|---|
| S1 Scan clarity | 30% | | Blind test |
| S2 Technical depth | 25% | | Featured project |
| S3 Lighthouse | 25% | | Min of 4 categories, or all-or-nothing ≥90 |
| S4 Maintainability | 10% | | One-file edit test |
| Architecture/design fidelity | 10% | | §5.5 + §6 |

**v1 ship:** weighted feel is secondary — **all S1–S4 must pass**.

---

## 11. When to re-run eval

| Trigger | Re-run |
|---|---|
| End of Phases 4, 5, 6, 8, 9 | Relevant gates + S1/S2 as applicable |
| Content freeze / resume update | S1, resume integration, freeze checklist |
| Adding shadcn components or heavy client JS | S3 |
| New featured project | S2 |
| Domain or env change | SEO/OG + production smoke |

---

## Related docs

- `docs/architecture.md` — success criteria, NFRs, compliance rules
- `docs/implementation.md` — phase exit criteria
- `docs/edgecase.md` — edge cases and expected handling
- `docs/design-prompt.md` — visual acceptance reference
- `docs/context.md` — product decisions
