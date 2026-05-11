// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://borrissol.netlify.app',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/ca'),
    }),
  ],
  i18n: {
    defaultLocale: 'ca',
    locales: ['ca', 'es', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
