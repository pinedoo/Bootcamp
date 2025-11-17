import moment from 'moment';

class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const now = moment().format('LL');
    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; font-family: Arial, sans-serif; padding: 12px; background:#222; color:#ddd; position:fixed; bottom:0; left:0; right:0; }
        .container { display:flex; justify-content:space-between; align-items:center; }
      </style>
      <div class="container">
        <div>© Mi Empresa</div>
        <div>${now}</div>
      </div>
    `;
  }
}

export function defineFooter() {
  if (!customElements.get('app-footer')) {
    customElements.define('app-footer', AppFooter);
  }
}
