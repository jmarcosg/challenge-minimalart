'use client';

import { ListPokemons } from '@/features/pokemon/components/list-pokemons';
import { SearchInput } from '@/features/pokemon/components/search-input';

export default function PokedexPage() {
  return (
    <div className="">
      <div className="max-w-xl mx-auto mb-8">
        <SearchInput />
      </div>

      <ListPokemons />
    </div>
  );
}
