# Rayhan - Design System

Reset on 2026-10-24 with the `design-taste` skill. Replaces the earlier "Changelog"
direction. Phase 1 scope right now: **favicon, logo, menu, hero**. Sections below the
hero come back one at a time and must follow this file.

This file is the design system itself. **How to write the styles that implement it**
is a separate file: [`docs/rules/ui-styling.md`](rules/ui-styling.md).

## Direction

Design read: a developer portfolio for recruiters and clients, in a calm tactile-card
language (enterprise restraint, playful lipped buttons). Tailwind v4, Geist, purposeful
motion. Taste pass on 2026-10-27 (`taste-skills`): dials VARIANCE 6, MOTION 5, DENSITY 4
(developer-portfolio preset). Rules it enforced here: one label per intent ("Email me",
"See my work"), at most four text elements in the hero, no decorative dots, no three
equal cards, bento cells match the content count, long lists get their own component.
(A dark creator-style restructure was tried and reverted on the owner's request.)
Second taste pass, same day, on colour: the owner found the blue-on-slate plus four
category hues generic and asked for no gradients, "playful but professional", and said they
love dark colours (navy, dark blue, black, white, dark grey). Result: **one blue accent on
navy-black ink and a near-white page, a navy feature slab, and everything flat** (no
gradients, no blurred shadows, no glossy spheres). An orange accent was tried and turned
down; the owner's objection was the background combination, not the blue.
Then (same day) the owner made the site **dark only** (no toggle), asked for colour "with
the same tone" (five same-brightness hues for decoration; actions stay blue), bigger commit
squares with a gap, more hero padding, a wider page (1360px) and an image on every work,
talk and product (drawn placeholders until real ones exist).
On 2026-10-31 the owner turned the site **light only** and sent three references: a centered
hero over a strip of tossed photos, a bento of images and stat tiles, and a set of soft white
bento cards. Result: navy ink on a cool light grey, white cards with a 24px radius, a hairline
and a faint navy-tinted shadow (still no gradients), heavier headings, a **minimal centered
hero over a collage of the works and products**, and an About/Connect bento after the shelf.
The commit-square backdrop, the orbit and the proof card are gone.
On 2026-11-01 the owner sent a fashion-landing reference (a big headline beside two tall
photos, over a bento of coloured text tiles and photo tiles) and asked for the hero alone:
the home page is now **one split hero whose images follow the active /term**. The shelf, the
About bento and the collage are gone.
On 2026-11-12 and 13 the owner iterated a prototype through eleven rounds (scroll-pinned
index, Swiss grid, a 3D wall, dark cinematic, cream, five font and backdrop variants) and
approved this: **one screen, no scroll-driven motion**. The copy sits on 3/5 over a faint
grayscale photo; a **globe-curved 3D wall of every project, talk and product** loops on 2/5
and spills over the copy. Blue-grey page with cream surfaces, Lexend headline, Plus Jakarta Sans body, pill buttons with a circled glyph, tech stacks as brand-colour logos. Later the
same day the page went **blue-grey with cream surfaces**: blue dominant by area, cream as the
warm counterpoint, navy ink and the blue accent unchanged.

| Dial | Value | Meaning here |
|---|---|---|
| Design variance | 7 | A one-screen hero whose 3D wall of cards spills over the copy |
| Motion intensity | 6 | A wall that never stops and a panning photo; nothing reacts to scroll |
| Visual density | 3 | Airy; one idea per screen |

**Tactile cards, enterprise restraint** (owner's pick, 2026-10-26). The reference is a
fitness-app card board: white rounded cards on a cool grey page, filled colour icon circles,
buttons with a pressed bottom edge, tinted status strips, hairline list rows, a faint dot
texture in card corners. Kept professional by: one accent for every action, link and
active state (blue; the category hues and the dot texture are gone); no emoji; calm motion; a clean sans, not a rounded display face. The proof is real numbers.

## Tokens

Source: [`src/styles/tokens.css`](../src/styles/tokens.css), mapped to Tailwind in
`src/app/globals.css` (`bg-canvas`, `text-ink`, `bg-feature`, `rounded-card`,
`shadow-card`, `shadow-card-lift`, `shadow-control`, ...).

| Token | Value | Role |
|---|---|---|
| `canvas` | `#E3E8F1` | Page ground, blue-grey: blue dominates by area (owner's pick 2026-11-13) |
| `surface` | `#F6F2EA` | Cream: cards, panels, the header glass, secondary buttons, the glyph circle in buttons |
| `soft` | `#D8DFEB` | Chips, address strip, icon hover |
| `ink` | `#0B1B3A` | Text (navy), ink icon badges |
| `mute` | `#556179` | Secondary text, idle icons |
| `line` | `#C9D2E2` | Hairlines, card borders |
| `wash` | canvas as `r g b` | Washes over photos: `rgb(var(--wash) / 0.8)` |
| `accent` | `#2563EB` | **The one action colour**: logo, primary button, active tab, links, focus |
| `on-accent` | `#FFFFFF` | Text and glyphs on accent |
| `accent-text` | `#1D4ED8` | Accent as text |
| `accent-soft` | accent 10% | Notice background |
| `feature`, `on-feature`, `feature-mute`, `feature-accent` | `#0F1F3D`, `#EEF1F6`, `#A9B6CA`, `#93C5FD` | The navy slab a bento leads with, the one dark cell on the page; `feature-accent` is the accent on it |
| `hue-{blue,violet,teal,amber,rose}` | `#2563EB`, `#7C3AED`, `#0F766E`, `#B45309`, `#E11D48` | Decoration only: badges, covers, the About shapes, active /term; each clears 4.5:1 as text on white; fills take a white glyph |
| `hue-*-soft` | the hue at 10% | Cover grounds, quiet shapes |
| `card-radius`, `control-radius` | 18px, 12px | `rounded-card` (wall cards), `rounded-control` (covers, chips); buttons are full pills |
| `card-shadow` | hairline 1px plus `0 12px 32px -16px` navy at 14% | `shadow-card` |
| `card-shadow-lift` | the same, deeper (22%) | `shadow-card-lift`: hovered showcase text tiles |
| `control-shadow` | `0 1px 2px` navy at 8% | `shadow-control`: buttons, chips, round icon buttons |
| `page-max` | 1360px | `max-w-page`: header and stub pages (the hero is full width) |

**One action colour, five decorative hues, flat fills.** Blue drives every action, link and
focus state. The five hues share a weight so they read as one family; they colour things
that are not pressed (badges, covers, showcase tiles, the portrait panel and the active
/term). Navy is the ink and the one dark slab. No gradients anywhere (fills, shadows,
masks, brand buttons). Shadows are soft but always tinted navy, never black.

Theme: **light only**, by the owner's choice (2026-10-31; it was dark only from 2026-10-27).
There is no dark theme, no toggle and no OS switch; `color-scheme: light`. The favicon keeps
its own `prefers-color-scheme` query because it sits in the browser's chrome, not the page.

## Typography

Plus Jakarta Sans for everything, Lexend for the hero name only (`font-display`), Geist
Mono for the menu's address line; all via `next/font/google`. The owner picked Lexend from
four candidates (Bebas Neue, DM Serif Display, Playfair Display) on 2026-11-13. Emphasis
inside a face is weight or the accent colour.

| Role | Size | Weight / tracking |
|---|---|---|
| Hero name (h1) | Lexend, `clamp(2.5rem, 1rem + 7vw, 9rem)`, on `xl` `min(9rem, 6.2vw, 18vh)`, one line | 600, `-0.05em`, line-height 1.1 |
| Hero sentence | `clamp(1.05rem, 0.9rem + 0.6vw, 1.4rem)`, line-height 1.6, max 31ch | 400, `-0.012em`, `mute`; the first two words 600 ink |
| Page headline (stubs) | `text-hero` 26 -> 40px, line-height 1.16 | 700, `-0.04em` |
| Wall card title / sub line | 14px / 11.5px, white on the card's navy gradient, two lines max | 700 / 400 at 80% |
| Wall card kind label | 10.5px uppercase, `0.04em` | 700, ink on `surface` |
| Page subtext | `text-sub` 16 -> 19px | 400, `mute` |
| Eyebrow / labels | 14px | 500, `mute`, sentence case (no uppercase tracking) |
| Buttons | 14px (header), 15.5px (hero pills) | 600 / 700 |
| Card title / row value | 16px / 14px | 600, `-0.01em` |
| Card subtitle / row label | 12px | 400, `mute` |

## Shape

- **Cards** (`src/components/ui/Card.tsx`): `rounded-card` (24px), 1px `line` border,
  white `surface`, `shadow-card`. `feature` makes it the navy slab (`feature` fill,
  `on-feature` text); one per grid, the cell the grid leads with. Lists inside a card are
  full-bleed hairline rows.
- **Controls** (`src/components/ui/action.ts`): `rounded-control` (12px), semibold,
  `shadow-control`. Primary is blue `accent` with white text; secondary is a white `surface`
  with a border. Pressing scales the face to 0.98. Sizes 44px and 36px.
- **Radius rule:** cards 18px, covers and chips 12px, buttons, badges and round icon buttons
  full (2026-11-13: every button is a pill).
- **Icon badges** (`IconBadge.tsx`): flat filled circles (28px or 40px) with a Phosphor
  `fill` glyph: a `hue` fill with a white glyph, or `ink` without a hue. Decorative; the
  text beside them carries the meaning. Not repeated on every card.
- **Covers** (`Cover.tsx`): an item's image (`next/image` from the item's `cover`). Until
  one exists (`TODO(content)`) it draws a placeholder in the item's hue: a quiet grid of
  rounded squares plus seeded brighter cells (fixed pixel size at any cover size, the same
  item always the same) with the item's glyph in a white circle. Today every item has an
  **Unsplash stand-in** (the owner's choice, 2026-10-31), listed in
  [`docs/cover-credits.md`](cover-credits.md) and marked `TODO(content)`; the drawn
  placeholder is the fallback for any item without a file. **Drop-in:** a file at `public/covers/<key>.webp` (or
  png/jpg) becomes that item's cover at the next build, no code change; the key is the
  project `id`, the product `slug` or the talk title in kebab case
  (`src/server/covers.ts`, resolved in `app/page.tsx`).
- **Notices** (`Notice.tsx`): `rounded-control` strip in `accent-soft` with an `accent-text`
  title and a mute line. For states only (for example "In progress" on stub pages).
- **Social links** (`SocialLinks.tsx`): `quiet` tone in the menu (`rounded-control`, `soft`
  hover); `brand` tone (unused since the About bento went; 56px circles in flat brand colours, white
  glyph; email takes the accent and is labelled "Email me"). The Menu toggle stays a 40px
  circle (owner-tuned). The logo square keeps radius 7/32.

## Logo and favicon

**R2c**, chosen 2026-10-25: the "ar" monogram (single-storey `a` = circle + stem, `r` = stem
+ quarter arc), centred and stroked in `on-accent` on an `accent` rounded square, next to
the wordmark **arayhan** (Geist 700, -0.055em). Letters are paths, not text, so the mark is
identical at 16px and 180px. The blinking cursor bar was dropped from the mark on the
owner's request, and the menu's typed address line went on 2026-11-13, so no cursor remains.

- `src/components/Logo.tsx`: geometry (`MARK`), `LogoMark`, `Logo` (mark + wordmark, links home).
- `src/app/icon.svg`, `src/app/apple-icon.tsx` and `src/app/opengraph-image.tsx` copy `MARK`. Change them together.

## Navbar and menu

`src/components/SiteHeader.tsx`, mounted once in `src/app/layout.tsx`. Sticky, 72px, full
width with the hero's gutters (16 / 32 / 56px), no max width (owner, 2026-11-13).

- Left: logo, then **Work, Services, Blog, Talks, About** as plain text from `lg`
  (`QuickNav`, client: the current page gets ink color and a 1px accent underline).
- Right: the email address as a small secondary button (from `xl`; an envelope icon stands
  in from `lg` to `xl`, where the nav is too tight), a hairline divider, and the **Menu**
  toggle: the word "Menu" beside a 40px round icon (hairline border). **Click only**
  (2026-11-13; hover-open is gone): tap, Enter/Space and Ctrl/Cmd K toggle; keyboard opening
  moves focus to the first link, Escape returns it; a click outside or on a link closes it.
  Three equal 16 x 2px bars on a whole-pixel grid (4px apart, so every bar renders
  identically at any display scaling) meet in the middle and the outer two cross into a
  centred X; closed and hovered, the outer bars ease apart by 1px each way; pressed, it
  scales to 0.95. Strict symmetry is the rule (owner rejected an asymmetric pill). Styles
  in `globals.css` (`.menu-toggle`).
- **Menu panel, full screen** (`SiteMenu`, client): a cream overlay that fills the viewport
  under the header (the header and its X stay), locking the page scroll. From `lg`, four
  columns: Showcase (Work, Services & Rates, Talks, Album) in Lexend `clamp(2rem, 1.2rem +
  2.6vw, 3.5rem)`, each with a 48px `soft` circle holding a Phosphor `fill` glyph (briefcase,
  handshake, microphone, images) that turns accent on hover; then Blog, Products, and About
  with Uses' six areas as one quiet line, in 18px. Below `lg` the columns stack. Footer:
  social icons and the email as selectable text on a pill. A centred dropdown was tried the
  same day and widened to this on the owner's request.
- What it must never become: chips, letter avatars, search slabs, kbd badges, a typed
  address line (dropped 2026-11-13).

All destinations live in `src/content/navigation.ts`; every one has a route (placeholder
pages via `src/components/StubPage.tsx` until content exists).

## Hero

The home page is the hero and nothing else, and the hero is one screen (owner, 2026-11-13):
`min-height: 100svh` minus the header, `height` fixed to that on `xl`. Nothing in it reacts
to scroll. `Hero.tsx` (server) lays out two columns on `xl` (`3fr 2fr`): the copy on the
left, the wall on the right, pulled 14vw into the copy column so its cards spill over the
text. Below `xl` the copy comes first and the wall runs under it (60svh on phones, 70svh on
tablets), clipped top and bottom only.

1. **Background**: `public/hero.jpg` (an Unsplash stand-in, `TODO(content)`,
   [`docs/cover-credits.md`](cover-credits.md)) in grayscale at 90%, panning 5% over 36s
   (`.hero-pan`), under a left-to-right wash of the canvas colour (92% to 30% on `xl`, a
   top-to-bottom wash when stacked) so the copy stays readable.
2. **Copy**: the h1 "I'm Rayhan." in Lexend, one line; the blue dot is the accent. The sentence "**Fullstack engineer**
   who makes complicated products feel simple. Wander through my /works, /talks and
   /products." with the /terms as underlined links to `/work`, `/talks` and `/products`.
   Two pill actions: "Email me" (ink, a paper-plane glyph in a `surface` circle) and
   "See my work" (outlined, an arrow in an ink circle); hovering grows a pill and opens the
   gap before its glyph. The bottom row: the counts ("5 projects · 10 talks · 3 products",
   from the lists) and a spinning badge reading "Hover the wall · Explore" with an arrow,
   linking to `/work`.
3. **Wall** (`HeroWall`, client): every project, talk and product as a card, interleaved so
   each of the four columns mixes kinds, each column repeated until it has at least seven
   cards and then doubled for a seamless loop. Columns alternate direction and run at 24 to
   34px/s. The plane is tilted a little (`rotateX(6deg) rotateY(-6deg) rotateZ(3deg)`); the
   outer columns turn away 30deg, sit 90px further back and lean 5deg, the inner ones 10deg
   and 1.5deg. Per frame each card turns away toward the top and bottom (up to 26deg), comes
   forward 90px and grows from 0.86 to 1 in the middle, so the wall reads as a globe.
   Hovering a column slows it to a fifth.
   - **Card**: the cover (`next/image`, or the `photo-slot` placeholder without one) under
     a navy gradient; a kind label top-left ("Project" blue dot, "Talk" violet, "Product"
     teal); the name, a sub line (role and years, event and year, or the pitch), and the
     stack as 34px white discs holding the tech's mark in its brand colour
     (`src/content/stacks.ts`, Simple Icons SVGs in `public/logos/` used as CSS masks), or
     the product's own logo. Hover zooms the cover, turns the shadow blue and scales in an
     arrow circle. Each card links to its section.
   - Aspect ratios rotate through 4:5, 1:1, 3:4, 4:5, 5:4, 1:1 so the columns never align.
4. **Header**: the existing sticky site header (logo, quick links, email, Menu) sits above
   the hero as its glass bar; the hero adds no nav of its own.

(Gone: on 2026-11-13 the split hero, the term-driven showcase, `ActiveTerm` and the album
marquee; on 2026-11-01 the term shelf, the About bento and the tilted collage; on 2026-10-31
the commit-square backdrop, the orbit and the proof card. The prototype rounds also turned
down a pinned scroll index, a Swiss grid, a status ticker, a dark cinematic version, a cursor
spotlight, cursor parallax, scroll-driven speed and skew, split-capsule buttons, Bebas Neue
and two serifs.)

`profile.terms`, `status`, `portrait`, `avatar` and `album` stay in the content for the
sections to come; the hero reads only `intro` and `email`.

## Motion

| Motion | Why | How |
|---|---|---|
| Name, sentence, actions, counts fade up in sequence | Hierarchy: claim first, proof second | `.fade-rise`, CSS keyframes |
| The wall loops and curls | The whole portfolio passes by on one screen | GSAP ticker moves four tracks (24 to 34px/s, alternating direction); per frame each card gets `rotateX` by its height, depth and scale by its distance from the middle |
| Hovering a column slows it | Lets the eye settle on a card | `slowTo` 0.2, eased at 8% per frame |
| Card hover | Invites the click | Cover zooms 1.08, shadow turns blue, an arrow circle scales in |
| Button hover | Tactile without colour change | The pill scales 1.07 and the gap to its glyph circle opens 12 to 24px |
| Photo pan | Depth behind the copy | `.hero-pan`: 5% drift over 36s, back and forth |
| Spinning badge | Explains the only interaction (hover the wall) | `.spin`, 14s per turn |
| Menu toggle lines meet, then cross | The button explains its own state change | CSS transitions with staggered delays |
| Buttons scale to 0.98 when pressed | Tactile feedback | CSS transform, 150ms |
| Header hairline on scroll | State change: content is under the header | `animation-timeline: scroll()` |

Only `transform` and `opacity` animate (plus the panel's visibility). Nothing listens to
scroll (owner, 2026-11-13). Under `prefers-reduced-motion: reduce` everything renders in
its final state; the wall is laid out once and stands still.

## Do's and don'ts

- **Zero em or en dashes** in visible copy. Ranges use a hyphen.
- One label per intent across the page: contact is always "Email me".
- No locale or time strips, version labels, pagination, scroll cues or section numbers.
- No emoji. No gradients. Blue is the only action colour; the five hues never mark a
  button or link (brand-colour social buttons are the one exception, being logos).
- Shadows are soft and navy-tinted, never black; no lips, no glows.
- Never invent a number. Every figure comes from the CV or from Rayhan directly.
- Icons come from Phosphor only (`@phosphor-icons/react/dist/ssr`), 20px in the menu,
  16px inside buttons and the menu footer.
