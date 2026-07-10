const { test, expect } = require('@playwright/test');

test.describe('SauceDemo - Login', () => {
  test('Deve realizar login com usuário válido', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.inventory_list')).toBeVisible();

    await page.screenshot({
      path: 'docs/evidencias/playwright/login-valido-saucedemo.png',
      fullPage: true
    });
  });

  test('Deve exibir erro ao tentar login com usuário inválido', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('usuario_invalido');
    await page.locator('[data-test="password"]').fill('senha_invalida');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match'
    );

    await expect(page).not.toHaveURL(/.*inventory.html/);

    await page.screenshot({
      path: 'docs/evidencias/playwright/login-invalido-saucedemo.png',
      fullPage: true
    });
  });

  test('Deve exibir erro ao tentar login com usuário bloqueado', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Sorry, this user has been locked out'
    );

    await expect(page).not.toHaveURL(/.*inventory.html/);

    await page.screenshot({
      path: 'docs/evidencias/playwright/login-usuario-bloqueado-saucedemo.png',
      fullPage: true
    });
  });
});