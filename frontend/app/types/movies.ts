export interface IMovie {
  id: number
  tmdb_id: number
  title: string
  overview: string
  tagline: string
  poster_url: string
  trailer_url?: string
  release_year: number
  language: string
  score: number
  popularity: number
  casting: null | TMovieCasting[]
  genres: null | TMovieGenre[]
  keywords: null | string[]
}

type TMovieGenre = {
  id: number
  name: string
}

export type TMovieCasting = {
  id: number
  image_url: string | null
  first_name: string
  last_name: string
}

export type TMovieListKey = 'random-movies' | 'top-movies'
