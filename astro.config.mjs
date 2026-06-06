// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';

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
      filter: (page) => !page.includes('/ca'),
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
