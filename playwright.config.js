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