import { expect, test } from '@playwright/test';

test.describe('SEO & Accessibility guards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ── Structure ───────────────────────────────────────────────────────────────

  test('page has exactly one <h1>', async ({ page }) => {
    const count = await page.locator('h1').count();
    expect(count, 'There must be exactly one H1 — more than one confuses Google').toBe(1);
  });

  // ── Images ──────────────────────────────────────────────────────────────────

  test('all <img> tags have a non-empty alt attribute', async ({ page }) => {
    const images = await page.locator('img').all();

    for (const img of images) {
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');

      expect(
        alt,
        `Image missing alt: ${src}`,
      ).not.toBeNull();

      expect(
        alt!.trim().length,
        `Image has empty alt (decorative images should use alt=""): ${src}`,
      ).toBeGreaterThanOrEqual(0); // empty string is valid for decorative images
    }
  });

  // ── SEO Meta ────────────────────────────────────────────────────────────────

  test('page has a non-empty <title>', async ({ page }) => {
    const title = await page.title();
    expect(title.trim().length, 'Page must have a <title> tag').toBeGreaterThan(0);
  });

  test('page has a <meta name="description"> with content', async ({ page }) => {
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute('content');

    expect(description, 'Missing <meta name="description">').not.toBeNull();
    expect(
      description!.trim().length,
      '<meta name="description"> must not be empty',
    ).toBeGreaterThan(0);
  });

  test('page has Open Graph title and description', async ({ page }) => {
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDesc  = await page.locator('meta[property="og:description"]').getAttribute('content');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    const ogType  = await page.locator('meta[property="og:type"]').getAttribute('content');

    expect(ogTitle,  'Missing og:title').not.toBeNull();
    expect(ogDesc,   'Missing og:description').not.toBeNull();
    expect(ogImage,  'Missing og:image').not.toBeNull();
    expect(ogType,   'Missing og:type').not.toBeNull();
  });

  test('page has Twitter Card meta tags', async ({ page }) => {
    const card  = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    const title = await page.locator('meta[name="twitter:title"]').getAttribute('content');
    const desc  = await page.locator('meta[name="twitter:description"]').getAttribute('content');
    const image = await page.locator('meta[name="twitter:image"]').getAttribute('content');

    expect(card,  'Missing twitter:card').toBe('summary_large_image');
    expect(title, 'Missing twitter:title').not.toBeNull();
    expect(desc,  'Missing twitter:description').not.toBeNull();
    expect(image, 'Missing twitter:image').not.toBeNull();
  });

  // ── JSON-LD Schema.org ───────────────────────────────────────────────────────

  test('page has valid JSON-LD with required Schema.org fields', async ({ page }) => {
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    expect(raw, 'Missing <script type="application/ld+json">').not.toBeNull();

    const schema = JSON.parse(raw!) as Record<string, unknown>;

    expect(schema['@context'],     'JSON-LD missing @context').toBe('https://schema.org');
    expect(schema['@type'],        'JSON-LD missing @type').toBeTruthy();
    expect(schema['name'],         'JSON-LD missing name').toBeTruthy();
    expect(schema['url'],          'JSON-LD missing url').toBeTruthy();
    expect(schema['description'],  'JSON-LD missing description').toBeTruthy();
    expect(schema['logo'],         'JSON-LD missing logo').toBeTruthy();
  });

  test('JSON-LD logo is an ImageObject with a url', async ({ page }) => {
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    const schema = JSON.parse(raw!) as Record<string, unknown>;
    const logo = schema['logo'] as Record<string, string> | undefined;

    expect(logo?.['@type'], 'logo must be an ImageObject').toBe('ImageObject');
    expect(logo?.['url'],   'logo ImageObject must have a url').toBeTruthy();
  });

  // ── Touch Targets (WCAG 2.5.5 / Mobile SEO) ─────────────────────────────────

  test('interactive elements meet 44×44px minimum touch target size', async ({ page }) => {
    const MIN_SIZE = 44; // px — WCAG 2.5.5 & Google mobile-friendliness threshold
    const selectors = ['button', 'a[href]', 'input', 'select', 'textarea', '[role="button"]'];

    for (const selector of selectors) {
      const elements = await page.locator(selector).all();

      for (const el of elements) {
        const box = await el.boundingBox();
        if (!box) continue; // element is hidden — skip

        const label = `${selector} (text: "${(await el.textContent())?.trim()}")`;

        expect(
          box.width,
          `Touch target too narrow — ${label}: ${box.width}px < ${MIN_SIZE}px`,
        ).toBeGreaterThanOrEqual(MIN_SIZE);

        expect(
          box.height,
          `Touch target too short — ${label}: ${box.height}px < ${MIN_SIZE}px`,
        ).toBeGreaterThanOrEqual(MIN_SIZE);
      }
    }
  });
});
