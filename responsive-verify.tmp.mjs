import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const results = {};

for (const width of [320, 375, 640, 768, 1024]) {
  const page = await browser.newPage({ viewport: { width, height: 800 } });
  await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  results[width] = await page.evaluate(() => {
    const de = document.scrollingElement;
    const vw = window.innerWidth;
    // Elements that overflow the viewport, excluding intentional full-bleed
    // pieces that are clipped by an overflow-hidden ancestor.
    const offenders = [...document.querySelectorAll('main *, nav *, footer *')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0) return false;
        return r.right > vw + 2 || r.left < -2;
      })
      .filter((el) => !el.closest('section')?.querySelector('svg')?.contains(el))
      .slice(0, 4)
      .map((el) => `${el.tagName}.${String(el.className).slice(0, 25)}`);
    const contact = document.querySelector('#contact');
    return {
      hScroll: de.scrollWidth > vw,
      docW: de.scrollWidth,
      vw,
      offenderSample: offenders,
      contactBodyCount: (contact.textContent.match(/everything that lands here|yang masuk saya baca/g) || []).length,
      contactNestedCards: contact.querySelectorAll('[style*="border"]').length,
    };
  });
  await page.close();
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
