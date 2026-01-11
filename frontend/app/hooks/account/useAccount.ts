import { useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAccountService } from './useAccountService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registerUserMutationFn } from './useAccountMutations'
import { IUser } from '@/types/user'
import { accountQueryKeys } from './useAccountQueryKeys'
import { getUserDataQueryFn } from './useAccountQueries'

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

  const queryKey = useMemo(() => accountQueryKeys.current(), [])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKey || ['current'],
    queryFn: () => {
      if (!accountService) {
        throw new Error('Account service is not available')
      }
      return getUserDataQueryFn(accountService)
    },
    enabled: autoload && !!accountService,
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

export const useRegisterUser = () => {
  const accountService = useAccountService()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (user: Pick<IUser, 'name' | 'email' | 'password'>) =>
      registerUserMutationFn(accountService, user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.current() })
    },
    // onError, onSettled, etc. as needed
  })
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
