# Borrissol Espai Creatiu — Website

Production site: [borrissol.com](https://borrissol.com)
Codebase docs: [deepwiki.com/constanza101/borrissol](https://deepwiki.com/constanza101/borrissol) — auto-generated wiki of the architecture, components and routing.

Website for a textile workshop studio in Mataró (Barcelona): a multilingual home page plus eight dedicated service/technique landings, a Git-backed blog and a press page. Built as a freelance project from brief to deployment.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Astro 6 (prerendered pages + one Netlify function for the CMS panel) |
| CMS | Keystatic (Git-backed, Markdoc content for the blog) |
| Styles | CSS custom properties — token-based design system |
| Scripts | Vanilla JS (no runtime framework shipped to visitors) |
| Images | Astro `<Picture>` — AVIF + WebP, responsive `srcset` |
| Fonts | Roboto self-hosted (WOFF2, latin subset) |
| Testing | Playwright E2E + Vitest unit tests |
| Deploy | Git push → auto-deploy (Netlify) |

---

## Features

### Internationalisation — 4 languages
- Catalan (default, no URL prefix), Spanish (`/es`), English (`/en`), French (`/fr`)
- Single source per page: every route pair (`x.astro` + `[lang]/x.astro`) renders one shared component — the files differ only in `getStaticPaths`
- All copy **and accessible names** (`aria-label`s) come from one typed catalog (`src/i18n/ui.ts`)
- Catalog completeness is an executable invariant: a Vitest suite fails if any locale is missing a key or has an empty value
- Hreflang tags + `x-default` in each page `<head>` AND in the sitemap XML
- Language switcher preserves the URL hash via client-side JS
- 301 redirects: legacy `/ca/*` → `/*`, and `/es|en|fr/blog` → `/blog` (blog is intentionally CA-only; those pages emit only the `ca` hreflang so redirecting URLs are never advertised as alternates)

### Design System
- Full token set in `src/styles/theme.css` (colors, spacing, typography, radius, borders, icons, motion)
- Monochromatic 6-step base ramp + a small accent set (brand pink, WhatsApp green, review-star yellow, 4 workshop-level colors)
- Typography scale: H1–H4, P1–P3, UI — applied via utility classes (`.text-h1`…`.text-ui`); scoped CSS carries layout only
- Shared visual contracts as classes: `.card` (surface + hairline border), `.media` (rounded clipped frame), `.btn-primary/-secondary/-tertiary`, `.badge`, `.input`
- Scroll reveal animations via IntersectionObserver — all motion respects `prefers-reduced-motion`

### SEO
- Per-intent landing pages: 8 services/techniques × 4 languages, each with its own title, `<h1>`, long-form copy, FAQ and structured data
- JSON-LD: `LocalBusiness` (+ `GeoCoordinates`, `AggregateRating`, individual `Review`s on the home, where the testimonials render) · `Course` per workshop landing · `FAQPage` only alongside a visible FAQ
- Organisation logo as 512×512 PNG (Google rich results requirement)
- Open Graph + Twitter Card meta tags; OG image 1200×630 (<300 KB)
- Canonical URLs, sitemap (`@astrojs/sitemap` with i18n), `robots.txt` with social bot allowlist
- English single-word slugs in all locales (`/es/press`, not `/es/prensa`) — one canonical slug per resource
- Lighthouse scores: **Performance 99 · Accessibility 97 · Best Practices 100 · SEO 100**

### Analytics & Consent
- Google Analytics 4 (GA4) via `gtag.js`
- **Google Consent Mode v2 Advanced** — consent defaults to denied before GA loads; a stored choice is replayed ahead of GA's first ping
- Custom cookie banner: accept / decline, persisted in `localStorage`
- WhatsApp conversion tracking: one delegated click listener emits a GA4 event with the originating section id — every CTA is measurable without per-button code

### Accessibility
- Skip-to-content link (first child of `<body>`)
- Every `<section>` has `aria-labelledby` pointing to its heading
- All `aria-label`s localized through the i18n catalog (4 languages)
- Hidden states are real: closed mobile menu and dismissed cookie banner are `aria-hidden` + `visibility: hidden` (out of the accessibility tree AND the tab order)
- `focus-visible` outline on all interactive elements; minimum 44×44px touch targets (enforced by an E2E test)
- Carousel clones (infinite loop) are `aria-hidden` with `tabindex="-1"`

### Performance
- Core Web Vitals (mobile, Lighthouse): FCP 1.5 s · LCP 1.8 s · TBT 30 ms · CLS 0
- Zero framework JS shipped to visitors — React exists only in the CMS admin bundle
- Self-hosted Roboto (WOFF2, `font-display: swap`) — no Google Fonts CDN
- All content images through the Astro asset pipeline: AVIF + WebP, lazy-loaded (hero eager + `fetchpriority=high`)
- Source images capped at ≤2× the largest responsive width served

### Blog (Keystatic CMS)
- Git-backed CMS: posts are Markdoc files in `src/content/blog/`, edited via the Keystatic panel at `/keystatic`
- The editor authors posts in Catalan — by design, the blog is single-language to keep the editorial workload sustainable
- Posts render through Astro Content Collections; schema constraints (summary ≤ 160 chars, required date) are enforced in both the CMS config and the Zod schema
- Serverless function invocations only happen in the editor UI, never on public reads

### Pages
- `/`, `/es`, `/en`, `/fr` — home
- `/tufting` · `/felting` · `/punch-needle` · `/loom` · `/team-building` · `/pelussetes` · `/borla` · `/summer-lab` — service/technique landings, each in 4 locales
- `/gallery`, `/press` — in 4 locales
- `/blog`, `/blog/[slug]` — CA-only
- `/404` — custom page with a pompom mini-game (copy in all 4 languages, resolved client-side)
- `/keystatic` — CMS panel (auth-gated)

### Testing
- **Vitest**: i18n routing/translation logic + catalog completeness invariant
- **Playwright** (desktop + mobile profiles, against the production build):
  smoke tests for all ~45 routes (status, single `<h1>`, title), SEO guards
  (meta, OG/Twitter, JSON-LD validity), WCAG touch-target sweep, redirect
  behavior, and blog rendering discovered dynamically from the index

---

## Project structure

```
keystatic.config.ts         # CMS schema (collections, fields)
astro.config.mjs            # i18n, redirects, sitemap, integrations
netlify.toml                # Node version, security headers, bot-trap redirects

src/
├── assets/images/          # processed by Astro (AVIF/WebP output)
├── components/
│   ├── layout/             # Navbar, Footer, Seo, WhatsAppFab, CookieBanner
│   ├── sections/           # home-page sections (Hero, Offer, Workshops, …)
│   ├── landings/           # one component per landing + shared <TechniqueLanding>
│   └── ui/                 # reusable pieces (LandingHero, LandingSection,
│                           #   FinalCta, Faq, FeatureCard, schemas, …)
├── config/
│   ├── site.ts             # SEO + business config (single source of truth)
│   ├── reviews.ts          # Google reviews (testimonials + JSON-LD)
│   ├── workshops.ts        # tufting formats (prices, sizes, i18n keys)
│   └── seasonal.ts         # time-limited offerings (Summer Lab card)
├── content/blog/           # Keystatic-authored Markdoc posts
├── i18n/
│   ├── ui.ts               # all copy, 4 languages (+ completeness test)
│   └── utils.ts            # getLangFromUrl, useTranslations (t / t.dyn),
│                           #   localizedPath, getAlternatePath (+ unit tests)
├── layouts/
│   ├── Layout.astro        # GA + Consent Mode, skip link, favicons, reveal JS
│   ├── HomePage.astro      # home composition (shared by / and /[lang])
│   └── LandingPage.astro   # landing shell (Navbar + main + Footer + SEO)
├── pages/
│   ├── index.astro …       # default-locale (CA) routes
│   ├── [lang]/…            # /es, /en, /fr variants (same components)
│   └── blog/               # index + [slug]
└── styles/theme.css        # design system tokens
```

---

## Commands

```sh
npm run dev        # localhost:4321
npm run build      # output to ./dist
npm run preview    # preview build locally
npm test           # Vitest unit tests
npm run test:e2e   # build + Playwright E2E
```
