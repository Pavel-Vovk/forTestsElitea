import { test, expect } from '@playwright/test';

test('Login and logout validation on the-internet.herokuapp.com', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  await expect(page.getByRole('heading', { name: 'Secure Area' })).toBeVisible();
  await expect(page.getByText('Welcome to the Secure Area. When you are done click logout below.')).toBeVisible();

  await page.screenshot({ path: 'screenshots/secure-area-page.png', fullPage: true });

  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
});

// Test file added for HerokuApp login/logout flow verification.