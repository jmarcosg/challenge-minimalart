import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePokedexStore } from '@/store/pokedex-store';
import type { Pokemon } from '@/types/pokemon';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export function LocalPokemonForm() {
  const [isOpen, setIsOpen] = useState(false);
  const addLocalPokemon = usePokedexStore((state) => state.addLocalPokemon);

  const [name, setName] = useState('');
  const [types, setTypes] = useState(['']);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [abilities, setAbilities] = useState(['']);
  const [stats, setStats] = useState([
    { name: 'hp', base_stat: 0 },
    { name: 'attack', base_stat: 0 },
    { name: 'defense', base_stat: 0 },
    { name: 'special-attack', base_stat: 0 },
    { name: 'special-defense', base_stat: 0 },
    { name: 'speed', base_stat: 0 },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPokemon = {
      id: Date.now(),
      name,
      types: types.map((type) => ({ type: { name: type } })),
      height,
      weight,
      abilities: abilities.map((ability) => ({
        ability: { name: ability },
        is_hidden: false,
      })),
      stats: stats.map((stat) => ({ ...stat, effort: 0 })),
      sprites: {
        other: {
          'official-artwork': {
            front_default: '/who-is-that-pokemon.jpg',
          },
        },
      },
    } as unknown as Pokemon;

    addLocalPokemon(newPokemon);
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setTypes(['']);
    setHeight(0);
    setWeight(0);
    setAbilities(['']);
    setStats([
      { name: 'hp', base_stat: 0 },
      { name: 'attack', base_stat: 0 },
      { name: 'defense', base_stat: 0 },
      { name: 'special-attack', base_stat: 0 },
      { name: 'special-defense', base_stat: 0 },
      { name: 'speed', base_stat: 0 },
    ]);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="ms-2">
          <Plus className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Local Pokémon</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Types</Label>
            {types.map((type, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  value={type}
                  onChange={(e) => {
                    const newTypes = [...types];
                    newTypes[index] = e.target.value;
                    setTypes(newTypes);
                  }}
                  required
                />
                {index === types.length - 1 && (
                  <Button
                    type="button"
                    onClick={() => setTypes([...types, ''])}
                  >
                    +
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div>
            <Label htmlFor="height">Height (dm)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight (hg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label>Abilities</Label>
            {abilities.map((ability, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  value={ability}
                  onChange={(e) => {
                    const newAbilities = [...abilities];
                    newAbilities[index] = e.target.value;
                    setAbilities(newAbilities);
                  }}
                  required
                />
                {index === abilities.length - 1 && (
                  <Button
                    type="button"
                    onClick={() => setAbilities([...abilities, ''])}
                  >
                    +
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div>
            <Label>Stats</Label>
            {stats.map((stat, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input value={stat.name} disabled />
                <Input
                  type="number"
                  value={stat.base_stat}
                  onChange={(e) => {
                    const newStats = [...stats];
                    newStats[index].base_stat = Number(e.target.value);
                    setStats(newStats);
                  }}
                  required
                />
              </div>
            ))}
          </div>
          <Button type="submit">Add Pokémon</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
