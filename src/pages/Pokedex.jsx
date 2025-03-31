import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [nextPageData, setNextPageData] = useState(null);  


  useEffect(() => {
    setLoading(true);

    const offset = (page - 1) * limit;

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results); 
        setNextPageData(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching Pokémon:", error);
        setLoading(false); 
      });
  }, [page]);


  const goToNextPage = () => {
    setPage((prev) => prev + 1); 
  };

  const goToPreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1)); 
  };

  return (
    <div>
      <h1>Pokédex</h1>
      
      {loading && pokemonList.length === 0 ? (
        <p>Loading Pokémon...</p> 
      ) : (
        <ul>
          {pokemonList.map((pokemon, index) => (
            <li key={index}>
              <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
            </li>
          ))}
        </ul>
      )}

      <div>
        <button onClick={goToPreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={goToNextPage}>Next</button>
      </div>
    </div>
  );
}

export default Pokedex;
