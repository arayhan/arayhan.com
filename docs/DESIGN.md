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

**Tactile cards, enterprise restraint** (owner's pick, 2026-10-26). The reference is a
fitness-app card board: white rounded cards on a cool grey page, filled colour icon circles,
buttons with a pressed bottom edge, tinted status strips, hairline list rows, a faint dot
texture in card corners. Kept professional by: one brand colour (blue) for every action and
link; category hues only on badge fills and notices; no emoji; calm motion; Geist, not a
rounded display face. The hero shows the owner's cut-out photo; the proof is real numbers.

## Tokens

Source: [`src/styles/tokens.css`](../src/styles/tokens.css), mapped to Tailwind in
`src/app/globals.css` (`bg-canvas`, `text-ink`, `bg-hue-violet`, `rounded-card`,
`shadow-card`, `shadow-lip-accent`, ...).

| Token | Light | Dark | Role |
|---|---|---|---|
| `canvas` | `#EEF1F5` | `#0A0F1C` | Page ground, a cool grey under the cards |
| `surface` | `#FFFFFF` | `#121A2B` | Cards, panels, chips |
| `soft` | `#F4F6FA` | `#1A2338` | Slabs: secondary button, address strip, icon hover |
| `ink` | `#0F172A` | `#F1F5F9` | Text |
| `mute` | `#475569` | `#94A3B8` | Secondary text, idle icons |
| `line` | `#E2E7EF` | `#232D42` | Hairlines, card borders |
| `accent` | `#1D4ED8` | `#60A5FA` | **The brand and action colour**: logo, buttons, links, focus ring |
| `on-accent` | `#FFFFFF` | `#0B1B3A` | Text on accent |
| `accent-lip`, `slab-lip` | `#1E3A8A`, `#D5DCE6` | `#1D4ED8`, `#070B15` | The 2px bottom edge of primary and secondary controls |
| `hue-{blue,violet,amber,green}` | 600 level | 500 level | Icon badge fills only |
| `hue-*-soft` | ~8% tint | ~13% tint | Notice backgrounds |
| `hue-*-text` | 700 level | 400 level | Hue as text (active /term, notice title); 4.5:1 on surface |
| `dot` | ink 9% | white 7% | Card corner dot texture |
| `card-radius`, `control-radius` | 16px, 12px | | `rounded-card`, `rounded-control` |
| `card-shadow` | 1px contact + soft 28px drop | inset highlight + deep drop | `shadow-card` |

**Category hues** map to kinds of proof: works blue, talks violet, products amber, awards
green. They fill icon badges and tint notices; they never colour buttons, links or body
text, so the page still reads as one brand. Neutrals are slate (a slight blue bias).

Theme: light and dark, following the OS by default. The menu toggle saves an explicit
choice to `localStorage` (`theme`); an inline script in `<head>` applies it before
first paint. Never flip one section to the other theme. Switching with the toggle grows the
new theme as a circle out of the button over 520ms (View Transitions API, `ThemeToggle`;
the default cross-fade is disabled in `globals.css`). No support or reduced motion: instant.

## Typography

Geist and Geist Mono, via `next/font/google`. One family: emphasis is weight or the
accent color, never a second face.

| Role | Size | Weight / tracking |
|---|---|---|
| Hero name (h1) | `text-display` 48 -> 76px, line-height 1, one line | 600, `-0.045em` |
| Hero sentence | `text-lede` 20 -> 28px, line-height 1.35, max 30ch | 300, `-0.02em`, `mute` |
| Page headline (stubs) | `text-hero` 26 -> 40px, line-height 1.16 | 600, `-0.04em` |
| Page subtext | `text-sub` 16 -> 19px | 400, `mute` |
| Eyebrow / labels | 14px | 500, `mute`, sentence case (no uppercase tracking) |
| Buttons | 14px | 600 |
| Card title / row value | 16px / 14px | 600, `-0.01em` |
| Card subtitle / row label | 12px | 400, `mute` |

## Shape

- **Cards** (`src/components/ui/Card.tsx`): `rounded-card` (16px), 1px `line` border,
  `surface`, `shadow-card`. `dotted` adds the corner texture (`.card-dots`: a 9px dot field
  behind the content, fading out from the top-right). Lists inside a card are full-bleed
  hairline rows.
- **Controls** (`src/components/ui/action.ts`): `rounded-control` (12px), semibold.
  Primary is accent with a 2px `accent-lip`; secondary is a `soft` slab with a border and a
  2px `slab-lip`. Pressing sinks the face 2px onto the lip (the shadow goes to none). Sizes
  44px and 36px.
- **Icon badges** (`IconBadge.tsx`): filled hue circles (28px or 40px) with a white Phosphor
  `fill` glyph. Decorative; the text beside them carries the meaning.
- **Notices** (`Notice.tsx`): `rounded-control` strip in a `hue-*-soft` tint with a hue title
  and a mute line. For states only (for example "In progress" on stub pages).
- Icon buttons (theme, socials) are `rounded-control` with a `soft` hover. The Menu toggle
  stays a 40px circle (owner-tuned). The logo square keeps radius 7/32.

## Logo and favicon

**R2c**, chosen 2026-10-25: the "ar" monogram (single-storey `a` = circle + stem, `r` = stem
+ quarter arc), centred and stroked in `on-accent` on an `accent` rounded square, next to
the wordmark **arayhan** (Geist 700, -0.055em). Letters are paths, not text, so the mark is
identical at 16px and 180px. The blinking cursor bar was dropped from the mark on the
owner's request; the cursor now lives only in the menu's address line.

- `src/components/Logo.tsx`: geometry (`MARK`), `LogoMark`, `Logo` (mark + wordmark, links home).
- `src/app/icon.svg`, `src/app/apple-icon.tsx` and `src/app/opengraph-image.tsx` copy `MARK`. Change them together.

## Navbar and menu

`src/components/SiteHeader.tsx`, mounted once in `src/app/layout.tsx`. Sticky, 72px.

- Left: logo, then **Work, Services, Blog, Talks, About** as plain text from `lg`
  (`QuickNav`, client: the current page gets ink color and a 1px accent underline).
- Right: the email address as a small secondary button (from `xl`, as on dwinawan.com; an
  envelope icon stands in from `lg` to `xl`, where the nav is too tight),
  theme toggle, a hairline divider, and the **Menu** toggle:
  the word "Menu" beside a 40px round icon (hairline border). **Hover opens it** (mouse
  only): it stays open while the pointer is on the trigger or the panel and closes 220ms
  after leaving both; a mouse click never closes it. Tap, Enter/Space and Ctrl/Cmd K
  toggle; keyboard opening moves focus to the first link, Escape returns it. Three equal 16 x 2px
  bars on a whole-pixel grid (4px apart, so every bar renders identically at any display
  scaling) meet in the middle and the outer two cross into a centred X; closed and hovered,
  the outer bars ease apart by 1px each way; pressed, it scales to 0.95. Strict
  symmetry is the rule (owner rejected an asymmetric pill). Styles in `globals.css`
  (`.menu-toggle`). Escape and click-outside close it.
- **Menu panel, "Address bar" style** (`SiteMenu`, client): a dotted card whose `soft` top strip
  reads `arayhan.com/` (the canonical host, `src/content/site.ts`) and types the path of whatever link is pointed at or focused, with
  the logo's blinking cursor. Three plain-text columns: Showcase (Work, Services & Rates,
  Talks, Album) in 20px semibold; Blog and Products; About with Uses' six areas as one
  quiet line. Footer: social icons and the email as selectable text on a small slab.
