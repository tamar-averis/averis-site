# Handoff: Averis marketing website

## Overview

The public marketing site for **Averis** (averis.ai), a healthcare claims analysis firm that
defends providers against payer overpayment allegations. Four routed pages plus three
standalone legal documents, built against the Averis design system that lives in this
same project.

Audience: provider CFOs, general counsel, compliance leaders, and the law firms that
partner with Averis. Tone is authoritative and precise, always on the provider's side.

## About the design files

**The files in this bundle are design references created in HTML.** They are prototypes
showing intended look and behavior, not production code to lift directly. Your task is to
recreate these designs in the target codebase's existing environment (Next.js, Remix,
Astro, whatever the team uses) with its established patterns, routing, and component
conventions. If no environment exists yet, pick the framework that fits the project. This
is a marketing site with one form, so a static site generator is likely the right call.

Two things about the prototype that are artifacts of the medium, not design intent:

- Screens are plain `<script type="text/babel">` files loaded from a CDN, sharing state
  through `window`. Replace with real modules and imports.
- Page switching is React state plus a URL hash. Replace with the framework's router;
  each page should be a real URL (`/`, `/how-it-works`, `/about`, `/contact`).

## Fidelity

**High fidelity.** Colors, typography, spacing, radii, shadows, and interaction states are
final and specified exactly below. Recreate pixel-perfectly. Every value in this document
comes from a token in `styles.css` — wire those tokens into the target codebase rather
than hard-coding hex values.

## Design tokens

Ship `styles.css` and the `tokens/` directory as-is if the stack allows CSS custom
properties; otherwise translate to the local theme format. Full set is in
`tokens/`, the values that matter most:

### Color

| Token | Value | Use |
| --- | --- | --- |
| `--averis-harbor-green` | `#16473F` | Primary. Hero band, solid buttons, headings |
| `--averis-pine` | `#1E5A4E` | Hover state for primary green |
| `--averis-deep-pine` | `#0F3630` | Closing CTA band, footer, tooltips, modal scrim |
| `--averis-champagne` | `#E4C58A` | Accent on dark. The affirmation line |
| `--averis-champagne-deep` | `#C79A4E` | Accent on light. Focus rings, active tab rule |
| `--averis-bone` | `#F5F2EB` | Warm light background, text on green |
| `--averis-sand` | `#E7E0D2` | Neutral fill, dividers, switch track |
| `--averis-page` | `#EDEEEA` | Page tint behind content |
| `--averis-charcoal` | `#1D211F` | Strong body text |
| `--averis-slate` | `#3F4A45` | Body text |
| `--averis-slate-light` | `#7A847E` | Muted text, captions |
| `--averis-mist` | `#8A948E` | Faint text |
| `--status-critical` | `#B4573A` | Adverse states only. Never for emphasis |

Semantic aliases sit on top (`--text-heading`, `--surface-card`, `--border-hairline`,
`--interactive-primary`, etc.). **Use the semantic tokens in components**, not the raw
palette. Two prohibitions from the brand guidelines: no red for emphasis, no clinical
mint or teal anywhere.

Borders are always green-tinted alpha, never grey: `--border-hairline`
`rgba(22,71,63,.10)`, `--border-soft` `rgba(22,71,63,.14)`, `--border-strong`
`rgba(22,71,63,.30)`, `--border-on-inverse` `rgba(245,242,235,.18)`.

### Typography

Archivo (display) and Inter (UI), both SIL OFL, loaded from Google Fonts in
`tokens/fonts.css`. Self-host if the team prefers; weights needed are Archivo
400/600/700/800 and Inter 400/500/600/700.

| Token | Size | Use |
| --- | --- | --- |
| `--text-display-1` | 64px | Reserved, unused on the current site |
| `--text-display-2` | 52px / 800 / line-height 1.04 | Page h1 |
| `--text-h1` | 30px / 700 | Section headline, CTA band |
| `--text-h2` | 26px / 700 | Section heading |
| `--text-h3` | 20px / 600 | Card heading |
| `--text-h4` | 15px / 600 | Small card heading |
| `--text-lead` | 16px | Hero and intro paragraph |
| `--text-body-lg` | 15px | Section body |
| `--text-body-md` | 14.5px | Default body, form fields |
| `--text-body-sm` | 13px | Secondary, table cells, footer links |
| `--text-caption` | 12px | Meta, footnotes |
| `--text-micro` | 11px | Eyebrows, badges, table headers |
| `--text-nano` | 9px | Logo category line only |

