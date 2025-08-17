 /**
 * BasePage.js
 *
 * Generic Page Object Model (POM) base class.
 * Provides reusable browser interaction methods shared across all page objects.
 */

class BasePage {
    /**
     * Initializes the BasePage with a Playwright Page instance.
     *
     * @param {import('@playwright/test').Page} page - Playwright Page object
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigates to a given URL and waits for network activity to be idle.
     *
     * @param {string} url - The URL to navigate to
     */
    async navigateTo(url) {
        await this.page.goto(url, { waitUntil: 'networkidle' });
    }

    /**
     * Clicks an element matching the given selector.
     *
     * @param {string} selector - CSS/XPath selector for the target element
     */
    async click(selector) {
        await this.page.click(selector);
    }

    /**
     * Types text into the element matching the given selector.
     *
     * @param {string} selector - CSS/XPath selector for the input field
     * @param {string} text - The text to type into the input
     */
    async type(selector, text) {
        await this.page.fill(selector, text);
    }

    /**
     * Retrieves the text content of an element.
     *
     * @param {string} selector - CSS/XPath selector for the element
     * @returns {Promise<string|null>} The text content of the element, or null if not found
     */
    async getText(selector) {
        return await this.page.textContent(selector);
    }
}

module.exports = BasePage;
