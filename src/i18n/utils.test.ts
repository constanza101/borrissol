import { describe, expect, it } from 'vitest';
import { getLangFromUrl, useTranslations, getAlternatePath } from './utils';

describe('getLangFromUrl', () => {
  it('returns default (ca) for the root path', () => {
    expect(getLangFromUrl(new URL('http://x.com/'))).toBe('ca');
  });

  it('returns default (ca) for an unknown first segment', () => {
    expect(getLangFromUrl(new URL('http://x.com/unknown/page'))).toBe('ca');
  });

  it('detects es', () => {
    expect(getLangFromUrl(new URL('http://x.com/es/gallery'))).toBe('es');
  });

  it('detects en', () => {
    expect(getLangFromUrl(new URL('http://x.com/en'))).toBe('en');
  });

  it('detects fr from a nested path', () => {
    expect(getLangFromUrl(new URL('http://x.com/fr/press'))).toBe('fr');
  });

  it('ignores query strings', () => {
    expect(getLangFromUrl(new URL('http://x.com/?ref=ig'))).toBe('ca');
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

  it('falls back to defaultLang then to the key itself for missing keys', () => {
    const t = useTranslations('es');
    expect(t('this.key.does.not.exist' as never)).toBe('this.key.does.not.exist');
  });
});

describe('getAlternatePath', () => {
  // Home (root) page
  it('/ + es → /es', () => {
    expect(getAlternatePath(new URL('http://x.com/'), 'es')).toBe('/es');
  });

  it('/ + en → /en', () => {
    expect(getAlternatePath(new URL('http://x.com/'), 'en')).toBe('/en');
  });

  it('/ + ca → / (already default)', () => {
    expect(getAlternatePath(new URL('http://x.com/'), 'ca')).toBe('/');
  });

  // Non-home pages, switching FROM default
  it('/gallery + es → /es/gallery', () => {
    expect(getAlternatePath(new URL('http://x.com/gallery'), 'es')).toBe('/es/gallery');
  });

  it('/press + fr → /fr/press', () => {
    expect(getAlternatePath(new URL('http://x.com/press'), 'fr')).toBe('/fr/press');
  });

  // Non-home pages, switching BETWEEN non-defaults
  it('/es/gallery + en → /en/gallery', () => {
    expect(getAlternatePath(new URL('http://x.com/es/gallery'), 'en')).toBe('/en/gallery');
  });

  // Switching BACK to default strips the prefix
  it('/es/gallery + ca → /gallery', () => {
    expect(getAlternatePath(new URL('http://x.com/es/gallery'), 'ca')).toBe('/gallery');
  });

  it('/fr + ca → /', () => {
    expect(getAlternatePath(new URL('http://x.com/fr'), 'ca')).toBe('/');
  });

  // Deep paths preserved
  it('/blog/some-post + es → /es/blog/some-post', () => {
    expect(getAlternatePath(new URL('http://x.com/blog/some-post'), 'es')).toBe('/es/blog/some-post');
  });

  // Hash and query string preserved (so anchor scroll position survives lang switch)
  it('preserves the hash: /#about + es → /es#about', () => {
    expect(getAlternatePath(new URL('http://x.com/#about'), 'es')).toBe('/es#about');
  });

  it('preserves the hash on non-home: /es/#about + en → /en#about', () => {
    expect(getAlternatePath(new URL('http://x.com/es/#about'), 'en')).toBe('/en#about');
  });

  it('preserves query string: /gallery?ref=ig + es → /es/gallery?ref=ig', () => {
    expect(getAlternatePath(new URL('http://x.com/gallery?ref=ig'), 'es')).toBe('/es/gallery?ref=ig');
  });

  it('preserves both query and hash: /?ref=ig#about + en → /en?ref=ig#about', () => {
    expect(getAlternatePath(new URL('http://x.com/?ref=ig#about'), 'en')).toBe('/en?ref=ig#about');
  });
});