- What it must never become: icon tiles, chips, letter avatars, search slabs, kbd badges.

All destinations live in `src/content/navigation.ts`; every one has a route (placeholder
pages via `src/components/StubPage.tsx` until content exists).

## Hero

`src/modules/home/components/Hero.tsx` (server) with client leaves. The page ends on the
hero (the "A Rayhan P." masthead was removed on the owner's request). The hero fills the
first screen: at least `100svh` minus `--header-h`; it grows rather than clips when the
content is taller (phones, short laptops). References the owner chose: the type of
theodorusclarence.com and dwinawan.com.

0. **Backdrop** (`backdrops/HeroBackdrop`, **in review**): the owner found the plain grey
   too empty, so five variants are live for comparison via `?hero=1..5` and a floating
   switcher pill (`TODO(owner-pick)`: keep one, delete the rest and the switcher):
   1. **Flow canvas**: dot grid, three soft hue gradients that lean away from the pointer,
      dashed connectors from each floating card into the proof card with a pulse every few
      seconds.
   2. **Blueprint**: rulers that track the cursor, a selection box with the card's live
      size, measured gaps (`--guide` magenta), crosshair readout, snap guides on card edges.
   3. **Commit field**: a canvas of contribution-graph cells that commit in the category
      hues and ripple around the cursor; thinned behind the copy.
   4. **Kinetic type**: three rows of giant outlined words (the /terms, then the owner's
      vocabulary) sliding at different speeds; the active /term lights in its hue.
   5. **Tactile keycaps**: slab-and-lip keys at the edges that type `SHIP ⏎` on a loop,
      press under the cursor and on Ctrl/Cmd K. Desktop only.
   All run only while on screen and render still under reduced motion. Performance rule
   learned here: no blur filters or CSS masks over moving layers (they cost 10-45fps);
   use gradients, alpha baked into canvas drawing, or overlay fades. (Turned down before:
   a dot-lattice canvas, a drifting aurora, a spotlight with a line grid.)

1. **Status chip**: a small `surface` chip (control radius, border, card shadow) opening with
   a 26px round avatar of the owner (`profile.avatar`, `public/avatar.webp`, a head crop of
   the cut-out) with a green live dot on its edge, then a mono terminal line,
   "$ whoami → **Solution Fullstack Engineer** @ Badr Interactive" (`profile.status`). Wraps
   on narrow screens rather than truncating.
2. **Name and sentence** (`HeroShowcase`): the h1 is just "I'm Rayhan" (Clarence-style),
   then one light, muted sentence (Dwinawan-style): "Fullstack engineer who makes complicated
   products feel simple. Wander through my **/works**, **/talks** and **/products**." Each
   term is a button in the sentence's own grey: hover turns it ink, and the active one
   takes its category's `hue-*-text`. Hover, focus or tap swaps the **proof card**, a dotted
   Card: header with the term's `IconBadge`, label ("Works") and title line, and `01 / 03`;
   the big number that counts up, its label and detail; one hairline row per supporting fact
   (a small badge, or the product's own logo from `public/products/*.svg`, then value over
   label); a full-width secondary "Open /term" button. All from `profile.terms` (`label`,
   `icon`, `hue` per term; a fact can override `hue`). Idle, it advances every 8s; it holds
   while the mouse or focus is inside.
3. "Email me" + "See my work", social icons. (The bio paragraph left the hero.)
3a. **Card board** (`HeroBoard`, client, `lg` up): the proof card sits centred in the
   right column, and four small decorative cards float around it (`aria-hidden`, content in
   `profile.board`): a terminal card (`pnpm build` / `Compiled successfully`, Next.js's own
   output), a stack chip (React, Next.js, TypeScript, Firebase marks from Simple Icons, CC0,
   in `src/components/ui/brands.tsx`), a GDG chip and a years ring (one segment per year,
   all filled: a picture of the number, not a progress bar). Every figure repeats one in the
   content. Motion (GSAP): each card drifts on its own sine loop (4.5-7s), leans with the
   pointer at its own depth (7-18px) with a slight 3D tilt, and spreads 14px outward and to
   1.03 scale while the pointer is over the column. Three layers per card so the GSAP lean,
   the CSS entrance and the GSAP drift never fight. Paused offscreen; static under reduced
   motion. Phones and tablets get the proof card alone, under the text.
   The owner's cut-out photo (`profile.portrait`) left the hero on their request and is kept
   for the About page.
4. **Album marquee** (`AlbumMarquee`), rendered only once `profile.album` has photos: two rows in opposite directions; page scroll speed
   boosts and flips them (scrollY sampled per frame, no listener); hovering a row pauses it,
   lifts the photo and dims the others.

Placeholders (album photos, unconfirmed socials) are
`TODO(content)`; nothing renders an empty photo frame; unconfirmed social URLs are `null` and not rendered.

## Motion

| Motion | Why | How |
|---|---|---|
| Badge, name, sentence, actions fade up in sequence | Hierarchy: claim first, proof second | CSS keyframes, no JS |
| Term swap | Shows the three kinds of proof in one sentence | Client state; the active term changes colour |
| Proof number counts up | The number is the visual | rAF on swap only, ~0.9s ease-out; final value for screen readers |
| Card board drift, lean, spread | The hero's visual: a calm, living collage | GSAP transforms; paused offscreen; static under reduced motion |
| Theme circle reveal | The switch reads as one gesture from the button | View Transitions API, clip-path on the new snapshot, 520ms |
| Menu toggle lines meet, then cross | The button explains its own state change | CSS transitions with staggered delays |
| Menu path typing + cursor | Ties the menu to the logo and the /slash language | 22ms per character; instant under reduced motion |
| Marquee drift, speed-up on scroll | Album feels alive without taking over | rAF transform; static, hand-scrollable under reduced motion |
| Buttons sink 2px onto their lip when pressed | Tactile feedback | CSS transform + box-shadow, 150ms |
| Header hairline on scroll | State change: content is under the header | `animation-timeline: scroll()` |

Only `transform` and `opacity` animate (plus the panel's visibility). Under
`prefers-reduced-motion: reduce` everything renders in its final state.

## Do's and don'ts

- **Zero em or en dashes** in visible copy. Ranges use a hyphen.
- One label per intent across the page: contact is always "Email me".
- No locale or time strips, version labels, scroll cues or section numbers. The only dot
  texture is the card corner (`dotted`).
- No emoji. Category hues stay on badges and notices.
- Never invent a number. Every figure comes from the CV or from Rayhan directly.
- Icons come from Phosphor only (`@phosphor-icons/react/dist/ssr`), 20px in the menu,
  16px inside buttons and the menu footer.
