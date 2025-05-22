
import React from 'react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import './App.css'
import pokeballFoto from './assets/pokeball.png'
import PokemonCard from './components/PokemonCard';
import * as Sentry from "@sentry/react"

function PokeballIcon() {
  return (
    <svg className="pokeball-icon" viewBox="-30 -30 600 600" width="24" height="24">
      <circle
        className="outline"
        cx="256"
        cy="256"
        r="260"
        fill="#000"
        stroke="#000"
        strokeWidth="32"
      />
      <path
        d="M16,256 A240,240 0 0,0 496,256 496,496 L16,496 Z"
        fill="#fff"
        stroke="#000"
        strokeWidth="7"
      />
      <circle
        cx="256"
        cy="256"
        r="95"
        fill="#fff"
        stroke="#000"
        strokeWidth="30"
      />
    </svg>
  );
}

export default function App() {
  const [search, setSearch] = useState('');
  const [varieties, setVarieties] = useState([]);
  const [query, setQuery] = useState('');
  const [initialPokemons, setInitialPokemons] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const listRef = useRef(null);
  const handleWheel = (e) => {
    if (listRef.current) {
      e.preventDefault();
      listRef.current.scrollLeft += e.deltaY * 2;
    }
  };

  useEffect(() => {

    (async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await res.json();
        const detailed = await Promise.all(
          data.results.map(p => fetch(p.url).then(r => r.json()))
        );

        const sorted = detailed.sort((a, b) => a.id - b.id);
        setInitialPokemons(sorted);
      } catch (err) {
        console.error(err)
        Sentry.captureException(error);
      } finally {
        setLoadingList(false);
      }
    })();
  }, []);


  const handleSearch = async () => {
    if (!search.trim()) return;

    const normalized = search
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/['.]/g, '');

    setQuery(normalized);
    try {
      const names = await fetchVarieties(normalized);
      setVarieties(names);
    } catch (err) {
      Sentry.captureException(err)
      setVarieties([normalized]);
    }
  };
  async function fetchVarieties(term) {


    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${term}`);
    if (res.ok) {
      const data = await res.json();
      return [data.name];
    }

    res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${term}`);
    if (!res.ok) Sentry.captureException(new Error('Pokémon não encontrado'));
    const specie = await res.json();

    return specie.varieties.map(v => v.pokemon.name);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleClear = () => {
    setSearch('');
    setQuery('')
    setVarieties([]);
  };

  return (
    <div className="Pokedex">
      <div className="search-container">
        <img src={pokeballFoto} alt="Background" className="background-image" />
        <input
          type="text"
          className="search-bar"
          placeholder="Pesquise seu pokémon"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" aria-label="Search" onClick={handleClear}>
          <PokeballIcon />
        </button>
      </div>

      {!query && !loadingList && (
        <div className="horizontal-list" ref={listRef} onWheel={handleWheel}>
          {initialPokemons.map(p => (
            <div className="card-container">
              <PokemonCard
                key={p.id}
                name={p.name}
                compact />
            </div>


          ))}
        </div>
      )}

      {varieties.length > 0 && (
        <div className="horizontal-list" ref={listRef} onWheel={handleWheel}>
          {varieties.map(name => (
            <div className="card-container">
              <PokemonCard
                key={name}
                name={name}
                compact={false} />
            </div>

          ))}
        </div>
      )}
    </div>
  );
}
