import { LitElement, html, css } from 'lit';
import { LanguageMixin } from '../utils/language-mixin.js';
import '../components/employee-form.js';

export class EmployeeCreateView extends LanguageMixin(LitElement) {
  static styles = css`
      :host {
        display: block;
      }
    `;

  render() {
    return html`
      <employee-form .mode="${'create'}"></employee-form>
    `;
  }
}

customElements.define('employee-create-view', EmployeeCreateView);
