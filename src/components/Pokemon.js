import React, { useState, useEffect } from "react";
import Image from "./Image";

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setPokemonData(result.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data on initial mount with a default location or use a default location of your choice
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pokemon</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {pokemonData.map((pokemon) => {
            return (
              <tr>
                <td>
                  <Image pokemonApi={pokemon.url} />
                </td>
                <td>
                  <h1>{pokemon.name}</h1>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Pokemon;
