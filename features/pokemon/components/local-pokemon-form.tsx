import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { pokemonAbilites } from '@/lib/pokemon-abilities';
import { pokemonTypes } from '@/lib/pokemon-types';
import { usePokedexStore } from '@/store/pokedex-store';
import type { Pokemon } from '@/types/pokemon';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
        url: z.string(),
      }),
    }),
  ),
  height: z
    .string()
    .min(1, { message: 'Height is required' })
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: 'Invalid unit value',
    }),
  weight: z
    .string()
    .min(1, { message: 'Weight is required' })
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: 'Invalid unit value',
    }),
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
        url: z.string(),
      }),
      is_hidden: z.boolean(),
      slot: z.number(),
    }),
  ),
  stats: z.array(
    z.object({
      name: z.string(),
      base_stat: z
        .string()
        .min(1, { message: 'Stat is required' })
        .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
          message: 'Invalid unit value',
        }),
    }),
  ),
});

export function LocalPokemonForm() {
  const [isOpen, setIsOpen] = useState(false);
  const addLocalPokemon = usePokedexStore((state) => state.addLocalPokemon);
  const randomTypes = pokemonTypes
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    .map((type) => type);
  const formattedRandomTypes = randomTypes.map((type, index) => ({
    slot: index + 1,
    type: {
      name: type,
      url: `https://pokeapi.co/api/v2/type/${index + 1}/`,
    },
  }));
  const randomAbilities = pokemonAbilites
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  const formattedRandomAbilities = randomAbilities.map((ability, index) => ({
    ability: {
      name: ability,
      url: `https://pokeapi.co/api/v2/ability/${index + 1}/`,
    },
    is_hidden: index === 1,
    slot: index + 1,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: Math.floor(Math.random() * 1000),
      name: '',
      types: formattedRandomTypes,
      height: '',
      weight: '',
      abilities: formattedRandomAbilities,
      stats: [
        { name: 'hp', base_stat: Math.floor(Math.random() * 100).toString() },
        {
          name: 'attack',
          base_stat: Math.floor(Math.random() * 100).toString(),
        },
        {
          name: 'defense',
          base_stat: Math.floor(Math.random() * 100).toString(),
        },
        {
          name: 'special-attack',
          base_stat: Math.floor(Math.random() * 100).toString(),
        },
        {
          name: 'special-defense',
          base_stat: Math.floor(Math.random() * 100).toString(),
        },
        {
          name: 'speed',
          base_stat: Math.floor(Math.random() * 100).toString(),
        },
      ],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addLocalPokemon(values as unknown as Pokemon);
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="ms-2" variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Local Pokémon</SheetTitle>
          <SheetDescription>
            Types, Abilities and Stats are generated randomly
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Add Pokémon</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
