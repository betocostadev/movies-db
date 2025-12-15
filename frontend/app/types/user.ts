import { IMovie } from './movies'

export interface IUser {
  id: number
  name: string
  email: string
  password: string
  favorites: IMovie[]
  watchlist: IMovie[]
}
