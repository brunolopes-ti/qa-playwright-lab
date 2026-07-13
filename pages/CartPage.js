class CartPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async clicarCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };