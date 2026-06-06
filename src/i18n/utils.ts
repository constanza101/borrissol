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

/**
 * Returns a translation function bound to a specific locale. Falls back to the
 * default locale's value if the key is missing, then to the key itself.
 */
export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    const translations = ui[lang] as Record<string, string>;
    return translations[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
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
