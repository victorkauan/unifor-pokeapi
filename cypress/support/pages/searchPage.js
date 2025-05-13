import { pokemonName } from "../data/testData"

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

    verifyPokemonNotFound(){
      cy.contains('div.pokemon-card.erro', 'Erro: Pokémon não existe!') //Encontra o texto "Pokemon Não Existe"
        .should('be.visible')       // Verifica se está Visivel
    }

    scrollToPokemonCard(){
       
      cy.get('.horizontal-list') //Rola a barra de Scrooll
      cy.wait(5000) //Aguarda o tempo da API carregar
        .contains('.pokemon-card.compact h2', pokemonName.searchInList) //Encontra o Pokemon de nome informado
        .scrollIntoView({ block: 'center', inline: 'center' }) // rola horizontalmente até o card
        .should('be.visible') //Verifica se está visivel 
    }

    verifyPokemonToList(){
    cy.contains('h2', pokemonName.searchInList).should('exist');
    }
  }
  
  export default SearchPage
  