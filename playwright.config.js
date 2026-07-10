const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'off',
    video: 'off'
  },
  reporter: [['list']]
});