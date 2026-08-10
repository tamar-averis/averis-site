# Averis Design System

Averis is healthcare claims analysis that defends providers against payer allegations.
Averis extracts and analyzes large volumes of claims data to build an evidence-backed
case that stands up when a commercial or federal insurer alleges overpayment, working
alongside providers' attorneys.

The name comes from the Latin *aver*, to assert as true. Everything about the brand
should feel like it is calmly, rigorously proving something. The one-line promise:
**"We prove you were right."**

**Audience:** provider CFOs, general counsel, and compliance leaders, plus the law firms
who partner with Averis. The register is authoritative and precise but always on the
provider's side, an advocate, never an auditor.

## Sources

| Source | What it gave us |
| --- | --- |
| `uploads/Averis Brand Guidelines.html` (Averis Brand Guidelines v1, prepared April 2026) | The entire system: logo construction, palette with hex/RGB, Archivo + Inter type spec, the affirmation-line device, app icon and favicon, voice and taglines, logo do/don't, and the designer asset checklist |

No codebase, Figma file, deck, or photography was supplied. Everything in this project
is derived from that one document. Product surfaces beyond the marketing site
(a client portal, an analyst workspace) are not described anywhere in the source, so
none has been invented here.

**Domain:** averis.ai

## Index

| Path | What's there |
| --- | --- |
| `styles.css` | The single entry point consumers link. `@import`s only. |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `elevation.css`, `motion.css` |
| `assets/` | Logo lockups, mono versions, the A mark in four colourways, app icon, favicon |
| `guidelines/` | 21 foundation specimen cards (Colors, Type, Spacing, Brand) |
| `components/core/` | `Button`, `IconButton`, `Icon`, `Logo`, `AffirmationLine` + `AffirmationHeading`, `Card`, `Badge`, `Tag` |
| `components/forms/` | `Input`, `Select`, `Checkbox`, `Radio` + `RadioGroup`, `Switch` |
| `components/feedback/` | `Dialog`, `Toast`, `Tooltip` |
| `components/navigation/` | `Tabs` |
| `ui_kits/website/` | Four-page clickable recreation of averis.ai: see its own README |
| `templates/marketing-page/` | "Marketing page" template: hero, capability cards, stat band, CTA; the starting point consuming projects copy |
| `infographics/` | Four reusable data graphics (evidence chain, sample vs. population, exposure defended, engagement timeline) |
| `SKILL.md` | Agent Skills front-matter so this folder works as a Claude Code skill |

Each component directory holds `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md`, and one
`@dsCard` HTML showing the family's states.

## Content fundamentals

**Register.** Calm, exact, reassuring. Lead with evidence and outcomes, never with fear.
Never overpromise; prove. Short sentences. Plain nouns. No jargon theatre.

**Person.** Averis speaks as *we*, addresses the reader as *you*, and always positions
the provider as the party in the right. "We prove you were right," not "we help you
avoid liability." Never *the client*, never *users*.

**Casing.** Sentence case for headlines, subheads, buttons, and form labels' underlying
copy. Uppercase is reserved for three tracked labels: section eyebrows (.2em), form
labels and captions (.14em), and the logo category line (.24em). Never uppercase a
headline.

**Numbers.** Always specific, always sourced. "1,412,908 lines" beats "over a million."
Currency in full millions with one decimal ($18.6M). Percentages to one decimal.
Every published figure carries its basis ("median across engagements closed in 2025").

**What we never write.** No exclamation marks. No emoji, anywhere, not in product, not
in marketing, not in email. No fear framing ("don't get caught," "avoid penalties").
No "revolutionary," "AI-powered," "seamless," "unlock." No em-dash rhetorical flourishes
stacked on each other. No red-alert language; the brand does not raise alarm, it settles
one.

**Examples in voice.**

- Hero: "When a payer alleges overpayment, we prove you were right."
- Problem: "An allegation is an extrapolation, not a finding."
- Proof: "1M+ claim lines reviewed. 60 days to file rebuttal."
- Form footnote: "Do not send protected health information through this form. We will provide a secure channel at intake."
- Toast: "Packet exported. 4,182 lines · 62 MB.": state what happened, not how to feel.

**Approved taglines** (from the guidelines, use verbatim): "We prove you were right." /
"The record is on your side." / "Claims analysis that defends." / "Prove it. Keep it."