Tracking: display `-.01em`; wordmark `.15em`; eyebrow `.2em`; form label `.14em`; logo
category line `.24em`. Line height 1.55 body, 1.05–1.06 display.

**Casing rule:** sentence case everywhere except three tracked uppercase labels (section
eyebrow, form label, logo category line). Never uppercase a headline.

### Spacing, radius, elevation, motion

- Scale: 4, 6, 8, 12, 14, 18, 22, 26, 34, 44, 56, 64, 96px.
- Section padding `56px` vertical / `40px` horizontal inside a `1180px` max-width column
  (`.wrap`). Body copy caps at `--measure` 640px; lead paragraphs at 520px.
- Radii: 3px (line caps), 6px (chips, small controls), 10px (buttons, inputs), 12px
  (panels), **14px (cards, the default)**, 22px (app icon), pill (tags).
- Shadows, four only: `--shadow-card` `0 1px 2px rgba(15,54,48,.04)`, `--shadow-raised`
  `0 6px 18px rgba(15,54,48,.10)`, `--shadow-dialog` `0 24px 60px rgba(15,54,48,.22)`,
  `--shadow-tile` `0 10px 26px rgba(15,54,48,.28)`. No inner shadows, no stacking.
- Motion: `--duration-fast` 120ms (press, hover color), `--duration-base` 180ms (most),
  `--duration-slow` 320ms (panel/modal entry). Easing `cubic-bezier(.2,.6,.2,1)`. Fades
  and short translations only. No bounce, no spring, no parallax, no counting-up numbers.

## The affirmation line

The brand's signature device and the single most important detail to get right: a
champagne rule that underlines a claim, derived from the crossbar of the "A" in the logo.

- Always horizontal, always champagne, always fully rounded caps (3px radius).
- 4px as a divider or card accent; 6px under a hero headline.
- Overhangs its container by roughly 8px.
- Never tilted, never a full border, never repeated decoratively.
- **One underlined headline per screen.**

Under a hero h1 it must survive text wrapping. Implement as a background gradient on the
span, not an absolutely positioned bar:

```css
background: linear-gradient(var(--accent-line), var(--accent-line)) 0 100%/100% 6px no-repeat;
padding-bottom: 8px;
box-decoration-break: clone;
```

An absolutely positioned bar requires `white-space: nowrap`, which blows out the grid
column at narrow widths. This was a real bug in the prototype; do not reintroduce it.

## Components

The site composes primitives from the Averis design system rather than defining its own.
Each lives in `components/<group>/<Name>.jsx` with a sibling `.d.ts` (props contract) and
`.prompt.md` (usage). Rebuild these first, then the screens.

