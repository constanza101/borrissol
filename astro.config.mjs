// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://borrissol.com',
  adapter: netlify(),
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/ca'),
    }),
    react(),
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
