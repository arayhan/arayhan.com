import { expect, test } from '@playwright/test';

const SECTION_IDS = [
  'hero',
  'about',
  'work',
  'products',
  'experience',
  'freelance',
  'academic',
  'speaking',
  'blog',
  'contact',
];

test('home renders every narrative section', async ({ page }) => {
  await page.goto('/en');
  for (const id of SECTION_IDS) {
    await expect(page.locator(`section#${id}`)).toBeAttached();
  }
});

test('locale switcher flips the page to Indonesian', async ({ page }) => {
  await page.goto('/en');
  await page.getByText('ID', { exact: true }).first().click();
  await expect(page).toHaveURL(/\/id$/);
  await expect(page.locator('#about')).toContainText('TENTANG');
});

test('blog list navigates to a post detail', async ({ page }) => {
  await page.goto('/en/blog');
  await page
    .getByRole('link', { name: /Why My Design System Uses Inline Styles/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/blog\/design-systems-inline-styles$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/inline styles/i);
});

test('unknown routes land on the styled 404', async ({ page }) => {
  await page.goto('/en/this-page-does-not-exist');
  await expect(page.getByText('//404')).toBeVisible();
});

test('contact section offers a working channel', async ({ page }) => {
  await page.goto('/en');
  const contact = page.locator('#contact');
  // With RESEND_API_KEY unset the form degrades to a mailto CTA;
  // with the key set the real form renders. Either is a working channel.
  // No manual scroll: the fallback swap re-renders the block, and
  // visibility assertions auto-scroll and auto-wait anyway.
  const mailto = contact.locator('a[href^="mailto:"]');
  const form = contact.locator('form');
  await expect(mailto.or(form).first()).toBeVisible({ timeout: 15_000 });
});
