// cypress/integration/PokemonSearch.spec.js
import SearchPage from '../support/pages/searchPage'

describe('Pokémon Search Feature', () => {
  const searchPage = new SearchPage()
  const pokemonName = 'Bulbasaur'

  beforeEach(() => {
    searchPage.visit()  // Visita a página antes de cada teste
  })

  it('should search and display Pokémon details, then clear search bar', () => {
    // Realiza a busca por Pokémon e verifica os detalhes
    searchPage.enterSearchTerm(pokemonName)
    searchPage.verifyPokemonDetails(pokemonName)

    // Fecha a modal de detalhes
    searchPage.closeModal()

    // Limpa a barra de pesquisa
    searchPage.clearSearchBar()
  })
})
