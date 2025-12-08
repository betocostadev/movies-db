import { MoviesService } from '@/services/movies-service'

export const getRandomMoviesQueryFn = async (moviesService: MoviesService) => {
  const randomMovies = await moviesService.getRandomMovies()

  if (!randomMovies) {
    throw new Error('Unable to fetch random movies')
  }

  console.log('===== RANDOM ======')
  console.log(randomMovies)

  return randomMovies
}

export const getTopMoviesQueryFn = async (moviesService: MoviesService) => {
  const topMovies = await moviesService.getTopMovies()

  if (!topMovies) {
    throw new Error('Unable to fetch top movies')
  }

  console.log('===== TOP ======')
  console.log(topMovies)

  return topMovies
}
