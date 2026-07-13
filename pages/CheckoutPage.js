class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async preencherDadosComprador(nome, sobrenome, cep) {
    await this.firstNameInput.fill(nome);
    await this.lastNameInput.fill(sobrenome);
    await this.postalCodeInput.fill(cep);
  }

  async continuarCheckout() {
    await this.continueButton.click();
  }

  async finalizarCompra() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };