import type { Pokemon } from "@/types/pokemon"
import { useQuery } from "@tanstack/react-query"

export function useSearchPokemon(query: string) {
  return useQuery({
    queryKey: ["searchPokemon", query],
    queryFn: async () => {
      if (!query) return null
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error("Failed to fetch Pokemon")
      }
      return response.json() as Promise<Pokemon>
    },
    enabled: !!query,
  })
}
