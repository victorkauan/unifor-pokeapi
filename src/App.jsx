import React from 'react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import './App.css'
import pokeballFoto from './assets/pokeball.png'
import PokemonCard from './components/Pokemoncard';


function PokeballIcon() {
  return (
    <svg
      className="pokeball-icon"
      viewBox="-30 -30 600 600"
      width="24"
      height="24"
    >
      {/* Outer circle filled black */}
      <circle
        className='outline'
        cx="256"
        cy="256"
        r="260"
        fill="#000"
        stroke='#000'
        strokeWidth="32" />

      {/* Bottom half inside outer circle filled white */}
      <path
        d="M16,256 A240,240 0 0,0 496,256 496,496 L16,496 Z"
        fill="#fff"
        stroke="#000"
        strokeWidth="7"
      />

      {/* Center circle */}
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


function App() {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [initialPokemons, setInitialPokemons] = useState([])
  const [isInitialLoading ,setIsInitialLoading] = useState(true)
  const [listError, setListError] = useState(null);

  useEffect (() =>  {
    fetchPokemonList();
  }, [])

  const fetchPokemonList = async () => {
    try {
      const listResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      if (!listResponse.ok) throw new Error('Falha ao buscar lista');
      const listData = await listResponse.json();

      const detailedPokemons = await Promise.allSettled(
        listData.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          if (!res.ok) throw new Error('Falha no Pokémon individual');
          return await res.json();
        })
      );

      const successfulPokemons = detailedPokemons
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value)
        .sort((a, b) => a.id - b.id);

      setInitialPokemons(successfulPokemons);
      setListError(null);
    } catch (error) {
      setListError(error.message);
      console.error('Erro na busca:', error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleSearch = () => {
    setQuery(search.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const handleClear = () => {
    setSearch('')
    setQuery('')
  }

  const listRef = useRef(null)

  const handleWheel = (e) => {
    if(listRef.current) {
      e.preventDefault()

      const scrollAmount = e.deltaY * 2


      listRef.current.scrollLeft += scrollAmount
    }
  }

  return (
    <div className="Pokedex">
      <div className="search-container">
        <img src={pokeballFoto} alt="Background"
          className="background-image" />
        <input
          type="text"
          className='search-bar'
          placeholder='Pesquise seu pokémon'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}

        />
        <button
          className="search-button"
          aria-label='Search'
          onClick={handleClear}>
          <PokeballIcon />

        </button>
      </div>

      {!query && (
      <div 
      className="horizontal-list"
      ref={listRef}
      onWheel={handleWheel}
      >
        {initialPokemons.map(pokemon => (
          <PokemonCard 
            key={pokemon.id}
            name={pokemon.name}
            compact
          />
        ))}
      </div>)}


      <div className="card-container">
        {query && <PokemonCard name={query} />}
      </div>
    </div>
  )
}

export default App
