# Borrissol Espai Creatiu — Landing Page

Production site: [borrissol.com](https://borrissol.com)
Codebase docs: [deepwiki.com/constanza101/borrissol](https://deepwiki.com/constanza101/borrissol) — auto-generated wiki of the architecture, components and routing.

Landing page for a textile workshop studio in Mataró (Barcelona). Built as a freelance project from brief to deployment.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Astro 6 (hybrid — prerendered pages + Netlify functions for CMS) |
| CMS | Keystatic (Git-backed, MDX content for the blog) |
| Styles | CSS custom properties — token-based design system |
| Scripts | Vanilla JS (no runtime framework) |
| Images | Astro `<Picture>` — AVIF + WebP, responsive `srcset` |
| Fonts | Roboto self-hosted (WOFF2) |
| Testing | Playwright E2E + Vitest unit tests |
| Deploy | Git push → auto-deploy (Netlify) |

---

## Features

### Internationalisation — 4 languages
- Catalan (default, no URL prefix), Spanish (`/es`), English (`/en`), French (`/fr`)
- Single source per page via Astro `[lang]` dynamic routes (`getStaticPaths`) — no duplicated per-language files
- All copy in `src/i18n/ui.ts` — zero hardcoded strings in components
- Hreflang tags + `x-default` in each page `<head>` AND in the sitemap XML
- Language switcher in navbar preserves the URL hash via client-side JS
- 301 redirects: legacy `/ca/*` → `/*`, and `/es,/en,/fr/blog` → `/blog` (blog is intentionally CA-only)

### Design System
- Full token set in `src/styles/theme.css` (colors, spacing, typography, radius, borders, icons)
- Monochromatic 5-step palette
- Typography scale: H1–H4, P1–P3, UI
- Utility classes: `.btn-primary`, `.btn-secondary`, `.btn-tertiary`, `.badge`, `.input`
- Scroll reveal animations via IntersectionObserver (respects `prefers-reduced-motion`)

### SEO
- JSON-LD structured data: `LocalBusiness` + `FAQPage` schemas
- Organisation logo as 512×512 PNG (Google rich results requirement)
- `ImageObject` with explicit dimensions for LCP image
- Open Graph + Twitter Card meta tags
- `AggregateRating` (5.0 · 27 reviews)
- `openingHours`, `sameAs` (Instagram, TikTok), full postal address
- Canonical URLs, sitemap (`@astrojs/sitemap`), `robots.txt` with social bot allowlist
- Lighthouse scores: **Performance 99 · Accessibility 97 · Best Practices 100 · SEO 100**

### Analytics & Consent
- Google Analytics 4 (GA4) via `gtag.js`
- **Google Consent Mode v2 Advanced** — GA loads on every visit (cookieless by default); cookies only granted after explicit user consent
- Custom cookie banner: accept / decline, persisted in `localStorage`, restores consent on return visits
- No cookies set before consent; Google models anonymous data in denied state

### Accessibility
- Skip-to-content link (first child of `<body>`)
- Every `<section>` has `aria-labelledby` pointing to its heading
- `<nav aria-label>`, `<footer role="contentinfo">`
- `focus-visible` outline on all interactive elements
- Minimum 44×44px touch targets
- Hamburger button with `aria-expanded` toggle
- Heading levels never skipped

### Performance
- Core Web Vitals (mobile, Lighthouse): FCP 1.5 s · LCP 1.8 s · TBT 30 ms · CLS 0
- Self-hosted Roboto (WOFF2, `font-display: swap`) — no Google Fonts CDN
- All images processed through Astro asset pipeline: AVIF + WebP, lazy-loaded (hero eager)
- Preconnect hints for third-party domains

### UX Details
- WhatsApp FAB + scroll-to-top button (fixed, stacked)
- Pre-filled WhatsApp messages per CTA button, in all 4 languages
- Testimonials carousel with arrow navigation
- FAQ with native `<details>` / `<summary>` — no JS, keyboard accessible
- Google Maps embed (grayscale → color on hover)
- Privacy policy inline section (no separate page)

### Blog (Keystatic CMS)
- Git-backed CMS: posts are MDX files in `src/content/blog/`, edited via Keystatic Cloud UI at `/keystatic`
- Editor (Belén) authors posts in Catalan — by design, blog is single-language to keep the editor workload sustainable
- Posts render through Astro Content Collections (`getCollection('blog')`)
- Auth via Keystatic Cloud; serverless function invocations only happen in the editor UI, never on public reads

### Pages
- `/` Home (CA), `/es`, `/en`, `/fr` — single-page landing per language
- `/gallery`, `/es/gallery`, `/en/gallery`, `/fr/gallery` — honeycomb photo gallery
- `/press`, `/es/press`, `/en/press`, `/fr/press` — press / media coverage grid
- `/blog`, `/blog/[slug]` — CA-only blog
- `/keystatic` — CMS panel (auth-gated)

### Testing
- Playwright E2E: navigation, WhatsApp links, language switcher, carousel interaction
- Vitest unit tests for components (e.g. `Button.test.ts`)

---

## Project structure

```
keystatic.config.ts         # CMS schema (collections, fields)
astro.config.mjs            # i18n, redirects, sitemap, integrations
netlify.toml                # Node version + bot-trap redirects

src/
├── assets/images/          # processed by Astro (AVIF/WebP output)
├── components/
│   ├── Seo.astro           # all meta, JSON-LD, hreflang
│   ├── Navbar.astro        # incl. language switcher + hash preservation
│   ├── HeroSection.astro
│   ├── OfferSection.astro
│   ├── ProcessSection.astro
│   ├── WorkshopsSection.astro
│   ├── TestimonialsSection.astro
│   ├── AboutSection.astro
│   ├── FAQSection.astro
│   ├── CTASection.astro
│   ├── Footer.astro
│   ├── Gallery.astro       # honeycomb tap-to-reveal photo grid
│   ├── PressGrid.astro     # press page grid
│   ├── PressStrip.astro    # press strip on home
│   ├── Button.astro        # design-system button primitive
│   ├── WhatsAppFab.astro
│   ├── CookieBanner.astro
│   └── PrivacySection.astro
├── config/
│   └── site.ts             # all SEO + business config in one place
├── content/
│   └── blog/               # Keystatic-authored MDX posts
├── i18n/
│   ├── ui.ts               # all copy, 4 languages
│   └── utils.ts            # getLangFromUrl, useTranslations, getAlternatePath
├── layouts/
│   └── Layout.astro        # GA + Consent Mode, skip link, favicons, scroll reveal
├── pages/
│   ├── index.astro         # / (CA, default locale)
│   ├── gallery.astro       # /gallery (CA)
│   ├── press.astro         # /press (CA)
│   ├── [lang]/             # dynamic routes — /es, /en, /fr variants
│   │   ├── index.astro
│   │   ├── gallery.astro
│   │   └── press.astro
│   └── blog/
│       ├── index.astro     # /blog
│       └── [slug].astro    # /blog/post-slug
└── styles/
    └── theme.css           # design system tokens
```

---

## Commands

```sh
npm run dev       # localhost:4321
npm run build     # output to ./dist
npm run preview   # preview build locally
```
