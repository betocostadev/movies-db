import { useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAccountService } from './useAccountService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  loginMutationFn,
  registerUserMutationFn,
  saveToCollectionMutationFn,
} from './useAccountMutations'
import { IUser } from '@/types/user'
import { accountQueryKeys } from './useAccountQueryKeys'
import {
  getUserDataQueryFn,
  getUserFavoriteMoviesQueryFn,
  getUserWatchlistMoviesQueryFn,
} from './useAccountQueries'
import { useAuth } from '@/contexts/authContext'
import { removeJwt, setJwt } from '@/storage/accountStorage'
import { IMovie, TCollection } from '@/types/movies'

export interface UseUserOptions {
  /**
   * Whether to automatically load user data when the hook is initialized
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

export interface UseUserResult extends BaseResult {
  user: IUser
}

export interface UseFavoritesResult extends BaseResult {
  favorites: IMovie[] | undefined
}

export interface UseWatchlistResult extends BaseResult {
  watchlist: IMovie[] | undefined
}

export const useUserData = (options: UseUserOptions = {}): UseUserResult => {
  const { autoload, refetchInterval } = options
  const accountService = useMemo(() => useAccountService(), [])
  const { user } = useAuth()

  const queryKey = useMemo(() => accountQueryKeys.current(), [])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKey || ['current'],
    queryFn: () => {
      if (!accountService) {
        throw new Error('Account service is not available')
      }
      return getUserDataQueryFn()
    },
    enabled: autoload && !!accountService && !!user,
    refetchInterval: refetchInterval,
    refetchOnReconnect: true,
    placeholderData: (previousData) => previousData,
  })

  const refresh = useCallback(async () => {
    await refetch()
  }, [refetch])

  const userError = useMemo<Error | undefined>(() => {
    if (!error) return undefined
    return error
  }, [error])

  return {
    user: data,
    isLoading: isLoading,
    error: userError,
    refresh,
  }
}

export const useLogin = () => {
  const accountService = useAccountService()
  const queryClient = useQueryClient()
  const { setUser } = useAuth()

  const mutation = useMutation({
    mutationFn: (creds: { email: string; password: string }) =>
      loginMutationFn(creds),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.current() })
      const userData = await accountService.getUserData()
      setUser(userData)
    },
  })

  return {
    login: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | undefined,
    reset: mutation.reset,
  }
}

export const useRegisterUser = () => {
  const queryClient = useQueryClient()
  const accountService = useAccountService()
  const { setUser } = useAuth()

  const mutation = useMutation({
    mutationFn: (user: Pick<IUser, 'name' | 'email' | 'password'>) =>
      registerUserMutationFn(user),
    onSuccess: async (result) => {
      if (result?.jwt) {
        await setJwt(result.jwt)
      }
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.current() })
      const userData = await accountService.getUserData()
      setUser(userData)
    },
  })

  return {
    register: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | undefined,
    reset: mutation.reset,
  }
}

export const useLogout = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()
  const { setUser } = useAuth()

  const mutation = useMutation({
    mutationFn: async () => {
      await removeJwt()
      setUser(null)
      queryClient.removeQueries({ queryKey: accountQueryKeys.current() })
    },
    onSuccess: () => {
      if (onSuccess) onSuccess()
    },
  })

  return {
    logout: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | undefined,
    reset: mutation.reset,
  }
}

export const useSaveToCollection = (onSuccess?: () => void) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: { id: number; collection: TCollection }) => {
      if (!user) throw new Error('No user available')
      return saveToCollectionMutationFn(data)
    },
    onSuccess: async (_result, variables) => {
      if (onSuccess) onSuccess()
      if (variables.collection === 'favorite') {
        queryClient.invalidateQueries({
          queryKey: accountQueryKeys.favorites(),
        })
      } else if (variables.collection === 'watchlist') {
        queryClient.invalidateQueries({
          queryKey: accountQueryKeys.watchlist(),
        })
      }
    },
  })

  return {
    saveToCollection: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | undefined,
  }
}

export const useUserFavoriteMovies = (
  options: UseUserOptions = {},
): UseFavoritesResult => {
  const { autoload, refetchInterval } = options
  const { user } = useAuth()
  const accountService = useMemo(() => useAccountService(), [])
  const queryKey = useMemo(() => accountQueryKeys.favorites(), [])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKey || ['favorites'],
    queryFn: () => {
      if (!accountService) {
        throw new Error('Account service is not available')
      }
      if (!user) throw new Error('No user available')
      return getUserFavoriteMoviesQueryFn()
    },
    enabled: autoload && !!user && !!accountService,
    refetchInterval: refetchInterval,
    refetchOnReconnect: true,
    placeholderData: (previousData) => previousData,
  })

  const refresh = useCallback(async () => {
    await refetch()
  }, [refetch])

  const userError = useMemo<Error | undefined>(() => {
    if (!error) return undefined
    return error
  }, [error])

  return {
    favorites: data,
    isLoading: isLoading,
    error: userError,
    refresh,
  }
}

export const useUserWatchlistMovies = (
  options: UseUserOptions = {},
): UseWatchlistResult => {
  const { autoload, refetchInterval } = options
  const { user } = useAuth()
  const accountService = useMemo(() => useAccountService(), [])
  const queryKey = useMemo(() => accountQueryKeys.watchlist(), [])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKey || ['watchlist'],
    queryFn: () => {
      if (!accountService) {
        throw new Error('Account service is not available')
      }
      if (!user) throw new Error('No user available')
      return getUserWatchlistMoviesQueryFn()
    },
    enabled: autoload && !!user && !!accountService,
    refetchInterval: refetchInterval,
    refetchOnReconnect: true,
    placeholderData: (previousData) => previousData,
  })

  const refresh = useCallback(async () => {
    await refetch()
  }, [refetch])

  const userError = useMemo<Error | undefined>(() => {
    if (!error) return undefined
    return error
  }, [error])

  return {
    watchlist: data,
    isLoading: isLoading,
    error: userError,
    refresh,
  }
}
