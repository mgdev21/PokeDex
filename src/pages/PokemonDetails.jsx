import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/PokemonDetails.css";

function PokemonDetails() {
  const { pokemonName } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const pokemonPerPage = 20;

  useEffect(() => {
    if (!pokemonName) return;

    setLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);


        return fetch(data.species.url);
      })
      .then((response) => response.json())
      .then((speciesData) => {

        return fetch(speciesData.evolution_chain.url);
      })
      .then((response) => response.json())
      .then((evolutionData) => {

        const chain = [];
        let current = evolutionData.chain;

        while (current) {
          chain.push({
            name: current.species.name,
            url: current.species.url,
          });
          current = current.evolves_to[0]; 
        }

        setEvolutionChain(chain);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon details or evolution chain:", error);
        setPokemon(null);
        setLoading(false);
      });
  }, [pokemonName]);

  const handleGoToPokedex = () => {
    if (pokemon) {
      const page = Math.ceil(pokemon.id / pokemonPerPage);
      navigate(`/pokedex?page=${page}`);
    }
  };

  if (loading) return <p>Loading Pokémon details...</p>;
  if (!pokemon) return <p>Pokémon not found.</p>;

  return (
    <div className="pokemon-details">
      <div className="pokemon-details-container">
        <div className="pokemon-data">
          <div className="pokemon-header">
            <h1>{pokemon.name.toUpperCase()}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>

          <div className="pokemon-info">
            <div className="pokemon-section">
              <h3>Stats</h3>
              <ul>
                {pokemon.stats.map((statInfo, index) => (
                  <li key={index}>
                    <strong>{statInfo.stat.name}:</strong> {statInfo.base_stat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pokemon-section">
              <h3>Types</h3>
              <ul>
                {pokemon.types.map((typeInfo, index) => (
                  <li key={index}>{typeInfo.type.name}</li>
                ))}
              </ul>
            </div>

            <div className="pokemon-section">
              <h3>Abilities</h3>
              <ul>
                {pokemon.abilities.map((abilityInfo, index) => (
                  <li key={index}>{abilityInfo.ability.name}</li>
                ))}
              </ul>
            </div>

            <div className="pokemon-section">
              <h3>Height & Weight</h3>
              <p>
                <strong>Height:</strong> {pokemon.height}
              </p>
              <p>
                <strong>Weight:</strong> {pokemon.weight}
              </p>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="pokemon-evolution">
          <h3>Evolution Chain</h3>
          {evolutionChain.length > 0 ? (
            <ul>
              {evolutionChain.map((evolution, index) => {
                const evolutionImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.url
                  .split("/")
                  .filter(Boolean)
                  .pop()}.png`;

                return (
                  <li key={index} className="evolution-item">
                    <button
                      onClick={() => navigate(`/pokemon/${evolution.name}`)}
                      className="evolution-link"
                    >
                      <img src={evolutionImageUrl} alt={evolution.name} />
                      <p>{evolution.name.toUpperCase()}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No evolution data available.</p>
          )}
        </div>
      </div>

      <div className="pokemon-actions">
        <button onClick={handleGoToPokedex} className="go-to-pokedex-button">
          Go to Pokédex
        </button>
      </div>
    </div>
  );
}

export default PokemonDetails;