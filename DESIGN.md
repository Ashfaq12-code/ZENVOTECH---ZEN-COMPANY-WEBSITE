# DESIGN.md

Visual rules for the Zenvotech site. Code rules are in `AGENTS.md`. Same deal: only change what a `PI!` points at.

## Who we're designing for

- Buyer: a founder or ops lead at an SME deciding whether to hand us a project.
- Their question in 5 seconds: **"Can these people build my thing, and will they be easy to work with?"**
- So the site sells proof (portfolio, reviews, team), not adjectives.

## Principles

1. **Proof over claims.** A real screenshot or review beats a sentence about quality.
2. **One job per section.** One heading, one point, one action.
3. **Calm, not loud.** Few colours, lots of space. Agencies that shout look cheap.
4. **Fast is a design feature.** If an effect costs LCP or CLS, it goes.

## Tokens (single source: `tailwind.config.js`)

Every colour, size, radius, shadow and duration is a token. No arbitrary `[#hex]` or `[13px]` values in classes or CSS files.

> **Fill from the real config.** The values below are slots, not guesses. Copy the brand values out of `tailwind.config.js` and the CSS files once, then this table is the contract.

### Colour roles

| Token | Use |
|---|---|
| `brand` / `brand-strong` | primary buttons, links, focus ring |
| `ink` / `ink-muted` | body text / secondary text |
| `surface` / `surface-raised` | page bg / cards |
| `line` | borders, dividers |
| `success` / `danger` | form states only |

- Text on any bg meets **WCAG 2.2 AA**: 4.5:1 body, 3:1 large text + UI.
- One accent per screen. `brand` is for the action, not decoration.
- Dark mode: only if every role has a dark value. No half-dark pages.

### Type

- One family for UI + body, optional one for display headings. Max two.
- Scale: `text-sm` (meta), `text-base` (body), `text-lg`, `text-2xl`, `text-4xl`, `text-5xl/6xl` (hero only).
- Body line length 60–75 characters (`max-w-prose`). Line height 1.5 body, 1.1–1.2 headings.
- Fonts self-hosted or `font-display: swap` + preload. No layout shift on load.

### Spacing + layout

- Tailwind's 4 px scale only. Section padding `py-16` mobile, `py-24` desktop.
- Container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Mobile first. Check 360 px, 768 px, 1280 px. No horizontal scroll, ever.
- Radius: one for cards, one for buttons, `rounded-full` for pills. Three total.

### Motion

- Durations as tokens: `fast` 150 ms (hover), `base` 250 ms (reveal), `slow` 400 ms (page/section). Ease-out in, ease-in out.
- Animate `opacity` and `transform` only. Never width, height, top, left (that's CLS).
- Scroll reveals: once, small (≤ 16 px travel). No parallax.
- `prefers-reduced-motion: reduce` turns all of it off.

## Components

| Component | Rule |
|---|---|
| Button | 3 variants max: primary, secondary, ghost. Min 44 × 44 px hit area. Visible focus ring |
| Nav | Logo left, ≤ 6 links, one CTA ("Get a quote"). Sticky, collapses to menu < 768 px |
| Service card | Icon, title, one sentence, link. Same height in a row |
| Portfolio item | Poster image first, video plays on click/hover, `preload="none"`. Caption names the client type + result |
| Review | Name, company, stars, ≤ 3 lines quote, source ("Google"). Never invent or edit a review |
| Team card | Real photo, name, role. Same crop and aspect ratio for all |
| Contact form | Labels above fields, inline errors, disabled + spinner while sending, clear success state. Never lose typed input on error |
| Admin | Plain and dense. Function over brand. Same tokens, no marketing motion |

## Icons + images

- lucide-react only, one stroke width, sized by token (`size-5`, `size-6`).
- Images: WebP/AVIF, explicit `width`/`height`, `loading="lazy"` below the fold, `alt` that describes.
- Hero image or video poster is the LCP element: preload it, never lazy-load it.

## Copy

- Plain English, short sentences, second person ("you").
- Headline says the outcome: "Software that runs your business", not "Innovative digital solutions".
- Banned: cutting-edge, synergy, world-class, revolutionary, seamless, leverage.
- CTAs are verbs: "Get a quote", "See our work", "Book a call".
- Sri Lankan market: prices (if shown) in LKR with an option for USD. Phone with `+94`.

## Accessibility (hard gate)

- Keyboard reaches everything, in visual order. Skip link to main content.
- One `h1` per page, headings never skip levels.
- Form fields have labels, errors are announced (`aria-live`).
- Videos have no autoplay with sound and have a pause control.

## Done means

- Matches tokens (no arbitrary values).
- Checked at 360 / 768 / 1280 px, light (and dark if supported).
- Lighthouse ≥ 95 performance + accessibility, CLS ≤ 0.05.
- Reduced motion checked.