import { LitElement, html, css } from 'lit';
import { t } from '../localization/index.js';
import { Router } from '@vaadin/router';
import { LanguageMixin } from '../utils/language-mixin.js';
import './navigation.js';

export class AppHeader extends LanguageMixin(LitElement) {
  static styles = css`
      :host {
        display: block;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }
      
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
      }
      
      .logo {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 20px;
        color: var(--primary-color);
        text-decoration: none;
      }
      
      .logo-icon {
        margin-right: 8px;
        width: 32px;
        height: 32px;
        background-color: var(--primary-color);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }

      @media (max-width: 768px) {
        .header {
          flex-wrap: wrap;
          height: auto;
          padding: 12px 0;
        }
      }
    `;

  _handleNavigation(e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const href = e.target.getAttribute('href');
      Router.go(href);
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <a href="/" class="logo" @click="${this._handleNavigation}">
            <div class="logo-icon">ING</div>
            ${t('app.title')}
          </a>
          
          <app-navigation></app-navigation>
        </div>
      </div>
    `;
  }
}

customElements.define('app-header', AppHeader);
