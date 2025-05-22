import React, { useEffect, useState } from "react";
import { TYPE_COLORS } from "../constants/typeColors";
import PokemonModal from "./PokemonModal";
import * as Sentry from "@sentry/react";
import "./PokemonCard.css";

const PokemonCard = ({ name, compact }) => {
  const [pokemon, setPokemon] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const resetStates = () => {
      setLoading(true);
      setError(null);
      setPokemon(null);
    };

    resetStates();
    fetchPokemon();
  }, [name]);

  const fetchPokemon = async () => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );

      const data = await res.json();

      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();

      setPokemon({ ...data, speciesData });
    } catch (err) {
      setError(err.message);
      Sentry.captureException(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTextColor = (backgroundColor) => {
    if (!backgroundColor || backgroundColor.length < 7) return "#FFFFFF";
    const hex = backgroundColor.replace("#", "");
    const rgb = [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];

    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness > 150 ? "#2E2E2E" : "#FFFFFF";
  };

  if (loading) {
    return <div className="pokemon-card"><span>Carregando...</span></div>;
  }
  if (error) {
    return <div className="pokemon-card erro">Erro: Pokémon não existe!</div>;
  }

  return (
    <div className={`pokemon-card ${compact ? "compact" : ""}`}>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
      <h2>
        <div className="number">Nº {pokemon.id}</div>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h2>
      <div className="types">
        {pokemon.types.map((t, index) => {
          const typeName = t.type.name;
          const backgroundColor = TYPE_COLORS[typeName] || "#68A090";
          const color = getTextColor(backgroundColor);

          return (
            <div
              key={index}
              className="type"
              style={{
                backgroundColor,
                color,
                boxShadow: `0 2px 4px ${backgroundColor}80`,
              }}
            >
              {typeName}
            </div>
          );
        })}
      </div>
      <button className="detail" onClick={() => setShowModal(true)}>
        Detalhar
      </button>

      {showModal && (
        <PokemonModal pokemon={pokemon} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default PokemonCard;
