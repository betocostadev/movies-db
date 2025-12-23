import { useAccountService } from './useAccountService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registerUserMutationFn } from './useAccountMutations'
import { IUser } from '@/types/user'
import { accountQueryKeys } from './useAccountQueryKeys'

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
