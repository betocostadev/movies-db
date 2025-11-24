import API from '../services/API.js'
import { MovieItem } from './MovieItem.js'

export class HomePage extends HTMLElement {
  async render() {
    function renderMoviesInList(movies, ul) {
      ul.innerHTML = ''
      movies.forEach((movie) => {
        const li = document.createElement('li')
        // li.textContent = movie.title
        li.appendChild(new MovieItem(movie))
        ul.appendChild(li)
      })
    }
    const topMovies = await API.getTopMovies()
    renderMoviesInList(topMovies, document.querySelector('#top-10 ul'))

    const randomMovies = await API.getRandomMovies()
    renderMoviesInList(randomMovies, document.querySelector('#random ul'))
  }
  connectedCallback() {
    // template is like a class, it is not the element
    const template = document.getElementById('template-home')
    // creates the element - like an instance of a class
    const content = template.content.cloneNode(true)
    this.appendChild(content)

    this.render()
  }
}

// slashes are mandatory for customElements
// 'homepage' won't work
customElements.define('home-page', HomePage)
