/**
 * Non-Functional Test: Google Keep Login Performance
 *
 * This Playwright test measures performance-related aspects of Google Keep login,
 * focusing on response times rather than functional correctness.
 *
 * Key Checks:
 *  - Page load time for the Google Keep login page (should load under 5s)
 *  - Login completion time with valid credentials (should complete under 7s)
 *  - Captures a full-page screenshot for debugging
 *  - Waits for the DOM to reach 'domcontentloaded' state before finishing
 *
 * Requirements:
 *  - GOOGLE_USERNAME and GOOGLE_PASSWORD must be set in a `.env` file
 *  - Uses dotenv for secure environment variable management
 *  - Uses Allure for reporting (import is present, usage can be extended)
 *
 * Purpose:
 *  This test is designed to validate **non-functional aspects** of the system,
 *  ensuring Google Keep login meets defined performance thresholds. It supplements
 *  functional tests by catching slowdowns and regressions in login responsiveness.
 */



// tests/nonFunctional_Test.spec.js
require('dotenv').config();
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');


import { allure } from 'allure-playwright';

test('Google Keep non-functional test: login performance', async ({ page }) => {
    const username = process.env.GOOGLE_USERNAME;
    const password = process.env.GOOGLE_PASSWORD;

    if (!username || !password) {
        throw new Error('Missing GOOGLE_USERNAME or GOOGLE_PASSWORD in environment variables');
    }

    const loginPage = new LoginPage(page);

    // Measure page load time for login page
    const loginPageStart = Date.now();
    await loginPage.navigateTo('https://keep.google.com/');
    const loginPageLoadTime = Date.now() - loginPageStart;
    console.log(`Login page loaded in ${loginPageLoadTime} ms`);
    expect(loginPageLoadTime).toBeLessThan(5000); // Example threshold

    // Measure time to login
    const loginStart = Date.now();
    await loginPage.login(username, password);
    const loginDuration = Date.now() - loginStart;
    console.log(`Login completed in ${loginDuration} ms`);

    // Assert login completes within threshold
    expect(loginDuration).toBeLessThan(7000);

   // Capture a full-page screenshot for debugging purposes
   await page.screenshot({ path: 'debug.png', fullPage: true });

  // Wait until the page DOM is fully loaded before interacting with elements
  await page.waitForLoadState('domcontentloaded');


});
