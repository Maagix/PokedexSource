import { usePoke } from "../contexts/PokemonContext.js";
import { PokemonData } from "./PokemonData.js";

export function Pokemon() {
  const { setLimit, sortedArr, limit } = usePoke();

  return (
    <div className="pokemon-box">
      <>
        {sortedArr.map((poke) => (
          <PokemonData name={poke.name} pokemon={poke} key={poke.id} />
        ))}
        {sortedArr.length >= limit ? (
          <button
            className="btn-load"
            onClick={() => setLimit((lim) => lim + 3)}
          >
            Load more Pokemon
          </button>
        ) : (
          ""
        )}
      </>
    </div>
  );
}
