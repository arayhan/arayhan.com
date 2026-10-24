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

**R2c**, chosen 2026-10-25: the "ar" monogram (single-storey `a` = circle + stem, `r` = stem
+ quarter arc) narrowed to make room for a **cursor bar** that blinks, stroked in
`on-accent` on an `accent` rounded square, next to the wordmark **arayhan** (Geist 700,
-0.055em). Letters are paths, not text, so the mark is identical at 16px and 180px.

- `src/components/Logo.tsx`: geometry (`MARK`), `LogoMark` (the caret path carries the
  `.caret` blink), `Logo` (mark + wordmark, links home).
- `src/app/icon.svg` and `src/app/apple-icon.tsx` copy `MARK` (static caret). Change all three together.

## Navbar and menu

`src/components/SiteHeader.tsx`, mounted once in `src/app/layout.tsx`. Sticky, 72px.

- Left: logo, then **Work, Services, Blog, Talks, About** as plain text from `lg`
  (`QuickNav`, client: the current page gets ink color and a 1px accent underline).
- Right: email icon (from `lg`), theme toggle, and a text button **Menu** whose two-line
  glyph turns into a cross. Ctrl/Cmd K toggles it, Escape and click-outside close it.
- **Menu panel, "Address bar" style** (`SiteMenu`, client): a bordered panel whose top line
  reads `rayhan.dev/` and types the path of whatever link is pointed at or focused, with
  the logo's blinking cursor. Three plain-text columns: Showcase (Work, Services & Rates,
  Talks, Album) in 20px semibold; Blog and Products; About with Uses' six areas as one
  quiet line. Footer: social icons and the email as selectable text.
- What it must never become: icon tiles, chips, letter avatars, search slabs, kbd badges.

All destinations live in `src/content/navigation.ts`; every one has a route (placeholder
pages via `src/components/StubPage.tsx` until content exists).

## Hero

`src/modules/home/components/Hero.tsx` (server) with three client leaves:

1. **Status badge**: mono, a three-bar live meter + "Now shipping **SMILE 5.0** for
   Indonesia's Ministry of Health" (`profile.status`).
2. **Interactive sentence** (`HeroShowcase`), the h1: "I'm A Rayhan P. I make complicated
   products feel simple, from a pre-seed startup to a national health platform. Wander
   through my **/works**, **/talks** and **/products**." Each term is a button: hover,
   focus or tap turns it accent, moves the soft glow behind it and swaps the proof card on
   the right (fact line + link). Idle, it advances every 4s.
3. Bio, "Email me" + "See my work", social icons.
4. **Album marquee** (`AlbumMarquee`): two rows in opposite directions; page scroll speed
   boosts and flips them (scrollY sampled per frame, no listener); hovering a row pauses it,
   lifts the photo and dims the others.
5. **Masthead** (`Masthead`): "A Rayhan P." solved to fill the column width exactly.

Placeholders (portrait, proof visuals, album photos, product pitch, unconfirmed socials)
are `TODO(content)`; unconfirmed social URLs are `null` and not rendered.

## Motion

| Motion | Why | How |
|---|---|---|
| Badge, h1, bio, actions fade up in sequence | Hierarchy: claim first, proof second | CSS keyframes, no JS |
| Term swap + glow move | Shows the three kinds of proof in one sentence | Client state; glow moves by `transform` only |
| Menu path typing + cursor | Ties the menu to the logo and the /slash language | 22ms per character; instant under reduced motion |
| Marquee drift, speed-up on scroll | Album feels alive without taking over | rAF transform; static, hand-scrollable under reduced motion |
| Buttons lift 1px, press to 0.98 | Feedback | CSS transitions |
| Header hairline on scroll | State change: content is under the header | `animation-timeline: scroll()` |

Only `transform` and `opacity` animate (plus the panel's visibility). Under
`prefers-reduced-motion: reduce` everything renders in its final state.

## Do's and don'ts

- **Zero em or en dashes** in visible copy. Ranges use a hyphen.
- One label per intent across the page: contact is always "Email me".
- No locale or time strips, version labels, scroll cues, decorative dots, or section
  numbers.
- Never invent a number. Every figure comes from the CV or from Rayhan directly.
- Icons come from Phosphor only (`@phosphor-icons/react/dist/ssr`), 20px in the menu,
  16px inside buttons and the menu footer.
