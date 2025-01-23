import { PokemonInfoSkeleton } from '@/components/shared/pokemon-info-skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { pokemonTypeColors } from '@/lib/pokemon-type-colors';
import { usePokedexStore } from '@/store/pokedex-store';
import { Pokemon } from '@/types/pokemon';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

function PokemonContent({ pokemon }: { pokemon: Pokemon }) {
  return (
    <>
      <div className="relative aspect-square w-full max-w-[300px] mx-auto">
        <Image
          src={
            pokemon.sprites.other?.['official-artwork']?.front_default ||
            '/placeholder.svg'
          }
          alt={pokemon.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="space-y-4">
        <div className="flex justify-center">
          <Button asChild>
            <Link href={`/pokemon/${pokemon.name}`}>
              View Full Details <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
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

export function PokemonDetails() {
  const { selectedPokemon, setSelectedPokemon } = usePokedexStore();
  const isMobile = useIsMobile();

  if (!selectedPokemon) return null;

  const handleClose = () => setSelectedPokemon(null);

  if (isMobile) {
    return (
      <Sheet open={!!selectedPokemon} onOpenChange={handleClose}>
        <SheetContent side="bottom" className="h-[90vh]">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold capitalize flex items-center gap-2">
              {selectedPokemon.name}
              <span className="text-lg text-muted-foreground">
                #{selectedPokemon.id.toString().padStart(3, '0')}
              </span>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full py-4">
            <Suspense fallback={<PokemonInfoSkeleton />}>
              <PokemonContent pokemon={selectedPokemon} />
            </Suspense>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={!!selectedPokemon} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold capitalize flex items-center gap-2">
            {selectedPokemon.name}
            <span className="text-lg text-muted-foreground">
              #{selectedPokemon.id.toString().padStart(3, '0')}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 md:grid-cols-2">
          <Suspense fallback={<PokemonInfoSkeleton />}>
            <PokemonContent pokemon={selectedPokemon} />
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  );
}
