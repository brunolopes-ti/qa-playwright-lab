const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('SauceDemo - Checkout', () => {
  async function realizarLoginValido(page) {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
  }

  async function adicionarProdutoEAbrirCarrinho(page) {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.adicionarBackpackAoCarrinho();
    await inventoryPage.abrirCarrinho();

    await expect(page).toHaveURL(/.*cart.html/);
  }

  test('Deve realizar checkout completo com sucesso', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await realizarLoginValido(page);
    await adicionarProdutoEAbrirCarrinho(page);

    await cartPage.clicarCheckout();

    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    await expect(checkoutPage.title).toHaveText('Checkout: Your Information');

    await checkoutPage.preencherDadosComprador('Bruno', 'Ramos', '72000-000');
    await checkoutPage.continuarCheckout();

    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(checkoutPage.title).toHaveText('Checkout: Overview');

    await expect(checkoutPage.productName).toHaveText('Sauce Labs Backpack');
    await expect(checkoutPage.productPrice).toHaveText('$29.99');
    await expect(checkoutPage.subtotalLabel).toContainText('Item total: $29.99');

    await checkoutPage.finalizarCompra();

    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(checkoutPage.title).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');

    await page.screenshot({
      path: 'docs/evidencias/playwright/checkout-completo-saucedemo.png',
      fullPage: true
    });
  });
});