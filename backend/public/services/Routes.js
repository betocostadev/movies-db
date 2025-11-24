import { AccountPage } from '../components/AccountPage.js'
import { HomePage } from '../components/HomePage.js'
import { LoginPage } from '../components/LoginPage.js'
import { MovieDetailsPage } from '../components/MovieDetailsPage.js'
import { MoviesPage } from '../components/MoviesPage.js'
import { RegisterPage } from '../components/RegisterPage.js'
import { FavoritePage } from '../components/FavoritePage.js'
import { WatchlistPage } from '../components/WatchlistPage.js'

// Use regexes to generate dynamic routes
export const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/movies/',
    component: MoviesPage,
  },
  {
    // /movies/14
    path: /\/movies\/(\d+)/,
    component: MovieDetailsPage,
  },
  {
    path: '/account/register/',
    component: RegisterPage,
  },
  {
    path: '/account/login/',
    component: LoginPage,
  },
  {
    path: '/account/',
    component: AccountPage,
    loggedIn: true,
  },
  {
    path: '/account/favorites',
    component: FavoritePage,
    loggedIn: true,
  },
  {
    path: '/account/watchlist',
    component: WatchlistPage,
    loggedIn: true,
  },
]
