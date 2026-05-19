# Borrissol Espai Creatiu — Landing Page

Production site: [borrissol.com](https://borrissol.com)

Landing page for a textile workshop studio in Mataró (Barcelona). Built as a freelance project from brief to deployment.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Astro 5 (static output) |
| Styles | CSS custom properties — token-based design system |
| Scripts | Vanilla JS (no runtime framework) |
| Images | Astro `<Picture>` — AVIF + WebP, responsive `srcset` |
| Fonts | Roboto self-hosted (WOFF2) |
| Testing | Playwright E2E |
| Deploy | Git push → auto-deploy (Netlify) |

---

## Features

### Internationalisation — 4 languages
- Catalan (default, no URL prefix), Spanish (`/es`), English (`/en`), French (`/fr`)
- All copy in `src/i18n/ui.ts` — zero hardcoded strings in components
- Hreflang tags + `x-default` in `<head>`
- Language switcher in navbar
- 301 redirect: `/ca` → `/`

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

### Testing
- Playwright E2E: navigation, WhatsApp links, language switcher, carousel interaction

---

## Project structure

```
src/
├── assets/images/        # processed by Astro (AVIF/WebP output)
├── components/
│   ├── Seo.astro         # all meta, JSON-LD, hreflang
│   ├── NavBar.astro
│   ├── HeroSection.astro
│   ├── OfferSection.astro
│   ├── ProcessSection.astro
│   ├── WorkshopsSection.astro
│   ├── TestimonialsSection.astro
│   ├── AboutSection.astro
│   ├── FaqSection.astro
│   ├── CtaSection.astro
│   ├── Footer.astro
│   ├── WhatsAppFab.astro
│   ├── CookieBanner.astro
│   └── PrivacySection.astro
├── config/
│   └── site.ts           # all SEO + business config in one place
├── i18n/
│   ├── ui.ts             # all copy, 4 languages
│   └── utils.ts          # getLangFromUrl, useTranslations, getAlternatePath
├── layouts/
│   └── Layout.astro      # GA + Consent Mode, skip link, scroll reveal
├── pages/
│   ├── index.astro       # Catalan (default)
│   ├── es/index.astro
│   ├── en/index.astro
│   └── fr/index.astro
└── styles/
    └── theme.css         # design system tokens
```

---

## Commands

```sh
npm run dev       # localhost:4321
npm run build     # output to ./dist
npm run preview   # preview build locally
```
