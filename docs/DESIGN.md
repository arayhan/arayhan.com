# Rayhan — Design System

Direction **A · Changelog**, chosen 2026-10-24 from three mockups
([review page](https://claude.ai/artifact/LrLQHyiidegDwpyfdykyQR), private to the owner).

This file is the design system itself — what the tokens are, what the type scale is, what the components look like. **How to write the styles that implement it** is a separate file: [`docs/rules/ui-styling.md`](rules/ui-styling.md).

## Direction

Each project reads like a release note. The outcome is the headline, written as a
diff (`−71%` in diff green), and the work underneath is the list of what shipped,
each line marked `+`. That device is the product-minded message made visual: a
recruiter skimming for ten seconds sees results before tasks.

Professional and minimal: one reading column, grey-green paper, ink type, one
semantic accent. Motion is a showcase but never gates content (see Motion).

Rejected alternatives, for the record: **B · Index** (huge name, work as an
openable index — outcomes sat one click deep) and **C · Scale** (scale dial and
time axis — leaned on SMILE's missing impact number).

## Tokens

Source: [`src/styles/tokens.css`](../src/styles/tokens.css), exposed to Tailwind in
`src/app/globals.css` via `@theme inline` (`bg-paper`, `text-plus`, `rounded-lg`, …).

| Token | Value | Role |
|---|---|---|
| `paper` | `#F5F6F3` | Page ground. Grey with a green bias, not neutral grey |
| `card` | `#FFFFFF` | Raised surfaces only: metric cards, proof strip cells |
| `ink` | `#16191C` | Text, rules under section heads, primary buttons, closing block |
| `ink-soft` | `#2E3430` | Lede paragraphs |
| `mute` | `#5A615C` | Secondary text, mono metadata |
| `rule` | `#DADFD8` | Hairlines between entries, card borders |
| `plus` / `plus-bg` | `#0B7A4B` / `#E2F0E8` | **Semantic only**: a measured positive outcome, the `+` marker, before/after bars |
| `pend` / `pend-bg` | `#8F5B00` / `#F6ECD8` | **Semantic only**: an outcome still missing its number |

Radius: `sm 4` (tags), `md 8` (buttons), `lg 10` (cards), `xl 14` (closing block).
Space: 4 · 8 · 12 · 16 · 24 · 32 · 56 · 104 px; sections are separated by 56–104 px
(fluid).

Light theme only in phase 1.

## Typography

| Role | Face | Use |
|---|---|---|
| Display | Bricolage Grotesque (variable, `opsz` 96 at large sizes) | h1–h3, big metrics, proof numbers |
| Body | Public Sans | Running text, buttons |
| Utility | JetBrains Mono 400/500 | Dates, tags, stack lists, eyebrows, the `+` marker |

Loaded with `next/font/google` in `src/app/layout.tsx` (self-hosted at build, no
layout shift).

Scale (fluid, `clamp`, mobile → desktop):

| Step | Size | Weight / tracking |
|---|---|---|
| h1 | 38 → 84 px, line-height 1.02 | 700, −0.025em, max 15ch |
| h2 | 24 → 34 px | 700, −0.015em |
| h3 | 21 → 26 px | 650, −0.01em |
| Metric | 36 → 52 px, line-height 1 | 700, tabular numbers |
| Lede | 16 → 19 px | 400, max 60ch |
| Body | 15–16 px, line-height 1.55 | 400 |
| Mono meta | 12–12.5 px | 400–500 |

Every digit that lines up or counts uses `tabular-nums`.

## Components

Live under `src/components/` once a second surface uses them; until then inside
the home module.

- **Hero** — mono eyebrow (`7+ yrs` ink badge + role · city · GMT+7), h1 with the
  outcome clause in `plus`, lede, CTA row (Download CV primary, copyable email in
  mono, LinkedIn), proof strip.
- **ProofStrip** — 2 columns on phone, 4 from 720 px; hairline grid (1 px `rule`
  gaps on a `rule` ground), white cells, display number + mute label.
- **ReleaseEntry** — one per project: `when` column (years + tag), body (h3,
  client · role, DiffList, mono stack line), MetricCard. Stacks on phone; three
  columns (150 px / fluid / 260 px) from 720 px. Entries separated by `rule`
  hairlines.
- **DiffList** — `<ul>`, each line prefixed with a mono `+` in `plus`.
- **MetricCard** — white card, big metric (in `plus` only when it is a measured
  improvement), label, optional mono before → after detail, optional
  before/after bar, optional PendingChip.
- **PendingChip** — mono `± impact number pending` on `pend-bg`. It is the visible
  form of a `TODO(content)`: it must not ship to production.
- **RoleRow** — years (mono) · company (600) · role (mute); stacks on phone.
- **CloseBlock** — `ink` panel, `paper` text, "Hiring a senior frontend
  engineer?", CTA row inverted.
- **SectionHead** — h2 left, mono summary right (`5 releases · 2020–now`), 1 px
  `ink` rule below.

## Motion

GSAP (+ `@gsap/react`) for the orchestrated parts, CSS transitions for hover.

1. **Load sequence** — hero children rise 16 px and fade in, 700 ms, 70 ms stagger,
   `ease-out`. Runs once on first paint; the h1 must not be the LCP element held
   back by it (start from opacity ≥ 0.01 and keep text in the server HTML).
2. **Counters** — metrics count up from 0 when 40% visible, 1.1 s, ease-out cubic.
   The **final value is server-rendered**; the animation only replays it, so
   crawlers, AI readers and no-JS clients always see the real number.
3. **Before/after bar** — fill shrinks from 100% to the after-ratio when scrolled
   in. Animate `transform: scaleX()` with `transform-origin: left`, never `width`.
4. **Hover** — buttons lift 1 px, 200 ms.

Under `prefers-reduced-motion: reduce` all of it is off and everything renders in
its final state. Nothing is ever hidden waiting for an observer.

## Do's and don'ts

- **Do** lead every entry with its outcome. If there is no number yet, show the
  PendingChip in drafts and resolve it before launch.
- **Do** use `plus` only for a measured improvement. A scale fact (`40+
  engineers`) is set in `ink`.
- **Don't** add a second accent color, gradients, or shadows beyond the card
  border. Hierarchy comes from type size and the ink rules.
- **Don't** number sections or entries (`01 / 02`): order here is by date, and
  the dates are already shown.
- **Don't** invent metrics to fill a MetricCard (see `docs/PRODUCT.md`).
- **Don't** put content behind interaction. Everything a recruiter needs is
  visible on scroll.
