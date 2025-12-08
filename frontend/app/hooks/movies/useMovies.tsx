import { useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { moviesQueryKeys } from './useMoviesQueryKeys'
import { getRandomMoviesQueryFn } from './useMoviesQueries'
import { IMovie } from '@/types/movies'
import { useMoviesService } from './useMovieService'

export interface UseMoviesOptions {
  /**
   * Whether to automatically load random movies data when the hook is initialized
   * @default true
   */
  autoload?: boolean
  /**
   * Refetch interval (Tanstack query defaults)
   * @default undefined
   */
  refetchInterval?: number
}

export interface UseMoviesResult {
  movies: IMovie[] | undefined
  isLoading: boolean
  error: Error | undefined
  refresh: () => Promise<void>
}

export const useRandomMovies = (
  options: UseMoviesOptions = {},
): UseMoviesResult => {
  const { autoload, refetchInterval } = options
  const moviesService = useMemo(() => useMoviesService(), [])

  const queryKey = useMemo(() => moviesQueryKeys.randomMovies(), [])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKey || ['randomMovies'],
    queryFn: () => {
      if (!moviesService) {
        throw new Error('Movies service not available')
      }
      return getRandomMoviesQueryFn(moviesService)
    },
    enabled: autoload && !!moviesService,
    refetchInterval: refetchInterval,
    refetchOnReconnect: true,
    placeholderData: (previousData) => previousData,
  })

  const refresh = useCallback(async () => {
    await refetch()
  }, [refetch])

  const movieError = useMemo<Error | undefined>(() => {
    if (!error) return undefined
    return new Error('Failed to load randomMovies')
  }, [error])

  return {
    movies: data,
    isLoading: isLoading,
    error: movieError,
    refresh,
  }
}
