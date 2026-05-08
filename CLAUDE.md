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

## Hard Rules for Code Generation

1. **No hardcoded values.** Every color, size, space, radius, or border must reference a `--token`.
2. **No new tokens without documenting them** in the token tables above and in `theme.css`.
3. **English only** for all variable names, class names, file names, and comments.
4. **Roboto for all UI.** Coiny (`--font-display`) is allowed **only** via `.logo-wordmark` on the brand name element. Never use Coiny on headings, hero text, or body copy.
5. **Two font weights only:** `400` (body/headings) and `500` (buttons, labels, eyebrows, `.text-ui`).
6. **Lucide Icons only** for iconography. Stroke `1.5px`, fill `none`, color `var(--icon-color)`.
7. **All buttons** use uppercase, weight 500, and `letter-spacing: 0.05em` — never override these.
8. **Import `theme.css`** as the first stylesheet in every page/component.
9. **No automatic testing:** Do not run tests (Vitest/Playwright) automatically. Only run them when explicitly requested.
10. **Manual verification:** Prioritize visual accuracy in the browser over terminal test results during the UI build phase.
11. Guided manual testing: After every significant change, do not run tests. Instead, provide the command to run the dev server or the specific test needed, give me the local URL (e.g., http://localhost:4321), and ask me to verify if the result matches my expectations.

