import { useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAccountService } from './useAccountService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginMutationFn, registerUserMutationFn } from './useAccountMutations'
import { IUser } from '@/types/user'
import { accountQueryKeys } from './useAccountQueryKeys'
import { getUserDataQueryFn } from './useAccountQueries'
import { useAuth } from '@/contexts/authContext'
import { removeJwt } from '@/storage/accountStorage'

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
      return getUserDataQueryFn(accountService)
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
      loginMutationFn(accountService, creds),
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

  return useMutation({
    mutationFn: (user: Pick<IUser, 'name' | 'email' | 'password'>) =>
      registerUserMutationFn(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.current() })
    },
    // onError, onSettled, etc. as needed
  })
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

// useMutation({
//   mutationFn: mutationFn,
//   onSuccess: (data, variables, context) => {
//     // Called on success
//     // e.g., show toast, invalidate queries
//   },
//   onError: (error, variables, context) => {
//     // Called on error
//     // e.g., show error message
//   },
//   onSettled: (data, error, variables, context) => {
//     // Called on both success and error
//     // e.g., cleanup, always invalidate queries
//   },
// })
