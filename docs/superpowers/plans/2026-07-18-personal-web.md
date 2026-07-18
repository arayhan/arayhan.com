# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build rayhan.dev — an Awwwards-grade personal site on Next.js 15 + Prima UI with a GSAP scroll narrative, Barba-style page transitions, EN/ID i18n, dummy blog behind TanStack Query, and a Resend contact form.

**Architecture:** Feature-driven modules (`src/modules/<feature>`) composed by thin `app/[locale]` routes. All editable content in typed `src/content/{en,id}` modules. Motion in three tiers: GSAP ScrollTrigger (scroll narrative), GSAP overlay (page transitions), Prima primitives (micro-interactions).

**Tech Stack:** Next.js 15 (App Router, TS strict), Tailwind v4 + `@arayhan/prima-ui` (local `file:` dep, dist prebuilt), GSAP + @gsap/react, framer-motion, @tanstack/react-query, next-intl, react-hook-form + zod + @hookform/resolvers, resend, vitest, playwright.

## Global Constraints

- Node 20.15 / pnpm 9.15 (Windows host)
- Prima UI installed as `file:../../design-systems/prima-design-system` — import components from `@arayhan/prima-ui`, styles via `@import "@arayhan/prima-ui/tailwind.css"` after `@import "tailwindcss"` in `globals.css`
- Palette: Prima tokens only (ice base, single cobalt accent). No new colors.
- Type: Clash Display caps display, Inter body, JetBrains Mono labels (`//` eyebrow convention) — all loaded by Prima's CSS from CDN; preload hints in root layout
- Every animation respects `prefers-reduced-motion` (GSAP `gsap.matchMedia()`)
- Locales: `en` (default), `id`; routes prefixed `/{locale}`
- Atomic commit at the end of every task, conventional-commit messages
- TypeScript strict; `pnpm lint && pnpm typecheck` must pass at every commit

---

### Task 1: Scaffold Next.js app

**Files:** Create Next 15 app in-place (`create-next-app` with `--ts --tailwind --eslint --app --src-dir --use-pnpm`), add `.prettierrc` (same rules as anify: singleQuote, 2-space), `.gitignore`, `next.config.ts` with `transpilePackages: ['@arayhan/prima-ui']`.

- [ ] Scaffold with create-next-app (into temp dir, move into repo root since docs/ exists)
- [ ] Verify `pnpm dev` boots and renders default page
- [ ] Commit `chore: scaffold next 15 app with tailwind v4`

### Task 2: Install dependencies & wire Prima

**Files:** `package.json`, `src/app/globals.css`, `src/app/layout.tsx`

