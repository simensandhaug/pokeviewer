import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Pokemon } from "../types/pokemon";

interface PokemonTableProps {
  pokemons: Pokemon[];
  visibleColumns: string[];
  selectedPokemon: Pokemon | null;
  onSelectPokemon: (pokemon: Pokemon) => void;
}

const PokemonTable: React.FC<PokemonTableProps> = ({
  pokemons,
  visibleColumns,
  selectedPokemon,
  onSelectPokemon,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            {visibleColumns.includes("picture") && (
              <TableCell>Picture</TableCell>
            )}
            {visibleColumns.includes("weight") && <TableCell>Weight</TableCell>}
            {visibleColumns.includes("height") && <TableCell>Height</TableCell>}
            {visibleColumns.includes("types") && <TableCell>Types</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemons.map((pokemon) => (
            <TableRow
              key={pokemon.id}
              onClick={() => onSelectPokemon(pokemon)}
              selected={selectedPokemon?.id === pokemon.id}
              hover
            >
              <TableCell>{pokemon.id}</TableCell>
              <TableCell>{pokemon.name}</TableCell>
              {visibleColumns.includes("picture") && (
                <TableCell>
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width="50"
                    height="50"
                  />
                </TableCell>
              )}
              {visibleColumns.includes("weight") && (
                <TableCell>{pokemon.weight}</TableCell>
              )}
              {visibleColumns.includes("height") && (
                <TableCell>{pokemon.height}</TableCell>
              )}
              {visibleColumns.includes("types") && (
                <TableCell>
                  {pokemon.types.map((type) => type.type.name).join(", ")}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokemonTable;
