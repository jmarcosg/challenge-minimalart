"use client"

import { PokemonCard } from "@/components/pokemon-card"
import { PokemonDetails } from "@/components/pokemon-details"
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import { usePokedexStore } from "@/store/pokedex-store"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"

export default function PokedexPage() {
  const { pokemon, loading, error, searchQuery, selectedPokemon, fetchPokemon, setSearchQuery, setSelectedPokemon } =
    usePokedexStore()

  useEffect(() => {
    if (pokemon.length === 0) {
      fetchPokemon()
    }
  }, [fetchPokemon, pokemon.length])

  const filteredPokemon = pokemon.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

      <div className="max-w-xl mx-auto mb-8">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
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
            {filteredPokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} onClick={() => setSelectedPokemon(p)} />
            ))}
          </div>

          {!searchQuery && (
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

          <PokemonDetails
            pokemon={selectedPokemon}
            open={!!selectedPokemon}
            onOpenChange={(open: boolean) => !open && setSelectedPokemon(null)}
          />
        </>
      )}
    </main>
  )
}

