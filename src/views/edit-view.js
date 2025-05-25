import { LitElement, html, css } from 'lit';
import { store } from '../store/store.js';
import { LanguageMixin } from '../utils/language-mixin.js';
import { Router } from '@vaadin/router';
import '../components/employee-form.js';

export class EmployeeEditView extends LanguageMixin(LitElement) {
  static get properties() {
    return {
      employeeId: { type: String },
      employee: { type: Object }
    };
  }

  static styles = css`
      :host {
        display: block;
      }
      
      .not-found {
        padding: 20px;
        text-align: center;
        color: #f44336;
      }
    `;

  constructor() {
    super();
    this.employeeId = '';
    this.employee = null;
  }
  
  connectedCallback() {
    super.connectedCallback();
    
    // Get the employee ID from the route
    const location = this.location;
    if (location && location.params && location.params.id) {
      this.employeeId = location.params.id;
      
      // Find the employee in the store
      const state = store.getState();
      this.employee = state.employees.find(emp => emp.id === this.employeeId);
      
      // If employee not found, redirect to list
      if (!this.employee) {
        Router.go('/employees');
      }
    } else {
      // If no ID provided, redirect to list
      Router.go('/employees');
    }
  }

  render() {
    if (!this.employee) {
      return html`<div class="not-found">Employee not found</div>`;
    }
    
    return html`
      <employee-form 
        .mode="${'edit'}"
        .employee="${this.employee}"
      ></employee-form>
    `;
  }
}

customElements.define('employee-edit-view', EmployeeEditView);
