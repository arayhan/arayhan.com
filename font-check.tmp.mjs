import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage();
const cssRequests = [];
page.on('response', (r) => {
  if (/fontshare|fonts.googleapis|unpkg/.test(r.url())) cssRequests.push({ url: r.url().slice(0, 90), status: r.status() });
});
await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
const fonts = await page.evaluate(async () => {
  await document.fonts.ready;
  const h1 = document.querySelector('h1');
  const loaded = [...document.fonts].map((f) => f.family + ' ' + f.weight + ' ' + f.status);
  return {
    h1Family: getComputedStyle(h1).fontFamily,
    clashCheck: document.fonts.check('600 24px "Clash Display"'),
    interCheck: document.fonts.check('400 16px "Inter"'),
    monoCheck: document.fonts.check('400 14px "JetBrains Mono"'),
    loadedSample: loaded.slice(0, 12),
  };
});
console.log(JSON.stringify({ cssRequests, fonts }, null, 2));
await browser.close();
