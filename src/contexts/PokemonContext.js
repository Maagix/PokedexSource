import { createContext, useContext, useMemo, useState } from "react";
import { pokemons } from "../pokemons.js";

const PokemonContext = createContext();

function PokemonProvider({ children }) {
  const [id, setId] = useState("");
  const [limit, setLimit] = useState(9);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("low-number");
  const [pokemonTypesFilter, setPokemonTypesFilter] = useState([]);
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(151);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  // prettier-ignore
  pokemons.sort((a, b) => 
    sort === "a-z" ? (a.name > b.name ? 1 : -1)
  : sort === "z-a" ? (b.name > a.name ? 1 : -1)
  : sort === "low-number" ? (a.id - b.id)
  : sort === "high-number" ? (b.id - a.id)
  : 0,
);

  const sortedArr = isAdvancedSearch
    ? pokemons
        .filter((poke) => poke.id >= minRange && poke.id <= maxRange)
        .filter(
          (poke) =>
            pokemonTypesFilter.some((p) =>
              poke.types.map((item) => item.type.name).includes(p)
            ) || pokemonTypesFilter.length === 0
        )
        .filter(
          (p) => p.name.includes(query) || p.id === Number(query) || !query
        )
        .slice(0, limit)
    : pokemons
        .filter(
          (p) => p.name.includes(query) || p.id === Number(query) || !query
        )
        .slice(0, limit);

  const value = useMemo(() => {
    return {
      id,
      setId,
      limit,
      setLimit,
      query,
      setQuery,
      sort,
      setSort,
      pokemonTypesFilter,
      setPokemonTypesFilter,
      minRange,
      setMinRange,
      maxRange,
      setMaxRange,
      isAdvancedSearch,
      setIsAdvancedSearch,
      sortedArr,
    };
  }, [
    id,
    isAdvancedSearch,
    limit,
    maxRange,
    minRange,
    query,
    sort,
    sortedArr,
    pokemonTypesFilter,
  ]);

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
}

function usePoke() {
  const context = useContext(PokemonContext);

  if (context === undefined)
    throw new Error("PokemonContext was used outside of PokemonProvider");

  return context;
}

export { PokemonProvider, usePoke };
