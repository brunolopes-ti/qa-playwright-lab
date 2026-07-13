class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async acessar() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async preencherUsuario(usuario) {
    await this.usernameInput.fill(usuario);
  }

  async preencherSenha(senha) {
    await this.passwordInput.fill(senha);
  }

  async clicarLogin() {
    await this.loginButton.click();
  }

  async login(usuario, senha) {
    await this.acessar();
    await this.preencherUsuario(usuario);
    await this.preencherSenha(senha);
    await this.clicarLogin();
  }
}

module.exports = { LoginPage };