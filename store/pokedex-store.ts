import type { Pokemon, PokemonListResponse } from "@/types/pokemon"
import { create } from "zustand"

interface PokedexState {
  pokemon: Pokemon[]
  loading: boolean
  error: string | null
  offset: number
  selectedPokemon: Pokemon | null
  searchQuery: string
  setSearchQuery: (query: string) => void
  setSelectedPokemon: (pokemon: Pokemon | null) => void
  fetchPokemon: () => Promise<void>
}

const LIMIT = 12

export const usePokedexStore = create<PokedexState>((set, get) => ({
  pokemon: [],
  loading: false,
  error: null,
  offset: 0,
  selectedPokemon: null,
  searchQuery: "",

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),

  fetchPokemon: async () => {
    const { offset, pokemon } = get()
    set({ loading: true, error: null })

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon list")
      }
      const data: PokemonListResponse = await response.json()

      const pokemonData = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url)
          if (!res.ok) {
            throw new Error(`Failed to fetch details for ${p.name}`)
          }
          return res.json()
        }),
      )

      set((state) => ({
        pokemon: [...state.pokemon, ...pokemonData],
        offset: state.offset + LIMIT,
        loading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },
}))

