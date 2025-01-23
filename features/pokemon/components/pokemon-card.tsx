import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pokemonTypeColors } from '@/lib/pokemon-type-colors';
import { usePokedexStore } from '@/store/pokedex-store';
import Image from 'next/image';
import type { Pokemon } from '../../../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const setSelectedPokemon = usePokedexStore(
    (state) => state.setSelectedPokemon,
  );

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setSelectedPokemon(pokemon)}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-lg capitalize flex items-center justify-between">
          {pokemon.name}
          <span className="text-sm text-muted-foreground">
            #{pokemon.id.toString().padStart(3, '0')}
          </span>
        </CardTitle>
        <div className="flex gap-2">
          {pokemon.types.map(({ type }) => (
            <Badge
              key={type.name}
              className={`${
                pokemonTypeColors[type.name] || 'bg-gray-500'
              } text-white`}
            >
              {type.name}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="relative w-full aspect-square">
          <Image
            src={
              pokemon.sprites.other?.['official-artwork']?.front_default ||
              '/placeholder.svg' ||
              '/placeholder.svg'
            }
            alt={pokemon.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </CardContent>
    </Card>
  );
}
