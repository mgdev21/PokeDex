import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonDetails() {
    const { pokemonName } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!pokemonName) return;

        setLoading(true);

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            .then((response) => response.json())
            .then((data) => {
                setPokemon(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching Pokémon details:", error);
                setPokemon(null);
                setLoading(false);
            });
    }, [pokemonName]);

    if (loading) return <p>Loading Pokémon details...</p>;
    if (!pokemon) return <p>Pokémon not found.</p>;

    return (
        <div>
            <h1>{pokemon.name.toUpperCase()}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />

            <p><strong>Height:</strong> {pokemon.height}</p>
            <p><strong>Weight:</strong> {pokemon.weight}</p>

            <h3>Types:</h3>
            <ul>
                {pokemon.types.map((typeInfo, index) => (
                    <li key={index}>{typeInfo.type.name}</li>
                ))}
            </ul>

            <h3>Abilities:</h3>
            <ul>
                {pokemon.abilities.map((abilityInfo, index) => (
                    <li key={index}>{abilityInfo.ability.name}</li>
                ))}
            </ul>

            <h3>Stats:</h3>
            <ul>
                {pokemon.stats.map((statInfo, index) => (
                    <li key={index}>
                        <strong>{statInfo.stat.name}:</strong> {statInfo.base_stat}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonDetails;
