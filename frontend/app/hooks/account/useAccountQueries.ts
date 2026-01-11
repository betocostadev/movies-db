import { AccountService } from '@/services/account-service'

export const getUserDataQueryFn = async (accountService: AccountService) => {
  const userData = await accountService.getUserData()

  if (!userData) {
    throw new Error('Unable to fetch user data')
  }

  return userData
}
