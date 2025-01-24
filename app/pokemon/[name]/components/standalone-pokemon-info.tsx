import { usePokedexStore } from '@/store/pokedex-store';
import { Pokemon } from '@/types/pokemon';
import { PokemonContent } from './pokemon-content';

interface PokemonInfoProps {
  pokemon?: Pokemon;
}

export function StandalonePokemonInfo({
  pokemon: propPokemon,
}: PokemonInfoProps) {
  const { selectedPokemon } = usePokedexStore();

  const pokemon = propPokemon || selectedPokemon;

  if (!pokemon) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <PokemonContent pokemon={pokemon} />
      </div>
    </div>
  );
}
