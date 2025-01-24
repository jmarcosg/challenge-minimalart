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
    <div className="max-w-2xl mx-auto p-4 rounded-lg">
      <h1 className="text-4xl font-bold capitalize flex gap-2 items-center justify-start">
        {pokemon.name}
        <span className="text-sm text-muted-foreground">
          #{pokemon.id.toString().padStart(3, '0')}
        </span>
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        <PokemonContent pokemon={pokemon} />
      </div>
    </div>
  );
}
