import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:4334',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Uses a dedicated port to avoid conflicts with the dev server (4321)
  // Requires a prior `astro build` — handled by the test:e2e npm script
  webServer: {
    command: 'npm run preview -- --port 4334',
    url: 'http://localhost:4334',
    reuseExistingServer: !process.env.CI,
  },
});
