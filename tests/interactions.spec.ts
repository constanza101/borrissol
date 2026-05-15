import { expect, test } from '@playwright/test';

// Pre-set consent so the cookie banner doesn't interfere with interaction tests
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('cookie_consent', 'accepted');
  });
  await page.goto('/');
});

// ── Testimonials carousel ────────────────────────────────────────────────────
// Arrows are display:none on mobile (≤540px) — desktop only

test.describe('Testimonials carousel', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('next arrow scrolls the carousel forward', async ({ page }) => {
    const carousel = page.locator('#t-carousel');

    const before = await carousel.evaluate((el) => el.scrollLeft);
    await page.locator('#t-next').click();
    await page.waitForTimeout(600);

    const after = await carousel.evaluate((el) => el.scrollLeft);
    expect(after, 'Carousel must scroll right when next is clicked').toBeGreaterThan(before);
  });

  test('prev arrow scrolls the carousel back after going forward', async ({ page }) => {
    const carousel = page.locator('#t-carousel');

    await page.locator('#t-next').click();
    await page.waitForTimeout(600);

    const middle = await carousel.evaluate((el) => el.scrollLeft);

    await page.locator('#t-prev').click();
    await page.waitForTimeout(600);

    const after = await carousel.evaluate((el) => el.scrollLeft);
    expect(after, 'Carousel must scroll left when prev is clicked').toBeLessThan(middle);
  });
});

// ── FAQ accordion ────────────────────────────────────────────────────────────

test.describe('FAQ accordion', () => {
  test('clicking a question opens its answer', async ({ page }) => {
    const firstItem = page.locator('.faq-item').first();
    const firstBtn  = firstItem.locator('.faq-question');

    await expect(firstItem).not.toHaveClass(/is-open/);
    await firstBtn.click();
    await expect(firstItem).toHaveClass(/is-open/);
  });

  test('clicking an open question closes it', async ({ page }) => {
    const firstItem = page.locator('.faq-item').first();
    const firstBtn  = firstItem.locator('.faq-question');

    await firstBtn.click();
    await expect(firstItem).toHaveClass(/is-open/);

    await firstBtn.click();
    await expect(firstItem).not.toHaveClass(/is-open/);
  });

  test('opening a second question closes the first', async ({ page }) => {
    const items  = page.locator('.faq-item');
    const first  = items.nth(0).locator('.faq-question');
    const second = items.nth(1).locator('.faq-question');

    await first.click();
    await expect(items.nth(0)).toHaveClass(/is-open/);

    await second.click();
    await expect(items.nth(1)).toHaveClass(/is-open/);
    await expect(items.nth(0)).not.toHaveClass(/is-open/);
  });
});

// ── Mobile navigation menu ───────────────────────────────────────────────────

test.describe('Mobile navigation menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('hamburger opens the mobile menu', async ({ page }) => {
    const hamburger = page.locator('#nav-hamburger');
    const menu      = page.locator('#mobile-menu');

    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toHaveClass(/is-open/);
  });

  test('clicking a menu link closes the menu', async ({ page }) => {
    const hamburger = page.locator('#nav-hamburger');
    const menu      = page.locator('#mobile-menu');

    await hamburger.click();
    await expect(menu).toHaveClass(/is-open/);

    await menu.locator('a').first().click();
    await expect(menu).not.toHaveClass(/is-open/);
  });

  test('pressing Escape closes the menu', async ({ page }) => {
    const hamburger = page.locator('#nav-hamburger');
    const menu      = page.locator('#mobile-menu');

    await hamburger.click();
    await expect(menu).toHaveClass(/is-open/);

    await page.keyboard.press('Escape');
    await expect(menu).not.toHaveClass(/is-open/);
  });
});

// ── Cookie consent banner ─────────────────────────────────────────────────────
// The banner appears after a 900ms setTimeout — tests must wait for is-visible

