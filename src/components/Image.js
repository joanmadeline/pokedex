import React, { useState, useEffect } from "react";

const Image = ({ pokemonApi }) => {
  const [pokemonId, setPokemonId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${pokemonApi}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setPokemonId(result.id);
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
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${pokemonId}.png`}
        alt=""
      />
    </div>
  );
};

export default Image;