| Component | Variants and notes |
| --- | --- |
| `Button` | `primary` (solid Harbor Green), `secondary` (hairline outline), `accent` (champagne, max one per page), `ghost`, `inverse` (for green sections). Sizes `sm` 8/14px, `md` 11/20px, `lg` 14/26px padding. Radius 10px, weight 600. Hover: green lightens to Pine; outline/ghost take a 5% green tint. Press: `translateY(1px)`, no scale |
| `IconButton` | Square 28/36/44px, `ghost` / `outline` / `solid` / `inverse`. Requires an accessible label |
| `Icon` | 15 vendored Lucide 0.454.0 glyphs, inlined as path data. See Assets |
| `Logo` | Mark + Archivo wordmark tracked .15em + champagne line beneath. `primary` / `reversed`, optional descriptor line, `markOnly` |
| `AffirmationLine`, `AffirmationHeading` | The champagne rule as a component |
| `Card` | Tones `light` / `bone` / `sand` / `green`. Radius 14px, hairline border, `--shadow-card`. `accent` adds a 64×4px champagne rule at the top-left edge. `interactive` lifts to `--shadow-raised` on hover, nothing else moves |
| `Badge` | 11px uppercase tracked .06em, radius 6px. Tones `proven` / `review` / `neutral` / `critical` / `inverse` |
| `Tag` | Pill, 12px, sentence case. Tones `sand` / `outline` / `green`. Optional remove affordance |
| `Input` | Label uppercase tracked .14em in Pine above the field. Radius 10px, 1px `--border-soft`. Focus: champagne border + `0 0 0 3px rgba(199,154,78,.35)`. Never browser blue. Supports `prefix`, `hint`, `error` |
| `Select` | Visually identical to Input, custom CSS caret |
| `Checkbox` | 18px, radius 3px, fills Harbor Green with a bone check. Optional description line |
| `Radio`, `RadioGroup` | 18px circle, 9px Harbor Green dot |
| `Switch` | 38×22px track, Sand off / Harbor Green on, knob turns champagne when on |
| `Dialog` | Centered, radius 14px, `--shadow-dialog`, scrim `rgba(15,54,48,.42)` + 3px blur |
| `Toast` | Radius 12px, `--shadow-raised`, leading status icon, 300–420px wide |
| `Tooltip` | Deep Pine, 12px, radius 6px, on hover and focus |
| `Tabs` | Underlined bar, 26px gap. **Active state is the 3px champagne rule and nothing else** — no background fill. `light` and `dark` tones |

Transparency and blur appear in exactly three places: the sticky header
(`rgba(255,255,255,.92)` + 10px blur), the modal scrim, and surfaces inside a green
section (`rgba(245,242,235,.06)` on a `rgba(245,242,235,.18)` border). Nowhere else.

## Screens

Shared chrome on every page: a sticky 74px header and a Deep Pine footer.

### Header

Sticky, `z-index: 20`, `rgba(255,255,255,.92)` with `backdrop-filter: blur(10px)`, 1px
hairline bottom border. Inside the 1180px column: logo left (21px wordmark), then nav
right with 30px gaps — Overview, How it works, About, Contact — then a `sm` primary
button, "Request an analysis", routing to Contact.

Active nav item: weight 600, `--text-heading`, with a 2px champagne rule 2px below the
text. Inactive: weight 500, `--text-muted`.

### Footer

Deep Pine, `56px 0 34px`. Two-column grid `1.4fr 1fr`, 40px gap.

- Left: reversed logo with descriptor, then the boilerplate paragraph at 13px
  `--text-on-inverse-mute`, max 260px.
- Right: a "Legal" column — eyebrow in champagne, then Privacy / Terms / HIPAA & security
  at 13px, 9px gaps.
- Bottom bar: 44px above, 20px padding, 1px `--border-on-inverse` top border, 12px
  `--text-on-inverse-mute`. Left "© 2026 Averis. averis.ai", right "We prove you were right."

---

### 1. Overview (`/`)

**Purpose:** state the problem, establish credibility, drive to contact.

**Hero.** Harbor Green, `104px 40px 92px`. A 520px champagne radial glow bleeds off the
bottom-right at 16% opacity — the only decorative gradient in the entire system. Grid
`minmax(0,1.15fr) minmax(0,.85fr)`, 56px gap, centered. **The `minmax(0,…)` matters**; a
plain `1.15fr .85fr` lets the headline's min-content width blow out the track.

- Eyebrow "Healthcare Claims Analysis" in champagne.
- h1 52px/800, bone, max 640px: "When a payer alleges overpayment," line break, then
  "we prove you were right." carrying the affirmation underline.
- Lead paragraph 16px `--text-on-inverse-sub`, max 520px.
- Buttons: `inverse` `lg` "Request an analysis" → Contact; `ghost` `lg` with a
  `rgba(245,242,235,.18)` border, "How it works" with a trailing arrow icon.
