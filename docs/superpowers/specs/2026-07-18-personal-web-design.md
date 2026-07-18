# Personal Website — Design Spec

**Date:** 2026-07-18
**Owner:** Ahmed Rayhan Primadedas (arayhan)
**Status:** Approved in brainstorming session (structure, architecture, motion system all user-approved)

## 1. Purpose & Audience

Personal website for rayhan.dev showcasing Rayhan as a frontend engineer. Audience priority:

1. **Recruiters / employers** — professional experience and CV front and center
2. **Freelance clients** — portfolio results and a working contact channel
3. **Dev community / readers** — blog and community/speaking work

Event organizers (speaking) are served but not prioritized. Success = the site itself is a portfolio piece: Awwwards-level motion polish, on the Prima design language, that loads fast and reads professionally.

## 2. Scope

**In scope (v1):** homepage scroll narrative (8 content areas), portfolio case-study detail pages, blog list + detail with dummy data, working contact form, CV download, EN/ID i18n, GSAP scroll + page-transition system, isometric SVG hero.

**Out of scope (v1):** dark mode, real CMS/blog backend, 3D (three.js/WebGL), literal Barba.js, analytics dashboards, comments.

## 3. Site Map

All routes are locale-prefixed (`/en`, `/id`; EN default).

| Route | Purpose |
|---|---|
| `/` | Scroll-driven homepage narrative (all sections) |
| `/work/[slug]` | Portfolio case-study detail |
| `/blog` | Blog list (dummy data) |
| `/blog/[slug]` | Blog detail (dummy data; 404 on unknown slug) |
| `/cv` | Serves/redirects to the CV PDF download |
| `/api/contact` | Contact form handler (Resend) |

### Homepage section order

1. **Hero** — animated isometric workspace SVG (GSAP parallax layers, idle float), Clash Display caps headline, TextScramble role line, scroll cue; fixed `ScrollProgress` bar at top.
2. **About** — short bio (from CV summary) + `CountUp` stat strip: 7+ years, 71% hosting cost cut, 1,800+ community members, 10+ talks.
3. **Selected Work** — 4–5 `TiltCard` case studies (SMILE 5.0, Anify, Founderplus, Astra SAM Advance, Unit Cost RS) linking to `/work/[slug]` via page transition.
4. **Experience — Professional** — pinned, scrub-through `TimelineItem` timeline: Anify (Lead, 2025–2026), Badr Interactive (2022–present), Founderplus (2020–2022), Skydu (2019–2020), Integrasi Media Kreasi (2017–2018).
5. **Experience — Freelance** — compact grid: Founderplus freelance (2022–2024), Unit Cost RS, client outsourcing (NFJuara, SOHO E-Detailing).
6. **Experience — Academic & Mentoring** — STT Terpadu Nurul Fikri (GPA 3.67), Kampus Merdeka bootcamps, GoTo Impact Foundation mentorships (Generasi Gigih 2.0 & 3.0), Skydu Academy instructor.
7. **Speaking & Community** — GDG Depok Organizer (1,800+ members), GDSC Lead (1 of 45 in Indonesia), 10+ talks; `Marquee` strip of talk topics; awards.
8. **Blog teaser** — latest 3 dummy posts → `/blog`.
9. **Contact** — working form + `SocialLinks` (Instagram, Medium, GitHub, LinkedIn) + Download CV button.

## 4. Stack

- **Framework:** Next.js 15, App Router, TypeScript strict
- **Styling:** Tailwind CSS v4 + `@arayhan/prima-ui` via its `tailwind.css` token bridge; Prima components used wherever one exists
- **Motion:** GSAP + ScrollTrigger (scroll narrative, page transitions), Framer Motion + Prima micro-interaction primitives (hover/tap)
- **Data:** TanStack Query over typed local content modules (blog behaves like a remote source so a CMS can replace it later by changing one use-case)
- **i18n:** next-intl (`/en`, `/id` prefixes; middleware)
- **Forms:** React Hook Form + Zod; API route sends via Resend
- **Quality:** ESLint, Prettier, Vitest (use-cases), Playwright (smoke), Lighthouse target 90+ perf
- **Deploy:** Vercel, domain rayhan.dev

## 5. Project Structure

Feature-driven, benchmarked on anify-frontend:

```
src/
  app/[locale]/
    page.tsx                       # home — composes module sections
    work/[slug]/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    cv/route.ts                    # redirect/serve CV PDF
    layout.tsx  not-found.tsx  error.tsx
  app/api/contact/route.ts         # Resend handler (locale-independent)
  modules/
    hero/       { components/, use-cases/ }
    about/      work/       experience/
    speaking/   blog/       contact/
  components/                      # PageTransition, SectionShell, LocaleSwitcher, CursorDot
  libs/                            # gsap.ts, query-client.ts, resend.ts, i18n.ts
  content/
    en/  id/                       # profile.ts, experience.ts, projects.ts, talks.ts, posts.ts
    types.ts                       # Experience, Project, Talk, Post interfaces
  utils/
public/cv/CV-Ahmed-Rayhan-Primadedas.pdf
messages/en.json, id.json          # next-intl UI strings
```

