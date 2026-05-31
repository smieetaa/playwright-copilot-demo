import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * BROKEN TEST — for video demo of SS#9 (Copilot fixing a failing test)
 *
 * This file intentionally contains a broken selector to demonstrate
 * the "Copilot fixes failing test" workflow shown in Section 4 of the video.
 *
 * STEP 1: Run this test — it will fail with a timeout error
 *   npx playwright test tests/login.broken.spec.ts
 *
 * STEP 2: Copy the error from the terminal
 *
 * STEP 3: Open Copilot Chat and paste this prompt:
 *   "This Playwright test is failing with the following error.
 *    Identify what is wrong and provide the corrected code with
 *    an explanation of the fix:
 *    [paste terminal error here]"
 *
 * STEP 4: Copilot will identify the typo in the selector and fix it.
 *         Screenshot that moment — it's SS#9.
 *
 * THE BUG: 'Dashbord' is misspelled (missing 'a') — Copilot will catch this.
 */

test('broken — login success shows dashboard (intentional typo in selector)', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');

  // BUG IS HERE: 'Dashbord' is misspelled — should be 'Secure Area'
  // Copilot will identify and fix this when you paste the error
  await expect(page.getByRole('heading', { name: 'Dashbord' })).toBeVisible();
});
