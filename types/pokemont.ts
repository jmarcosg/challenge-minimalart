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

