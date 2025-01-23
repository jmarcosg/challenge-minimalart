export const paths = {
  home: {
    getHref: () => '/',
  },

  app: {
    pokemon: {
        getHref: () => `/pokemon/${name}`, 
    },
  },
} as const;
