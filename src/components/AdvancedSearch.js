import { usePoke } from "../contexts/PokemonContext.js";
import { pokemons } from "../pokemons.js";

export function AdvancedSearch({ handleAdvancedSearch }) {
  const {
    pokemonTypesFilter,
    setPokemonTypesFilter,
    minRange,
    maxRange,
    setMaxRange,
    setMinRange,
    setLimit,
  } = usePoke();

  const pokemonTypes = pokemons
    .map((poke) => poke.types)
    .map((poke) => poke.map((type) => type.type.name))
    .flat();

  const pokemonTypesSet = [...new Set(pokemonTypes)];

  function handleTypeFilter(e) {
    if (e.target.classList.contains("type")) {
      setPokemonTypesFilter(
        pokemonTypesFilter.includes(e.target.textContent)
          ? pokemonTypesFilter.filter((poke) => poke !== e.target.textContent)
          : [...pokemonTypesFilter, e.target.textContent]
      );
    }
  }

  function handleReset() {
    setMinRange(1);
    setMaxRange(151);
    setPokemonTypesFilter([]);
    setLimit(9);
  }

  return (
    <div className="advanced-search">
      <h2>Type</h2>
      <div className="type-filter">
        <ul className="types" onClick={handleTypeFilter}>
          {pokemonTypesSet.map((poke) => (
            <li
              className={`type ${poke} ${
                pokemonTypesFilter.includes(poke) ? "selected" : ""
              }`}
              key={poke}
            >
              {poke}
            </li>
          ))}
        </ul>
      </div>
      <h2>Pokedex ID Range</h2>
      <div className="index-filter">
        <input
          type="text"
          value={minRange}
          onChange={(e) => setMinRange(Number(e.target.value))}
          className="input-range"
        />
        <span> - </span>
        <input
          type="text"
          value={maxRange}
          onChange={(e) => setMaxRange(Number(e.target.value))}
          className="input-range"
        />
      </div>
      <button className="btn-reset" onClick={handleReset}>
        Reset filters
      </button>
      <button className="btn-hide" onClick={handleAdvancedSearch}>
        Hide advanced search
      </button>
    </div>
  );
}
