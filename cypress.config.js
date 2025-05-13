// cypress.config.js
export default {
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://unifor-pokedex.vercel.app/',  // URL base dos testes
    video: false,  // Desativa a gravação de vídeo dos testes
    browser: 'chrome' //Seta navegador padrão
  },
};
