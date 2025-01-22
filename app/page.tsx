"use client"

import { PokemonCard } from "@/components/pokemon-card"
import { PokemonDetails } from "@/components/pokemon-details"
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import { usePokedexStore } from "@/store/pokedex-store"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"

export default function PokedexPage() {
  const { pokemon, loading, error, searchQuery, searchResults, fetchPokemon } = usePokedexStore()

  useEffect(() => {
    if (pokemon.length === 0) {
      fetchPokemon()
    }
  }, [fetchPokemon, pokemon.length])

  const displayedPokemon = searchQuery ? searchResults : pokemon

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

      <div className="max-w-xl mx-auto mb-8">
        <SearchInput />
      </div>

      {error ? (
        <div className="text-center text-red-500 mb-4">
          <p>{error}</p>
          <Button onClick={fetchPokemon} className="mt-2">
            Retry
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedPokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>

          {!searchQuery && displayedPokemon.length > 0 && (
            <div className="mt-8 text-center">
              <Button onClick={fetchPokemon} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}

          {searchQuery && displayedPokemon.length === 0 && !loading && (
            <div className="text-center text-muted-foreground">No Pokémon found for &quot;{searchQuery}&quot;</div>
          )}

          <PokemonDetails />
        </>
      )}
    </main>
  )
}