- Right: a green card, `rgba(245,242,235,.06)` fill, header row "One matter, at a glance"
  (uppercase, tracked) plus a `Badge tone="inverse"` reading "Sample". Body is four
  key/value rows separated by 1px `--border-on-inverse`, values in Archivo 700 at 19px,
  the last one champagne: Claim lines in the extract 1,412,908 / Lines cited by payer
  6,140 / Supported on the record 5,918 / Demand withdrawn $18.6M.

**Problem section.** White. Grid `.9fr 1.1fr`, 56px gap. Left: eyebrow "The problem" and
h2 "An allegation is an extrapolation, not a finding." Right: one 15px paragraph.
Below, a three-column card grid, 18px gap, bone cards, 24px padding, each with a 22px
champagne icon (`database`, `file-search`, `scale`), an h3, and a paragraph.

**Stat band.** Harbor Green, three columns, 34px gap. Each: number in Archivo 800 at
42px bone, a 52×4px champagne rule with 14px margins, then a 13px label capped at 190px.

- 1M+ / Claim lines reviewed
- 60 days / To file rebuttal
- $100M+ / Largest exposure defended

**Audience section.** Bone. Grid `1fr 1fr`, centered. Left: eyebrow, h2 "Providers, their
counsel, and no one else.", a paragraph, and five sand tags. Right: a white card, 30px
padding, holding a pull quote in Archivo 600 at 22px with line-height 1.4, a 72px
affirmation line, then attribution at 13px muted.

**Closing CTA.** Deep Pine, `72px 0`. Flex row, space-between: h2 30px/700 bone capped at
560px, and an `accent` `lg` button.

### 2. How it works (`/how-it-works`)

**Hero.** Harbor Green, `72px 0 64px`. Eyebrow, h1 52px/800 capped at 760px, lead
paragraph at 640px.

**Four-step grid.** White, four equal columns, 18px gap. Each card: an icon top-left and
a two-digit number in Archivo 700 champagne top-right, then h3, then a paragraph. Steps
are Intake (`file-text`), Extraction (`database`), Analysis (`line-chart`), Rebuttal
(`scale`). The fourth card is bone with the `accent` rule.

**Deliverables and timeline.** 56px below, grid `1fr 1fr`. Left: eyebrow "What you
receive" and four rows, each a champagne check icon plus a title in Archivo 600 at 15px
and a description, separated by 1px hairline top borders. Right: a sand card, 28px
padding — eyebrow "Engagement", h3 "Sixty days, typical", then four rows in a
`92px 1fr` grid with the period in mono 12px muted and the phase in 14.5px. Then an 80px
affirmation line and a 13px footnote.

Timeline: Days 1–5 intake and data access / Days 6–20 extraction and validation /
Days 21–50 line-level analysis / Days 51–60 packet delivered to counsel.

**Evidence section.** Bone. Eyebrow "The evidence", h2 "What a findings packet looks
like", a lead paragraph, four filter tags, then a `Tabs` bar with three tabs.

- **Findings** (default): a white card, radius 14px, `overflow: hidden`, holding a full-
  width table. Header row on bone with 11px uppercase tracked Pine labels; body rows 13px
  with 13/18px cells and 1px hairline bottom borders. Claim ID and code in mono 12px,
  determination as a `Badge`, and a trailing tooltip-wrapped `file-search` icon. Footer
  strip on bone: "Showing 6 of 6,140 cited lines" left, a `secondary` `sm` download
  button right.
- **Sampling**: a white card, two columns, each an h3 and a paragraph, with a 90px
  affirmation line beneath.
- **Source manifest**: a white card, three rows in a `1.2fr 1fr .6fr` grid — file name,
  sha256 hash in mono, line count right-aligned.

### 3. About (`/about`)

**Purpose:** the "why" page — founder bio and credentials.

**Hero.** Harbor Green, `72px 0 64px`, grid `minmax(0,1.25fr) minmax(0,.75fr)`, aligned to
start. Left: eyebrow "Why Averis", h1 with the affirmation underline on the closing
phrase, then a lead paragraph. Right: a translucent green card holding a 74px circular
monogram in champagne Archivo 700, the name in Archivo 700 at 22px, the role in champagne
13px, a 52px affirmation line, a 13px descriptor, and a LinkedIn link with a trailing
arrow.