**Boilerplate:** Averis provides healthcare claims analysis that defends providers
against commercial and federal payer allegations. By analyzing claims data at scale,
Averis builds the evidence that stands up in audit and appeal, helping providers and
their attorneys keep the revenue they've rightfully earned.

## Visual foundations

**Colour.** Harbor Green `#16473F` is the primary and carries authority and calm; Pine
`#1E5A4E` is its hover/secondary; Deep Pine `#0F3630` supplies depth, scrims, and
tooltips. Champagne `#E4C58A` (on dark) and Champagne Deep `#C79A4E` (on light) are the
single warm accent, precious, used sparingly so it always means something. Neutrals are
warm, never clinical: Warm Bone `#F5F2EB`, Sand `#E7E0D2`, page `#EDEEEA`, Charcoal
`#1D211F` for body text. Two hard prohibitions from the guidelines: **avoid red** (reads
as alarm and debt, `--status-critical` #B4573A exists only for genuinely adverse states
and destructive UI) and **avoid clinical mint/teal** (miscasts Averis as a provider).
Maximum two data colours in one chart.

**Type.** Archivo for brand and display (800 for the wordmark and hero, 700 for
headlines, 600 for subheads); Inter for everything functional, body, UI, tables, labels.
Both are SIL OFL and load from Google Fonts. Display tracking is slightly negative
(-.01em); the wordmark is tracked +.15em. Body copy never exceeds 640px (`--measure`);
lead paragraphs 520px. Line height 1.55 for body, ~1.05 for display.

**Spacing and layout.** A 4→96px scale. Sections are padded 56px vertical by 64px
horizontal, dropping to 40/26 below 680px. The marketing column caps at 1180px; the
brand-document column at 940px. Layout is a centred column on a warm page tint, not
full-bleed edge-to-edge, with one exception: colour bands. Alternating Harbor Green,
bone, and white full-width bands are how the site creates rhythm, and the closing CTA
always sits on Deep Pine.

**Backgrounds.** Flat colour fields. No photography was supplied, and none is faked
here. There are no gradients as decoration, the only gradient in the whole system is
the faint champagne radial glow bleeding off the bottom-right of a green hero
(`radial-gradient(circle, rgba(228,197,138,.16), transparent 66%)`), copied from the
guidelines cover. No textures, no patterns, no illustration style, no hand-drawn
elements. Where a site would normally carry imagery, Averis uses a data panel, a stat
band, or the affirmation line.

**The affirmation line.** The signature device: a champagne rule that begins as the A's
bar and escapes across the full wordmark. It can extend under headlines, between
sections, beneath a data callout, and under the active tab. Always horizontal, always
champagne, always fully rounded caps (`--radius-xs` 3px), 4–6px thick, overhanging its
container by ~8px. Never tilted, never a border on all four sides, never repeated
decoratively, one underlined headline per screen.

**Cards.** 14px radius (`--radius-xl`), white or bone fill, a 1px hairline border at
`rgba(22,71,63,.10)`, and a near-invisible shadow. Depth comes from colour, not stacking.
Interactive cards lift from `--shadow-card` to `--shadow-raised` on hover; nothing else
moves. An `accent` card gets a short champagne rule at its top-left edge, at most one
per group.

**Borders and radii.** 3px (line caps) · 6px (small controls, chips) · 10px (buttons,
inputs) · 12px (panels) · 14px (cards, the default) · 22px (app icon tile) · pill (tags).
Borders are always green-tinted alpha, never grey.

**Shadows.** Four only: `--shadow-card` (1px, barely there), `--shadow-raised` (6/18 at
10%), `--shadow-dialog` (24/60 at 22%), `--shadow-tile` (10/26 at 28%, for the app icon
on light). No inner shadows. No stacked shadow systems.

**Transparency and blur.** Used in exactly three places: the sticky site header
(`rgba(255,255,255,.92)` + 10px blur), the modal scrim (`rgba(15,54,48,.42)` + 3px blur),
and surfaces inside a green section (`rgba(245,242,235,.06)` with a
`rgba(245,242,235,.18)` border). Nowhere else, no frosted cards, no glassmorphism.

