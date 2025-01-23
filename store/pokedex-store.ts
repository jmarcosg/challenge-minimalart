import type { Pokemon } from "@/types/pokemon"
import { debounce } from "lodash"
import { create } from "zustand"

interface PokedexState {
  loading: boolean
  error: string | null
  selectedPokemon: Pokemon | null
  searchQuery: string
  selectedLetter: string | null
  searchResult: Pokemon | null
  setSearchQuery: (query: string) => void
  debouncedSearch: (query: string) => void
  setSelectedPokemon: (pokemon: Pokemon | null) => void
  setSelectedLetter: (letter: string | null) => void
  searchPokemon: (query: string) => Promise<void>
}

export const usePokedexStore = create<PokedexState>((set, get) => ({
  loading: false,
  error: null,
  selectedPokemon: null,
  selectedLetter: null,
  searchResult: null,
  searchQuery: "",
  
  // Set the search query and trigger a debounced search
  setSearchQuery: (query) => {
    set({ searchQuery: query, selectedLetter: null })
    get().debouncedSearch(query)
  },
  searchPokemon: async (query: string) => {
    if (!query) {
      set({ searchResult: null })
      return
    }

    set({ loading: true, error: null })

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
      if (!response.ok) {
        if (response.status === 404) {
          set({ searchResult: null, loading: false })
          return
        }
        throw new Error("Failed to fetch Pokemon")
      }
      const data: Pokemon = await response.json()
      set({ searchResult: data, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false, searchResult: null })
    }
  },
    debouncedSearch: debounce((query: string) => {
    get().searchPokemon(query)
  }, 300),
  
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
  setSelectedLetter: (letter) => set({ selectedLetter: letter }),
}))

