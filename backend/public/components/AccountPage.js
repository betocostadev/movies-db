export class AccountPage extends HTMLElement {
  connectedCallback() {
    const template = document.getElementById('template-account')
    const content = template.content.cloneNode(true)
    this.appendChild(content)
    this.loadUser()
  }

  async loadUser() {
    const user = await app.api.getCurrentUser()
    const nameSpan = this.querySelector('#user-name')
    if (user && user.name) {
      nameSpan.textContent = user.name
    } else {
      nameSpan.textContent = 'Unknown User'
    }
  }
}

customElements.define('account-page', AccountPage)
