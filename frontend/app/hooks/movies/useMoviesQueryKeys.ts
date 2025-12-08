export const moviesQueryKeys = {
  all: ['movies'],
  randomMovies: () => [...moviesQueryKeys.all, 'random-movies'] as const,
  topMovies: () => [...moviesQueryKeys.all, 'top-movies'] as const,
}
