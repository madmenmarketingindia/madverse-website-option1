# Madverse — Design System

Source of truth: [`reference/Home-Mobile.png`](../reference/Home-Mobile.png) (priority),
[`reference/Home-desktop.png`](../reference/Home-desktop.png) (desktop is *derived* — no
exact desktop comp exists beyond the homepage, so every non-homepage desktop layout
below is a considered decision, not a trace).

Tokens live in code at [`assets/css/tokens.css`](../assets/css/tokens.css) — this doc explains the
*why* and gives the section-by-section build spec. Never hardcode a color/size/space in
component CSS; reference the custom property.

---

## 1. Brand personality → design decisions

The reference reads as: **aggressive, industrial, confident.** Pure black canvas, one hot
red accent, tight uppercase type, sharp (not rounded) geometry, red-glow photography
treatments instead of soft drop shadows. Every token below traces back to that.

| Cue in the reference | Decision |
|---|---|
| True black bg, not dark-gray | `--color-bg: #000000` everywhere, no navy/charcoal tint |
| One red, used for CTAs, eyebrows, dots, glows | Single red ramp (`--color-red-300..700`), never introduce a second accent hue |
| Square buttons, square logo mark | `--radius-sm: 2px` on buttons — intentionally almost-sharp |
| Condensed, uppercase, heavy headings | Celias **Black/Bold** for H1/H2, uppercase via CSS `text-transform`, tight `letter-spacing` |
| Thin hairline dividers between sections | `--color-border: rgba(255,255,255,.08)`, 1px, never a solid gray box |
| Red glow behind photography, not drop shadow | `--glow-red-*` tokens; `box-shadow` is never black-based |

---

## 2. Color

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#000000` | Page background |
| `--color-bg-raised` | `#0a0a0a` | Alternate section background (barely-there separation) |
| `--color-surface` | `#121110` | Cards, work tiles, thinking-cards |
| `--color-border` | `rgba(255,255,255,.08)` | Hairline rules, card outlines, table dividers |
| `--color-red-500` | `#c40109` | **Primary** — buttons, eyebrow labels, active states, dots |
| `--color-red-600` | `#950108` | Button hover/press |
| `--color-red-400` | `#e6142a` | Gradient highlight edge, glow core |
| `--color-text-primary` | `#ededed` | Headings — intentionally *off*-white, never `#fff` |
| `--color-text-white` | `#ffffff` | Logo wordmark only |
| `--color-text-secondary` | `#8c8c8c` | Body paragraphs |
| `--color-text-tertiary` | `#6e6e6e` | Nav (idle), meta text, footer legal |

Sampled directly from the reference PNGs (button fill ≈ `rgb(195,1,8)`, card fill ≈
`rgb(20,18,17)`, heading pixels ≈ `rgb(220,220,220)`, body pixels ≈ `rgb(137,137,137)`)
and then rounded to clean, production-safe hex.

**Rule:** color is never used for pure decoration. Red = call-to-action or "this is
active/important." Everything structural is grayscale.

---

## 3. Typography — Celias

Celias is the only typeface. 7 weights are available (Hairline 100 → Black 900) plus
italics. Mapped once in `@font-face` inside `tokens.css`, referenced everywhere by
`font-weight`, never by filename.

### Weight usage

| Weight | Var | Where |
|---|---|---|
| 900 Black | `--fw-black` | Hero display heading, stat numbers (`250+`) |
| 700 Bold | `--fw-bold` | H2/H3 section headings, button labels, card titles |
| 500 Medium | `--fw-medium` | Nav links, eyebrow labels |
| 400 Regular | `--fw-regular` | Body paragraphs (desktop) |
| 300 Light | `--fw-light` | Body paragraphs (long-form, mobile), footer link lists |
| 100/200 Hairline/Thin | — | Reserved, not used in homepage; available for large display flourishes later |

### Scale (fluid — same clamp() works mobile → desktop, no separate breakpoint values needed)

