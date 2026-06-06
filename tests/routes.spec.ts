import { expect, test } from '@playwright/test';

// Smoke tests: every static route in the site loads with a 200, a single
// <h1>, and a non-empty <title>. Catches build/routing regressions and
// missing translations that leave a page with an empty title.
//
// When a new top-level page or locale is added, append it to ROUTES.
const ROUTES = [
  // Home in every locale
  { path: '/',           label: 'home (CA)' },
  { path: '/es',         label: 'home (ES)' },
  { path: '/en',         label: 'home (EN)' },
  { path: '/fr',         label: 'home (FR)' },

  // Gallery in every locale
  { path: '/gallery',    label: 'gallery (CA)' },
  { path: '/es/gallery', label: 'gallery (ES)' },
  { path: '/en/gallery', label: 'gallery (EN)' },
  { path: '/fr/gallery', label: 'gallery (FR)' },

  // Press in every locale
  { path: '/press',      label: 'press (CA)' },
  { path: '/es/press',   label: 'press (ES)' },
  { path: '/en/press',   label: 'press (EN)' },
  { path: '/fr/press',   label: 'press (FR)' },

  // Blog index — CA only by design
  { path: '/blog',       label: 'blog index (CA)' },
];

test.describe('Static routes', () => {
  for (const { path, label } of ROUTES) {
    test(`${label} (${path}) loads, has <h1> and <title>`, async ({ page }) => {
      const response = await page.goto(path);

      expect(response?.status(), `${path} must return HTTP 200`).toBe(200);

      await expect(
        page.locator('h1'),
        `${path} must have exactly one <h1>`,
      ).toHaveCount(1);

      const title = (await page.title()).trim();
      expect(title.length, `${path} must have a non-empty <title>`).toBeGreaterThan(0);
    });
  }
});

// The slug is discovered dynamically from /blog so this doesn't break
// when Belén renames or deletes posts via Keystatic.
test.describe('Blog post rendering', () => {
  test('first blog post renders successfully', async ({ page }) => {
    await page.goto('/blog');

    const firstHref = await page
      .locator('a[href^="/blog/"]')
      .first()
      .getAttribute('href');

    expect(firstHref, '/blog must link to at least one post').toBeTruthy();

    const response = await page.goto(firstHref!);
    expect(response?.status(), `${firstHref} must return HTTP 200`).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);
    expect((await page.title()).trim().length).toBeGreaterThan(0);
  });
});

// page.goto follows HTTP redirects AND meta-refresh, so we just verify
// the final pathname after navigation settles.
test.describe('Redirects', () => {
  const REDIRECTS = [
    { from: '/ca',         to: '/' },
    { from: '/ca/gallery', to: '/gallery' },
    { from: '/es/blog',    to: '/blog' },
  ];

  for (const { from, to } of REDIRECTS) {
    test(`${from} → ${to}`, async ({ page }) => {
      await page.goto(from);
      await page.waitForURL(
        (url) => new URL(url).pathname === to,
        { timeout: 5000 },
      );
      expect(new URL(page.url()).pathname).toBe(to);
    });
  }
});
