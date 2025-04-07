import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Pokedex.css";

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [nextPageData, setNextPageData] = useState(null);
  const [pageInput, setPageInput] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Read the `page` query parameter from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageFromQuery = parseInt(queryParams.get("page"), 10);
    if (pageFromQuery && pageFromQuery > 0) {
      setPage(pageFromQuery);
    }
  }, [location.search]);

  // Fetch Pokémon data whenever the `page` state changes
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

    // Update the URL with the current page
    navigate(`?page=${page}`, { replace: true });
  }, [page, navigate]);

  const goToNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handleGoToPage = () => {
    const totalPages = Math.ceil(nextPageData?.count / limit);
    const pageNumber = parseInt(pageInput, 10);

    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  return (
    <div>
      <h1>Pokédex</h1>

      {loading && pokemonList.length === 0 ? (
        <p>Loading Pokémon...</p>
      ) : (
        <div className="pokemon-grid">
          {pokemonList.map((pokemon, index) => {
            const pokemonId = pokemon.url.split("/").filter(Boolean).pop();
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

            return (
              <div key={index} className="pokemon-card">
                <Link to={`/pokemon/${pokemon.name}`}>
                  <img src={imageUrl} alt={pokemon.name} />
                  <p>{pokemon.name.toUpperCase()}</p>
                </Link>
              </div>
            );
          })}
        </div>
      )}

      <div>
        <button onClick={goToPreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={goToNextPage}>Next</button>
      </div>

      <div>
        <input
          type="number"
          value={pageInput}
          onChange={handlePageInputChange}
          placeholder="Enter page number"
        />
        <button onClick={handleGoToPage}>Go</button>
      </div>
    </div>
  );
}

export default Pokedex;