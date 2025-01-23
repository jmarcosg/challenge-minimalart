import type { Pokemon } from "@/types/pokemon"
import { useQuery } from "@tanstack/react-query"

async function fetchPokemonInfo(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon info")
  }
  return response.json() as Promise<Pokemon>
}

export function usePokemonInfo(urls: string[]) {
  return useQuery({
    queryKey: ["pokemonInfo", urls],
    queryFn: () => Promise.all(urls.map(fetchPokemonInfo)),
    enabled: urls.length > 0,
  })
}