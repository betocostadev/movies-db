import {
  AccountService,
  accountServiceInstance,
} from '@/services/account-service'
import { IUser } from '@/types/user'

export const registerUserMutationFn = async (
  user: Pick<IUser, 'name' | 'email' | 'password'>,
) => {
  const { name, email, password } = user
  const newUser = await accountServiceInstance.registerUser({
    name,
    email,
    password,
  })

  if (!newUser) {
    throw new Error('Unable to register user')
  }

  return newUser
}

export const loginMutationFn = async (
  accountService: AccountService,
  { email, password }: { email: string; password: string },
) => {
  return accountService.login(email, password)
}
