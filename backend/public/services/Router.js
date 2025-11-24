import { routes } from './Routes.js'

// One instance of a Router only - Singleton
export const Router = {
  init: () => {
    // Enhance current links
    document.querySelectorAll('a.navlink').forEach((a) => {
      a.addEventListener('click', (event) => {
        event.preventDefault()
        const href = a.getAttribute('href')
        Router.go(href)
      })
    })

    window.addEventListener('popstate', () => {
      Router.go(location.pathname, false)
    })

    // Go to the initial route
    Router.go(location.pathname + location.search)
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState(null, '', route)
    }

    let pageElement = null

    // grab only the path, like: /search?movie=batman - /search
    const routePath = route.includes('?') ? route.split('?')[0] : route

    let isProtected = false

    for (const r of routes) {
      if (typeof r.path === 'string' && r.path === routePath) {
        // string path ex: /movies
        pageElement = new r.component()
        pageElement.loggedIn = r.loggedIn
      } else if (r.path instanceof RegExp) {
        // RegExp path ex: /\/movies\/(\d+)/
        const match = r.path.exec(route)
        if (match) {
          // route params
          const params = match.slice(1)
          pageElement = new r.component()
          pageElement.loggedIn = r.loggedIn
          pageElement.params = params
        }
      }

      isProtected = r.loggedIn === true

      if (pageElement) {
        // A page was found, we checked if we have access to it.
        if (isProtected && app.Store.loggedIn == false) {
          app.Router.go('/account/login/')
          return
        }
        break
      }
    }

    if (pageElement == null) {
      // 404? Maybe
      pageElement = document.createElement('h1')
      pageElement.textContent = 'Page not found'
    }
    // I have a page for the URL
    function updatePage() {
      document.querySelector('main').innerHTML = ''
      document.querySelector('main').appendChild(pageElement)
    }

    // Use view transition to apply a screen transition - like a screenshot of the old page
    if (!document.startViewTransition) {
      updatePage()
    } else {
      const oldPage = document.querySelector('main').firstElementChild
      if (oldPage) {
        oldPage.style.viewTransitionName = 'old'
      }
      pageElement.style.viewTransitionName = 'new'

      document.startViewTransition(() => {
        updatePage()
        // Clear the transition names after the transition
        if (oldPage) oldPage.style.viewTransitionName = ''
        pageElement.style.viewTransitionName = ''
      })
    }
  },
}
