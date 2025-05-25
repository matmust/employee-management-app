import { LitElement, html, css } from 'lit';
import { t  } from '../localization/index.js';
import { LanguageMixin } from '../utils/language-mixin.js';
import './language-switcher.js';

export class Navigation extends LanguageMixin(LitElement) {  
  static styles = css`
      :host {
        display: block;
      }
      
      .nav {
        display: flex;
        align-items: center;
      }
      
      .nav-item {
        margin-left: 20px;
        text-decoration: none;
        color: var(--primary-color);
        padding: 8px 12px;
        border-radius: 4px;
        font-weight: 500;
        transition: all 0.2s ease;
      }
      
      .nav-item:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
      
      .add-new {
        color: var(--primary-color);
        padding: 8px 16px;
        border-radius: 4px;
        font-weight: 500;
        transition: all 0.2s ease;
      }

      .language-switcher {
        margin-left: 20px;
        display: flex;
        align-items: center;
      }
      
      .lang-btn {
        margin-left: 8px;
        cursor: pointer;
        opacity: 0.5;
        font-weight: bold;
        font-size: 14px;
      }
      
      .lang-btn.active {
        opacity: 1;
        color: var(--primary-color);
      }

      @media (max-width: 768px) {
        .nav {
          width: 100%;
          margin-top: 12px;
          justify-content: space-between;
        }
        
        .nav-item {
          margin-left: 0;
        }
      }
  `;

  render() {
    return html`
      <div class="nav">
        <a 
          href="/employees" 
          class="nav-item"
        >
          ${t('nav.employees')}
        </a>
        
        <a 
          href="/employees/new" 
          class="nav-item add-new"
        >
          ${t('nav.addNew')}
        </a>
        
        <language-switcher></language-switcher>
      </div>
    `;
  }
}

customElements.define('app-navigation', Navigation);
