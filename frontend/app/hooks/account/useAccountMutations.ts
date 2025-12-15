import { AccountService } from '@/services/account-service'
import { IUser } from '@/types/user'

export const registerUserMutationFn = async (
  accountService: AccountService,
  user: Pick<IUser, 'name' | 'email' | 'password'>,
) => {
  const { name, email, password } = user
  const newUser = await accountService.registerUser({ name, email, password })

  if (!newUser) {
    throw new Error('Unable to register user')
  }

  return newUser
}
