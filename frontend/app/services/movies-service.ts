import { IMovie } from '@/types/movies'
import { BaseService } from './base-service'
import { TGenres } from '@/types/genres'

export class MoviesService extends BaseService {
  private MOVIES_URL: string
  private GENRES_URL: string

  constructor() {
    super()
    this.MOVIES_URL = `${this.apiURL}/movies/`
    this.GENRES_URL = `${this.apiURL}/genres`
  }

  async getRandomMovies(): Promise<IMovie[]> {
    const url = `${this.MOVIES_URL}/random`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch random movies')
    }
    return response.json()
  }

  async getTopMovies(): Promise<IMovie[]> {
    const url = `${this.MOVIES_URL}/top`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch top movies')
    }
    return response.json()
  }

  async getMovie(id: string | number): Promise<IMovie> {
    const url = `${this.MOVIES_URL}/${id}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch movie - ID ${id} not found.`)
    }
    return response.json()
  }

  async searchMovies(
    query: string,
    order?: string,
    genre?: number,
  ): Promise<IMovie[]> {
    const params = new URLSearchParams()
    params.append('query', query)
    if (order) params.append('order', order)
    if (genre) params.append('genre', genre?.toString())
    // /api/movies/search?query=${query}&order=${order}&genre=${genre}
    const url = `${this.MOVIES_URL}search?${params.toString()}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to search movies`)
    }
    return response.json()
  }

  async getGenres(): Promise<TGenres> {
    const url = `${this.GENRES_URL}`
    console.log('Will call for genres url: ', url)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch genres`)
    }
    return response.json()
  }
}

export const moviesServiceInstance = new MoviesService()
