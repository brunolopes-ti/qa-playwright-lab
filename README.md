# QA Playwright Lab

![Playwright Tests](https://github.com/brunolopes-ti/qa-playwright-lab/actions/workflows/playwright.yml/badge.svg)

Projeto de portfólio criado para praticar, organizar e documentar testes automatizados end-to-end com Playwright e JavaScript.

O objetivo deste projeto é demonstrar uma suíte de automação web cobrindo fluxos reais de uma aplicação de e-commerce de treino, com validações, evidências, execução completa via terminal, execução automatizada com GitHub Actions e organização dos testes com Page Object Model.

---

## Tecnologias utilizadas

- Playwright
- JavaScript
- Node.js
- Playwright Test Runner
- Page Object Model
- GitHub Actions
- SauceDemo
- Git
- GitHub
- Markdown

---

## Sistema utilizado para teste

Aplicação: [SauceDemo](https://www.saucedemo.com/)

O SauceDemo é uma aplicação web utilizada para estudos de QA, permitindo praticar fluxos como login, carrinho e checkout.

---

## Escopo da automação

A suíte automatizada cobre os seguintes fluxos:

- Login com usuário válido;
- Login com usuário inválido;
- Login com usuário bloqueado;
- Adição de produto ao carrinho;
- Validação de produto no carrinho;
- Checkout completo;
- Execução da suíte completa via terminal;
- Execução automatizada via GitHub Actions;
- Organização dos testes com Page Object Model.

---

## Estrutura do projeto

```text
qa-playwright-lab
├── .github
│   └── workflows
│       └── playwright.yml
├── docs
│   └── evidencias
│       └── playwright
│           ├── login-valido-teste-passando.png
│           ├── login-valido-saucedemo.png
│           ├── login-invalido-teste-passando.png
│           ├── login-invalido-saucedemo.png
│           ├── login-usuario-bloqueado-teste-passando.png
│           ├── login-usuario-bloqueado-saucedemo.png
│           ├── produto-adicionado-carrinho-teste-passando.png
│           ├── produto-adicionado-carrinho-saucedemo.png
│           ├── validacao-carrinho-teste-passando.png
│           ├── validacao-carrinho-saucedemo.png
│           ├── checkout-completo-teste-passando.png
│           ├── checkout-completo-saucedemo.png
│           ├── suite-completa-playwright-passando.png
│           ├── suite-completa-playwright-pom-passando.png
│           └── github-actions-playwright-passando.png
├── pages
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── tests
│   ├── saucedemo-login.spec.js
│   ├── saucedemo-cart.spec.js
│   └── saucedemo-checkout.spec.js
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

---

## Como executar o projeto

Instale as dependências, caso necessário:

```bash
npm install
```

Execute toda a suíte de testes:

```bash
npx playwright test --headed
```

Execute um arquivo específico:

```bash
npx playwright test tests/saucedemo-login.spec.js --headed
```

```bash
npx playwright test tests/saucedemo-cart.spec.js --headed
```

```bash
npx playwright test tests/saucedemo-checkout.spec.js --headed
```

---

## Execução automatizada com GitHub Actions

Este projeto possui pipeline configurado com GitHub Actions para execução automática da suíte Playwright.

O workflow é acionado automaticamente em eventos de `push` e `pull_request` na branch `main`.

Etapas executadas no pipeline:

- Checkout do repositório;
- Configuração do Node.js;
- Instalação das dependências com `npm ci`;
- Instalação do navegador Chromium utilizado pelo Playwright;
- Execução da suíte automatizada com `npx playwright test`;
- Geração e disponibilização do relatório HTML do Playwright como artifact.

Arquivo de configuração:

```text
.github/workflows/playwright.yml
```

Evidência da execução no GitHub Actions:

```text
docs/evidencias/playwright/github-actions-playwright-passando.png
```

![GitHub Actions Playwright passando](docs/evidencias/playwright/github-actions-playwright-passando.png)

---

## Page Object Model

O projeto foi refatorado utilizando o padrão Page Object Model, separando a lógica das páginas da lógica dos testes.

Essa abordagem melhora a organização, manutenção e reutilização do código, deixando os testes mais limpos e próximos de uma estrutura utilizada em projetos reais de automação.

### Classes criadas

```text
pages/LoginPage.js
pages/InventoryPage.js
pages/CartPage.js
pages/CheckoutPage.js
```

### Responsabilidades

**LoginPage**

- Acessar a aplicação;
- Preencher usuário;
- Preencher senha;
- Clicar no botão de login;
- Centralizar o fluxo de autenticação.

**InventoryPage**

- Validar elementos da página de produtos;
- Adicionar produto ao carrinho;
- Abrir o carrinho;
- Validar contador do carrinho.

**CartPage**

- Validar produto no carrinho;
- Validar preço;
- Validar botão de checkout;
- Avançar para o checkout.

**CheckoutPage**

- Preencher dados do comprador;
- Avançar para a tela de resumo;
- Validar produto, preço e subtotal;
- Finalizar a compra;
- Validar mensagem de pedido concluído.

---

## Arquivos de teste

### Login

Arquivo:

```text
tests/saucedemo-login.spec.js
```

Cenários cobertos:

- Login válido;
- Login inválido;
- Login com usuário bloqueado.

### Carrinho

Arquivo:

```text
tests/saucedemo-cart.spec.js
```

Cenários cobertos:

- Adicionar produto ao carrinho;
- Validar produto, preço e botão de checkout na página do carrinho.

### Checkout

Arquivo:

```text
tests/saucedemo-checkout.spec.js
```

Cenário coberto:

- Realizar checkout completo com sucesso.

---

## Cenários automatizados

### CT-01 - Login válido

**Objetivo:** validar que um usuário com credenciais corretas consegue acessar a página de produtos.

**Dados utilizados:**

| Campo | Valor |
|---|---|
| Usuário | `standard_user` |
| Senha | `secret_sauce` |

**Validações realizadas:**

- Redirecionamento para `/inventory.html`;
- Exibição do título `Products`;
- Exibição da lista de produtos.

**Evidências:**

```text
docs/evidencias/playwright/login-valido-teste-passando.png
docs/evidencias/playwright/login-valido-saucedemo.png
```

---

### CT-02 - Login inválido

**Objetivo:** validar que o sistema exibe mensagem de erro ao tentar login com credenciais inválidas.

**Dados utilizados:**

| Campo | Valor |
|---|---|
| Usuário | `usuario_invalido` |
| Senha | `senha_invalida` |

**Validações realizadas:**

- Exibição da mensagem de erro;
- Permanência do usuário na tela de login.

**Evidências:**

```text
docs/evidencias/playwright/login-invalido-teste-passando.png
docs/evidencias/playwright/login-invalido-saucedemo.png
```

---

### CT-03 - Login com usuário bloqueado

**Objetivo:** validar que o sistema bloqueia o acesso de um usuário impedido de realizar login.

**Dados utilizados:**

| Campo | Valor |
|---|---|
| Usuário | `locked_out_user` |
| Senha | `secret_sauce` |

**Validações realizadas:**

- Exibição da mensagem de usuário bloqueado;
- Permanência do usuário na tela de login.

**Evidências:**

```text
docs/evidencias/playwright/login-usuario-bloqueado-teste-passando.png
docs/evidencias/playwright/login-usuario-bloqueado-saucedemo.png
```

---

### CT-04 - Adicionar produto ao carrinho

**Objetivo:** validar que um produto pode ser adicionado ao carrinho com sucesso.

**Produto utilizado:**

| Produto | Valor |
|---|---|
| Sauce Labs Backpack | `$29.99` |

**Validações realizadas:**

- Clique no botão `Add to cart`;
- Exibição do contador do carrinho com valor `1`;
- Alteração do botão para `Remove`.

**Evidências:**

```text
docs/evidencias/playwright/produto-adicionado-carrinho-teste-passando.png
docs/evidencias/playwright/produto-adicionado-carrinho-saucedemo.png
```

---

### CT-05 - Validar produto na página do carrinho

**Objetivo:** validar que o produto adicionado aparece corretamente na página do carrinho.

**Validações realizadas:**

- Redirecionamento para `/cart.html`;
- Exibição do título `Your Cart`;
- Exibição do produto `Sauce Labs Backpack`;
- Exibição do preço `$29.99`;
- Exibição do botão `Checkout`.

**Evidências:**

```text
docs/evidencias/playwright/validacao-carrinho-teste-passando.png
docs/evidencias/playwright/validacao-carrinho-saucedemo.png
```

---

### CT-06 - Checkout completo

**Objetivo:** validar o fluxo completo de compra, desde o carrinho até a finalização do pedido.

**Dados utilizados:**

| Campo | Valor |
|---|---|
| Nome | `Bruno` |
| Sobrenome | `Ramos` |
| CEP | `72000-000` |

**Validações realizadas:**

- Acesso à etapa de informações do checkout;
- Preenchimento dos dados do comprador;
- Acesso à tela de resumo da compra;
- Validação do produto no resumo;
- Validação do preço;
- Finalização da compra;
- Exibição da mensagem `Thank you for your order!`.

**Evidências:**

```text
docs/evidencias/playwright/checkout-completo-teste-passando.png
docs/evidencias/playwright/checkout-completo-saucedemo.png
```

---

## Resultado da suíte completa

A suíte foi executada via terminal com o comando:

```bash
npx playwright test --headed
```

Resultado obtido:

```text
saucedemo-login.spec.js       3 testes passando
saucedemo-cart.spec.js        2 testes passando
saucedemo-checkout.spec.js    1 teste passando

Total: 6 testes passando
```

**Evidência da execução completa:**

```text
docs/evidencias/playwright/suite-completa-playwright-passando.png
```

![Suíte completa Playwright passando](docs/evidencias/playwright/suite-completa-playwright-passando.png)

**Evidência da execução completa após aplicação do Page Object Model:**

```text
docs/evidencias/playwright/suite-completa-playwright-pom-passando.png
```

![Suíte completa Playwright com Page Object Model](docs/evidencias/playwright/suite-completa-playwright-pom-passando.png)

---

## Evidências visuais

### Login válido

![Login válido passando](docs/evidencias/playwright/login-valido-teste-passando.png)

![Página de produtos após login válido](docs/evidencias/playwright/login-valido-saucedemo.png)

### Login inválido

![Login inválido passando](docs/evidencias/playwright/login-invalido-teste-passando.png)

![Mensagem de erro no login inválido](docs/evidencias/playwright/login-invalido-saucedemo.png)

### Usuário bloqueado

![Usuário bloqueado passando](docs/evidencias/playwright/login-usuario-bloqueado-teste-passando.png)

![Mensagem de usuário bloqueado](docs/evidencias/playwright/login-usuario-bloqueado-saucedemo.png)

### Carrinho

![Produto adicionado ao carrinho passando](docs/evidencias/playwright/produto-adicionado-carrinho-teste-passando.png)

![Produto adicionado ao carrinho](docs/evidencias/playwright/produto-adicionado-carrinho-saucedemo.png)

![Validação do carrinho passando](docs/evidencias/playwright/validacao-carrinho-teste-passando.png)

![Produto validado na página do carrinho](docs/evidencias/playwright/validacao-carrinho-saucedemo.png)

### Checkout

![Checkout completo passando](docs/evidencias/playwright/checkout-completo-teste-passando.png)

![Checkout finalizado com sucesso](docs/evidencias/playwright/checkout-completo-saucedemo.png)

---

## Configuração do Playwright

Arquivo:

```text
playwright.config.js
```

Configuração utilizada:

```javascript
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    browserName: 'chromium',
    headless: process.env.CI ? true : false,
    screenshot: 'off',
    video: 'off'
  },
  reporter: process.env.CI ? [['html'], ['list']] : [['list']]
});
```

---

## GitHub Actions

Arquivo:

```text
.github/workflows/playwright.yml
```

Workflow configurado:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    name: Run Playwright Tests
    runs-on: ubuntu-latest
    timeout-minutes: 60

    steps:
      - name: Checkout repository
        uses: actions/checkout@v5

      - name: Setup Node.js
        uses: actions/setup-node@v5
        with:
          node-version: lts/*

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload Playwright report
        if: ${{ !cancelled() }}
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## Boas práticas aplicadas

- Separação dos testes por fluxo funcional;
- Uso de seletores estáveis com `data-test`;
- Validações de URL, textos, elementos visíveis e fluxo de navegação;
- Uso de `async/await`;
- Uso de assertions nativas do Playwright com `expect`;
- Aplicação do padrão Page Object Model para separação entre lógica de páginas e cenários de teste;
- Criação de classes reutilizáveis para Login, Inventário, Carrinho e Checkout;
- Geração de evidências com screenshot;
- Organização das evidências em pasta específica para documentação;
- Execução da suíte completa via terminal;
- Execução automatizada com GitHub Actions;
- Geração de relatório HTML no pipeline;
- Controle de arquivos temporários com `.gitignore`.

---

## Observações

As evidências geradas pelos testes foram salvas na pasta:

```text
docs/evidencias/playwright
```

As pastas `node_modules`, `test-results` e `playwright-report` foram adicionadas ao `.gitignore`, evitando versionar dependências e arquivos temporários gerados durante a execução local.

---

## Status do projeto

Concluído nesta etapa.

Suíte automatizada Playwright criada, organizada, executada, documentada, integrada com GitHub Actions e refatorada com Page Object Model.

---

## Próximas melhorias possíveis

- Criar comandos auxiliares reutilizáveis;
- Utilizar massa de dados externa;
- Adicionar testes negativos no checkout;
- Expandir execução em múltiplos navegadores;
- Gerar relatórios adicionais;
- Comparar a implementação com Cypress e Selenium WebDriver.