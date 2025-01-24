'use client';

import { LoadingPokeball } from '@/components/shared/loading-pokeball';
import { PokemonInfoSkeleton } from '@/components/shared/pokemon-info-skeleton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePokemonByName } from '@/features/pokemon/api/get-pokemon-by-name';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import { StandalonePokemonInfo } from './components/standalone-pokemon-info';

export default function PokemonPage() {
  const params = useParams();
  const pokemonName = params.name as string;
  const { data: pokemon, isLoading, error } = usePokemonByName(pokemonName);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingPokeball />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="flex flex-col items-center justify-center h-50 bg-white rounded-lg shadow-lg p-8">
        {/* sad pikachu image */}
        <Image
          src="/sad-pikachu.png"
          alt="Sad Pikachu"
          width={200}
          height={200}
        />
        <p className="text-xl mb-4">Failed to load Pokémon data</p>
        <Button asChild>
          <Link href="/">Back to Pokédex</Link>
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <div className="container mx-auto py-8 px-4">
        <Button className="mb-4">
          <ArrowLeft className="h-4 w-4" />
          <Link href="/">Back to Pokédex</Link>
        </Button>

        <Suspense fallback={<PokemonInfoSkeleton />}>
          <StandalonePokemonInfo pokemon={pokemon} />
        </Suspense>
      </div>
    </Card>
  );
}