**Background.** White, grid `.9fr 1.1fr`. Left: eyebrow and h2. Right: one 15px paragraph
capped at 640px, then four outline tags.

**Focus areas.** Bone. Eyebrow, h2, then a two-column list capped at 900px with 40px
column gap — each row a champagne check icon and a 14.5px label, separated by hairline
top borders. Seven items.

**Deliverables.** White. Eyebrow, then five equal columns, 14px gap, each a card with an
icon and an h4 at 15px/600, line-height 1.35. The fifth is bone with the `accent` rule.

**Closing CTA.** Deep Pine, same pattern as the Overview page.

> **Open items on this page.** The bio copy references a different entity name, there is
> no headshot (a monogram stands in), and no credentials block exists yet. Confirm all
> three with the client before building.

### 4. Contact (`/contact`)

Bone, `64px 0 80px`, grid `.85fr 1.15fr`, aligned to start.

**Left rail.** Eyebrow, h1 "Send us the allegation letter.", a paragraph, a 90px
affirmation line, then three icon rows: `mail` with the inbox address, `phone`, and
`shield-check` with "HIPAA-compliant intake, BAA on request".

**Form card.** White, 30px padding. Fields in a 16px-gap column:

1. Name and Work email, side by side, both required.
2. Organization and Payer type (Commercial / Federal / Both), side by side.
3. Alleged overpayment / restriction value, optional, `$` prefix.
4. Your role — radio group: Provider finance or compliance, Outside counsel.
5. Checkbox: "An appeal deadline is already set" with a description line.
6. `lg` full-width primary submit, label switches to "Sending" while in flight.
7. Footnote at 12px muted: "Do not send protected health information through this form.
   We will provide a secure channel at intake."

**Success state.** Replaces the form: a `proven` Toast, a confirmation paragraph, and a
`secondary` `sm` "Send another" button that resets to idle.

**Error state.** An inline 13px `--status-critical` line offering the direct email
address.

### 5. Legal pages (`/legal/privacy`, `/legal/terms`, `/legal/hipaa-security`)

Standalone documents sharing one shell. Header and footer as above, then a title block
(eyebrow "Legal", h1, intro paragraph, last-updated line), then a `220px 1fr` grid with
56px gap and 40px horizontal padding — **the padding must match `.wrap`**, or the sidebar
misaligns with the heading.

Left: a sticky table of contents at `top: 106px`, 13px links with a transparent 2px left
border that turns champagne on hover. Right: sections separated by hairline top borders,
each with an h3-styled heading and prose capped at 640px.

Below 820px the TOC hides and the grid collapses to one column. Print styles hide the
header, TOC, and footer.

Every page ends with a "Draft for counsel review" notice.

## Interactions and behavior

- **Navigation.** Header nav and every CTA route between pages; scroll resets to top.
  Legacy `#evidence` links redirect to How it works.
- **Tabs.** Client-side switching on the evidence section, no fetch.
- **Hover.** Solid green → Pine. Outline/ghost → 5% green tint, border darkens. Links
  Harbor Green → Pine. Nav items reveal the champagne rule. Cards lift `--shadow-card` →
  `--shadow-raised`. Nothing scales.
- **Press.** `translateY(1px)`. No color change beyond hover, no scale.
- **Focus.** Champagne border plus `0 0 0 3px rgba(199,154,78,.35)`. Never browser blue.
- **Tooltips.** Show on hover and focus.
- **Responsive.** The prototype is desktop-only. Every multi-column grid needs mobile
  treatment: hero and contact stack to one column, the four-step and five-card grids go
  to two columns then one, the stat band to one column, the findings table scrolls
  horizontally in a container or reflows to stacked cards. Section padding drops to
  `40px / 26px`. **This work has not been designed — get layouts approved before
  building mobile.**

## State management

Trivial; no global store needed.

| State | Scope | Notes |
| --- | --- | --- |
| Current page | App | Replace with the router |
| Evidence tab | How it works | `'findings' | 'method' | 'sources'` |
| Contact form fields | Contact | Seven controlled values |
| Contact submit status | Contact | `'idle' | 'sending' | 'sent' | 'error'` |

