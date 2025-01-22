export interface Pokemon {
  id: number
  name: string
  types: {
    type: {
      name: string
    }
  }[]
  sprites: {
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
  height: number
  weight: number
  abilities: {
    ability: {
      name: string
    }
    is_hidden: boolean
  }[]
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