- [ ] `pnpm add file:../../design-systems/prima-design-system gsap @gsap/react framer-motion @tanstack/react-query next-intl react-hook-form zod @hookform/resolvers resend`
- [ ] `pnpm add -D vitest @vitejs/plugin-react @playwright/test`
- [ ] globals.css: `@import "tailwindcss";` then `@import "@arayhan/prima-ui/tailwind.css";`
- [ ] Root layout: font preconnect/preload hints (Fontshare Clash Display, Google Inter/JetBrains Mono, Phosphor icons — copy exact URLs from Prima's `dist/styles.css` @imports)
- [ ] Smoke: render a Prima `Button` on the default page, verify cobalt styling in dev
- [ ] Commit `chore: add prima-ui, gsap, tanstack, i18n, form deps`

### Task 3: Content types + EN content

**Files:** `src/content/types.ts`, `src/content/en/{profile,experience,projects,talks,posts}.ts`, `src/content/index.ts`

**Interfaces (Produces — used by every module):**
```ts
export type Locale = 'en' | 'id';
export interface Stat { value: number; suffix: string; label: string }
export interface Profile { name: string; role: string; tagline: string; summary: string; location: string; email: string; stats: Stat[]; socials: { name: 'github'|'linkedin'|'instagram'|'medium'; url: string }[]; cvPath: string }
export interface ExperienceEntry { id: string; company: string; role: string; period: { start: string; end: string | null }; location: string; type: 'professional'|'freelance'|'academic'|'mentoring'; highlights: string[]; technologies: string[] }
export interface Project { slug: string; title: string; client: string; role: string; period: string; summary: string; highlights: string[]; technologies: string[]; sections: { heading: string; body: string }[] }
export interface Talk { title: string; event: string; year: string; topic: string }
export interface Award { title: string; issuer: string; year: string }
export interface Post { slug: string; title: string; excerpt: string; date: string; tags: string[]; readingTimeMin: number; body: string }
export const getContent(locale: Locale) // returns { profile, experiences, projects, talks, awards, posts }
```

- [ ] Write types.ts exactly as above (plus Award)
- [ ] Fill EN content from CV v3.0 (already extracted in session): 5 professional experiences, 3+ freelance entries, academic (STT NF + bootcamps) & mentoring (GoTo Impact, Skydu Academy), 5 projects (smile-5, anify, founderplus, astra-sam, unit-cost-rs), 10 talk entries (representative Firebase/React/frontend topics), 3 awards, 4 dummy posts
- [ ] Copy CV PDF → `public/cv/CV-Ahmed-Rayhan-Primadedas.pdf`
- [ ] Commit `feat: add typed content model with EN content from CV`

### Task 4: ID content

**Files:** `src/content/id/*.ts` (same shapes, translated), update `src/content/index.ts` locale map

- [ ] Translate all EN content to natural Bahasa Indonesia (keep tech terms EN)
- [ ] Commit `feat: add Indonesian content locale`

### Task 5: i18n plumbing (next-intl)

**Files:** `src/i18n/{routing.ts,request.ts,navigation.ts}`, `src/middleware.ts`, `messages/{en,id}.json`, restructure `src/app` → `src/app/[locale]/{layout.tsx,page.tsx}`

**Interfaces (Produces):** `Link, useRouter, usePathname` from `@/i18n/navigation`; `useTranslations` for UI strings (nav labels, form labels, buttons, 404 copy)

- [ ] routing.ts: `defineRouting({ locales: ['en','id'], defaultLocale: 'en' })`
- [ ] messages: nav.*, hero.*, sections.*, contact.*, blog.*, notFound.*, footer.*
- [ ] `[locale]/layout.tsx`: `NextIntlClientProvider`, `setRequestLocale`, html lang
- [ ] Verify `/en` and `/id` render; bare `/` redirects to `/en`
- [ ] Commit `feat: add next-intl routing with en/id locales`

### Task 6: Providers & motion foundation

**Files:** `src/libs/gsap.ts`, `src/libs/query-client.tsx`, `src/components/providers.tsx`

```ts
// libs/gsap.ts
'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, useGSAP);
export { gsap, ScrollTrigger, useGSAP };
```

- [ ] Providers: QueryClientProvider (staleTime Infinity — local data) + Prima `ToastProvider`
- [ ] Wire providers into `[locale]/layout.tsx`
- [ ] Commit `feat: add gsap registration and app providers`

### Task 7: PageTransition (Barba-style) + CursorDot + SectionShell

**Files:** `src/components/{page-transition.tsx,cursor-dot.tsx,section-shell.tsx}`

**PageTransition contract:** exports `PageTransitionProvider` (wraps children in `[locale]/layout.tsx`) and `useTransitionRouter()` returning `{ push(href, label) }`. Implementation: fixed full-viewport cobalt panel (z-50, `translateY(100%)`); on push → GSAP timeline: panel wipes up (0.45s, power3.inOut) with mono `//label` centered → `router.push` → on new route mount panel wipes away upward (0.45s). Reduced-motion: instant navigation, no panel. Internal links that want the effect use `<TransitionLink href label>`.

**CursorDot:** 10px cobalt dot + 32px ring following pointer via `gsap.quickTo`; ring scales 2× over `a, button, [data-cursor]`; hidden on `(pointer: coarse)`.

**SectionShell:** section wrapper — id (for nav anchors), `SectionHeader` (Prima) with mono running number + title, consistent max-width/padding; children reveal via Prima `RevealOnScroll`.

- [ ] Implement all three; wire PageTransitionProvider + CursorDot into locale layout
- [ ] Commit `feat: add barba-style page transitions, cursor dot, section shell`

### Task 8: Navbar + Footer + ScrollProgress

**Files:** `src/components/{site-navbar.tsx,site-footer.tsx}`, wire into `[locale]/layout.tsx`

- [ ] Prima `Navbar` (sticky) with anchor links (About, Work, Experience, Speaking, Blog, Contact), `LocaleSwitcher` (EN|ID toggle preserving pathname via `@/i18n/navigation`), Download CV action (secondary button)
- [ ] Prima `ScrollProgress` fixed top (home page only — it tracks document scroll)
- [ ] Prima `Footer` + `SocialLinks` (github/linkedin/instagram/medium from profile)
- [ ] Commit `feat: add site chrome — navbar, footer, scroll progress, locale switcher`

### Task 9: Hero module (isometric showpiece)

**Files:** `src/modules/hero/components/{hero-section.tsx,isometric-scene.tsx}`

**IsometricScene:** hand-authored inline SVG, true 2:1 isometric grid, Prima ice/cobalt/ink palette only. Layers as `<g data-depth="0.2|0.5|0.8|1">`: (1) floor grid + soft shadow, (2) desk + monitor showing mono code lines, (3) floating iso cubes/badges (React, TS, Next), (4) foreground accents. GSAP: slow idle float loop (y ±6px, staggered, 4-6s sine) + pointer-parallax (`quickTo` per layer × depth) + scroll parallax (layers drift at different speeds while hero scrolls out).

**HeroSection:** full-viewport grid — left: mono `// FRONTEND ENGINEER` eyebrow, Clash Display caps name (clamp ~4-7rem), `TextScramble` cycling role lines, `MagneticButton` CTAs ("See my work" → #work, "Contact" → #contact); right: IsometricScene; bottom: scroll cue (animated line + mono "SCROLL").

- [ ] Build scene + section, wire as first section of `[locale]/page.tsx`
- [ ] Commit `feat: add isometric hero with parallax scene`

### Task 10: About + stats

**Files:** `src/modules/about/components/about-section.tsx`

- [ ] Bio (profile.summary) split-text reveal on scroll; Prima `StatStrip`/`CountUp` for 4 stats (7+ yrs, 71% cost cut, 1800+ members, 10+ talks); portrait block optional iso accent
- [ ] Commit `feat: add about section with animated stats`

### Task 11: Work module + case-study pages

**Files:** `src/modules/work/components/{work-section.tsx,work-card.tsx,case-study.tsx}`, `src/app/[locale]/work/[slug]/page.tsx`

- [ ] WorkSection: 5 projects in alternating grid of Prima `TiltCard`s (Chip tags, title, client, summary, cobalt arrow); cards use `TransitionLink` → `/work/[slug]` with label `//work`
- [ ] Case-study page: `generateStaticParams` (slugs × locales), hero header (mono meta: role/period/stack), body sections, prev/next project nav, `notFound()` on bad slug
- [ ] Commit `feat: add selected work section and case-study pages`

### Task 12: Experience module (3 subsections)

**Files:** `src/modules/experience/components/{professional-timeline.tsx,freelance-grid.tsx,academic-section.tsx}`

- [ ] ProfessionalTimeline: ScrollTrigger-pinned section; vertical cobalt line draws with scrub; `TimelineItem`-styled entries (year col, node, role/company, highlights, Chips) slide in sequentially. Reduced-motion/mobile (<768px): unpinned static timeline
- [ ] FreelanceGrid: compact `Card interactive` grid
- [ ] AcademicSection: two-column — education (STT NF, bootcamps) | mentoring (GoTo Impact, Skydu Academy), lighter visual weight
- [ ] Commit `feat: add experience timeline, freelance grid, academic section`

### Task 13: Speaking & community

**Files:** `src/modules/speaking/components/speaking-section.tsx`

- [ ] GDG Depok organizer + GDSC Lead highlight cards (CountUp: 1800+ members, 350-600/event, 10+ talks); Prima `Marquee` of talk topics; awards row (mono year + title)
- [ ] Commit `feat: add speaking and community section`

### Task 14: Blog module (dummy data via TanStack Query)

**Files:** `src/modules/blog/use-cases/{get-posts.ts,get-post.ts}`, `src/modules/blog/components/{blog-teaser.tsx,blog-list-page.tsx,blog-detail-page.tsx}`, `src/app/[locale]/blog/{page.tsx,[slug]/page.tsx}`

**Interfaces:** `usePosts(locale)` / `usePost(locale, slug)` — TanStack Query hooks with simulated 300ms latency over `content/posts`; ONLY these two functions change when a CMS arrives.

- [ ] Teaser: latest 3 posts, "Read all //blog" TransitionLink
- [ ] List page: Prima `BlogList` layout with tag Chips, loading skeleton state
- [ ] Detail: Prima `BlogDetail` typography (prima-prose), 404 on unknown slug, back TransitionLink
- [ ] Commit `feat: add blog with dummy data behind tanstack query`

### Task 15: Contact module + API

**Files:** `src/modules/contact/schema.ts` (zod: name ≥2, email, message ≥10, honeypot `company` must be empty), `src/modules/contact/components/contact-section.tsx`, `src/app/api/contact/route.ts`

- [ ] Route: validate with schema → honeypot silently 200s → in-memory per-IP throttle (3/min) → Resend send to rayhanprima99@gmail.com; no `RESEND_API_KEY` → 503 `{configured:false}`
- [ ] Section: Prima `Spotlight` block; RHF+zodResolver form (Input/Textarea/Button); toast on success, Alert on error; if 503/unset key → render mailto CTA instead of form; SocialLinks + Download CV (MagneticButton)
- [ ] `.env.example` with `RESEND_API_KEY=`
- [ ] Commit `feat: add contact form with resend api and mailto fallback`

### Task 16: CV route, 404/error pages

**Files:** `src/app/[locale]/cv/route.ts` (redirect → `/cv/CV-Ahmed-Rayhan-Primadedas.pdf`), `src/app/[locale]/not-found.tsx`, `src/app/[locale]/error.tsx`, root `src/app/not-found.tsx`

- [ ] 404: mono `//404` giant Clash Display, scrambled "page not found", home TransitionLink; error.tsx similar with reset button
- [ ] Commit `feat: add cv download route and error pages`

### Task 17: Tests

**Files:** `vitest.config.ts`, `src/content/content.test.ts`, `src/modules/contact/schema.test.ts`, `playwright.config.ts`, `e2e/smoke.spec.ts`

- [ ] Vitest: content integrity (every locale has same slugs/ids/counts; getContent returns both locales; every project slug unique), contact schema (valid passes; bad email/short message/filled honeypot fail)
- [ ] Playwright smoke: home renders all 9 section ids; locale switch en→id keeps path; blog list→detail navigates; contact shows validation errors on empty submit
- [ ] `pnpm test` and `pnpm test:e2e` pass
- [ ] Commit `test: add content, schema, and smoke coverage`

### Task 18: Performance & polish pass

- [ ] Lazy-mount below-fold GSAP scenes (`next/dynamic` where safe), verify no ScrollTrigger leaks across locale/route changes
- [ ] `pnpm build` clean; Lighthouse (dev server, production build) — target 90+ performance
- [ ] Final visual QA pass at 375px / 768px / 1280px
- [ ] Commit `perf: lazy-mount scenes, preload fonts, build clean`

## Self-Review Notes

- Spec coverage: all spec sections map to tasks (§3→T5/9-16, §4→T1-2, §5→T1-5, §6→T3-4, §7→T6-13, §8→T15, §9→T16, §10→T17-18, §11→every task).
- Executor context: this plan is executed in-session by the author with the approved spec and CV content already in context; component-level visual detail is governed by the frontend-design skill + Prima's language rather than inlined pixel specs.
