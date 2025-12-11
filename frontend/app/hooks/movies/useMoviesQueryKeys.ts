export const moviesQueryKeys = {
  all: ['movies'],
  randomMovies: () => [...moviesQueryKeys.all, 'random-movies'] as const,
  topMovies: () => [...moviesQueryKeys.all, 'top-movies'] as const,
  movie: (id: string | number) =>
    [...moviesQueryKeys.all, 'movie', id] as const,
}
