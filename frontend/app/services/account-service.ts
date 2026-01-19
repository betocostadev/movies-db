import { IUser } from '@/types/user'
import { BaseService } from './base-service'
import { getJwt, setJwt } from '@/storage/accountStorage'
import { TCollection } from '@/types/movies'

// Account API endpoints
// AccountRegisterRoute     = "/api/account/register/"
// AccountAuthenticateRoute = "/api/account/authenticate/"

// Protected API endpoints
// AccountFavorites = "/api/account/favorites/"
// AccountWatchlist = "/api/account/watchlist/"
// SaveToCollection = "/api/account/save-to-collection/"

type CollectionReq = {
  id: number
  collection: TCollection
}

export class AccountService extends BaseService {
  private ACCOUNT_URL: string

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

    const result = await response.json()
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Service: Login failed')
    }

    if (result.jwt) {
      await setJwt(result.jwt)
    }
  }

  async registerUser({ name, email, password }: Partial<IUser>) {
    if (!name || !email || !password) {
      throw new Error('User name, email, and password are required.')
    }
    const response = await fetch(`${this.ACCOUNT_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const result = await response.json()
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Registration failed')
    }

    return result
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
      throw new Error('Service: Failed to fetch user data')
    }
    return response.json()
  }

  async saveToCollection({ id, collection }: CollectionReq) {
    const jwt = await getJwt()
    const url = `${this.ACCOUNT_URL}/save-to-collection/`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: jwt ? `Bearer ${jwt}` : '',
      },
      body: JSON.stringify({ movie_id: Number(id), collection }),
    })

    if (!response.ok) {
      throw new Error(`Service: Failed to add movie to ${collection}`)
    }

    const data = await response.json()

    return data
  }

  async getFavorites() {
    const jwt = await getJwt()
    const url = `${this.ACCOUNT_URL}/favorites/`
    const response = await fetch(url, {
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : '',
      },
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(
        result.message || 'Service: Unable to fetch favorite movies',
      )
    }

    return result ?? []
  }

  async getWatchlist() {
    const jwt = await getJwt()
    const url = `${this.ACCOUNT_URL}/watchlist/`
    const response = await fetch(url, {
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : '',
      },
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Service: Unable to fetch watchlist')
    }

    return result ?? []
  }
}

export const accountServiceInstance = new AccountService()
