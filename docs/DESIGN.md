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

| Dial | Value | Meaning here |
|---|---|---|
| Design variance | 6 | A centered hero (the owner's reference) made uneven by the tilted collage |
| Motion intensity | 5 | Rise-ins, a tile that straightens on hover; every motion has a reason |
| Visual density | 3 | Airy; one idea per screen |

**Tactile cards, enterprise restraint** (owner's pick, 2026-10-26). The reference is a
fitness-app card board: white rounded cards on a cool grey page, filled colour icon circles,
buttons with a pressed bottom edge, tinted status strips, hairline list rows, a faint dot
texture in card corners. Kept professional by: one accent for every action, link and
active state (blue; the category hues and the dot texture are gone); no emoji; calm motion; Geist, not a rounded display face. The proof is real numbers.

## Tokens

Source: [`src/styles/tokens.css`](../src/styles/tokens.css), mapped to Tailwind in
`src/app/globals.css` (`bg-canvas`, `text-ink`, `bg-feature`, `rounded-card`,
`shadow-card`, `shadow-card-lift`, `shadow-control`, ...).

| Token | Value | Role |
|---|---|---|
| `canvas` | `#F3F5F8` | Page ground, cool light grey |
| `surface` | `#FFFFFF` | Cards, panels, secondary buttons, tile frames |
| `soft` | `#EEF1F5` | Chips, address strip, icon hover |
| `ink` | `#0B1B3A` | Text (navy), ink icon badges |
| `mute` | `#5B6678` | Secondary text, idle icons |
| `line` | `#E3E7EE` | Hairlines, card borders |
| `accent` | `#2563EB` | **The one action colour**: logo, primary button, active tab, links, focus |
| `on-accent` | `#FFFFFF` | Text and glyphs on accent |
| `accent-text` | `#1D4ED8` | Accent as text |
| `accent-soft` | accent 10% | Notice background |
| `feature`, `on-feature`, `feature-mute`, `feature-accent` | `#0F1F3D`, `#EEF1F6`, `#A9B6CA`, `#93C5FD` | The navy slab a bento leads with, the one dark cell on the page; `feature-accent` is the accent on it |
| `hue-{blue,violet,teal,amber,rose}` | `#2563EB`, `#7C3AED`, `#0F766E`, `#B45309`, `#E11D48` | Decoration only: badges, covers, the About shapes, active /term; each clears 4.5:1 as text on white; fills take a white glyph |
| `hue-*-soft` | the hue at 10% | Cover grounds, quiet shapes |
| `card-radius`, `control-radius` | 24px, 12px | `rounded-card`, `rounded-control` |
| `card-shadow` | hairline 1px plus `0 12px 32px -16px` navy at 14% | `shadow-card` |
| `card-shadow-lift` | the same, deeper (22%) | `shadow-card-lift`: collage tiles, hovered About cells |
| `control-shadow` | `0 1px 2px` navy at 8% | `shadow-control`: buttons, chips, round icon buttons |
| `page-max` | 1360px | `max-w-page`: header, shelf, About bento and stub pages (the hero collage is full bleed) |

**One action colour, five decorative hues, flat fills.** Blue drives every action, link and
focus state. The five hues share a weight so they read as one family; they colour things
that are not pressed (badges, covers, the About shapes, the active /term and the shelf
heading). Navy is the ink and the one dark slab. No gradients anywhere (fills, shadows,
masks, brand buttons). Shadows are soft but always tinted navy, never black.

Theme: **light only**, by the owner's choice (2026-10-31; it was dark only from 2026-10-27).
There is no dark theme, no toggle and no OS switch; `color-scheme: light`. The favicon keeps
its own `prefers-color-scheme` query because it sits in the browser's chrome, not the page.

## Typography

Geist and Geist Mono, via `next/font/google`. One family: emphasis is weight or the
accent color, never a second face.

| Role | Size | Weight / tracking |
|---|---|---|
| Hero name (h1) | `text-display` 48 -> 76px, line-height 1, one line, centered | 700, `-0.045em` |
| Hero sentence | `text-lede` 20 -> 28px, line-height 1.35, max 30ch, centered | 400, `-0.02em`, `mute` |
| Page headline (stubs) | `text-hero` 26 -> 40px, line-height 1.16 | 700, `-0.04em` |
| Section and bento titles | 24px (shelf) / 30px (About cells) | 700, `-0.03em` |
| Page subtext | `text-sub` 16 -> 19px | 400, `mute` |
| Eyebrow / labels | 14px | 500, `mute`, sentence case (no uppercase tracking) |
| Buttons | 14px | 600 |
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
- **Radius rule:** cards and tile frames 24px (an image inside a 6px frame 18px), controls
  12px, chips, badges and round icon buttons full.
- **Icon badges** (`IconBadge.tsx`): flat filled circles (28px or 40px) with a Phosphor
  `fill` glyph: a `hue` fill with a white glyph, or `ink` without a hue. Decorative; the
  text beside them carries the meaning. Not repeated on every card.
- **Covers** (`Cover.tsx`): an item's image (`next/image` from the item's `cover`). Until
  one exists (`TODO(content)`) it draws a placeholder in the item's hue: a quiet grid of
  rounded squares plus seeded brighter cells (fixed pixel size at any cover size, the same
  item always the same) with the item's glyph in a white circle. Never a stock photo
  standing in for the owner's work. **Drop-in:** a file at `public/covers/<key>.webp` (or
  png/jpg) becomes that item's cover at the next build, no code change; the key is the
  project `id`, the product `slug` or the talk title in kebab case
  (`src/server/covers.ts`, resolved in `app/page.tsx`).
