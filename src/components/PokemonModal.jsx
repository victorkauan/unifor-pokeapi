import { useState } from "react";
import { createPortal } from "react-dom";
import { TYPE_COLORS } from "../constants/typeColors";
import sparkle from "../assets/sparkles-outline.svg";
import "./PokemonModal.css";

const PokemonModal = ({ pokemon, onClose }) => {
  const [showShiny, setShowShiny] = useState(false);

  const toggleShiny = () => {
    setShowShiny(!showShiny);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  return createPortal(
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          &times;
        </button>

        <div className="modal-body">
          <div className="modal-image">
            <img
              src={
                showShiny
                  ? pokemon.sprites.other.home.front_shiny
                  : pokemon.sprites.other.home.front_default
              }
              alt={pokemon.name}
            />
          </div>

          <div className="modal-info">
            <h2>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>
            <button className="shiny-button" onClick={toggleShiny} data-testid="shiny-button">
              <img src={sparkle} />
            </button>

            <div className="info-section">
              <h3>Tipo</h3>
              <div className="modal-types">
                {pokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className="type-tag"
                    style={{ backgroundColor: TYPE_COLORS[type.type.name] }}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <h4>Nº na Pokédex</h4>
                <p>#{pokemon.id.toString().padStart(3, "0")}</p>
              </div>
              <div className="info-item">
                <h4>Altura</h4>
                <p>{(pokemon.height / 10).toFixed(1)} m</p>
              </div>
              <div className="info-item">
                <h4>Peso</h4>
                <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
              </div>
            </div>

            <div className="info-section">
              <h3>Descrição</h3>
              <p className="pokedex-entry">
                {pokemon.speciesData?.flavor_text_entries?.find(
                  (entry) => entry.language.name === "en"
                )?.flavor_text || "Descrição não disponível"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PokemonModal;
