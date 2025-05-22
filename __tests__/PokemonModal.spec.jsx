import "@testing-library/jest-dom";
import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import PokemonModal from "../src/components/PokemonModal";

describe("PokemonModal", () => {
  const pokemonWithoutDescription = {
    id: 25,
    name: 'Pikachu',
    types: [
      {
        type: {
          name: 'electric'
        }
      }
    ],
    height: 4,
    weight: 60,
    sprites: {
      other: {
        home: {
          front_default: 'front-default.png',
          front_shiny: 'front-shiny.png'
        }
      }
    },
  }
  const pokemonWithDescription = {
    ...pokemonWithoutDescription,
    speciesData: {
      flavor_text_entries: [
        {
          flavor_text: 'Texto do sabor',
          language: {
            name: "es",
          }
        },
        {
          flavor_text: 'Flavor text',
          language: {
            name: "en",
          }
        }
      ]
    }
  }

  it("should render Pokémon data", () => {
    const onClose = vi.fn()
    render(<PokemonModal pokemon={pokemonWithoutDescription} onClose={onClose} />)

    const pokemonImage = screen.getByAltText(pokemonWithoutDescription.name)
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toContain(pokemonWithoutDescription.sprites.other.home.front_default)

    const pokemonId = screen.getByText('#' + pokemonWithoutDescription.id.toString().padStart(3, "0"));
    expect(pokemonId).toBeInTheDocument();

    const pokemonName = screen.getByText(pokemonWithoutDescription.name);
    expect(pokemonName).toBeInTheDocument();

    for (const type of pokemonWithoutDescription.types) {
      const pokemonType = screen.getByText(type.type.name);
      expect(pokemonType).toBeInTheDocument();
    }

    const pokemonHeight = screen.getByText((pokemonWithoutDescription.height / 10).toFixed(1) + ' m')
    expect(pokemonHeight).toBeInTheDocument()

    const pokemonWeight = screen.getByText((pokemonWithoutDescription.weight / 10).toFixed(1) + ' kg')
    expect(pokemonWeight).toBeInTheDocument()
  })

  it("should render Pokémon description when it is defined", () => {
    const onClose = vi.fn()
    render(<PokemonModal pokemon={pokemonWithDescription} onClose={onClose} />)

    const description = pokemonWithDescription.speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    ).flavor_text
    const pokemonDescription = screen.getByText(description)
    expect(pokemonDescription).toBeInTheDocument()
  })

  it("should render Pokémon description when it is not defined", () => {
    const onClose = vi.fn()
    render(<PokemonModal pokemon={pokemonWithoutDescription} onClose={onClose} />)

    const pokemonDescription = screen.getByText("Descrição não disponível")
    expect(pokemonDescription).toBeInTheDocument()
  })

  it("should toggle Pokémon shiny by button", async () => {
    const onClose = vi.fn()
    render(<PokemonModal pokemon={pokemonWithoutDescription} onClose={onClose} />)

    const pokemonDefaultImage = screen.getByAltText(pokemonWithoutDescription.name)
    expect(pokemonDefaultImage).toBeInTheDocument();
    expect(pokemonDefaultImage.src).toContain(pokemonWithoutDescription.sprites.other.home.front_default)

    const shinyButton = screen.getByTestId('shiny-button')
    expect(shinyButton).toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(shinyButton)

    const pokemonShinyImage = screen.getByAltText(pokemonWithoutDescription.name)
    expect(pokemonShinyImage).toBeInTheDocument();
    expect(pokemonShinyImage.src).toContain(pokemonWithoutDescription.sprites.other.home.front_shiny)
  })
})
