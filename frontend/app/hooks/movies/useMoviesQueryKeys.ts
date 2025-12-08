export const moviesQueryKeys = {
  all: ['movies'],
  randomMovies: () => [...moviesQueryKeys.all] as const,
  topMovies: () => [...moviesQueryKeys.all] as const,
}
