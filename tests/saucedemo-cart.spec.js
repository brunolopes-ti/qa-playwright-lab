const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');

test.describe('SauceDemo - Carrinho', () => {
  async function realizarLoginValido(page) {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
  }

  test('Deve adicionar um produto ao carrinho', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await realizarLoginValido(page);
    await inventoryPage.adicionarBackpackAoCarrinho();

    await expect(inventoryPage.cartBadge).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(inventoryPage.removeBackpackButton).toBeVisible();

    await page.screenshot({
      path: 'docs/evidencias/playwright/produto-adicionado-carrinho-saucedemo.png',
      fullPage: true
    });
  });

  test('Deve validar produto adicionado na página do carrinho', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await realizarLoginValido(page);
    await inventoryPage.adicionarBackpackAoCarrinho();
    await inventoryPage.abrirCarrinho();

    await expect(page).toHaveURL(/.*cart.html/);
    await expect(cartPage.title).toHaveText('Your Cart');

    await expect(cartPage.productName).toBeVisible();
    await expect(cartPage.productName).toHaveText('Sauce Labs Backpack');

    await expect(cartPage.productPrice).toBeVisible();
    await expect(cartPage.productPrice).toHaveText('$29.99');

    await expect(cartPage.checkoutButton).toBeVisible();

    await page.screenshot({
      path: 'docs/evidencias/playwright/validacao-carrinho-saucedemo.png',
      fullPage: true
    });
  });
});