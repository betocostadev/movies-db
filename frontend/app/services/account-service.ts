import { IUser } from '@/types/user'
import { BaseService } from './base-service'

// Account API endpoints
// AccountRegisterRoute     = "/api/account/register/"
// AccountAuthenticateRoute = "/api/account/authenticate/"

// Protected API endpoints
// AccountFavorites = "/api/account/favorites/"
// AccountWatchlist = "/api/account/watchlist/"
// SaveToCollection = "/api/account/save-to-collection/"

export class AccountService extends BaseService {
  private ACCOUNT_URL: string
  // const name = getFieldValueById('register-name')
  // const email = getFieldValueById('register-email')
  // const password = getFieldValueById('register-password')
  // const passwordConfirm = getFieldValueById('register-password-confirm')

  constructor() {
    super()
    this.ACCOUNT_URL = `${this.apiURL}/account`
  }

  async registerUser({ name, email, password }: Partial<IUser>) {
    if (!name || !email || !password) {
      throw new Error('User name, email, and password are required.')
    }
    console.log('Would call: ', `${this.ACCOUNT_URL}/register/`)
    console.log('Body: ', { name, email, password })

    return true
  }
}

export const accountServiceInstance = new AccountService()
