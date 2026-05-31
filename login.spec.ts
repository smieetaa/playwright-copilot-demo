import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Login tests — generated with GitHub Copilot
 *
 * Copilot Chat prompt used (shown in video SS#3):
 * "Write a Playwright test in TypeScript that navigates to a login page,
 *  enters an email and password, clicks the login button, and asserts that
 *  the dashboard heading is visible. Use page object model structure."
 *
 * Site used: https://the-internet.herokuapp.com/login
 * Valid credentials: tomsmith / SuperSecretPassword!
 */

test.describe('Login page', () => {

  test('successful login shows secure area heading', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    // Assert we landed on the secure area
    await expect(page).toHaveURL(/secure/);
    await expect(page.getByRole('heading', { name: 'Secure Area' })).toBeVisible();
  });

  test('invalid password shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('tomsmith', 'wrongpassword');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Your password is invalid');
  });

  test('invalid username shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('wronguser', 'SuperSecretPassword!');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Your username is invalid');
  });

  test('empty credentials shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();
  });

});
