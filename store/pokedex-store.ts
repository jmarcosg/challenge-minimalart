import type { Pokemon } from "@/types/pokemon"
import { create } from "zustand"

interface PokedexState {
  selectedPokemon: Pokemon | null
  searchQuery: string
  selectedLetter: string | null
  setSearchQuery: (query: string) => void
  setSelectedPokemon: (pokemon: Pokemon | null) => void
  setSelectedLetter: (letter: string | null) => void
}

export const usePokedexStore = create<PokedexState>((set) => ({
  selectedPokemon: null,
  searchQuery: "",
  selectedLetter: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
  setSelectedLetter: (letter) => set({ selectedLetter: letter }),
}))

