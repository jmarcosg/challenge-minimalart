# Pokedex Challenge 👾
Este challenge consiste en crear una app que consuma una API y pueda mostrar la información obtenida en una lista.

Para que este resuelto correctamente es *necesario* que:
- Se cree un componente Button y que al apretarlo se dispare la llamada al endpoint de la API
- Crear y conectar un Loading que se va a mostrar durante todo el tiempo que la API este "cargando"
- Crear un componente de ListPokemons que reciba la información obtenida por el endpoint y dibuje una lista con todos los pokemons adentro + un scrollbar

![Esqueleto](https://i.imgur.com/xKOXY2n.png)

La API a consumir es la siguiente: [Pokeapi](https://pokeapi.co/)
La URL seria => `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`

# Información adicional
Un pokedex es un objecto ficticio que lista información de todos los Pokemons. Un Pokemon es un "animal/mounstro" chiquitito que pelea en batallas contra otros Pokemons. [Pokemon game serires](https://en.wikipedia.org/wiki/Pok%C3%A9mon_(video_game_series)).

## Items a cumplir

- [X] Responsive
- [X] UX/UI
- [X] Uso de algún State Management (~~Context~~, ~~Redux~~, **Zustand**, etc)
- [X] Manejo de API
- [X] Componentes reutilizables (Button, Loading, ListPokemons)

## Puntos Extra

- [X] Paginación
- [X] Buscador
- [X] Filtro por inicial del Pokemon
- [X] Detalle de Pokemon
- [X] Animaciones
- [X] Deploy del proyecto

# Información del proyecto base

Este proyecto fue creado usando:
- Node ^20 LTS
- React 19
- Next.js 15
- Tailwind CSS

## Consideraciones

Se va a analizar la arquitectura de la aplicación, el consumo de información dinámica y la prolijidad al desarrollar.
Es muy importante que la aplicación cumpla con el listado de items y funcionalidades necesarias provisto arriba.

## Scripts

Para instalar todas las dependencias necesarias:
### `npm install` o `npm i`

Para prender el proyecto en modo dev
### `npm run dev`

## Entrega
El proyecto tiene que ser clonado usando el comando `git clone`.
Cada desarrollador debera crear un repositorio en su cuenta de github y subir el proyecto ahí dentro.
Dejandolo público para que luego alguien del equipo lo pueda analizar como corresponda.

(PD: Se puede cambiar el Remote del repositorio si sabe usar `git` correctamente)