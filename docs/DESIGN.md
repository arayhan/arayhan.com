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

| Dial | Value | Meaning here |
|---|---|---|
| Design variance | 6 | Left-aligned, asymmetric offsets; never a centered hero |
| Motion intensity | 7 | The hero's kinetic type is the visual; every motion has a reason |
| Visual density | 3 | Airy; one idea per screen |

**Tactile cards, enterprise restraint** (owner's pick, 2026-10-26). The reference is a
fitness-app card board: white rounded cards on a cool grey page, filled colour icon circles,
buttons with a pressed bottom edge, tinted status strips, hairline list rows, a faint dot
texture in card corners. Kept professional by: one accent for every action, link and
active state (blue; the category hues and the dot texture are gone); no emoji; calm motion; Geist, not a rounded display face. The proof is real numbers.

## Tokens

Source: [`src/styles/tokens.css`](../src/styles/tokens.css), mapped to Tailwind in
`src/app/globals.css` (`bg-canvas`, `text-ink`, `bg-feature`, `rounded-card`,
`shadow-card`, `shadow-lip-accent`, ...).

| Token | Value | Role |
|---|---|---|
| `canvas` | `#0A1220` | Page ground, deep navy |
| `surface` | `#0F1A2C` | Cards, panels, secondary buttons |
| `soft` | `#16233A` | Chips, address strip, icon hover |
| `ink` | `#EEF1F6` | Text, ink icon badges, idle orbit dots |
| `mute` | `#97A3B6` | Secondary text, idle icons |
| `line` | `#1F2C42` | Hairlines, card borders |
| `grid` | `#121D31` | The hero's commit grid, one step off the canvas |
| `accent` | `#60A5FA` | **The one action colour**: logo, primary button, active tab, links, focus, cursor ripple |
| `on-accent` | `#0B1B3A` | Text and glyphs on accent and on hue fills |
| `accent-text` | `#60A5FA` | Accent as text |
| `accent-soft` | accent 12% | Notice background |
| `feature`, `on-feature`, `feature-mute`, `feature-accent` | `#172C4F`, `#EEF1F6`, `#A9B6CA`, `#93C5FD` | The navy slab a bento leads with; `feature-accent` is the accent on it |
| `hue-{blue,violet,teal,amber,rose}` | `#60A5FA`, `#A78BFA`, `#2DD4BF`, `#FBBF24`, `#FB7185` | Decoration only: badges, commits, covers, orbit, active /term; each clears 4.5:1 as text |
| `hue-*-soft` | the hue at 14% | Cover grounds |
| `accent-lip`, `slab-lip` | `#1D4ED8`, `#050A14` | The flat 2px bottom edge of controls and cards |
| `card-radius`, `control-radius` | 16px, 12px | `rounded-card`, `rounded-control` |
| `card-shadow` | `0 2px 0 slab-lip` | `shadow-card`: a lip, never a blur |
| `page-max` | 1360px | `max-w-page`: header, hero, shelf and stub pages |

**One action colour, five decorative hues, flat.** Blue drives every action, link and focus
state. The five hues share one brightness so they read as one family; they colour things
that are not pressed (badges, commit squares, covers, the orbit, the active /term and the
shelf heading). Navy is the dark neutral. No gradients anywhere (fills, shadows, masks,
orbit dots).

Theme: **dark only**, by the owner's choice (2026-10-27). There is no light theme, no
toggle and no OS switch; `color-scheme: dark`. The favicon keeps its own
`prefers-color-scheme` query because it sits in the browser's chrome, not the page.

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
  `surface`, `shadow-card` (a flat 2px lip like the buttons). `feature` makes it the navy
  slab (`feature` fill, `on-feature` text); one per grid, the cell the grid leads with.
  Lists inside a card are full-bleed hairline rows.
- **Controls** (`src/components/ui/action.ts`): `rounded-control` (12px), semibold.
  Primary is blue `accent` with white text and a 2px `accent-lip`; secondary is a `surface`
  slab with a border and a 2px `slab-lip`. Pressing sinks the face 2px onto the lip (the shadow goes to none). Sizes
  44px and 36px.
- **Icon badges** (`IconBadge.tsx`): flat filled circles (28px or 40px) with a Phosphor
  `fill` glyph: a `hue` fill with a navy glyph, or `ink` without a hue. Decorative; the
  text beside them carries the meaning. Not repeated on every card.
- **Covers** (`Cover.tsx`): an item's image in a `rounded-control` frame (`next/image` from
  the item's `cover`). Until one exists (`TODO(content)`) it draws a placeholder in the
  item's hue: the commit motif (a repeating faint grid plus seeded brighter cells, fixed
  pixel size at any cover size, the same item always the same) with the item's glyph in a
  navy circle. Never a stock photo standing in for the owner's work.