| Token | Mobile | Desktop | Weight | Case | Line-height | Letter-spacing | Use |
|---|---|---|---|---|---|---|---|
| `--fs-display` | 36px | 60px | 900 | UPPER | 1.05 | −0.01em | Hero H1 ("ONE ECOSYSTEM. ENDLESS GROWTH.") |
| `--fs-h1` | 36px | 56px | 900 | UPPER | 1.05 | −0.01em | Page-level H1 (non-home pages) |
| `--fs-h2` | 28px | 44px | 700 | UPPER | 1.15 | −0.01em | Section headings ("DIFFERENT BRANDS. ONE GROWTH SYSTEM.") |
| `--fs-h3` | 22px | 30px | 700 | UPPER | 1.15 | normal | Card headings ("GROWTH THINKING") |
| `--fs-h4` | 18px | 22px | 700 | UPPER | 1.15 | normal | Small headings, footer column titles |
| `--fs-stat` | 36px | 48px | 900 | — | 1.05 | normal | Big stat numbers ("250+") |
| `--fs-body-lg` | 16px | 17px | 400/300 | Sentence | 1.6 | normal | Hero/section intro paragraph |
| `--fs-body` | 16px | 16px | 400 | Sentence | 1.6 | normal | Default paragraph |
| `--fs-caption` | 13px | 13px | 500 | UPPER | 1.4 | 0.04em | Nav links, button labels |
| `--fs-label` | 12px | 12px | 500/700 | UPPER | 1.4 | 0.12em | Eyebrow ("WELCOME TO MADVERSE"), stat labels ("BRANDS") |
| `--fs-micro` | 11px | 11px | 400 | Sentence | 1.4 | normal | Legal/footer fine print |

**Heading rule:** headings are always UPPERCASE, tight leading, and end with a red
`.` (a literal red-colored period/full-stop span) when the source copy has one — this
is a recurring brand signature ("ONE ECOSYSTEM. ENDLESS GROWTH<span class="red">.</span>").

**Eyebrow rule:** every section opens with a short red label, e.g. `WELCOME TO
MADVERSE`, `--fs-label`, `--ls-widest`, weight 700. *(Decided against the `01/02/03…`
index prefix from the original reference — it didn't encode real sequence information
for the reader, just decoration, so it was dropped site-wide.)*

---

## 4. Spacing & layout

8px-derived scale (`--space-1` … `--space-13`, see tokens.css) plus **fluid** section/gutter
tokens so mobile and desktop share one rule instead of two hardcoded numbers:

| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `--gutter` | ~20px | 60px | Page left/right padding |
| `--section-py` | 48px | 120px | Vertical padding for standard sections |
| `--section-py-sm` | 32px | 64px | Vertical padding for dense sections (stats bar) |
| `--container-max` | — | `clamp(20rem, 92vw, 1720px)` | Max content width, centered — fluid, not a fixed 1280px |

**Large desktop / 1920px+ monitors:** `--container-max` is fluid (92vw, capped at
1720px) rather than a fixed pixel value with a breakpoint jump. A fixed 1280px left
huge dead margins on wide monitors; a fixed jump to some larger number just moved the
same problem to a new breakpoint. Scaling continuously with the viewport (up to a
1720px ceiling, past which lines get too wide to read comfortably) keeps margins
proportionate at every width in between, not just at one or two tested sizes.

Grid: **4-column** on mobile (single-column stacking, ~20px gutter), **12-column** on
desktop (24px column gap). Cards/tiles that are 2-up or 4-up on desktop stack to 1-up
on mobile — never horizontally scroll except explicitly-marked carousels (client logos,
work case studies).

---

## 5. Motion

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 150ms | Link underline, icon nudge on hover |
| `--duration-base` | 250ms | Color/background hover transitions |
| `--duration-slow` | 400ms | Card lift, mobile menu open/close |
| `--duration-reveal` | 700ms | Scroll-triggered fade/slide-up on section entry |
| `--ease-standard` | cubic-bezier(.4,0,.2,1) | All hover/press interactions |
| `--ease-out` | cubic-bezier(.16,1,.3,1) | Scroll reveals, entrances (fast start, gentle stop) |

**Patterns to implement:**
- **Scroll reveal:** sections/cards fade in + translateY(16px→0) once ~20% in viewport, `--duration-reveal` / `--ease-out`, staggered 80ms per sibling. Respect `prefers-reduced-motion` (disable transforms, keep opacity only).
- **Buttons:** background color shift + arrow icon (↗) translates 2px on hover, `--duration-base`.
- **Cards (thinking/work tiles):** border brightens (`--color-border` → `--color-border-strong`) + subtle red glow (`--glow-red-sm`) fades in on hover, `--duration-base`.
- **Nav underline:** active/hover link gets a 2px red underline that grows from left, `--duration-fast`.
- **Hero network diagram (desktop):** slow ambient particle drift / line-pulse, decorative only, pauses under `prefers-reduced-motion`.

