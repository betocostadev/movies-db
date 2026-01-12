import { IUser } from '@/types/user'
import { BaseService } from './base-service'
import { getJwt, setJwt } from '@/storage/accountStorage'

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
    this.ACCOUNT_URL = `${this.apiURL}account`
  }

  async login(email: string, password: string) {
    const response = await fetch(`${this.ACCOUNT_URL}/authenticate/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    console.log(JSON.stringify({ email, password }))

    console.log(response)

    const result = await response.json()
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Login failed')
    }

    console.log('Login service, data:')
    console.log(result)

    if (result.jwt) {
      await setJwt(result.jwt)
    }
  }

  async registerUser({ name, email, password }: Partial<IUser>) {
    if (!name || !email || !password) {
      throw new Error('User name, email, and password are required.')
    }
    console.log('Would call: ', `${this.ACCOUNT_URL}/register/`)
    console.log('Body: ', { name, email, password })

    return true
  }

  async getUserData() {
    const jwt = await getJwt()
    const response = await fetch(`${this.ACCOUNT_URL}/`, {
      headers: { Authorization: jwt ? `Bearer ${jwt}` : '' },
    })
    if (response.status === 401) {
      throw new Error('UNAUTHORIZED')
    }
    if (!response.ok) {
      throw new Error('Failed to fetch user data')
    }
    return response.json()
  }
}

export const accountServiceInstance = new AccountService()
