import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const out = await page.evaluate(() => {
  const vw = window.innerWidth;
  const bad = [...document.querySelectorAll('body *')]
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.right > vw + 2)
    .sort((a, b) => b.r.right - a.r.right)
    .slice(0, 8)
    .map(({ el, r }) => ({
      tag: el.tagName,
      cls: String(el.className).slice(0, 30),
      section: el.closest('section')?.id || el.closest('nav') ? 'nav' : el.closest('footer') ? 'footer' : '?',
      right: Math.round(r.right),
      w: Math.round(r.width),
      text: (el.textContent || '').trim().slice(0, 40),
    }));
  return bad;
});
console.log(JSON.stringify(out, null, 2));
await browser.close();
