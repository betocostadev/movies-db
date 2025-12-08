import { moviesServiceInstance } from '@/services/movies-service'

export const useMoviesService = () => {
  return moviesServiceInstance
}
