import { Input } from '@/components/ui/input';
import { usePokedexStore } from '@/store/pokedex-store';
import { Search, X } from 'lucide-react';

export function SearchInput() {
  const { searchQuery, setSearchQuery } = usePokedexStore();

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-8 pr-8 bg-white"
      />
      {searchQuery && (
        <X
          className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
          onClick={() => setSearchQuery('')}
        />
      )}
    </div>
  );
}
