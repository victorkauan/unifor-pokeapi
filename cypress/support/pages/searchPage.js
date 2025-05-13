// cypress/support/pages/searchPage.js
class SearchPage {
    visit() {
      cy.visit('https://unifor-pokedex.vercel.app/') // Acessa a página
    }
  
    enterSearchTerm(term) {
      cy.get('.search-bar')
        .clear()                     // Limpa a barra de busca
        .type(`${term}{enter}`)      // Digita o nome e pressiona Enter
    }
  
    verifyPokemonDetails(pokemonName) {
      cy.get('.detail').click()       // Clica no Pokémon
      cy.contains(pokemonName)        // Verifica se o nome aparece nos detalhes
    }
  
    closeModal() {
      cy.get('.modal-close').click()  // Fecha a modal
      cy.get('.modal').should('not.exist') // Verifica que a modal foi fechada
    }
  
    clearSearchBar() {
      cy.get('.search-bar')
        .clear()                     // Limpa a barra de pesquisa
        .type('{enter}')             // Pressiona Enter
    }
  }
  
  export default SearchPage
  