- **Notices** (`Notice.tsx`): `rounded-control` strip in `accent-soft` with an `accent-text`
  title and a mute line. For states only (for example "In progress" on stub pages).
- Icon buttons (socials) are `rounded-control` with a `soft` hover. The Menu toggle
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
  a hairline divider, and the **Menu** toggle:
  the word "Menu" beside a 40px round icon (hairline border). **Hover opens it** (mouse
  only): it stays open while the pointer is on the trigger or the panel and closes 220ms
  after leaving both; a mouse click never closes it. Tap, Enter/Space and Ctrl/Cmd K
  toggle; keyboard opening moves focus to the first link, Escape returns it. Three equal 16 x 2px
  bars on a whole-pixel grid (4px apart, so every bar renders identically at any display
  scaling) meet in the middle and the outer two cross into a centred X; closed and hovered,
  the outer bars ease apart by 1px each way; pressed, it scales to 0.95. Strict
  symmetry is the rule (owner rejected an asymmetric pill). Styles in `globals.css`
  (`.menu-toggle`). Escape and click-outside close it.
- **Menu panel, "Address bar" style** (`SiteMenu`, client): a card whose `soft` top strip
  reads `arayhan.com/` (the canonical host, `src/content/site.ts`) and types the path of whatever link is pointed at or focused, with
  the logo's blinking cursor. Three plain-text columns: Showcase (Work, Services & Rates,
  Talks, Album) in 20px semibold; Blog and Products; About with Uses' six areas as one
  quiet line. Footer: social icons and the email as selectable text on a small slab.
- What it must never become: icon tiles, chips, letter avatars, search slabs, kbd badges.

All destinations live in `src/content/navigation.ts`; every one has a route (placeholder
pages via `src/components/StubPage.tsx` until content exists).

## Hero

`src/modules/home/components/Hero.tsx` (server) with client leaves, followed by the term
shelf (below). The hero fits its content plus 80px of padding top and bottom from `lg` (the
owner asked for more room, not a full screen); the CTAs stay above the fold at 1440x900. References the owner
chose: the type of theodorusclarence.com and dwinawan.com.

One active /term drives the whole page (`ActiveTerm` context, wrapping hero and shelf in
`HomePage`): the sentence, proof card, orbit and shelf always agree. Left alone it walks the
terms every 8s, but holds while the pointer or focus is in the hero, while the shelf is on
screen (so a list never changes under a reader) and under reduced motion.

0. **Backdrop** (`backdrops/CommitField`, picked from five variants): a full-bleed canvas of
   soft rounded cells (22px on a 30px pitch, an 8px gap, radius 6; base grid at 85% of
   `--grid`; commits in the five hues, blue weighted twice, at 22, 40 and 62%; ripple in the
   accent at 30%: texture, never louder than the copy), a contribution graph seen from far
   away. Cells "commit" at random and fade back; the cursor
   sends a soft ripple through nearby cells. Thinned behind the copy in four flat steps, not
   a smooth fade (alpha baked into the drawing). The static grid is cached
   offscreen; only live cells redraw; paused offscreen; still under reduced motion.
   Performance rule learned choosing it: no blur filters or CSS masks over moving layers
   (they cost 10-45fps); use gradients, alpha baked into canvas drawing, or overlay fades.
   (Turned down: a dot-lattice canvas, a drifting aurora, a spotlight with a line grid, and
   the Flow, Blueprint, Kinetic type and Keycaps backdrops.)

1. **Status chip**: a small `surface` chip (control radius, border, card shadow) opening with
   a 26px round avatar of the owner (`profile.avatar`, `public/avatar.webp`, a head crop of
   the cut-out), then a mono terminal line,
   "$ whoami → **Solution Fullstack Engineer** @ Badr Interactive" (`profile.status`). Wraps
   on narrow screens rather than truncating.
