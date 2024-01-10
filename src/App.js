import Header from "./components/Header.js";
import { Logo } from "./components/Logo.js";
import { Pokedex } from "./components/Pokedex.js";

import Main from "./components/Main.js";
import { Pokemon } from "./components/Pokemon.js";

import { usePoke } from "./contexts/PokemonContext.js";

export default function App() {
  const { setId } = usePoke();

  return (
    <div
      tabIndex={1}
      onKeyDown={(e) => {
        if (e.code === "Escape") {
          setId("");
        }
      }}
      className="box"
    >
      <Header>
        <Logo />
        <Pokedex />
      </Header>

      <Main>
        <Pokemon />
      </Main>
    </div>
  );
}
