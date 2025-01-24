import { Input } from '@/components/ui/input';
import { usePokedexStore } from '@/store/pokedex-store';
import { Search, X } from 'lucide-react';
import { LocalPokemonForm } from './local-pokemon-form';

export function SearchInput() {
  const { searchQuery, setSearchQuery } = usePokedexStore();

  return (
    <div className="relative flex gap-2 items-center">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-8 pr-8 bg-white w-full"
      />
      {searchQuery && (
        <X
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer"
          onClick={() => setSearchQuery('')}
        />
      )}
      <LocalPokemonForm />
    </div>
  );
}
