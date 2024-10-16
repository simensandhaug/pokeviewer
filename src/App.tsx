import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, Box } from "@mui/material";
import PokemonTable from "./components/PokemonTable";
import PokemonDetails from "./components/PokemonDetails";
import ColumnSelector from "./components/ColumnSelector";
import Footer from "./components/Footer";
import { Pokemon } from "./types/pokemon";
import { fetchPokemons } from "./api/pokemonApi";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(() => {
    const storedColumns = localStorage.getItem("visibleColumns");
    return storedColumns
      ? JSON.parse(storedColumns)
      : ["name", "id"];
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPokemons = async () => {
      const fetchedPokemons = await fetchPokemons();
      setPokemons(fetchedPokemons);
      if (fetchedPokemons.length > 0) {
        setSelectedPokemon(fetchedPokemons[0]);
      }
    };
    loadPokemons();

    // Focus the container when the component mounts
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("visibleColumns", JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleColumnToggle = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (selectedPokemon) {
      const currentIndex = pokemons.findIndex(
        (p) => p.id === selectedPokemon.id
      );
      if (event.key === "ArrowUp" && currentIndex > 0) {
        setSelectedPokemon(pokemons[currentIndex - 1]);
      } else if (
        event.key === "ArrowDown" &&
        currentIndex < pokemons.length - 1
      ) {
        setSelectedPokemon(pokemons[currentIndex + 1]);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        ref={containerRef}
        sx={{ my: 4, outline: "none", minHeight: "100vh", display: "flex", flexDirection: "column" }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Pokéviewer
        </Typography>
        <ColumnSelector
          columns={["picture", "weight", "height", "types"]}
          visibleColumns={visibleColumns}
          onToggle={handleColumnToggle}
        />
        <Box sx={{ display: "flex", mt: 2, flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1, mr: 2 }}>
            <PokemonTable
              pokemons={pokemons}
              visibleColumns={visibleColumns}
              selectedPokemon={selectedPokemon}
              onSelectPokemon={handlePokemonSelect}
            />
          </Box>
          {selectedPokemon && (
            <Box
              sx={{
                width: 300,
                position: "sticky",
                top: 20,
                alignSelf: "flex-start",
              }}
            >
              <PokemonDetails pokemon={selectedPokemon} />
            </Box>
          )}
        </Box>
        <Footer />
      </Box>
    </Container>
  );
}

export default App;
