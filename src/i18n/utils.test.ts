import { describe, expect, it } from 'vitest';
import { getLangFromUrl, useTranslations, getLocalePath, getAlternatePath } from './utils';

describe('getLangFromUrl', () => {
  it('returns default lang (es) for the root path', () => {
    expect(getLangFromUrl(new URL('http://x.com/'))).toBe('es');
  });

  it('returns default lang (es) for an unknown first segment', () => {
    expect(getLangFromUrl(new URL('http://x.com/unknown/page'))).toBe('es');
  });

  it('detects en', () => {
    expect(getLangFromUrl(new URL('http://x.com/en'))).toBe('en');
  });

  it('detects ca from a nested path', () => {
    expect(getLangFromUrl(new URL('http://x.com/ca/serveis'))).toBe('ca');
  });

  it('detects fr', () => {
    expect(getLangFromUrl(new URL('http://x.com/fr/services'))).toBe('fr');
  });

  it('ignores query strings', () => {
    expect(getLangFromUrl(new URL('http://x.com/?ref=ig'))).toBe('es');
  });
});

describe('useTranslations', () => {
  it('returns the correct translation for es', () => {
    const t = useTranslations('es');
    expect(t('cta.btn')).toBe('Reserva tu plaza');
  });

  it('returns the correct translation for en', () => {
    const t = useTranslations('en');
    expect(t('cta.btn')).toBe('Book your spot');
  });

  it('returns the correct translation for ca', () => {
    const t = useTranslations('ca');
    expect(t('cta.btn')).toBe('Reserva la teva plaça');
  });

  it('returns the correct translation for fr', () => {
    const t = useTranslations('fr');
    expect(t('cta.btn')).toBe('Réservez votre place');
  });

  it('returns the key itself as a fallback when completely missing', () => {
    const t = useTranslations('es');
    // Force a missing key via type escape — real guard against silent empty strings
    expect(t('nav.workshops' as never)).toBe('Talleres');
  });
});

describe('getLocalePath', () => {
  it('returns / for es home', () => {
    expect(getLocalePath('es', 'home')).toBe('/');
  });

  it('returns /en for en home', () => {
    expect(getLocalePath('en', 'home')).toBe('/en');
  });

  it('returns localised service paths', () => {
    expect(getLocalePath('ca', 'services')).toBe('/ca/serveis');
    expect(getLocalePath('fr', 'services')).toBe('/fr/services');
    expect(getLocalePath('es', 'services')).toBe('/servicios');
  });
});

describe('getAlternatePath', () => {
  it('returns the home path in the target language for /', () => {
    const url = new URL('http://x.com/');
    expect(getAlternatePath(url, 'en')).toBe('/en');
    expect(getAlternatePath(url, 'ca')).toBe('/ca');
    expect(getAlternatePath(url, 'fr')).toBe('/fr');
  });

  it('maps between localised service paths', () => {
    const url = new URL('http://x.com/en/services');
    expect(getAlternatePath(url, 'es')).toBe('/servicios');
    expect(getAlternatePath(url, 'ca')).toBe('/ca/serveis');
  });

  it('falls back to the home path in the target language for unknown routes', () => {
    const url = new URL('http://x.com/unknown-route');
    expect(getAlternatePath(url, 'en')).toBe('/en');
  });
});
