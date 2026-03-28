/**
 * KeepHomePage
 *
 * Page Object Model (POM) class for the Google Keep home interface.
 * Encapsulates selectors and actions related to the main dashboard:
 *  - Opening the "New Note" field and creating notes
 *  - Checking whether the Keep UI has loaded
 *  - Fetching note content from the dashboard
 *  - Navigating to built-in tabs like Archive and Reminders
 *
 * Using this class helps keep Playwright tests clean and maintainable:
 *  - All Google Keep DOM selectors live in one place
 *  - Reusable helper methods abstract away raw Playwright calls
 *  - Test code can focus on intent (e.g., "create a note") instead of selectors
 
 */


const { test, expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class KeepHomePage {
    constructor(page) {
        this.page = page;
        this.newNoteField = '.IZ65Hb-n0tgWb'; // Selector for the "New Note" input field
        this.noteTitleInput = page.getByRole('textbox', { name: 'Title' }); // Title input field for a note
        this.noteBodyInput = page.getByRole('textbox', { name: 'Note' }).nth(1); // Body input field for a note
        this.reminderButton = page.getByLabel('Reminder'); // Button to add a reminder to a note
    }

    // Checks whether the Google Keep main interface has loaded
    async isKeepLoaded() {
        return await this.page.isVisible(this.newNoteField);
    }

    // Creates a new note with the specified title and body just added
    async createNote(title, body) {
        await this.page.click(this.newNoteField); // Focus the "New Note" input
        await this.noteTitleInput.fill(title); // Fill in the note title
        await this.page.click('body'); // Click outside the note to save it
    }

    // Retrieves the text content of the latest note
    async getLatestNoteText() {
        await this.page.waitForSelector(this.noteCards); // Wait for note cards to appear
        const notes = await this.page.$$(this.noteCards);
        if (notes.length === 0) return null; // Return null if no notes exist
        const text = await notes[0].textContent();
        return text.trim(); // Return trimmed text of the latest note
    }

    // Navigates to the Archive tab in Google Keep
    async goToArchive() {
        await this.page.goto('https://keep.google.com/u/0/#archive', { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector('text=Archive', { timeout: 60000 }); // Wait for the Archive page to load
    }

    // Navigates to the Reminders tab in Google Keep
    async goToReminders() {
        await this.page.getByRole('tab', { name: 'Reminders' }).click(); // Click the Reminders tab
        await expect(this.page).toHaveURL(/#reminders/); // Confirm URL reflects Reminders view
        await expect(this.page.getByText('Switched to Reminders view')).toBeVisible({ timeout: 60000 }); // Confirm Reminders view loaded
    }

}
module.exports = KeepHomePage;
