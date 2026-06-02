# CLAUDE.md — Arte que conecta · Design System

> **Rule #1 — The DS is the single source of truth.**
> Never hardcode any color, spacing, font size, or border value.
> Always reference a token from `theme.css`. If a value isn't tokenized yet, add it to `theme.css` first, then use it.

---

## Project Overview

| Field | Value |
|---|---|
| Project | Arte que conecta |
| DS version | v2.0 |
| Font (UI) | Roboto (400, 500) via Google Fonts |
| Font (wordmark) | Coiny (400) — `.logo-wordmark` class ONLY, never headings or body |
| Palette | Monochromatic — 5 steps white → black |
| Base | 16px |
| Icons | Lucide Icons (outline, stroke 1.5px) |
| Token file | `theme.css` (CSS custom properties on `:root`) |

---

## Design Tokens Reference

### Colors

| Token | Value | Role |
|---|---|---|
| `--color-white` | `#FFFFFF` | Primary background |
| `--color-light` | `#F5F5F5` | Section fills, button preview backgrounds |
| `--color-mid` | `#D9D9D9` | Borders, dividers, separators |
| `--bg` | `var(--color-white)` | Semantic alias — page background |
| `--bg-section` | `var(--color-light)` | Semantic alias — section background |
| `--fg` | `var(--color-black)` | Semantic alias — primary text |
| `--fg-muted` | `var(--color-muted)` | Semantic alias — secondary text |
| `--border-hairline` | `0.5px solid var(--color-mid)` | Hairline divider |
| `--color-muted` | `#797979` | Secondary text, labels, metadata |
| `--color-black` | `#000000` | Primary text, CTAs, active borders |

### Typography

#### Headings (H1–H4)

| Token | Value |
|---|---|
| `--font-size-h1` | `4rem` |
| `--font-size-h2` | `2.5rem` |
| `--font-size-h3` | `2.1rem` |
| `--font-size-h4` | `1.4rem` |
| `--font-weight-heading` | `400` |
| `--line-height-heading` | `1.1` |
| `--letter-spacing-heading` | `-0.02em` |

#### Body paragraphs (P1–P3)

| Token | Value | Use case |
|---|---|---|
| `--font-size-p1` | `1.4rem` | Lead / intro |
| `--font-size-p2` | `1.1rem` | Service descriptions, body copy |
| `--font-size-p3` | `0.9rem` | Footnotes, captions, supporting text |
| `--font-weight-body` | `400` | |
| `--line-height-body` | `1.3` | |
| `--letter-spacing-body` | `-0.02em` | |

#### UI / Utility

| Token | Value | Use case |
|---|---|---|
| `--font-size-ui` | `0.8rem` | Labels, prices, metadata, dates |
| `--line-height-ui` | `1.1` | |

#### Buttons (shared)

| Token | Value |
|---|---|
| `--font-weight-btn` | `500` |
| `--text-transform-btn` | `uppercase` |
| `--letter-spacing-btn` | `0.05em` |

### Buttons

| Token | Primary | Secondary | Tertiary |
|---|---|---|---|
| font-size | `0.8rem` | `0.9rem` | `0.8rem` |
| background | `--color-black` | `transparent` | `transparent` |
| color | `--color-white` | `--color-black` | `--color-black` |
| border | none | `1px solid black` | none |
| border-radius | `--radius-pill` | `--radius-pill` | `0` |
| padding-v | `1.2em` | `1.2em` | `1.2em` |
| padding-h | `2em` | `2.004em` | `0` |
| hover | `opacity: 0.85` | `bg: --color-light` | — |

### Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | `8px` | Internal component gap |
| `--space-sm` | `16px` | Card padding, grid gap |
| `--space-md` | `24px` | Nav padding, column gap |
| `--space-lg` | `40px` | Section separation |
| `--space-xl` | `80px` | Hero padding, large sections |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-pill` | `9999px` | Inputs, primary/secondary buttons |
| `--radius-md` | `8px` | Cards, nav, containers |
| `--radius-sm` | `4px` | Small UI elements |
| `--radius-xs` | `2px` | Product cards |

### Borders

| Token | Value | Usage |
|---|---|---|
| `--border-default` | `0.5px solid var(--color-mid)` | Dividers, containers |
| `--border-strong` | `1px solid var(--color-black)` | Inputs, secondary btn, active states |

### Icons — Lucide Icons

| Token | Value |
|---|---|
| `--icon-stroke-width` | `1.5px` |
| `--icon-color` | `var(--color-black)` |
| `--icon-size-inline` | `16px` — inline UI |
| `--icon-size-btn` | `20px` — inside buttons |
| `--icon-size-nav` | `24px` — navigation |
| `--icon-size-feature` | `32px` — feature highlight |
| `--icon-size-hero` | `48px` — hero / CTA |

CDN script: `<script src="https://unpkg.com/lucide@latest"></script>`
Usage: `<i data-lucide="icon-name"></i>` + `lucide.createIcons()`

### Forms

| Token | Value |
|---|---|
| `--input-padding-v` | `10px` |
| `--input-padding-h` | `18px` |
| `--input-font-size` | `var(--font-size-p2)` |
| `--input-border` | `var(--border-strong)` |
| `--input-border-radius` | `var(--radius-pill)` |
| `--checkbox-size` | `20px` |
| `--checkbox-bg` | `var(--color-black)` |
| `--checkbox-check-color` | `var(--color-white)` |

---

## Typography Assignment Map

### By section (Squarespace mapping)

| Context | Element | Style |
|---|---|---|
| Header | Site title, Mobile title | Heading |
| Header | Navigation, Header button | Paragraph |
| Store | List title, Item title, Pagination | Heading |
| Store | Price, Status, Variant fields | UI |
| Store | Item description | Paragraph |
| Blog | Post title, Pagination | Heading |
| Blog | Excerpt, Author profile | Paragraph |
| Blog | Metadata / dates | UI |
| Newsletter | Title | Heading |
| Newsletter | Description, field, button, note | Paragraph |
| Quote | Quote text | Paragraph |
| Quote | Source | UI |
| Portfolio | All grid titles, Item pagination | Heading |
| Forms | Title, description, labels, input, placeholder | Paragraph |

---

## Utility Classes (defined in `theme.css`)

```
.text-h1 / .text-h2 / .text-h3 / .text-h4
.text-p1 / .text-p2 / .text-p3
.text-ui
.text-muted

.btn  (base)
.btn-primary / .btn-secondary / .btn-tertiary

.badge / .badge-light

