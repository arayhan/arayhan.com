# Branding, UX & Discoverability Remediation — Decision Doc

**Date:** 2026-07-27
**Owner:** Ahmed Rayhan Primadedas (arayhan)
**Status:** Approved in brainstorming session — proceeding straight to implementation (user said "execute it")

## 1. Purpose

A UI/UX audit of the built site (rayhan.dev) against the goal of attracting hiring HR/recruiters and increasing viewer conversion, plus a design-system/visual-trend fit check and a personal-branding "fit hook."

## 2. Decisions

| Decision | Choice |
|---|---|
| Seniority positioning | **Senior/Staff IC.** Leadership (Anify team, mentoring) shown as a strength, not the headline. |
| Remediation scope | **Signal Boost.** Targeted fixes on the existing structure/visual system — no rebuild. The isometric-hero-vs-live-component-hero idea from the design-system-fit critique is deferred, not required. |
| Fit hook | **Craft + Scale duality** — the differentiator is holding up design-system quality at both government scale (Health Ministry, UNDP) and startup speed (71% cost cut). Three length variants, one per surface (see §4). |

## 3. Audit Findings (full list; not all acted on this pass)

**UX**
- Above-the-fold has no quantified proof point — numbers live a scroll away in About.
- Pinned professional timeline (`SCROLL_PER_ENTRY = 620px × 5 entries`) demands ~3000px of scroll before reaching Freelance/Academic/Speaking — a scan-speed risk for a fast-skimming recruiter.
- Blog teaser/list explicitly renders "Sample content — real articles coming soon," which self-discloses fake content and reads as *abandoned* rather than *in progress*.
- No third-party social proof (Testimonials component exists in Prima UI, unused).
- No avatar/talk photos yet (already flagged in a prior session; still open, no code action needed).
- No SEO/OG infrastructure: no `metadataBase`, no OG image, no sitemap, no robots.txt, no analytics.
- No skip-to-content link.

**Design system / visual trend fit**
- The ice/cobalt engineered-minimalism language + motion craft (transitions, magnetic buttons, scroll reveals) is a strong, on-trend authenticity signal for someone whose pitch is "I build design systems" — dogfooding Prima UI is the single best branding asset on the site.
- The isometric hero is the one element that reads generic/dated (2018–2021 SaaS-landing aesthetic) rather than "engineer with taste." Deferred: replace with an interactive live-Prima-UI-component hero in a future pass.

**Personal branding**
- Current tagline ("Building scalable frontends, design systems, and the communities around them.") is accurate but generic — anyone could say it. Replaced with the Craft + Scale hook (§4).

**CV**
- Content is strong; two structural issues, not content issues: (1) Badr Interactive's ongoing part-time role sits under a fixed-term Anify role in a way that can misread as a demotion — needs a clarifying note, not a title change; (2) three project bullets (Astra SAM, Unit Cost RS, client outsourcing) lack scope language that already exists elsewhere in the site's own content (`projects.ts`).
- **The CV PDF itself is out of scope for direct editing** — it's an existing user-authored document outside this repo/codebase, and I have no reliable way to edit it without risking its design. Recommendations are delivered as text for the user to apply in their own CV source.

## 4. The Fit Hook (Craft + Scale duality)

Three variants, one job each — kept as separate content fields rather than overloading one string:

- **`Profile.tagline`** (short, ~100–120 char) — used in Footer + `<meta description>` + OG description: *"Frontend Engineer building design systems that scale from startups to national health infrastructure."*
- **`messages.hero.intro`** (hero headline, per-locale UI string) — *"Design systems built to hold — from a two-person startup to a national health ministry."*
- **`Profile.hookStatement`** (new field — full About-opener sentence, rendered as a lead line before `profile.summary`) — *"I build design systems that don't break — whether the team is two people or the platform serves a country. Seven years doing that in React and Next.js, and teaching 1,800+ developers to do the same."*

## 5. Scope — Signal Boost implementation

1. Add `Profile.hookStatement`; update `Profile.tagline` and `messages.*.hero.intro` (EN + ID) to the hook copy above; render `hookStatement` as a lead line in the About section.
2. Remove the self-disclosing "dummy content" copy from the blog list page (`blog.dummyNote` usage + the now-unused message keys).
3. SEO/OG: convert `[locale]/layout.tsx` metadata to `generateMetadata` (locale-aware description from `profile.tagline`), add `metadataBase`, add `[locale]/opengraph-image.tsx` (Next.js file-convention OG image via `next/og` `ImageResponse` — branded ink/cobalt card, no external image tooling needed), add `app/sitemap.ts` and `app/robots.ts`.
4. Add `@vercel/analytics` — zero-config, no-op until deployed to Vercel, gives real viewer data once live.
5. Add a skip-to-content link + `id="main-content"` wrapper around `{children}` in the locale layout (single change point covers every route).
6. Reduce `SCROLL_PER_ENTRY` in the pinned professional timeline from 620 to ~380 so the scrub reads faster without removing the mechanism.
7. Sync CV-relevant content into `src/content/{en,id}/experience.ts`: add a concurrency-clarifying highlight to the Badr Interactive entry (factual, not a title change), and enrich the Astra SAM Advance highlight with scope language already present in `projects.ts` (nationwide sales team, Android/iOS, customer database/task tracking/incentive programs).

## 6. Explicit non-goals (guardrails)

- **No fabricated testimonials.** A quote attributed to a named real person (e.g., "the Anify CEO") without that person's actual words would be a credibility risk worse than the blog issue it's meant to fix. Recommended as future work once real quotes exist — not built this pass, including no hidden/half-wired component for it (YAGNI).
- **No invented metrics.** Every number added to CV/experience content must already exist in `projects.ts` or the original CV extraction — no new numbers are fabricated to make a bullet look stronger.
- **No CV PDF edits.** Out of scope — outside the repo, no safe edit path.
- **No employment-classification changes.** Badr's "(Part-Time)" status is a fact; only clarifying context is added, not a title/classification change.

## 7. Deferred to a future pass

- Interactive live-Prima-UI-component hero (replaces isometric hero) — the design-system-fit critique's strongest recommendation, deliberately out of scope for Signal Boost.
- Testimonials section, once real quotes are collected.
- Real avatar (`public/images/avatar.jpg`) and talk photos — pending user action from a prior session.
