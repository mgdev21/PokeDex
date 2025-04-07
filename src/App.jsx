import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'


import Pokedex from './pages/Pokedex'
import About from './pages/About'
import PokemonDetails from './pages/PokemonDetails'

function App() {


  return (
    <Routes>
      <Route path="/pokedex" element={<Pokedex />} />
      <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App
