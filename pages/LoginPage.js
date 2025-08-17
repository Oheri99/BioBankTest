/**
 * LoginPage.js
 *
 * Page Object Model (POM) for handling Google login workflow.
 * Uses Playwright's Locator API (`getByRole`, etc.) for robust element targeting.
 * Provides reusable methods for login actions and common interactions.
 */

class LoginPage {
    /**
     * Constructor initializes locators for login page elements.
     * Using `getByRole` makes locators more resilient to UI changes
     * and aligns with accessibility-first best practices.
     *
     * @param {import('@playwright/test').Page} page - Playwright Page instance
     */
    constructor(page) {
        this.page = page;

        // Locators for login workflow
        this.emailInput = page.getByRole('textbox', { name: /email/i });       // Email input field
        this.emailNextBtn = page.getByRole('button', { name: /next/i });       // "Next" button after entering email
        this.passwordInput = page.getByRole('textbox', { name: /password/i }); // Password input field
        this.passwordNextBtn = page.getByRole('button', { name: /next/i });    // "Next" button after entering password
    }

    /**
     * Types a value into the given input field.
     * Accepts a Playwright Locator instead of raw CSS.
     *
     * @param {import('@playwright/test').Locator} selector - Locator for the input field
     * @param {string} value - Text to input
     */
    async type(selector, value) {
        if (typeof value !== 'string') {
            throw new Error(`Cannot fill selector with non-string value: ${value}`);
        }
        await selector.fill(value);
    }

    /**
     * Clicks the given element.
     * Accepts a Playwright Locator for improved reliability.
     *
     * @param {import('@playwright/test').Locator} selector - Locator for the element
     */
    async click(selector) {
        await selector.click();
    }

    /**
     * Navigates to a specified URL and waits until network activity is idle.
     *
     * @param {string} url - Target URL
     */
    async navigateTo(url) {
        await this.page.goto(url, { waitUntil: 'networkidle' });
    }

    /**
     * Performs the login sequence using provided credentials.
     * Waits for transitions and ensures fields are interactable.
     *
     * @param {string} username - Google account username/email
     * @param {string} password - Google account password
     */
    async login(username, password) {
        // Step 1: Enter email and proceed
        await this.type(this.emailInput, username);
        await Promise.all([
            this.click(this.emailNextBtn),
            this.page.waitForNavigation({ waitUntil: 'networkidle' })
        ]);

        // Step 2: Enter password and proceed
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.type(this.passwordInput, password);
        await this.click(this.passwordNextBtn);

        // Step 3: Verify login success (wait for a known element on Keep homepage)
        this.takeNoteButton = this.page.getByRole('combobox').nth(1);
        await this.takeNoteButton.waitFor({ timeout: 60000 });
    }
}

module.exports = LoginPage;
