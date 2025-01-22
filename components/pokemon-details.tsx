import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import type { Pokemon } from "@/types/pokemon"
import Image from "next/image"

interface PokemonDetailsProps {
  pokemon: Pokemon | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-600",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-blue-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-700",
  ghost: "bg-purple-600",
  dragon: "bg-purple-700",
  dark: "bg-gray-700",
  steel: "bg-gray-500",
  fairy: "bg-pink-400",
}

export function PokemonDetails({ pokemon, open, onOpenChange }: PokemonDetailsProps) {
  if (!pokemon) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold capitalize flex items-center gap-2">
            {pokemon.name}
            <span className="text-lg text-muted-foreground">#{pokemon.id.toString().padStart(3, "0")}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 md:grid-cols-2">
          <div className="relative aspect-square">
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default || "/placeholder.svg"}
              alt={pokemon.name}
              fill
              className="object-contain p-4"
              priority
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Types</h3>
              <div className="flex gap-2">
                {pokemon.types.map(({ type }) => (
                  <Badge key={type.name} className={`${typeColors[type.name] || "bg-gray-500"} text-white`}>
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
                      <span className="capitalize">{stat.name.replace("-", " ")}</span>
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
                  <Badge key={ability.name} variant={is_hidden ? "outline" : "default"}>
                    {ability.name.replace("-", " ")}
                    {is_hidden && " (Hidden)"}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