No data fetching anywhere except the contact submit.

### Contact form delivery

**Unresolved — confirm before building.** The prototype supports two paths, selected by a
`FORM_ENDPOINT` constant at the top of `ContactScreen.jsx`:

- Empty (current): opens the visitor's mail client with a pre-filled message to
  `counsel@averis.ai`. No backend, but depends on a configured mail client.
- Set: POSTs JSON to a form relay (Formspree, Getform, Basin) that forwards to an inbox.

Given the HIPAA posture, a relay puts a third party between a provider and Averis. The
no-PHI warning must stay on the form regardless, and counsel should approve the vendor.
A first-party endpoint is the safer answer if the team can host one.

## Assets

All in `assets/`, all reconstructed from the client's brand guidelines document.

- **Logo lockups.** `logo-primary.svg`, `logo-reversed.svg`, the two
  `logo-lockup-descriptor*.svg` variants with the "Healthcare Claims Analysis" category
  line, and `logo-mono-black.svg` / `logo-mono-bone.svg`.
- **Mark.** `mark-green.svg`, `mark-bone.svg`, `mark-black.svg`, `mark-white.svg`.
- **Icon and favicon.** `icon-glyph.svg`, `app-icon.svg` (1024px rounded tile),
  `favicon.svg` — the compact mark, with the champagne bar kept inside the A.
- **Icons.** `assets/icons/` holds 15 Lucide 0.454.0 glyphs (ISC), also inlined as path
  data in `components/core/Icon.jsx`: `file-search`, `shield-check`, `scale`, `database`,
  `line-chart`, `check`, `arrow-right`, `download`, `info`, `clock`, `triangle-alert`,
  `file-text`, `mail`, `phone`, `ellipsis`. Swap for the npm `lucide-react` package if
  the stack already uses it — same version, same geometry.

Notes for the developer:

- **The wordmark in the lockup SVGs is live Archivo text, not outlines.** Fine for the
  web since the font loads anyway; convert to outlines for print or any context where the
  font may be absent.
- Clear space around the logo equals the height of the A mark on all sides. Minimum
  lockup width 120px; the standalone mark may go to 16px.
- **No photography exists.** The brand guidelines supplied none and none was invented.
  Where imagery would normally sit, the design uses green fields, data panels, and the
  affirmation line. If the client commissions photography, it should be quiet, low
  contrast, neutral, with a calm area for the logo.
- **No emoji, anywhere.** Not in product, not in marketing, not in email.

## Content

Copy in these files is a mix of client-approved and placeholder. Before launch, confirm:

- **All figures are sample content**, including 1,412,908 lines, 6,140 cited, $18.6M
  withdrawn, the 3.6% vs 27% error rates, and the source-manifest hashes.
- **The pull quote on the Overview page is unattributed placeholder text.**
- **The legal pages are drafts written to the brand voice, not legal documents.** They
  assume Maryland governing law, Montgomery County venue, 24-month inquiry retention,
  90-day log retention, TLS 1.2+/AES-256, and the addresses privacy@ / legal@ / security@
  / counsel@averis.ai. Every one needs counsel review.
- **The About page bio names a different entity**, has no headshot, and has no
  credentials.

## Files in this bundle

| Path | What it is |
| --- | --- |
| `styles.css` | Entry point; `@import`s only |
| `tokens/` | Seven token files: colors, typography, spacing, radius, elevation, motion, fonts |
| `assets/` | Logos, marks, app icon, favicon, and the 15 icon SVGs |
| `component_source.md` | All 19 primitives: props contract, usage notes, and full implementation for each |
| `screen_source.md` | All four screens plus the three legal pages, full source |
| `design_system_readme.md` | Full brand guide: content fundamentals, visual foundations, iconography |

Component and screen source is inlined into two markdown files rather than shipped as
loose `.jsx`. The originals live in the design system project at `components/` and
`ui_kits/website/`; the inlined copies here are byte-identical.

Read `design_system_readme.md` before writing any copy. It carries the voice rules —
person, casing, number formatting, and the list of words and constructions the brand
does not use.
