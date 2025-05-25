import { LitElement, html, css } from 'lit';
import { setLocale } from '../localization/index.js';
import { LanguageMixin } from '../utils/language-mixin.js';

export class LanguageSwitcher extends LanguageMixin(LitElement) {  
  static properties() {
    return {
      currentLang: { type: String }
    };
  }

  static styles = css`
      :host {
        display: block;
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
    `;

  constructor() {
    super();
    this.currentLang = document.documentElement.lang.toLowerCase();
  }

  _switchLanguage(lang) {
    setLocale(lang);
    this.currentLang = lang;
  }

  render() {
    return html`
        <div class="language-switcher">
            <span 
            class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}"
            @click="${() => this._switchLanguage('en')}"
            >EN</span>
            <span 
            class="lang-btn ${this.currentLang === 'tr' ? 'active' : ''}"
            @click="${() => this._switchLanguage('tr')}"
            >TR</span>
        </div>
    `;
  }
}

customElements.define('language-switcher', LanguageSwitcher);