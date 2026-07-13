const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('SauceDemo - Login', () => {
  test('Deve realizar login com usuário válido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.inventoryList).toBeVisible();

    await page.screenshot({
      path: 'docs/evidencias/playwright/login-valido-saucedemo.png',
      fullPage: true
    });
  });

  test('Deve exibir erro ao tentar login com usuário inválido', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('usuario_invalido', 'senha_invalida');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match'
    );

    await expect(page).not.toHaveURL(/.*inventory.html/);

    await page.screenshot({
      path: 'docs/evidencias/playwright/login-invalido-saucedemo.png',
      fullPage: true
    });
  });

  test('Deve exibir erro ao tentar login com usuário bloqueado', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Sorry, this user has been locked out'
    );

    await expect(page).not.toHaveURL(/.*inventory.html/);

    await page.screenshot({
      path: 'docs/evidencias/playwright/login-usuario-bloqueado-saucedemo.png',
      fullPage: true
    });
  });
});