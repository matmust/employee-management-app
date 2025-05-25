import { LitElement, html, css } from 'lit';
import { LanguageMixin } from '../utils/language-mixin.js';
import '../components/employee-list.js';

export class EmployeeListView extends LanguageMixin(LitElement) {
  static styles = css`
      :host {
        display: block;
      }
    `;

  render() {
    return html`
      <employee-list></employee-list>
    `;
  }
}

customElements.define('employee-list-view', EmployeeListView);
