import { API_URL } from '@/constants/General'

const MOVIES_URL = `${API_URL}/movies/`

export const getRandomMovies = async () => {
  const url = `${MOVIES_URL}/random`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch random movies')
  }
  return response.json()
}

export const getTopMovies = async () => {
  const url = `${MOVIES_URL}/top`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch top movies')
  }
  return response.json()
}
