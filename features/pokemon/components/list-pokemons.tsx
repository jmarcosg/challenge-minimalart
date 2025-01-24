import { LoadingPokeball } from '@/components/shared/loading-pokeball';
import { Button } from '@/components/ui/button';
import { usePokedexStore } from '@/store/pokedex-store';
import { Loader2 } from 'lucide-react';
import * as motion from 'motion/react-client';
import { usePokemonInfo } from '../api/get-pokemon-info';
import { usePokemons } from '../api/get-pokemons';
import { AlphabetIndex } from './alphabet-index';
import { PokemonCard } from './pokemon-card';
import { PokemonDetails } from './pokemon-details';

export function ListPokemons() {
  const {
    searchQuery,
    selectedLetter,
    setSelectedLetter,
    searchResult,
    loading: isSearching,
  } = usePokedexStore();
  const {
    data: pokemonListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingList,
  } = usePokemons();

  // flatten the pages and get the urls of each pokemon to fetch their details
  const pokemonUrls =
    pokemonListData?.pages.flatMap((page) =>
      (page as { results: { url: string }[] }).results.map(
        (pokemon) => pokemon.url,
      ),
    ) || [];
  const { data: pokemonDetails, isLoading: isLoadingDetails } =
    usePokemonInfo(pokemonUrls);

  const isLoading = isLoadingList || isLoadingDetails || isSearching;

  // combine search result and pokemon details to display
  let displayedPokemon = searchQuery
    ? searchResult
      ? [searchResult]
      : []
    : pokemonDetails || [];

  // filter pokemon by selected letter
  if (selectedLetter && !searchQuery) {
    displayedPokemon = displayedPokemon.filter((pokemon) =>
      pokemon.name.toUpperCase().startsWith(selectedLetter),
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-64">
          <LoadingPokeball />
          <p className="mt-2 text-center">Loading Pokémons...</p>
        </div>
      ) : displayedPokemon.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedPokemon.map((pokemon) => (
            <motion.div
              key={pokemon.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.25 }}
            >
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          No Pokémon found {searchQuery && `for "${searchQuery}"`}
          {selectedLetter && ` starting with "${selectedLetter}"`}
        </div>
      )}

      {!searchQuery && hasNextPage && !isLoading && (
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
      <aside className="fixed right-0 top-0 h-full z-10 hidden md:block">
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
