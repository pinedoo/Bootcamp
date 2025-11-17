import moment from 'moment';

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.title = this.getAttribute('title') || 'Mi App (Header)';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const now = moment().format('LLLL');
    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; font-family: Arial, sans-serif; padding: 12px; background:#0b74de; color:white; }
        nav { display:flex; justify-content:space-between; align-items:center; }
        .brand { font-weight:700; }
        .menu { gap: 10px; }
      </style>
      <nav>
        <div class="brand">${this.title}</div>
        <div class="menu">
          <span>${now}</span>
        </div>
      </nav>
    `;
  }
}

export function defineHeader() {
  if (!customElements.get('app-header')) {
    customElements.define('app-header', AppHeader);
  }
}
