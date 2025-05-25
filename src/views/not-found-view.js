import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

export class NotFoundView extends LitElement {
  static styles = css`
      :host {
        display: block;
        text-align: center;
        padding: 40px 20px;
      }
      
      .not-found-title {
        font-size: 24px;
        color: var(--primary-color);
        margin-bottom: 12px;
      }
      
      .not-found-message {
        margin-bottom: 24px;
        color: #666;
      }
      
      .go-home {
        display: inline-block;
        padding: 10px 20px;
        background-color: var(--primary-color);
        color: white;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 500;
        cursor: pointer;
      }
      
      .go-home:hover {
        background-color: var(--secondary-color);
      }
    `;

  _goToHome() {
    Router.go('/');
  }

  render() {
    return html`
      <div class="not-found-title">404 - Page Not Found</div>
      <div class="not-found-message">The page you are looking for does not exist.</div>
      <button class="go-home" @click="${this._goToHome}">Go to Home</button>
    `;
  }
}

customElements.define('not-found-view', NotFoundView);
