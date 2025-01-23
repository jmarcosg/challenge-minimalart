"use client"

import { PokemonCard } from "@/components/pokemon-card"
import { PokemonDetails } from "@/components/pokemon-details"
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import { usePokemonDetails, usePokemonList, useSearchPokemon } from "@/hooks/use-pokemon-queries"
import { usePokedexStore } from "@/store/pokedex-store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

const queryClient = new QueryClient()

function PokedexContent() {
  const { searchQuery } = usePokedexStore()
  const {
    data: pokemonListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingList,
  } = usePokemonList()

  const pokemonUrls = pokemonListData?.pages.flatMap((page) => page.results.map((pokemon) => pokemon.url)) || []
  const { data: pokemonDetails, isLoading: isLoadingDetails } = usePokemonDetails(pokemonUrls)
  const { data: searchResult, isLoading: isSearching } = useSearchPokemon(searchQuery)

  const isLoading = isLoadingList || isLoadingDetails || isSearching
  const displayedPokemon = searchQuery ? (searchResult ? [searchResult] : []) : pokemonDetails || []

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

      <div className="max-w-xl mx-auto mb-8">
        <SearchInput />
      </div>
      
            {isLoading ? (
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="mt-2">Loading Pokémon...</p>
        </div>
      ) : displayedPokemon.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
      ) : (
        <div className="text-center text-muted-foreground">
          No Pokémon found {searchQuery && `for "${searchQuery}"`}
        </div>
      )}

      {!searchQuery && hasNextPage && (
        <div className="mt-8 text-center">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? (
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

      <PokemonDetails />
    </main>
  )
}

export default function PokedexPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokedexContent />
    </QueryClientProvider>
  )
}


