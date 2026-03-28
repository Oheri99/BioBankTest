// playwright.config.js
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),

  // 👇 Retry logic explained:
  // 1. If RETRIES is set in environment variables, that value is always used.
  // 2. Otherwise, if we are running in CI (process.env.CI is truthy),
  //    use 2 retries to reduce flaky failures in pipelines.
  // 3. If neither is set (local/dev run), default to 0 retries for faster feedback
  retries: Number(process.env.RETRIES) || (process.env.CI ? 3 : 0),

  workers: process.env.CI ? 1 : undefined,
  // reporter: 'html',
  reporter: [
    ['list'],['allure-playwright'],
  ],

  use: {
    headless: process.env.HEADLESS === 'true',
    viewport: {
      width: Number(process.env.VIEWPORT_WIDTH) || 1280,
      height: Number(process.env.VIEWPORT_HEIGHT) || 720,
    },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Uncomment if you need to run a local dev server
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
