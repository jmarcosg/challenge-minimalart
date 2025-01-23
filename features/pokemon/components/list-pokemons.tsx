import { Button } from '@/components/ui/button';
import { usePokedexStore } from '@/store/pokedex-store';
import { Loader2 } from 'lucide-react';
import { usePokemonInfo } from '../api/get-pokemon-info';
import { usePokemons } from '../api/get-pokemons';
import { useSearchPokemon } from '../api/get-searched-pokemon';
import { AlphabetIndex } from './alphabet-index';
import { PokemonCard } from './pokemon-card';
import { PokemonDetails } from './pokemon-details';

export function ListPokemons() {
  const { searchQuery, selectedLetter, setSelectedLetter } = usePokedexStore();
  const {
    data: pokemonListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingList,
  } = usePokemons();

  const pokemonUrls =
    pokemonListData?.pages.flatMap((page: { results: { url: string }[] }) =>
      page.results.map((pokemon: { url: string }) => pokemon.url),
    ) || [];
  const { data: pokemonDetails, isLoading: isLoadingDetails } =
    usePokemonInfo(pokemonUrls);
  const { data: searchResult, isLoading: isSearching } =
    useSearchPokemon(searchQuery);

  const isLoading = isLoadingList || isLoadingDetails || isSearching;
  let displayedPokemon = searchQuery
    ? searchResult
      ? [searchResult]
      : []
    : pokemonDetails || [];

  // Filter Pokemon by selected letter
  if (selectedLetter && !searchQuery) {
    displayedPokemon = displayedPokemon.filter((pokemon) =>
      pokemon.name.toUpperCase().startsWith(selectedLetter),
    );
  }

  return (
    <>
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
          {selectedLetter && ` starting with "${selectedLetter}"`}
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
              'Load More'
            )}
          </Button>
        </div>
      )}

      <PokemonDetails />

      {/* sidebar that acts as a pokemon filter based on its inital letter */}
      <aside className="fixed right-0 top-0 h-full">
        <AlphabetIndex
          onSelectLetter={(letter) => {
            setSelectedLetter(letter === selectedLetter ? null : letter);
            usePokedexStore.setState({ searchQuery: '' });
          }}
          selectedLetter={selectedLetter}
        />
      </aside>
    </>
  );
}
