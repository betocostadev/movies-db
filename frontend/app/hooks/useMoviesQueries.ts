import { MoviesService } from '@/services/movies-service'

export const getRandomMoviesQueryFn = async (moviesService: MoviesService) => {
  const randomMovies = await moviesService.getRandomMovies()

  if (!randomMovies) {
    throw new Error('Unable to fetch random movies')
  }

  return randomMovies
}
