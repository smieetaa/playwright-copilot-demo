import { test, expect } from '@playwright/test';

/**
 * Checkout / cart tests
 *
 * These tests demonstrate GitHub Copilot INLINE AUTOCOMPLETE (SS#5 in video).
 * The comment below was typed into VS Code — Copilot suggested the full
 * test body as ghost text. Tab was pressed to accept.
 *
 * Try it yourself: type the comment, press Enter, wait 2 seconds.
 */

test.describe('Shopping cart', () => {

  // test that the checkout button is disabled when the cart is empty
  test('checkout button is disabled when cart is empty', async ({ page }) => {
    await page.goto('/');

    // Using the-internet.herokuapp.com which doesn't have a cart,
    // so we simulate with the checkboxes page as a visual stand-in
    await page.goto('/checkboxes');

    const checkbox = page.locator('input[type="checkbox"]').first();
    await expect(checkbox).toBeVisible();

    // Demonstrates Copilot reading page context and suggesting assertions
    const checkboxes = page.locator('input[type="checkbox"]');
    await expect(checkboxes).toHaveCount(2);
  });

  // test that removing all items from cart updates the total to zero
  test('cart total updates when items are removed', async ({ page }) => {
    await page.goto('/checkboxes');

    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();

    // Uncheck all checkboxes (simulating cart item removal)
    for (let i = 0; i < count; i++) {
      const checkbox = checkboxes.nth(i);
      if (await checkbox.isChecked()) {
        await checkbox.uncheck();
      }
    }

    // Assert none are checked (simulating empty cart)
    for (let i = 0; i < count; i++) {
      await expect(checkboxes.nth(i)).not.toBeChecked();
    }
  });

});
