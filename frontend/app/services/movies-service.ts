import { IMovie } from '@/types/movies'
import { BaseService } from './base-service'

export class MoviesService extends BaseService {
  private MOVIES_URL: string

  constructor() {
    super()
    this.MOVIES_URL = `${this.apiURL}/movies/`
  }

  async getRandomMovies(): Promise<IMovie> {
    const url = `${this.MOVIES_URL}/random`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch random movies')
    }
    return response.json()
  }

  async getTopMovies() {
    const url = `${this.MOVIES_URL}/top`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch top movies')
    }
    return response.json()
  }
}

export const moviesServiceInstance = new MoviesService()
