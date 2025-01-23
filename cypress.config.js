const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  defaultCommandTimeout: 25000,
  e2e: {
    experimentalOriginDependencies: true,
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    env: {
      url: "https://pricelabs.co/signin",
      appUrl: "https://app.pricelabs.co",
      username: "qa.pricelabs@gmail.com",
      password: "qg33N$yxJP"
    }
  },
});