---

## 6. Components (tokens, not markup — implemented when we build sections)

- **Button — primary:** `--color-red-500` fill, `--color-text-on-red`, `--fs-caption`, `--fw-bold`, `--ls-wide`, uppercase, `--radius-sm`, padding `14px 24px` mobile / `16px 28px` desktop, arrow icon.
- **Button — secondary:** transparent fill, `--color-text-primary`, bottom hairline border instead of a box, same type treatment.
- **Nav:** sticky top, black bg, hairline bottom border on scroll, logo left, links center (desktop only), CTA button right, hamburger (mobile) opens full-screen overlay menu matching footer's link groups.
- **Eyebrow badge:** no background chip — just red label text + number, as sampled (not a pill).
- **Card:** `--color-surface` bg, `--color-border` 1px outline, `--radius-md`, padding `--space-5`–`--space-6`, image on top / label+title below.
- **Stat block:** number in `--fs-stat`/`--fw-black`, label directly under in `--fs-label`/`--ls-widest`/`--color-text-tertiary`.

---

## 7. Homepage — section-by-section build spec

Numbering matches the eyebrow indices visible in the reference (01–08). Build order = this order.

| # | Section | Mobile layout | Desktop layout | `section-py` |
|---|---|---|---|---|
| 01 | Hero — "One Ecosystem. Endless Growth." | Stacked: eyebrow → H1 → body → 2 buttons → M-mark graphic (static) → scroll cue | Split 2-col: copy+CTAs left, animated network/particle M diagram right | `--section-py` |
| 02 | The Collective — brand grid | 2-col icon grid, "view all brands" link | 5-col icon grid, single row | `--section-py` |
| 03 | Specialists Working Together | Stacked: copy → hex diagram | 2-col: copy left, hex diagram right | `--section-py` |
| 04 | The Work That Moves | 1-up featured case card, "view all work" | Featured card left (large) + 2×2 thumbnail grid right | `--section-py` |
| 05 | Impact stats | 1-col stacked stat rows with hairline dividers | 6-col single row, vertical hairline dividers between | `--section-py-sm` |
| 06 | The Thinking | Stacked heading, then 1-col card list (4 cards) | Heading left (sticky-ish), 4-card row right/below | `--section-py` |
| 07 | The People | Heading + 2-col photo grid, "meet the collective" | Heading left, 3-col photo grid right | `--section-py` |
| 08 | Belief / closing statement + CTA | Stacked statement, oversized red "M" wordmark graphic below (full-bleed) | 2-col statement, giant red M bleeds to container edge | `--section-py` |
| — | Footer | Stacked: brand block → link groups (accordion-able) → legal | 4-col link groups + brand block row, legal row below | `--section-py-sm` |

Full-page hamburger nav overlay (mobile) mirrors the footer's Collective / Explore /
Connect grouping exactly — same order, same labels — so users never see two different
information architectures.

---

## 8. Open decisions (flagged per your note — no desktop comp beyond homepage)

These will be decided *during* build, using the tokens above, not invented ahead of time:
- Interior page layouts (Work, Collective, Think, Culture, About, Contact) — homepage
  component patterns (cards, stat blocks, eyebrow+heading rhythm) will be reused so the
  site stays visually consistent even where no comp exists.
- Real photography/video assets — placeholder treatment until supplied: `--color-surface`
  block with a subtle red `--glow-red-sm` and a centered "M" watermark, so layout can be
  built and swapped later without redesign.

## 9. Image generation workflow (Codex)

Structured/precise visuals (icons, diagrams tied to real text, anything that must
resize responsively) are built in code — CSS/SVG — not generated. Organic/atmospheric
assets that code can't reasonably produce (particle textures, photographic treatments)
are generated externally via Codex. Each one gets a brief committed at
`docs/image-briefs/<asset-name>.md` — exact output size, format, prompt, and
constraints — so it's copy-pasteable straight into Codex from the editor. Once an
asset lands in `assets/img/`, the brief's `Status:` line flips from `needed` to
`done` and the wiring change is noted.
