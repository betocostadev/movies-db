import { MoviesService } from '@/services/movies-service'

export const getRandomMoviesQueryFn = async (moviesService: MoviesService) => {
  const randomMovies = await moviesService.getRandomMovies()

  if (!randomMovies) {
    throw new Error('Unable to fetch random movies')
  }

  return randomMovies
}

export const getTopMoviesQueryFn = async (moviesService: MoviesService) => {
  const topMovies = await moviesService.getTopMovies()

  if (!topMovies) {
    throw new Error('Unable to fetch top movies')
  }

  return topMovies
}

export const getMovieQueryFn = async ({
  moviesService,
  id,
}: {
  moviesService: MoviesService
  id: string | number
}) => {
  const movie = await moviesService.getMovie(id)

  if (!movie) {
    throw new Error(`Unable to fetch movie with ID: ${id}`)
  }

  return movie
}

export const searchMoviesQueryFn = async ({
  moviesService,
  query,
  order,
  genre,
}: {
  moviesService: MoviesService
  query: string
  order: string
  genre: number
}) => {
  const movies = await moviesService.searchMovies(query, order, genre)

  if (!movies) {
    // TODO: Remove console after debugging
    console.log('Search movies query returned no results')
    return []
  }

  return movies
}

export const getGenresQueryFn = async ({
  moviesService,
}: {
  moviesService: MoviesService
}) => {
  const genres = await moviesService.getGenres()

  if (!genres) {
    throw new Error('Unable to query for movie genres')
  }

  return genres
}
