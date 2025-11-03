class CardComponent extends HTMLElement {
  cardBorderRadius = '0.75rem';
  cardHeight = '24rem';
  cardPadding = '1.25rem';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['card-border-radius', 'card-height', 'card-padding'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const attributesMap = {
      'card-border-radius': 'cardBorderRadius',
      'card-height': 'cardHeight',
      'card-padding': 'cardPadding'
    };

    this[attributesMap[name]] = newValue;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const shadowRoot = this.shadowRoot;
    shadowRoot.innerHTML = '';
    shadowRoot.appendChild(this.htmlToElement().content);
  }

  htmlToElement() {
    const html = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 350px;
          margin: 1rem auto;
        }

        .card-component__container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          border-radius: ${this.cardBorderRadius};
          height: ${this.cardHeight};
          padding: ${this.cardPadding};
          background-color: var(--primary-lightest-color, #fff);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border: 1px solid var(--neutral-light-color, #ccc);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-component__container:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.25);
        }

        .card-component__title {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          color: var(--secondary-color, #59335c);
          margin-bottom: 1rem;
          border-bottom: 2px solid var(--primary-color, #c9ab81);
          padding-bottom: 0.5rem;
          width: 100%;
        }

        .card-component__content {
          flex: 1;
          text-align: center;
          color: var(--neutral-dark-color, #333);
          font-size: 1rem;
          line-height: 1.6;
          padding: 0 0.5rem;
        }

        .card-component__footer {
          font-size: 0.95rem;
          color: var(--primary-dark-color, #7c5e35);
          font-weight: 600;
          margin-top: 1rem;
          text-align: center;
          background-color: var(--primary-light-color, #f7f2ec);
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
        }

        @media (max-width: 600px) {
          .card-component__container {
            height: auto;
          }
        }
      </style>

      <div class="card-component__container">
        <div class="card-component__title">
          <slot name="title">Título de la tarjeta</slot>
        </div>
        <div class="card-component__content">
          <slot name="content">Contenido de la tarjeta</slot>
        </div>
        <div class="card-component__footer">
          <slot name="footer">Pie de tarjeta</slot>
        </div>
      </div>
    `;

    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template;
  }
}

customElements.define('card-component', CardComponent);
