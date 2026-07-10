const { test, expect } = require('@playwright/test');

test.describe('SauceDemo - Checkout', () => {
  async function realizarLoginValido(page) {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/.*inventory.html/);
  }

  async function adicionarProdutoEAbrirCarrinho(page) {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/.*cart.html/);
  }

  test('Deve realizar checkout completo com sucesso', async ({ page }) => {
    await realizarLoginValido(page);
    await adicionarProdutoEAbrirCarrinho(page);

    await page.locator('[data-test="checkout"]').click();

    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');

    await page.locator('[data-test="firstName"]').fill('Bruno');
    await page.locator('[data-test="lastName"]').fill('Ramos');
    await page.locator('[data-test="postalCode"]').fill('72000-000');

    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');

    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
    await expect(page.locator('[data-test="subtotal-label"]')).toContainText('Item total: $29.99');

    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

    await page.screenshot({
      path: 'docs/evidencias/playwright/checkout-completo-saucedemo.png',
      fullPage: true
    });
  });
});