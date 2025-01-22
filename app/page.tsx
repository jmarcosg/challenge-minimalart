"use client"

import { PokemonCard } from "@/components/pokemon-card"
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import type { Pokemon, PokemonListResponse } from "@/types/pokemont"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function PokedexPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [offset, setOffset] = useState(0)
  const limit = 12

  const fetchPokemon = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch list of pokemon
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      const data: PokemonListResponse = await response.json()

      // Fetch detailed data for each pokemon
      const pokemonData = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url)
          return res.json()
        }),
      )

      setPokemon((prev) => [...prev, ...pokemonData])
    } catch (err) {
      setError(`Failed to fetch Pokemon. Please try again later. ${err}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPokemon()
  }, [offset])

  const filteredPokemon = pokemon.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

      <div className="max-w-xl mx-auto mb-8">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>

      {error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>

          {!searchQuery && (
            <div className="mt-8 text-center">
              <Button onClick={() => setOffset((prev) => prev + limit)} disabled={loading}>
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
        </>
      )}
    </main>
  )
}

