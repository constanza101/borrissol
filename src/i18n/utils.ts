import { ui, defaultLang, languages, type Lang } from './ui';

/**
 * BCP47 locale codes for OpenGraph and HTML lang. Maps short code → full code.
 */
export const localeMap: Record<Lang, string> = {
  es: 'es_ES',
  en: 'en_US',
  ca: 'ca_ES',
  fr: 'fr_FR',
};

/**
 * Detects the locale from the URL prefix. Default locale (no prefix) → defaultLang.
 *
 * Used in pages and components that need the current language without depending
 * on Astro.currentLocale (which is only available inside .astro files).
 */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first && first in languages) return first as Lang;
  return defaultLang;
}

/** Every key in the catalog (validated at compile time for literal usage). */
export type UIKey = keyof typeof ui[typeof defaultLang];

interface Translator {
  /** Typed lookup — use for literal keys so typos fail to compile. */
  (key: UIKey): string;
  /**
   * Lookup for keys assembled at runtime (e.g. `${prefix}.faq.q${n}`), which
   * can't be compile-time validated. Same fallback chain as the typed call.
   * The i18n completeness test (ui.test.ts) is the safety net for these.
   */
  dyn: (key: string) => string;
}

/**
 * Returns a translation function bound to a specific locale. Falls back to the
 * default locale's value if the key is missing, then to the key itself.
 */
export function useTranslations(lang: Lang): Translator {
  const translations = ui[lang] as Record<string, string>;
  const fallback     = ui[defaultLang] as Record<string, string>;
  const lookup = (key: string): string => translations[key] ?? fallback[key] ?? key;
  const t = ((key: UIKey) => lookup(key)) as Translator;
  t.dyn = lookup;
  return t;
}

/**
 * Localizes an internal route path for a language. The default locale lives at
 * the root (no prefix); every other locale gets its prefix.
 *
 * Examples (with defaultLang = 'ca'):
 *   localizedPath('ca', '/borla') → '/borla'
 *   localizedPath('es', '/borla') → '/es/borla'
 *   localizedPath('en', '/')      → '/en'
 */
export function localizedPath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

/**
 * Shared getStaticPaths body for every src/pages/[lang]/*.astro route: one
 * static path per non-default locale. The default locale is served at the
 * root by the route's src/pages/*.astro twin.
 */
export function nonDefaultLangPaths() {
  return (Object.keys(languages) as Lang[])
    .filter(l => l !== defaultLang)
    .map(l => ({ params: { lang: l } }));
}

/**
 * Returns the equivalent URL for the current page in a different locale.
 * Works for ANY page (home, gallery, press, blog, future routes) because it
 * does a URL-prefix swap instead of relying on a lookup table.
 *
 * Examples (with defaultLang = 'ca'):
 *   /                  + 'es' → '/es'
 *   /gallery           + 'es' → '/es/gallery'
 *   /es/gallery        + 'en' → '/en/gallery'
 *   /es/gallery        + 'ca' → '/gallery'
 *   /blog/some-post    + 'es' → '/es/blog/some-post'  (redirected to /blog by config)
 */
export function getAlternatePath(url: URL, targetLang: Lang): string {
  const currentLang = getLangFromUrl(url);
  let pathname = url.pathname;

  // Strip the current language prefix when not the default locale.
  if (currentLang !== defaultLang) {
    pathname = pathname.replace(new RegExp(`^/${currentLang}(?=/|$)`), '');
  }

  // Compute the target pathname (default-locale form, then prefixed if needed).
  let target: string;
  if (targetLang === defaultLang) {
    target = pathname || '/';
  } else if (pathname === '' || pathname === '/') {
    target = `/${targetLang}`;
  } else {
    target = `/${targetLang}${pathname}`;
  }

  // Preserve query string and hash so the user stays on the same logical
  // location after switching language (e.g. /#about → /es#about).
  return target + url.search + url.hash;
}
