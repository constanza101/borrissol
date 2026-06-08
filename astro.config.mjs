// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import { isSummerLabVisible } from './src/config/seasonal.ts';

// Evaluated at build time — keeps the seasonal Summer Lab out of the sitemap
// once it has auto-hidden.
const summerLabVisible = isSummerLabVisible();

// https://astro.build/config
export default defineConfig({
  site: 'https://borrissol.com',
  adapter: netlify(),
  trailingSlash: 'never',

  // 301 redirects:
  // - /ca and known /ca/* sub-routes → strip the CA prefix (CA is the default
  //   locale, served at root). Astro requires destinations to match real
  //   routes, so we list each one explicitly instead of using a wildcard.
  // - /es/blog, /en/blog, /fr/blog → /blog (blog is intentionally CA-only;
  //   non-CA URLs route to CA content for shared bookmarks/links).
  redirects: {
    // /ca/* → / (legacy)
    '/ca':              { status: 301, destination: '/' },
    '/ca/gallery':      { status: 301, destination: '/gallery' },
    '/ca/press':        { status: 301, destination: '/press' },
    '/ca/blog':         { status: 301, destination: '/blog' },
    '/ca/blog/[slug]':  { status: 301, destination: '/blog/[slug]' },

    // /<lang>/blog → /blog (blog only in CA)
    '/es/blog':         { status: 301, destination: '/blog' },
    '/es/blog/[slug]':  { status: 301, destination: '/blog/[slug]' },
    '/en/blog':         { status: 301, destination: '/blog' },
    '/en/blog/[slug]':  { status: 301, destination: '/blog/[slug]' },
    '/fr/blog':         { status: 301, destination: '/blog' },
    '/fr/blog/[slug]':  { status: 301, destination: '/blog/[slug]' },
  },

  integrations: [
    sitemap({
      // Emit hreflang cross-references between language variants of each page
      // (rel="alternate" entries inside the sitemap XML). Reinforces the
      // hreflang signal that Seo.astro already adds to each page's <head>.
      // Keys must match the locale codes in `i18n.locales` above.
      i18n: {
        defaultLocale: 'ca',
        locales: {
          ca: 'ca-ES',
          es: 'es-ES',
          en: 'en-US',
          fr: 'fr-FR',
        },
      },
      // Defensive filter: /ca URLs no longer exist after the [lang] refactor,
      // but keep this in case a stray /ca route reappears in the future.
      // Also drop the seasonal Summer Lab from the sitemap once it has hidden.
      filter: (page) => {
        if (page.includes('/ca')) return false;
        if (!summerLabVisible && /\/summer-lab(\/|$)/.test(page)) return false;
        return true;
      },
    }),
    react(),
    markdoc(),
    keystatic(),
  ],
  i18n: {
    defaultLocale: 'ca',
    locales: ['ca', 'es', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
