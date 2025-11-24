import { API } from './services/API.js'
// import { HomePage } from './components/HomePage.js'

import './components/YoutubeEmbed.js'
import './components/AnimatedLoading.js'
import { Router } from './services/Router.js'
import Store from './services/Store.js'
// console.log(API)
window.addEventListener('DOMContentLoaded', () => {
  app.Router.init()
  // document.querySelector('main').appendChild(new HomePage())
})

const getFieldValueById = (id) => {
  return document.getElementById(id).value
}

window.app = {
  api: API,
  Router,
  Store,
  showError: (message = 'There was an error.', goToHome = false) => {
    document.getElementById('alert-modal').showModal()
    document.querySelector('#alert-modal p').textContent = message
    if (goToHome) app.Router.go('/')
  },
  closeError: () => {
    document.getElementById('alert-modal').close()
  },
  search: (event) => {
    event.preventDefault()
    const query = document.querySelector('input[type=search]').value
    if (query.length > 1) {
      app.Router.go(`/movies/?query=${query}`)
    }
  },
  searchOrderChange: (order) => {
    const urlParams = new URLSearchParams(window.location.search)
    const q = urlParams.get('query')
    const genre = urlParams.get('genre') ?? ''
    app.Router.go(`/movies/?query=${q}&order=${order}&genre=${genre}`)
  },
  searchFilterChange: (genre) => {
    const urlParams = new URLSearchParams(window.location.search)
    const q = urlParams.get('query')
    const order = urlParams.get('order') ?? ''
    app.Router.go(`/movies/?query=${q}&order=${order}&genre=${genre}`)
  },
  register: async (event) => {
    event.preventDefault()
    const errors = []
    const name = getFieldValueById('register-name')
    const email = getFieldValueById('register-email')
    const password = getFieldValueById('register-password')
    const passwordConfirm = getFieldValueById('register-password-confirm')

    if (name.length < 4) errors.push('Enter your complete name.')
    if (password.length < 7)
      errors.push('Your password must have at least 7 characters.')
    if (email.length < 4) errors.push('Enter your complete e-mail.')
    if (password !== passwordConfirm)
      errors.push('Your passwords don not match.')

    if (errors.length === 0) {
      const response = await API.register(name, email, password)
      if (response.success) {
        app.Store.jwt = response.jwt
        app.app.Router.go('/account/')
      } else {
        console.log(error)
        app.showError(response.message)
      }
    } else {
      app.showError(errors.join('. '))
    }
  },
  login: async (event) => {
    event.preventDefault()
    const errors = []
    const email = getFieldValueById('login-email')
    const password = getFieldValueById('login-password')

    if (password.length < 7)
      errors.push('Your password must have at least 7 characters.')
    if (email.length < 4) errors.push('Enter your complete e-mail.')

    if (errors.length === 0) {
      const response = await API.login(email, password)
      if (response.success) {
        app.Store.jwt = response.jwt
        app.Router.go('/account/')
      } else {
        // show server error
        app.showError(response.message)
      }
    } else {
      app.showError(errors.join('. '))
    }
  },
  logout: async () => {
    Store.jwt = null
    app.Router.go('/')
  },
  saveToCollection: async (movie_id, collection) => {
    if (app.Store.loggedIn) {
      try {
        const response = await API.saveToCollection(movie_id, collection)
        if (response.success) {
          switch (collection) {
            case 'favorite':
              app.Router.go('/account/favorites')
              break
            case 'watchlist':
              app.Router.go('/account/watchlist')
          }
        } else {
          app.showError("We couldn't save the movie.")
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      app.Router.go('/account/')
    }
  },
}
