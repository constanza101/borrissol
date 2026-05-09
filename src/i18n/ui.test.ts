import { describe, expect, it } from 'vitest';
import { ui, defaultLang } from './ui';

const langs = Object.keys(ui) as (keyof typeof ui)[];
const referenceKeys = Object.keys(ui[defaultLang]);

describe('i18n completeness', () => {
  it('all languages have exactly the same keys as the default language', () => {
    for (const lang of langs) {
      const keys = Object.keys(ui[lang]);
      const missing = referenceKeys.filter(k => !keys.includes(k));
      const extra   = keys.filter(k => !referenceKeys.includes(k));
      expect(missing, `${lang} is missing keys: ${missing.join(', ')}`).toHaveLength(0);
      expect(extra,   `${lang} has unexpected keys: ${extra.join(', ')}`).toHaveLength(0);
    }
  });

  it('no translation value is an empty string', () => {
    for (const lang of langs) {
      const empty = Object.entries(ui[lang])
        .filter(([, v]) => v === '')
        .map(([k]) => k);
      expect(empty, `${lang} has empty values for: ${empty.join(', ')}`).toHaveLength(0);
    }
  });

  it('all languages define a non-empty page title and description', () => {
    for (const lang of langs) {
      const entries = ui[lang] as Record<string, string>;
      expect(entries['page.home.title'].length).toBeGreaterThan(0);
      expect(entries['page.home.description'].length).toBeGreaterThan(0);
    }
  });

  it('privacy text contains the contact email in every language', () => {
    for (const lang of langs) {
      const entries = ui[lang] as Record<string, string>;
      expect(entries['privacy.text']).toContain('borrissolespaicreatiu@gmail.com');
    }
  });
});
