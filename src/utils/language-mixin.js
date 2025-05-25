import { LANGUAGE_CHANGE_EVENT } from '../localization/index.js';

export const LanguageMixin = (superClass) => class extends superClass {
  constructor() {
    super();
    this._handleLanguageChange = this._handleLanguageChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(LANGUAGE_CHANGE_EVENT, this._handleLanguageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, this._handleLanguageChange);
  }

  _handleLanguageChange() {
    this.requestUpdate();
  }
};