- **Notices** (`Notice.tsx`): `rounded-control` strip in `accent-soft` with an `accent-text`
  title and a mute line. For states only (for example "In progress" on stub pages).
- **Social links** (`SocialLinks.tsx`): `quiet` tone in the menu (`rounded-control`, `soft`
  hover); `brand` tone in the About bento (56px circles in flat brand colours, white
  glyph; email takes the accent and is labelled "Email me"). The Menu toggle stays a 40px
  circle (owner-tuned). The logo square keeps radius 7/32.

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

`src/modules/home/components/Hero.tsx` (server) with client leaves, then the term shelf and
the About bento. Minimal and centered (the owner's first reference): copy on top, a collage
of the work running out of the hero's bottom edge. 96px top padding from `md`; the CTAs stay
above the fold at 1440x900. Type references the owner chose: theodorusclarence.com and
dwinawan.com.

One active /term drives the sentence and the shelf (`ActiveTerm` context, wrapping both in
`HomePage`). Left alone it walks the terms every 8s, but holds while the pointer or focus is
in the hero copy, while the shelf is on screen (so a list never changes under a reader) and
under reduced motion.

1. **Status chip**: a small white pill (border, control shadow) opening with a 26px round
   avatar of the owner (`profile.avatar`), then a mono terminal line,
   "$ whoami → **Solution Fullstack Engineer** @ Badr Interactive" (`profile.status`). Wraps
   on narrow screens rather than truncating, text left-aligned.
2. **Name and sentence** (`HeroIntro`, one centered column, max 46rem): the h1 is just
   "I'm Rayhan", then one muted sentence: "Fullstack engineer who makes complicated products
   feel simple. Wander through my **/works**, **/talks** and **/products**." Each term is a
   button in the sentence's own grey: hover turns it ink, the active one takes its hue
   (works blue, talks violet, products teal), and hover, focus or tap switches the shelf.
3. "Email me" + "See my work" (scrolls to the shelf), centered.
4. **Collage** (`HeroCollage`, server, decorative, `aria-hidden`): the five works and three
   products interleaved, each a `Cover` (same seed, hue and glyph as its shelf card) in a
   white 6px frame with `shadow-card-lift` and a small name chip at the top left. Five big
   portrait tiles (4:5, `clamp(9rem, 21vw, 22rem)` wide, overlapping slightly) bleed off
   both edges, each at a fixed tilt between -4 and 4 degrees and a small drop; three smaller
   4:3 tiles sit over the gaps, lower down. The strip is clipped at the hero's bottom so the
   tiles run out of it, as in the reference. Hover straightens a tile and lifts it 6px (CSS,
   `.collage-tile`; the tilt lives on its own element so `fade-rise` never overrides it).
   Not links: the shelf below lists the same items.
5. **Album marquee** (`AlbumMarquee`), rendered only once `profile.album` has photos: two
   rows in opposite directions; page scroll speed boosts and flips them; hovering a row
   pauses it, lifts the photo and dims the others.

(Gone on 2026-10-31: the commit-square canvas backdrop, the orbit around a proof card, and
the proof card with its counting number. Earlier rounds also turned down an aurora, a
dot lattice, a spotlight grid, a floating card board and several shape systems.)

**Term shelf** (`TermShelf`, client, `#shelf`, right under the hero): everything behind the
active /term. A heading with the term in its hue and the count ("/works 5 projects"), the
three terms as small tabs (they set the same active term) and an "Open /term" link to its
page. Each term has its own composition, never the same card grid (taste pass):
- **Works** (`content/projects.ts`): a bento. The first project is featured across two
  columns on the navy `feature` slab with its big metric (`feature-accent` when it is a
  measured `improvement`) and highlight lines, its cover beside the copy from `md`; no
  repeated icon badges, so five projects fill exactly two rows (lg 2 + 1 then 3; sm 2 then
  2 + 2). The other cards put their cover on top; covers cycle the hues (`hueAt`). Cards
  show the metric (or "Impact being measured" when `impactPending`, never an invented
  figure), role over years, stack chips.
- **Talks** (`content/talks.ts`, carried over from the old site and `TODO(content)`
  unconfirmed): one card of year groups in two columns (a 96px cover thumbnail, title,
  event, topic chip); the year headings separate groups, no per-row hairlines.
- **Products** (`content/products.ts`, the single product list the menu and routes also
  use): one tall feature on the navy slab (cover on top) beside two stacked (cover on the
  left from `sm`), never three equal cards.
Cards rise in with a stagger when the term changes (CSS `fade-rise`).

**About bento** (`AboutBento`, server, after the shelf; the owner's third reference): four
cards, two columns from `md`.
- **Featured project**: the first project's cover fills the cell; a navy chip carries
  "Featured project" (bold, white) and the name; a round white arrow button links to `/work`.
- **Profile**: the portrait cut-out (`profile.portrait`) in a 144px `hue-teal` circle, the
  full name, `profile.role` and the whoami line.
- **About me**: `profile.bio` and "More about me" to `/about`; flat CSS shapes in the hues
  (an arch, a circle, a square) sit in the bottom corner. No 3D renders, no gradients.
- **Let's connect**: "Find me on these platforms" and the `brand` social buttons (only
  socials with a URL); a soft rose disc in the corner.
Cells rise in on scroll (`.reveal`, a view timeline, no script) and lift 2px with a deeper
shadow on hover.

Placeholders (album photos, covers, unconfirmed socials) are `TODO(content)`; covers draw
the branded placeholder above, nothing else renders an empty photo frame; unconfirmed
social URLs are `null` and not rendered.

## Motion

| Motion | Why | How |
|---|---|---|
| Badge, name, sentence, actions fade up in sequence | Hierarchy: claim first, proof second | CSS keyframes, no JS |
| Term swap | Shows the three kinds of proof in one sentence | `ActiveTerm` context; sentence and shelf change together |
| Collage tiles rise in | The work arrives right after the claim | CSS `fade-rise`, staggered after the buttons |
| Collage tile straightens and lifts on hover | Invites a closer look without leaving the hero | CSS transform transition, 400ms |
| Shelf cards rise in | The list visibly answers the term | CSS `fade-rise`, 60ms stagger, capped at 8 |
| About cells rise in on scroll, lift on hover | The section arrives as it is read | `animation-timeline: view()`; translate + shadow, 300ms |
| Menu toggle lines meet, then cross | The button explains its own state change | CSS transitions with staggered delays |
| Menu path typing + cursor | Ties the menu to the logo and the /slash language | 22ms per character; instant under reduced motion |
| Marquee drift, speed-up on scroll | Album feels alive without taking over | rAF transform; static, hand-scrollable under reduced motion |
| Buttons scale to 0.98 when pressed | Tactile feedback | CSS transform, 150ms |
| Header hairline on scroll | State change: content is under the header | `animation-timeline: scroll()` |

Only `transform` and `opacity` animate (plus the panel's visibility). Under
`prefers-reduced-motion: reduce` everything renders in its final state.

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