.input
.checkbox / .checkbox-unchecked
```

---

## Netlify Deploy — Credit Model & Rules

Netlify migrated from separate "build minutes / bandwidth" caps to a unified **credit pool** (post-2024). All resources draw from the same budget.

### Conversion rates
- **1 production deploy ≈ 15 credits**
- **1 GB bandwidth ≈ 20 credits**
- Web requests, compute, function invocations: variable, usually marginal unless bots scan SSR endpoints

### Plan limits
| Plan | Credits/mo | Deploys (if only this) | Bandwidth (if only this) |
|---|---|---|---|
| Free | 300 | ~20 | ~15 GB |
| **Personal ($9)** ← current | **1.000** | ~65 | ~50 GB |
| Pro ($20) | 3.000 | ~200 | ~150 GB |

Site auto-pauses when total credits exceed the plan limit. No auto-charge unless explicitly enabled.

### Before every deploy
- **Batch changes.** Never push one commit per small fix. Accumulate all related changes for the session and push once.
- **Use `[skip ci]`** in the commit message for changes that don't affect the live site (docs, comments, README, this file):
  ```bash
  git commit -m "update readme [skip ci]"
  ```
  Netlify will not trigger a build for that commit.
- For experimentation without consuming "production deploy" credits, run a local build then deploy the artifacts:
  ```bash
  npm run build
  netlify deploy --prod --dir=dist
  ```

### Deploy previews (already disabled)
- Deploy previews are **off**. Netlify will not build `keystatic/*` branches automatically.
- This saves ~15 credits per blog post that Belén publishes via Keystatic.
- If a preview is ever needed, enable it manually in Netlify → Site configuration → Build & deploy → Deploy contexts.

### Who triggers function invocations
- **Only Belén** using the Keystatic panel (`/keystatic/*`) triggers serverless functions.
- Regular visitors load fully static pages — zero function cost.
- Keep all non-Keystatic pages statically prerendered (they already are via `getStaticPaths`).

---

## Bot Protection & Edge Redirects

`netlify.toml` contains a block of `[[redirects]]` rules (forced 404 with `status = 404`) for common WordPress / PHP / admin-tool scan URLs:
`/wp-admin/*`, `/wp-login.php`, `/wp-content/*`, `/wp-includes/*`, `/wp-config.php`, `/xmlrpc.php`, `/install.php`, `/phpinfo.php`, `/admin.php`, `/phpmyadmin/*`, `/administrator/*`, `/typo3/*`, `/.env`, `/.git/*`, `/config.php`, `/backup/*`, `/backups/*`.

These short-circuit bot probes at the Netlify edge layer so they **never invoke Astro SSR**. Without them, each bot request (50-200/day on this site) would consume 1-3s of SSR compute rendering a 404 page.

**Do not remove these rules** without first migrating to Cloudflare Pages (which has built-in Bot Fight Mode + unlimited bandwidth). See `~/Documents/studio/guides/web-optimization.md` for the bigger picture.

---

## Environment Requirements

- **Node ≥22.12.0** required by Astro 6. Pinned in `netlify.toml` as `NODE_VERSION = "22.12.0"`.
- **`.npmrc`** with `legacy-peer-deps=true` required because `@keystatic/astro@5.0.6` declares peer dependency `astro@2-5` but the project runs on Astro 6. The Keystatic team will eventually publish Astro-6 compatibility; **when they do, delete `.npmrc`** and the peer-dep workaround is no longer needed.

---

## Asset Optimization

Rules for any image/asset shipped to production:

- **OG image** (`/public/og-default.jpg`): JPG format (not PNG), 1200×630 px, **<300 KB max**. Replace with the brand's visual whenever it changes; do NOT export as raw PNG from Figma — that's how we ended up with a 4 MB file silently eating bandwidth.
- **Content images**: always go in `src/assets/images/` and use Astro `<Picture>` with `formats={['avif', 'webp']}`, responsive `widths`, intrinsic `width`/`height` matching the source file.
- **Loading strategy**: `loading="eager"` + `fetchpriority="high"` for hero only; everything else `loading="lazy"`.
- **Source file sizes**: max ~2× the largest responsive width served. A 6000×4000 source file is wasteful if the largest responsive variant is 1200px wide.
- **Pre-deploy audit**: nothing in `/public/` should weigh more than 500 KB without justification. Run `find public -type f -exec ls -laS {} + | sort -k5 -n -r | head -10` to spot offenders.
- **Fonts**: only Roboto, WOFF2 only, weights 400 + 500 only.

---

## Hard Rules for Code Generation

1. **No hardcoded values.** Every color, size, space, radius, or border must reference a `--token`.
2. **No new tokens without documenting them** in the token tables above and in `theme.css`.
3. **English only** for all variable names, class names, file names, and comments.
4. **Roboto for all UI.** Coiny (`--font-display`) is allowed **only** via `.logo-wordmark` on the brand name element. Never use Coiny on headings, hero text, or body copy.
5. **Two font weights only:** `400` (body/headings) and `500` (buttons, labels, eyebrows, `.text-ui`).
6. **Lucide Icons only** for iconography. Stroke `1.5px`, fill `none`, color `var(--icon-color)`.
7. **All buttons** use uppercase, weight 500, and `letter-spacing: 0.05em` — never override these.
8. **Import `theme.css`** as the first stylesheet in every page/component.
9. **Never push after every small change.** Accumulate all changes for the session and propose a single deploy at the end. Each production deploy costs ~15 credits in Netlify's unified credit model. Free tier is 300 credits/mo (~20 deploys). Use `[skip ci]` in the commit message for docs or comments that don't affect the live site.
10. **No automatic testing:** Do not run tests (Vitest/Playwright) automatically. Only run them when explicitly requested.
11. **Manual verification:** Prioritize visual accuracy in the browser over terminal test results during the UI build phase.
12. **Guided manual testing:** After every significant change, do not run tests. Instead, provide the command to run the dev server or the specific test needed, give me the local URL (e.g., http://localhost:4321), and ask me to verify if the result matches my expectations.
13. **Asset weight discipline:** before adding any file to `/public/`, verify it's <500 KB. Especially OG images (target <300 KB, JPG format). See "Asset Optimization" section.
14. **URL slugs in English, lowercase, single word.** All internal route paths must be in English (matching the existing `/blog` precedent), regardless of the language of the visible UI. Examples: `/press` not `/prensa`, `/work` not `/trabajos`, `/about` not `/sobre`. Visible nav labels and page titles SHOULD be translated per language (e.g., `nav.press` = "Prensa" / "Press" / "Premsa" / "Presse"), but the route stays English in all 4 languages: `/press`, `/es/press`, `/en/press`, `/fr/press`. Reason: consistency with `/blog`, cleaner hreflang, single canonical slug per resource. The same applies to anchor IDs (`#offer`, `#workshops`, etc.).
