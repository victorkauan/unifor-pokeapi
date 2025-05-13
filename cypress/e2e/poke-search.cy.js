// cypress/integration/PokemonSearch.spec.js
import SearchPage from '../support/pages/searchPage'
import { pokemonData, pokemonName } from '../support/data/testData'

describe('Pokémon Search Feature', () => {
  const searchPage = new SearchPage()
  

  beforeEach(() => {
    searchPage.visit()  // Visita a página antes de cada teste
  })

  it('should search and display Pokémon details, then clear search bar', () => {
    
  
    // Realiza a busca por Pokémon e verifica os detalhes
    searchPage.enterSearchTerm(pokemonName.valid)
    searchPage.verifyPokemonDetails(pokemonName.valid)

    // Fecha a modal de detalhes
    searchPage.closeModal()

    // Limpa a barra de pesquisa
    searchPage.clearSearchBar()
  })

  it('Searching for Pokémon with an incorrect name', () => {

    // Realiza a busca por Pokémon e verifica os detalhes
    searchPage.enterSearchTerm(pokemonName.invalid)
    searchPage.verifyPokemonNotFound()
  })

  it('should scroll horizontally to find and display the correct Pokémon card', () => {

    searchPage.scrollToPokemonCard()
    searchPage.verifyPokemonToList()
  })
})

