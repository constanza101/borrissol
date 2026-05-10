import { ui, defaultLang, languages, type Lang } from './ui';

export const localeMap: Record<Lang, string> = {
  es: 'es_ES',
  en: 'en_US',
  ca: 'ca_ES',
  fr: 'fr_FR',
};

// Slug pairs for every page — add a row here when creating a new page.
const pageRoutes: Record<string, Record<Lang, string>> = {
  home:     { ca: '/',          en: '/en',           es: '/es',           fr: '/fr' },
  services: { ca: '/serveis',   en: '/en/services',  es: '/es/servicios', fr: '/fr/services' },
  contact:  { ca: '/contacte',  en: '/en/contact',   es: '/es/contacto',  fr: '/fr/contact' },
};

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first && first in languages) return first as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    const translations = ui[lang] as Record<string, string>;
    return translations[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

/** Returns the path for a named page in the given locale. */
export function getLocalePath(lang: Lang, page: keyof typeof pageRoutes): string {
  return pageRoutes[page][lang];
}

/** Returns the alternate-language path for the current URL. */
export function getAlternatePath(url: URL, targetLang: Lang): string {
  const pathname = url.pathname.replace(/\/$/, '') || '/';
  const currentLang = getLangFromUrl(url);

  for (const routes of Object.values(pageRoutes)) {
    const current = routes[currentLang].replace(/\/$/, '') || '/';
    if (current === pathname) return routes[targetLang];
  }

  return pageRoutes.home[targetLang];
}
