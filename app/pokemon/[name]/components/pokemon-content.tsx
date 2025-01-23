import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { pokemonTypeColors } from '@/lib/pokemon-type-colors';
import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';

interface PokemonContentProps {
  pokemon: Pokemon;
  isStandalone?: boolean;
}

export function PokemonContent({ pokemon }: PokemonContentProps) {
  return (
    <>
      <div className="relative aspect-square w-full max-w-[300px] mx-auto">
        <Image
          src={
            pokemon.sprites.other['official-artwork'].front_default ||
            '/placeholder.svg'
          }
          alt={pokemon.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Types</h3>
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
        </div>
        <div>
          <h3 className="font-semibold mb-2">Stats</h3>
          <div className="space-y-2">
            {pokemon.stats.map(({ base_stat, stat }) => (
              <div key={stat.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">
                    {stat.name.replace('-', ' ')}
                  </span>
                  <span>{base_stat}</span>
                </div>
                <Progress value={base_stat} max={255} />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Height</h3>
            <p>{(pokemon.height / 10).toFixed(1)}m</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Weight</h3>
            <p>{(pokemon.weight / 10).toFixed(1)}kg</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Abilities</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map(({ ability, is_hidden }) => (
              <Badge
                key={ability.name}
                variant={is_hidden ? 'outline' : 'default'}
              >
                {ability.name.replace('-', ' ')}
                {is_hidden && ' (Hidden)'}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
