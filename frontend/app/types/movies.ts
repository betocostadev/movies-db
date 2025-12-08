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
  casting: null | string[]
  genres: null | string[]
  keywords: null | string[]
}

export type TMovieListKey = 'random-movies' | 'top-movies'
