
import { test, expect } from '@playwright/test';

test('should display the correct content and navigate to sign-in', async ({ page }) => {
  // Navigate to the Home page
  // await page.goto('http://localhost:5173/');
  await page.goto('http://client-app:4000/');


  // Verify the heading is present
  const heading = page.locator('h1');
  await expect(heading).toHaveText('Welcome to ShouldAISign!');

  // Refine the paragraph locator to target the correct one
  const paragraph = page.locator('p', { hasText: 'This is a web application that allows you to upload End User Licence Agreements and have them analyzed by AI' });
  await expect(paragraph).toBeVisible();

  // Verify the "Get Started" button is visible
  const getStartedButton = page.locator('a', { hasText: 'Get Started' });
  await expect(getStartedButton).toBeVisible();

  // Verify the button link is correct
  await expect(getStartedButton).toHaveAttribute('href', '/sign-in');

  // Click the "Get Started" button
  await getStartedButton.click();

  // Verify navigation to the sign-in page
  await expect(page).toHaveURL(/\/sign-in/);
});
