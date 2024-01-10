import { usePoke } from "../contexts/PokemonContext";

export function PokemonData({ name, pokemon }) {
  const { id, setId } = usePoke();
  const pokemonWeakness = [...new Set(pokemon.weakTo.flat())];

  function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  return (
    <>
      <div className="pokemon" onClick={() => setId(pokemon.id)}>
        <img src={pokemon.sprites?.front_default} alt={name} />
        <p>
          {pokemon.id > 99
            ? `#0${pokemon.id}`
            : pokemon.id > 9
            ? `#00${pokemon.id}`
            : `#000${pokemon.id}`}
        </p>
        <h2>{formatName(name)}</h2>
      </div>

      {pokemon.id === id && (
        <div
          className="overlay"
          onClick={(e) => (e.target.className === "overlay" ? setId("") : "")}
        >
          <div className="pokemon-details">
            <button className="btn-back" onClick={() => setId("")}>
              X
            </button>
            <div className="pokemon-img">
              <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
              <img src={pokemon.sprites?.back_default} alt={pokemon.name} />
            </div>
            <div className="pokemon-info">
              <div className="">
                <span className="pokemon-id">
                  {pokemon.id > 99
                    ? `#0${pokemon.id}`
                    : pokemon.id > 9
                    ? `#00${pokemon.id}`
                    : `#000${pokemon.id}`}
                </span>
              </div>
              <h2>{formatName(name)}</h2>
              <p>Height: {pokemon.height * 10}cm</p>
              <p>Weight: {pokemon.weight / 10}kg</p>
              <ul>
                Abilities:
                {pokemon.abilities
                  .map((abi) => (
                    <li key={abi.ability.name}>
                      {formatName(abi.ability.name)}.
                    </li>
                  ))
                  .slice(0, 2)}
              </ul>

              <p>
                Type:{" "}
                {pokemon.types.map((type) => (
                  <span
                    className={`pokemon-type ${type.type.name}`}
                    key={type.type.name}
                  >
                    {formatName(type.type.name)}{" "}
                  </span>
                ))}
              </p>

              <p>
                Weakness{" "}
                {pokemonWeakness
                  .map((poke, i) => (
                    <span key={i} className={`pokemon-type ${poke}`}>
                      {formatName(poke)}
                    </span>
                  ))
                  .slice(0, 2)}
              </p>
            </div>
            <div>
              <h3 className="pokemon-stats-title">Stats</h3>
              <div className="pokemon-stats">
                {pokemon.stats.map((stat) => (
                  <p key={stat.stat.name}>{`${stat.stat.name.toUpperCase()}: ${
                    stat.base_stat
                  } `}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
