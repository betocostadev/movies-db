import { useQuery } from '@tanstack/react-query'
import { getRandomMovies } from '@/services/movies-service'

export const useMovies = () => {
  const query = useQuery({
    queryKey: ['random-movies'],
    queryFn: getRandomMovies,
  })

  return {
    movies: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }
}
