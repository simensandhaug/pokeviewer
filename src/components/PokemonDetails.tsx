import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Pokemon } from "../types/pokemon";

interface PokemonDetailsProps {
  pokemon: Pokemon;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="250"
        image={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {pokemon.id}. {pokemon.name.toUpperCase()}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Stats:
        </Typography>
        <List dense>
          {pokemon.stats.map((stat) => (
            <ListItem key={stat.stat.name}>
              <ListItemText primary={`${stat.stat.name}: ${stat.base_stat}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PokemonDetails;
