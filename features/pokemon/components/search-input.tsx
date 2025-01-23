import { Input } from '@/components/ui/input';
import { usePokedexStore } from '@/store/pokedex-store';
import { Search } from 'lucide-react';

export function SearchInput() {
  const { searchQuery, setSearchQuery, setSelectedLetter } = usePokedexStore();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setSelectedLetter(null); // Clear selected letter when searching
  };

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}
