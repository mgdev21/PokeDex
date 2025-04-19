
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import PokemonDetails from "./pages/PokemonDetails";
import About from "./pages/About"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokedex" element={<Pokedex />} />
      <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;