Rules: routes in `app/` are thin (import + compose from modules); each module owns its components, GSAP triggers, and data access; all user-editable content lives only in `src/content/`.

## 6. Content Model

Typed TS objects per locale in `src/content/{en,id}/`. Interfaces in `content/types.ts`:

- `Profile` — name, role, summary, stats, socials, CV path
- `Experience` — company, role(s), period, location, type (`professional | freelance | academic | mentoring`), highlights[], technologies[]
- `Project` — slug, title, client, summary, role, period, highlights[], technologies[], caseStudy body sections
- `Talk` — title, event, date, topic, link?
- `Post` — slug, title, excerpt, date, tags[], readingTime, body (markdown string); **dummy data in v1**

Real content sourced from `CV - Ahmed Rayhan Primadedas - Complete - v3.0.pdf` (already extracted during brainstorming). ID-locale content translated from the same source; user reviews translations. Blog getters go through TanStack Query (`getPosts`, `getPost(slug)`) — the only code that changes when a real backend arrives.

## 7. Motion System

Three tiers; every animation is disabled/reduced under `prefers-reduced-motion`.

### 7.1 Page transitions (Barba-style, not Barba)

Barba.js itself conflicts with App Router (PJAX vs React-owned DOM), so the same effect is built natively: a fixed `PageTransition` overlay + GSAP timeline hooked into App Router navigation. Sequence: cobalt panel wipes up → covers viewport with mono `//destination` label → route swaps → panel reveals. Duration ≤ 700ms, skippable by reduced-motion.

### 7.2 Scroll narrative (GSAP ScrollTrigger)

- `ScrollProgress` bar scrubbed to document scroll (Prima block)
- Hero: 3–4 SVG parallax layers at different scroll speeds + slow idle float loop
- Professional timeline: section pins, entries scrub in sequentially
- `SectionHeader` rules and numbers draw in on viewport enter
- `CountUp` stats fire once on view
- `RevealOnScroll` for standard section entrances

Registration: `libs/gsap.ts` registers plugins once. Each module creates its own triggers via `useGSAP` scoped to a ref, and cleans up on unmount (locale/route changes must not leak triggers).

### 7.3 Micro-interactions

`MagneticButton` (CTAs), `TiltCard` (work cards), `Spotlight` (contact block), `TextScramble` (hero), `Ripple` (buttons), plus a global `CursorDot` that scales over interactive elements (hidden on touch devices).

### 7.4 Isometric hero

Hand-built layered isometric SVG (desk, monitor with code, floating tech badges) in Prima ice/cobalt only. No 3D libraries. Layers are separate SVG groups so GSAP can parallax them independently. Inline in the page for zero request cost.

## 8. Contact Form

React Hook Form + Zod (name, email, message; honeypot field for spam). POST `/api/contact` → Resend → rayhanprima99@gmail.com. `RESEND_API_KEY` via env; **graceful degradation:** if the key is absent, the form UI is replaced by a mailto CTA so the site never shows a broken form. Success/error feedback uses Prima alert/toast components. Rate-limit: simple per-IP in-memory throttle in the route handler (best-effort on serverless).

## 9. Error Handling

- `not-found.tsx` and `error.tsx` styled in Prima language (mono `//404` treatment)
- Unknown blog/work slugs → `notFound()`
- Contact API returns typed error responses; client shows Prima error alert
- GSAP triggers are scoped and killed on unmount to prevent cross-route leaks

## 10. Testing & Quality

- **Vitest:** content getters, contact schema validation, use-cases
- **Playwright smoke:** home renders all sections, locale switch preserves route, blog list → detail navigation fires transition, contact validation errors show
- **Perf budget:** Lighthouse 90+ performance — inline hero SVG, `next/font` (or preloaded Fontshare/Google fonts per Prima), lazy-mount below-the-fold GSAP scenes
- **CI-less v1:** scripts `lint`, `typecheck`, `test`, `test:e2e` run locally; CI can come later

## 11. Git Workflow

Repo initialized at project root. Atomic commits — one logical change each (scaffold, tokens, each module, each motion tier, each content file), conventional-commit style messages.

## 12. Decisions Log

| Decision | Choice | Why |
|---|---|---|
| Structure | Hybrid (long home + subpages) | Scroll storytelling + room for blog/case-study depth + transitions to show off |
| Hero | Isometric SVG, no video | On-palette, fast, matches "isometric + less 3D"; higgsfield video rejected as off-brand/heavy |
| Barba.js | Barba-style GSAP layer instead | Barba's PJAX fights React/App Router; same visual result natively |
| Motion core | GSAP-first hybrid | ScrollTrigger pinning/scrubbing is the Awwwards ceiling; Framer for micro |
| Content | Typed local TS modules from real CV | Real content available now; CMS-shaped access layer for later |
| Blog | Dummy data behind TanStack Query | Per user request; swap point isolated to one use-case |
| Theme | Light only | Prima is light-first; halves visual QA |
| i18n | EN + ID via next-intl | User-requested |
| Contact | Resend + RHF/Zod, mailto fallback | User-requested working form; no broken states without env key |
