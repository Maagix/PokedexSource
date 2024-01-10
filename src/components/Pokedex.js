import { usePoke } from "../contexts/PokemonContext.js";
import { AdvancedSearch } from "./AdvancedSearch.js";

export function Pokedex() {
  const {
    query,
    setQuery,
    sort,
    setSort,
    isAdvancedSearch,
    setIsAdvancedSearch,
    sortedArr,
  } = usePoke();

  function handleAdvancedSearch() {
    setIsAdvancedSearch(!isAdvancedSearch);
  }

  return (
    <div className="pokedex">
      <div className="search">
        <input
          type="text"
          placeholder="Name or Pokedex ID..."
          value={query}
          onChange={(e) => {
            return setQuery(e.target.value.toLowerCase());
          }}
          className="search-bar"
        />
      </div>

      <div className="sort">
        <h2>Sort by</h2>
        <select
          className="sort-by"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="low-number">Lowest Number (First)</option>
          <option value="high-number">Highest Number (First)</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
        {!isAdvancedSearch && (
          <button className="btn-show" onClick={handleAdvancedSearch}>
            More filters &nbsp; <span>&darr;</span>
          </button>
        )}
      </div>
      {isAdvancedSearch && (
        <AdvancedSearch handleAdvancedSearch={handleAdvancedSearch} />
      )}
    </div>
  );
}
