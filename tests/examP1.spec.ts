import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.nba.com/');
  await page.getByRole('button', { name: 'I Accept' }).click();
  await page.getByRole('link', { name: '12:00 AM GMT 76ers Logo 76ers' }).click();
  await expect(page.locator('[id="__next"]')).toMatchAriaSnapshot(`- text: League Pass`);
  await page.getByRole('link', { name: 'News' }).click();
  await expect(page.getByRole('main')).toContainText('Power Rankings: Celtics return to Top 5');
  await expect(page.getByRole('main')).toContainText('Power Rankings: Celtics return to Top 5');
});