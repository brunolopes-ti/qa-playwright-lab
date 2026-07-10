const { test, expect } = require('@playwright/test');

test.describe('SauceDemo - Carrinho', () => {
  async function realizarLoginValido(page) {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/.*inventory.html/);
  }

  test('Deve adicionar um produto ao carrinho', async ({ page }) => {
    await realizarLoginValido(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

    await page.screenshot({
      path: 'docs/evidencias/playwright/produto-adicionado-carrinho-saucedemo.png',
      fullPage: true
    });
  });

  test('Deve validar produto adicionado na página do carrinho', async ({ page }) => {
    await realizarLoginValido(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('.title')).toHaveText('Your Cart');

    await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

    await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');

    await expect(page.locator('[data-test="checkout"]')).toBeVisible();

    await page.screenshot({
      path: 'docs/evidencias/playwright/validacao-carrinho-saucedemo.png',
      fullPage: true
    });
  });
});