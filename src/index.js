import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./queries.css";
import App from "./App";
import { PokemonProvider } from "./contexts/PokemonContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </React.StrictMode>
);