2. **Name and sentence** (`HeroShowcase`): the h1 is just "I'm Rayhan" (Clarence-style),
   then one light, muted sentence (Dwinawan-style): "Fullstack engineer who makes complicated
   products feel simple. Wander through my **/works**, **/talks** and **/products**." Each
   term is a button in the sentence's own grey: hover turns it ink, and the active one
   takes its hue. Hover, focus or tap swaps the **proof card**: header with the term's
   `IconBadge` in its hue, label ("Works") and title line (no pagination); the big number
   that counts up, its label and detail; one hairline row per supporting fact (a badge in
   the fact's hue, or the product's own logo from `public/products/*.svg`, then value over
   label); a full-width secondary "See all N" button. All from `profile.terms` (`label`,
   `icon`, `hue`; a fact can override `hue`). Terms: works blue, talks violet, products teal.
3. "Email me" + "See my work" (scrolls to the shelf). The bio paragraph and the social
   icons left the hero (socials live in the Menu panel); the proof card's button is
   "See all N", also scrolling to the shelf.
3a. **Orbit** (`shapes/OrbitSystem`, client, `lg` up; picked from four shape variants): the
   proof card sits centred in the right column inside three tilted rings, each carrying a
   flat dot. Dots pass behind the card on the far half and in front on the near half (a
   second layer above the card holds the near dots; rings stay behind so no line crosses
   the text). The active term's ring and dot take its hue, the others stay ink; the system
   tilts toward the pointer. Still under reduced motion; phones get the proof card alone.
   (Turned down: the floating card board, and the Glyph, Bauhaus and Ribbon shapes.) The
   cut-out photo (`profile.portrait`) is kept for the About page.
4. **Album marquee** (`AlbumMarquee`), rendered only once `profile.album` has photos: two rows in opposite directions; page scroll speed
   boosts and flips them (scrollY sampled per frame, no listener); hovering a row pauses it,
   lifts the photo and dims the others.

**Term shelf** (`TermShelf`, client, `#shelf`, right under the hero): everything behind the
active /term. A heading with the term in its hue and the count ("/works 5 projects"), the
three terms as small tabs (they set the same active term) and an "Open /term" link to its
page. Each term has its own composition, never the same card grid (taste pass):
- **Works** (`content/projects.ts`): a bento. The first project is featured across two
  columns on the navy `feature` slab with its big metric (`feature-accent` when it is a
  measured `improvement`) and highlight lines, its cover beside the copy from `md`; no
  repeated icon badges, so five projects fill exactly two rows (lg 2 + 1 then 3; sm 2 then
  2 + 2). The other cards put their cover on top; covers cycle the hues (`hueAt`). Cards show the metric (or "Impact being measured"
  when `impactPending`, never an invented figure), role over years, stack chips.
- **Talks** (`content/talks.ts`, carried over from the old site and `TODO(content)`
  unconfirmed): one card of year groups in two columns (a 96px cover thumbnail, title,
  event, topic chip); the year headings separate groups, no per-row hairlines.
- **Products** (`content/products.ts`, the single product list the menu and routes also
  use): one tall feature on the navy slab (cover on top) beside two stacked (cover on the
  left from `sm`), never three equal cards.
Cards rise in with a stagger when the term changes (CSS `fade-rise`).

Placeholders (album photos, covers, unconfirmed socials) are `TODO(content)`; covers draw
the branded placeholder above, nothing else renders an empty photo frame; unconfirmed social URLs are `null` and not rendered.

## Motion

| Motion | Why | How |
|---|---|---|
| Badge, name, sentence, actions fade up in sequence | Hierarchy: claim first, proof second | CSS keyframes, no JS |
| Term swap | Shows the three kinds of proof in one sentence | `ActiveTerm` context; sentence, card, orbit and shelf change together |
| Shelf cards rise in | The list visibly answers the term | CSS `fade-rise`, 60ms stagger, capped at 8 |
| Proof number counts up | The number is the visual | rAF on swap only, ~0.9s ease-out; final value for screen readers |
| Commit field cells and ripple | The ground feels alive, quietly | One canvas, cached grid, live cells only; paused offscreen |
| Orbit dots, ring light, tilt | The hero's visual answers the sentence | rAF on SVG attributes, one layer behind the card and one in front; static under reduced motion |
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
- No locale or time strips, version labels, pagination, scroll cues or section numbers.
- No emoji. No gradients. Blue is the only action colour; the five hues never mark a
  button or link.
- Never invent a number. Every figure comes from the CV or from Rayhan directly.
- Icons come from Phosphor only (`@phosphor-icons/react/dist/ssr`), 20px in the menu,
  16px inside buttons and the menu footer.
