'use client';

import { Button } from '@/components/ui/button';
import { usePokemonByName } from '@/features/pokemon/api/get-pokemon-by-name';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { StandalonePokemonInfo } from './components/standalone-pokemon-info';

export default function PokemonPage() {
  const params = useParams();
  const pokemonName = params.name as string;
  const { data: pokemon, isLoading, error } = usePokemonByName(pokemonName);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl mb-4">Failed to load Pokémon data</p>
        <Button asChild>
          <Link href="/">Back to Pokédex</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button asChild className="mb-4">
        <Link href="/">Back to Pokédex</Link>
      </Button>
      <StandalonePokemonInfo pokemon={pokemon} />
    </div>
  );
}