**Animation.** Short and flat. 120ms for press and hover colour, 180ms for most
transitions, 320ms for panel and modal entry, 520ms if the affirmation line draws in.
Easing is `cubic-bezier(.2,.6,.2,1)`. Fades and short translations only, no bounce, no
spring, no parallax, no scroll-jacking, no counting-up numbers.

**Hover states.** Solid green buttons lighten to Pine. Outline and ghost buttons take a
5% green tint fill and darken their border. Links move from Harbor Green to Pine. Nav
items reveal the champagne underline. Cards lift their shadow. Nothing scales up.

**Press states.** A 1px downward nudge (`translateY(1px)`), no colour change beyond the
hover state, no scale. Focus is a champagne border plus a 3px `rgba(199,154,78,.35)`
ring, never the browser's blue.

**Imagery.** None supplied. If photography is commissioned later, the guidelines imply
the direction: quiet, low-contrast, cool-neutral or warm-neutral, with a calm area for
the logo. No stock "doctor pointing at a tablet." Grain, heavy colour grading, and
saturated imagery are off-brand.

## Iconography

The Averis guidelines specify no icon set, no icon font, and ship no icon SVGs, only
the "A" mark itself. **Substitution flagged:** this system uses
[Lucide](https://lucide.dev) 0.454.0 (ISC), vendored: the fifteen glyphs actually in use
are inlined as path data in `components/core/Icon.jsx` and mirrored as files in
`assets/icons/`, so there is no CDN dependency and an unknown name renders nothing. Lucide was chosen because its 24px grid, 2px
stroke, and round caps are the same geometry as the A monogram, the mark and the icons
read as one family. If Averis licenses or draws a proper set, replace
`components/core/Icon.jsx` and the CDN references; nothing else depends on it.

House icon vocabulary, used consistently: `file-search` (evidence, source document),
`shield-check` (defence, compliance), `scale` (counsel, legal), `database` (extract,
data at scale), `line-chart` (analysis), `check` (supported), `arrow-right` (forward
nav), `download` (packet export), `info` (definitions), `clock` (in review),
`triangle-alert` (disputed, the only red icon).

Icons are 14–22px in UI, 20–24px in marketing, always single-colour, never in a
coloured circle or a rounded tinted tile. **Emoji are never used**, not in product, not
in marketing, not in email. Unicode is used only for the multiplication sign in a close
button (×) and the middle dot as a meta separator (·).

## Assets

`assets/` holds the logo system rebuilt from the guidelines' own vector geometry:

- `logo-primary.svg`, `logo-reversed.svg`: the horizontal lockup
- `logo-lockup-descriptor.svg`, `-reversed.svg`: with the "Healthcare Claims Analysis" category line
- `logo-mono-black.svg`, `logo-mono-bone.svg`: one-colour versions
- `mark-green.svg`, `mark-bone.svg`, `mark-black.svg`, `mark-white.svg`: the standalone A
- `icon-glyph.svg`, `app-icon.svg` (1024px rounded tile), `favicon.svg`: the compact mark where the champagne bar stays inside the A

The wordmark in the SVG lockups is live Archivo text, not outlines. For final print and
vector deliverables the guidelines require type converted to outlines, do that at
export. Clear space equals the height of the A mark on all sides; minimum lockup width
120px digital / 1 inch print; the standalone mark may go to 16px.

Not yet produced from the guidelines' asset checklist: AI/EPS masters, the stacked
lockup, iOS/Android icon size sets, the .ico favicon set, CMYK/Pantone values, business
card, letterhead, email signature, social avatar and banner.

## Intentional additions

The guidelines define a brand, not a component library, so the standard primitive set
was authored from scratch. Three additions beyond that set are deliberate:

- **`Logo`**: the lockup as a component, so the mark is never re-drawn by hand.
- **`AffirmationLine` / `AffirmationHeading`**: the guidelines' signature graphic device, made reusable as §06 requires.
- **`Icon`**: a wrapper over the substituted Lucide set, so replacing it later is a one-file change.

## Fonts

Archivo and Inter, both SIL Open Font License, loaded from Google Fonts in
`tokens/fonts.css`, the same delivery the guidelines specify. No self-hosted binaries
are included; if Averis wants self-hosting, drop the woff2 files into `assets/fonts/`
and swap the `@import` for `@font-face` rules.
