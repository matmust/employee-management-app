import { LitElement, html, css } from 'lit';
import { initRouter } from './router/index.js';
import './components/app-header.js';
import { LanguageMixin } from './utils/language-mixin.js';
import './styles/main.css';

export class EmployeeApp extends LanguageMixin(LitElement) {
  static properties() {
    return {
      route: { type: Object },
      locale: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        min-height: 100vh;
      }

      main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }

      .container {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 24px;
      }
    `;
  }

  firstUpdated() {
    // Initialize router
    initRouter(this.renderRoot.getElementById('outlet'));
  }

  render() {
    return html`
      <app-header></app-header>
      <main>
        <div class="container">
          <div id="outlet"></div>
        </div>
      </main>
    `;
  }
}

customElements.define('emp-app', EmployeeApp);
