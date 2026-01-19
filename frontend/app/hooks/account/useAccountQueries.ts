import { accountServiceInstance } from '@/services/account-service'

export const getUserDataQueryFn = async () => {
  const userData = await accountServiceInstance.getUserData()

  if (!userData) {
    throw new Error('Unable to fetch user data')
  }

  return userData
}

export const getUserFavoriteMoviesQueryFn = async () => {
  const favoriteMovies = await accountServiceInstance.getFavorites()

  if (!favoriteMovies) {
    throw new Error('Unable to fetch favorite movies')
  }

  return favoriteMovies
}

export const getUserWatchlistMoviesQueryFn = async () => {
  const watchlistMovies = await accountServiceInstance.getWatchlist()

  if (!watchlistMovies) {
    throw new Error('Unable to fetch watchlist')
  }

  return watchlistMovies
}