test.describe('Cookie consent banner', () => {
  test.beforeEach(async ({ page }) => {
    // Override parent init script: remove consent to simulate first visit
    await page.addInitScript(() => localStorage.removeItem('cookie_consent'));
    await page.goto('/');
    // Wait for the 900ms slide-in delay
    await page.locator('#cookie-banner.is-visible').waitFor({ timeout: 3000 });
  });

  test('banner is visible on first visit', async ({ page }) => {
    await expect(page.locator('#cookie-banner')).toBeVisible();
  });

  test('accepting stores consent and hides banner', async ({ page }) => {
    await page.locator('#cookie-accept').click();
    // Banner slides away via CSS transform — wait for is-visible class to be removed
    await expect(page.locator('#cookie-banner')).not.toHaveClass(/is-visible/, { timeout: 2000 });

    const consent = await page.evaluate(() => localStorage.getItem('cookie_consent'));
    expect(consent).toBe('accepted');
  });

  test('declining stores rejection and hides banner', async ({ page }) => {
    await page.locator('#cookie-decline').click();
    await expect(page.locator('#cookie-banner')).not.toHaveClass(/is-visible/, { timeout: 2000 });

    const consent = await page.evaluate(() => localStorage.getItem('cookie_consent'));
    expect(consent).toBe('rejected');
  });

  test('banner does not reappear on return visit after accepting', async ({ page }) => {
    await page.locator('#cookie-accept').click();

    // Init scripts run in registration order on every navigation.
    // Parent sets 'accepted', describe-level removes it.
    // Adding a third script here (set 'accepted') ensures the net result on reload is 'accepted'.
    await page.addInitScript(() => localStorage.setItem('cookie_consent', 'accepted'));
    await page.reload();

    await page.waitForTimeout(1200);
    await expect(page.locator('#cookie-banner')).not.toHaveClass(/is-visible/);
  });
});

// ── Language switcher ─────────────────────────────────────────────────────────
// The dropdown is desktop-only (CSS hover). Use getAttribute to get the href,
// then navigate directly — tests the route exists and the title changes.

test.describe('Language switcher', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('Catalan is the default language at the root URL', async ({ page }) => {
    await expect(page).toHaveURL('/');
    // Default lang is CA — no /ca prefix
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'ca');
  });

  test('/es serves the Spanish version', async ({ page }) => {
    const href = await page.locator('.nav-lang-option[href*="/es"]').getAttribute('href');
    await page.goto(href!);
    await expect(page).toHaveURL(/\/es/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });

  test('/en serves the English version', async ({ page }) => {
    const href = await page.locator('.nav-lang-option[href*="/en"]').getAttribute('href');
    await page.goto(href!);
    await expect(page).toHaveURL(/\/en/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('/fr serves the French version', async ({ page }) => {
    const href = await page.locator('.nav-lang-option[href*="/fr"]').getAttribute('href');
    await page.goto(href!);
    await expect(page).toHaveURL(/\/fr/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  });

  test('page title differs between Catalan and English', async ({ page }) => {
    const titleCa = await page.title();

    const href = await page.locator('.nav-lang-option[href*="/en"]').getAttribute('href');
    await page.goto(href!);
    const titleEn = await page.title();

    expect(titleCa, 'Title must differ between CA and EN').not.toBe(titleEn);
  });
});

// ── WhatsApp links ────────────────────────────────────────────────────────────

test.describe('WhatsApp links', () => {
  test('all WhatsApp links point to the correct number', async ({ page }) => {
    const links = await page.locator('a[href*="wa.me"]').all();
    expect(links.length, 'There must be at least one WhatsApp link').toBeGreaterThan(0);

    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href, 'WhatsApp link must include the business number').toContain('34673247520');
    }
  });

  test('all WhatsApp links open in a new tab', async ({ page }) => {
    const links = await page.locator('a[href*="wa.me"]').all();
    for (const link of links) {
      const target = await link.getAttribute('target');
      expect(target, 'WhatsApp links must open in a new tab').toBe('_blank');
    }
  });

  test('WhatsApp links include a pre-filled message', async ({ page }) => {
    const links = await page.locator('a[href*="wa.me"]').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href, 'WhatsApp link must include a pre-filled message').toContain('?text=');
    }
  });
});
