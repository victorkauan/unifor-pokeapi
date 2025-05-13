export default defineConfig({
  e2e: {
    baseUrl: 'https://unifor-pokedex.vercel.app',
    video: false, 
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
