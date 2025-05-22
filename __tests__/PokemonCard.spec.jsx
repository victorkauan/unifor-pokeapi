import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import PokemonCard from "../src/components/PokemonCard";

describe("PokemonCard", () => {
  it("should render loading state when data is being fetched", () => {
    render(<PokemonCard name="pikachu" />);

    const isLoadingText = screen.getByText(/carregando/i);
    expect(isLoadingText).toBeInTheDocument();
  });

  it(
    "should render an error message when the Pokémon is not found",
    async () => {
      render(<PokemonCard name="invalid" />);

      const isLoadingText = screen.getByText(/carregando/i);
      await waitForElementToBeRemoved(isLoadingText, { timeout: 5 * 1000 }); // 5 seconds

      const notFoundText = screen.getByText(/não.*existe/i);
      expect(notFoundText).toBeInTheDocument();
    },
    10 * 1000 // 10 seconds
  );

  it("should render Pokémon data correctly after successful fetch", async () => {
    render(<PokemonCard name="pikachu" />);

    const isLoadingText = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(isLoadingText, { timeout: 2 * 1000 });

    const pokemonImage = screen.getByRole("img", { alt: /pikachu/i });
    expect(pokemonImage).toBeInTheDocument();

    const pokemonNumber = screen.getByText(/25/);
    expect(pokemonNumber).toBeInTheDocument();

    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByText(/electric/i);
    expect(pokemonType).toBeInTheDocument();

    const detailButton = screen.getByRole("button", /detalhar/);
    expect(detailButton).toBeInTheDocument();
  });
});
