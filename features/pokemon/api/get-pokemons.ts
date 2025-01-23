import type { PokemonListResponse } from "@/types/pokemon"
import { useInfiniteQuery } from "@tanstack/react-query"

const LIMIT = 20

async function fetchPokemons(offset: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list")
  }
  return response.json() as Promise<PokemonListResponse>
}

export function usePokemons() {
  return useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: ({ pageParam = 0 }) => fetchPokemons(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * LIMIT
      return nextOffset < lastPage.count ? nextOffset : undefined
    },
  })
}