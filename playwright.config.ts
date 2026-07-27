import { defineConfig } from '@playwright/test';

// Dedicated port, not 3000 — reuseExistingServer + a shared machine means
// another project's dev server on 3000 can silently "satisfy" the health
// check and every test then runs against the wrong app.
const PORT = 3100;

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  webServer: {
    command: 'pnpm dev',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 120_000,
    env: { PORT: String(PORT) },
  },
});
