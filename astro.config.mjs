// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://borrissol.netlify.app',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'ca', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
