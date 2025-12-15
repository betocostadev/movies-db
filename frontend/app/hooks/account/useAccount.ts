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
