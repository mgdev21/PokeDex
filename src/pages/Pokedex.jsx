import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Pokedex.css";

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const limit = window.innerWidth < 768 ? 10 : 15;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageFromQuery = parseInt(queryParams.get("page"), 10);

    if (pageFromQuery && pageFromQuery > 0) {
      setPage(pageFromQuery);
    } else {
      setPage(1);
    }
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    const offset = (page - 1) * limit;

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setTotalPages(Math.ceil(data.count / limit));

        if (page > Math.ceil(data.count / limit)) {
          setPage(Math.ceil(data.count / limit));
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon:", error);
        setLoading(false);
      });

    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", page);
    navigate(`?${queryParams.toString()}`, { replace: true });
  }, [page, navigate]);

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(pageInput, 10);

    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="navbar-search">
          <input
            type="number"
            value={pageInput}
            onChange={handlePageInputChange}
            placeholder="Enter page number"
          />
          <button onClick={handleGoToPage}>Search</button>
        </div>
      </nav>
  
      <div className="pokedex-container">
        <h1>Pokédex</h1>
  
        {loading && pokemonList.length === 0 ? (
          <p>Loading Pokémon...</p>
        ) : (
          <>
            <div className="pokemon-grid">
              {pokemonList.map((pokemon, index) => {
                const pokemonId = pokemon.url.split("/").filter(Boolean).pop();
                const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  
                return (
                  <div key={index} className="pokemon-card">
                    <Link to={`/pokemon/${pokemon.name}?page=${page}`}>
                      <img src={imageUrl} alt={pokemon.name} />
                      <p>{pokemon.name.toUpperCase()}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
  
            <div className="pagination">
              <button onClick={goToPreviousPage} disabled={page === 1}>
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button onClick={goToNextPage} disabled={page === totalPages}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Pokedex;
