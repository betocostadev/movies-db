import { useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { moviesQueryKeys } from './useMoviesQueryKeys'
import {
  getMovieQueryFn,
  getRandomMoviesQueryFn,
  getTopMoviesQueryFn,
} from './useMoviesQueries'
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

interface BaseResult {
  isLoading: boolean
  error: Error | undefined
  refresh: () => Promise<void>
}

export interface UseMoviesResult extends BaseResult {
  movies: IMovie[] | undefined
}

export interface UseMovieResult extends BaseResult {
  movie: IMovie | undefined
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

export const useTopMovies = (
  options: UseMoviesOptions = {},
): UseMoviesResult => {
  const { autoload, refetchInterval } = options
  const moviesService = useMemo(() => useMoviesService(), [])

  const queryKey = useMemo(() => moviesQueryKeys.topMovies(), [])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKey,
    queryFn: () => {
      if (!moviesService) {
        throw new Error('Movies service not available')
      }
      return getTopMoviesQueryFn(moviesService)
    },
    enabled: autoload && !!moviesService,
    refetchInterval: refetchInterval,
    refetchOnReconnect: true,
    placeholderData: (previousData) => previousData,
  })

  const refresh = useCallback(async () => {
    refetch()
  }, [refetch])

  const movieError = useMemo<Error | undefined>(() => {
    if (!error) return undefined
    return new Error('Failed to load top movies')
  }, [error])

  return {
    movies: data,
    isLoading,
    error: movieError,
    refresh,
  }
}

export const useMovie = ({
  options = {},
  id,
}: {
  options: UseMoviesOptions
  id: string | number | undefined
}) => {
  const { autoload, refetchInterval } = options
  const moviesService = useMemo(() => useMoviesService(), [])

  if (!id) {
    throw new Error('Movie ID must be provided')
  }

  const queryKey = useMemo(() => moviesQueryKeys.movie(id), [id])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKey,
    queryFn: () => {
      if (!moviesService) {
        throw new Error('Movies service not available')
      }
      return getMovieQueryFn({ moviesService, id })
    },
    enabled: autoload && !!moviesService,
    refetchInterval: refetchInterval,
    refetchOnReconnect: true,
    placeholderData: (previousData) => previousData,
  })

  const refresh = useCallback(async () => {
    refetch()
  }, [refetch])

  const movieError = useMemo<Error | undefined>(() => {
    if (!error) return undefined
    return new Error('Failed to load selected movie')
  }, [error])

  return {
    movie: data,
    isLoading,
    error: movieError,
    refresh,
  }
}
