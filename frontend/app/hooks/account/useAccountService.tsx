import { accountServiceInstance } from '@/services/account-service'

export const useAccountService = () => {
  return accountServiceInstance
}
