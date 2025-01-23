import type { Pokemon } from "@/types/pokemon"
import { create } from "zustand"

interface PokedexState {
  selectedPokemon: Pokemon | null
  searchQuery: string
  setSearchQuery: (query: string) => void
  setSelectedPokemon: (pokemon: Pokemon | null) => void
}

export const usePokedexStore = create<PokedexState>((set) => ({
  selectedPokemon: null,
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
}))

