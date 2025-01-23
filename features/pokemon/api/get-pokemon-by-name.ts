import type { Pokemon } from "@/types/pokemon"
import { useQuery } from "@tanstack/react-query"

export function usePokemonByName(name: string) {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon")
      }
      return response.json() as Promise<Pokemon>
    },
    enabled: !!name,
  })
}