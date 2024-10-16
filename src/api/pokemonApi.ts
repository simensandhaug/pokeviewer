import { Pokemon } from "../types/pokemon";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemons(limit: number = 151): Promise<Pokemon[]> {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`);
  const data = await response.json();

  const pokemonPromises: Promise<Pokemon>[] = data.results.map(async (result: { url: string }) => {
    const pokemonResponse = await fetch(result.url);
    return pokemonResponse.json();
  });

  return Promise.all(pokemonPromises);
}
