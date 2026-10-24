# Rayhan - Design System

Reset on 2026-10-24 with the `design-taste` skill. Replaces the earlier "Changelog"
direction. Phase 1 scope right now: **favicon, logo, menu, hero**. Sections below the
hero come back one at a time and must follow this file.

This file is the design system itself. **How to write the styles that implement it**
is a separate file: [`docs/rules/ui-styling.md`](rules/ui-styling.md).

## Direction

Design read: a developer portfolio for recruiters, in a professional, minimal
language. Tailwind v4, Geist, purposeful motion.

| Dial | Value | Meaning here |
|---|---|---|
| Design variance | 6 | Left-aligned, asymmetric offsets; never a centered hero |
| Motion intensity | 7 | The hero's kinetic type is the visual; every motion has a reason |
| Visual density | 3 | Airy; one idea per screen |

The hero has **no image on purpose**: kinetic type is the visual (owner's decision,
an explicit exception to design-taste's real-image rule).

## Tokens

Source: [`src/styles/tokens.css`](../src/styles/tokens.css), mapped to Tailwind in
`src/app/globals.css` (`bg-canvas`, `text-ink`, `text-mute`, `border-line`,
`bg-accent`, `text-on-accent`).

| Token | Light | Dark | Role |
|---|---|---|---|
| `canvas` | `#F8FAFC` | `#020617` | Page ground |
| `ink` | `#0F172A` | `#F1F5F9` | Text, hover borders |
| `mute` | `#475569` | `#94A3B8` | Secondary text, idle icons |
| `line` | `#E2E8F0` | `#1E293B` | Hairlines, secondary button border, icon hover fill |
| `accent` | `#1D4ED8` | `#60A5FA` | **The only accent**: logo, primary button, rotating phrase, focus ring |
| `on-accent` | `#FFFFFF` | `#0B1B3A` | Text and strokes on accent |

Neutrals are slate (a slight blue bias) so they sit with the blue accent. Chosen on
2026-10-25 over "blue + green" after a side-by-side comparison: with no metric on the
page, a second color only split the brand. If green ever returns, it gets one job,
marking a measured result, and its own token; it never decorates.

Theme: light and dark, following the OS by default. The menu toggle saves an explicit
choice to `localStorage` (`theme`); an inline script in `<head>` applies it before
first paint. Never flip one section to the other theme.

## Typography

Geist and Geist Mono, via `next/font/google`. One family: emphasis is weight or the
accent color, never a second face.

| Role | Size | Weight / tracking |
|---|---|---|
| Hero headline | `text-hero` 40 -> 80px, line-height 1.04 | 600, `tracking-tighter` |
| Hero subtext | `text-sub` 16 -> 19px, max 42ch | 400, `mute` |
| Eyebrow / labels | 14px | 500, `mute`, sentence case (no uppercase tracking) |
| Buttons | 14px | 500 |

## Shape

One rule: **everything interactive is a full pill** (buttons, icon buttons, focus
targets). The logo square is the only other rounded shape (radius 7/32, about 22%).
No cards and no shadows in this scope.

## Logo and favicon

Geometric lowercase **"ar"** monogram: a single-storey `a` (circle + stem) and an `r`
(stem + quarter arc), stroked in `on-accent` on an `accent` rounded square. The letters
are paths, not text, so the mark is identical at 16px and 180px with no font loaded.

- `src/components/Logo.tsx` holds the geometry (`MARK`), `LogoMark`, and `Logo`
  (mark + full name, name hidden under 640px).
- `src/app/icon.svg` copies the geometry with a `prefers-color-scheme` style, so the
  browser tab matches the OS theme.
- `src/app/apple-icon.tsx` renders the 180px PNG from `MARK`.

Change the geometry in `MARK` and in `icon.svg` together.

## Menu

`src/components/SiteHeader.tsx`. Sticky, 64px tall, one line at every width:
logo left; GitHub, LinkedIn, theme toggle and the **"Email me"** pill right. The
hairline under it fades in once the page scrolls (CSS scroll-driven animation, no
scroll listeners). Background is `canvas` at 85% with a backdrop blur.

## Hero

`src/modules/home/components/Hero.tsx`. Exactly four text elements:

1. Eyebrow: the role.
2. Headline, two lines on desktop: "I build frontends for" + a rotating phrase in
   `accent` that cycles real facts (`profile.headline.phrases`).
3. Subtext, 20 words max.
4. Actions: "Email me" (primary) and "LinkedIn" (secondary). A resume action appears
   only once `profile.cvPath` is set.

Content is centered in the first viewport (`min-h` = viewport minus header, `content-center`).
From 768px the subtext and actions move to an offset right column (`7fr 5fr`).

## Motion

| Motion | Why | How |
|---|---|---|
| Headline words rise out of a mask, 60ms stagger | Reading order: the claim lands word by word | CSS keyframes, no JS, so nothing flashes on hydration |
| Rotating phrase slot-roll every 2.8s | Shows the range of scale in one line | Client leaf; every phrase shares one grid cell so the slot never resizes (no CLS); pauses on hover and in background tabs |
| Eyebrow, subtext, actions fade up after the headline | Hierarchy: claim first, proof second | CSS keyframes on the same stagger |
| Buttons lift 1px, press to 0.98 | Feedback | CSS transitions |
| Header hairline on scroll | State change: content is under the header | `animation-timeline: scroll()` |

Only `transform` and `opacity` animate. Under `prefers-reduced-motion: reduce`
everything renders in its final state and the phrase stays on the first value.
All phrases are in the server HTML; the animated copy is `aria-hidden` and an sr-only
sentence carries the full claim.

## Do's and don'ts

- **Zero em or en dashes** in visible copy. Ranges use a hyphen.
- One label per intent across the page: contact is always "Email me".
- No locale or time strips, version labels, scroll cues, decorative dots, or section
  numbers.
- Never invent a number. Every figure comes from the CV or from Rayhan directly.
- Icons come from Phosphor only (`@phosphor-icons/react/dist/ssr`), 20px in the menu,
  16px inside buttons.
