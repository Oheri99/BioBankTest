/**
 * Google Keep E2E Tests with Playwright
 *
 * This test suite automates end-to-end scenarios for Google Keep using Playwright.
 * It demonstrates the Page Object Model (POM) approach by separating page logic
 * into dedicated classes (e.g., LoginPage, KeepHomePage).
 *
 * Features:
 *  - Loads environment variables via dotenv for secure credentials
 *  - Logs into Google Keep before each test (using a global beforeEach hook)
 *  - Captures full-page screenshots automatically on failure (afterEach hook)
 *  - Includes basic functional tests:
 *      * Verify login to Google Keep
 *      * Create a new note with title + body
 *      * Navigate to Archive tab
 *      * Navigate to Reminders tab
 *
 * Usage:
 *  1. Define GOOGLE_USERNAME and GOOGLE_PASSWORD in your `.env` file
 *  2. Run tests with: `npx playwright test`
 *  3. Screenshots from failed tests are stored in /screenshots
 *
 */



require('dotenv').config();
const { test, expect } = require('@playwright/test'); 
const LoginPage = require('../pages/LoginPage');
const KeepHomePage = require('../pages/KeepHomePage');

// Helper function to get credentials
function getCredentials() {
  const username = process.env.GOOGLE_USERNAME;
  const password = process.env.GOOGLE_PASSWORD;
  if (!username || !password) {
    throw new Error('Missing GOOGLE_USERNAME or GOOGLE_PASSWORD in environment variables');
  }
  return { username, password };
}

// Helper function to perform login
async function loginToKeep(page) {
  const { username, password } = getCredentials();
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('https://keep.google.com/');
  await loginPage.login(username, password);
}

// Global beforeEach hook for automatic login
test.beforeEach(async ({ page }) => {
  await loginToKeep(page);
});

// Global afterEach hook for screenshots on failure
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    // Capture full-page screenshot
    const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    
    // Attach screenshot to Allure report
    // allure.attachment('Screenshot on Failure', await page.screenshot({ path: screenshotPath, fullPage: true }), 'image/png');
  }
});

test('Login to Google Keep', async ({ page }) => {
  const keepPage = new KeepHomePage(page);
  await expect(page).toHaveURL('https://keep.google.com');
});

test('Create a new note', async ({ page }) => {
  const keepPage = new KeepHomePage(page);
  const title = 'Playwright Note';
  const body = 'This is a note created by automation';

  await keepPage.createNote(title, body);
  await expect(page.getByText(title).first()).toBeVisible();
});

test('Access Archive in Google Keep', async ({ page }) => {
  const keepPage = new KeepHomePage(page);
  await keepPage.goToArchive();
  await expect(page).toHaveURL(/#archive/);
});

test('Access Reminders in Google Keep', async ({ page }) => {
  const keepPage = new KeepHomePage(page);
  await keepPage.goToReminders();
  await expect(page).toHaveURL(/#reminders/);
});
