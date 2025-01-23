import type { Pokemon, PokemonListResponse } from "@/types/pokemon"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

const LIMIT = 20

async function fetchPokemonList(offset: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list")
  }
  return response.json() as Promise<PokemonListResponse>
}

async function fetchPokemonDetails(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon details")
  }
  return response.json() as Promise<Pokemon>
}

export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: ({ pageParam = 0 }) => fetchPokemonList(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * LIMIT
      return nextOffset < lastPage.count ? nextOffset : undefined
    },
  })
}

export function usePokemonDetails(urls: string[]) {
  return useQuery({
    queryKey: ["pokemonDetails", urls],
    queryFn: () => Promise.all(urls.map(fetchPokemonDetails)),
    enabled: urls.length > 0,
  })
}

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

