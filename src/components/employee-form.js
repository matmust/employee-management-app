import { LitElement, html, css } from 'lit';
import { store } from '../store/store.js';
import { addEmployee, updateEmployee } from '../store/actions.js';
import { t } from '../localization/index.js';
import { validateEmployeeForm, hasErrors, isEmailUnique } from '../utils/validation.js';
import { Router } from '@vaadin/router';
import { LanguageMixin } from '../utils/language-mixin.js';
import './confirm-dialog.js';

export class EmployeeForm extends LanguageMixin(LitElement) {
  static get properties() {
    return {
      employee: { type: Object },
      mode: { type: String }, // 'create' or 'edit'
      errors: { type: Object },
      showConfirm: { type: Boolean }
    };
  }

  static styles = css`
      :host {
        display: block;
      }
      
      .form-title {
        font-size: 24px;
        font-weight: 500;
        color: var(--primary-color);
        margin: 0 0 24px;
      }
      
      .form-group {
        margin-bottom: 20px;
      }
      
      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
      }
      
      input, select {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 16px;
      }
      
      input:focus, select:focus {
        outline: none;
        border-color: var(--primary-color);
      }
      
      .error {
        border-color: var(--error-color);
      }
      
      .error-message {
        color: var(--error-color);
        font-size: 14px;
        margin-top: 4px;
      }
      
      .form-row {
        display: flex;
        gap: 16px;
      }
      
      .form-row .form-group {
        flex: 1;
      }
      
      .form-actions {
        margin-top: 32px;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      }
      
      .form-actions button {
        padding: 10px 20px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
      }
      
      .cancel-btn {
        background-color: white;
        border: 1px solid var(--border-color);
      }
      
      .cancel-btn:hover {
        background-color: #f1f1f1;
      }
      
      .submit-btn {
        background-color: var(--primary-color);
        color: white;
        border: none;
      }
      
      .submit-btn:hover {
        background-color: var(--secondary-color);
      }
      
      @media (max-width: 768px) {
        .form-row {
          flex-direction: column;
          gap: 0;
        }
      }
    `;

  constructor() {
    super();
    // Initialize empty employee
    this.employee = {
      id: '',
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: ''
    };
    this.mode = 'create'; // Default mode
    this.errors = {};
    this.showConfirm = false;
  }
  
  // Handle input changes
  _handleInput(field, e) {
    this.employee = {
      ...this.employee,
      [field]: e.target.value
    };
    
    // Clear the error when the field is changed
    if (this.errors[field]) {
      this.errors = {
        ...this.errors,
        [field]: ''
      };
    }
  }
  
  // Handle form submission
  _handleSubmit(e) {
    e.preventDefault();
    
    // Validate form
    const errors = validateEmployeeForm(this.employee);
    
    // Check email uniqueness
    if (!errors.email) {
      const isUnique = isEmailUnique(
        this.employee.email, 
        store.getState().employees, 
        this.mode === 'edit' ? this.employee.id : null
      );
      
      if (!isUnique) {
        errors.email = t('employee.validation.emailUnique');
      }
    }
    
    if (hasErrors(errors)) {
      this.errors = errors;
      return;
    }
    
    // If in edit mode, show confirmation dialog
    if (this.mode === 'edit') {
      this.showConfirm = true;
      this.requestUpdate();
    } else {
      this._saveEmployee();
    }
  }
  
  // Save employee to store
  _saveEmployee() {
    if (this.mode === 'create') {
      store.dispatch(addEmployee(this.employee));
    } else {
      store.dispatch(updateEmployee(this.employee));
    }
    
    // Navigate back to list
    Router.go('/employees');
  }
  
  // Handle cancel button
  _handleCancel() {
    Router.go('/employees');
  }
  
  // Handle update confirmation
  _handleUpdateConfirm(e) {
    const { confirmed } = e.detail;
    
    if (confirmed) {
      this._saveEmployee();
    }
    
    this.showConfirm = false;
    this.requestUpdate();
  }

  render() {
    return html`
      <h2 class="form-title">
        ${this.mode === 'create' 
          ? t('employee.actions.add') 
          : t('employee.actions.update')
        }
      </h2>
      
      <form @submit="${this._handleSubmit}">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">${t('employee.fields.firstName')}</label>
            <input 
              type="text" 
              id="firstName" 
              .value="${this.employee.firstName}" 
              @input="${(e) => this._handleInput('firstName', e)}" 
              class="${this.errors.firstName ? 'error' : ''}"
            >
            ${this.errors.firstName 
              ? html`<div class="error-message">${this.errors.firstName}</div>` 
              : ''
            }
          </div>
          
          <div class="form-group">
            <label for="lastName">${t('employee.fields.lastName')}</label>
            <input 
              type="text" 
              id="lastName" 
              .value="${this.employee.lastName}" 
              @input="${(e) => this._handleInput('lastName', e)}" 
              class="${this.errors.lastName ? 'error' : ''}"
            >
            ${this.errors.lastName 
              ? html`<div class="error-message">${this.errors.lastName}</div>` 
              : ''
            }
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="dateOfEmployment">${t('employee.fields.dateOfEmployment')}</label>
            <input 
              type="text" 
              id="dateOfEmployment" 
              placeholder="DD/MM/YYYY"
              .value="${this.employee.dateOfEmployment}" 
              @input="${(e) => this._handleInput('dateOfEmployment', e)}" 
              class="${this.errors.dateOfEmployment ? 'error' : ''}"
            >
            ${this.errors.dateOfEmployment 
              ? html`<div class="error-message">${this.errors.dateOfEmployment}</div>` 
              : ''
            }
          </div>
          
          <div class="form-group">
            <label for="dateOfBirth">${t('employee.fields.dateOfBirth')}</label>
            <input 
              type="text" 
              id="dateOfBirth" 
              placeholder="DD/MM/YYYY"
              .value="${this.employee.dateOfBirth}" 
              @input="${(e) => this._handleInput('dateOfBirth', e)}" 
              class="${this.errors.dateOfBirth ? 'error' : ''}"
            >
            ${this.errors.dateOfBirth 
              ? html`<div class="error-message">${this.errors.dateOfBirth}</div>` 
              : ''
            }
          </div>
        </div>
        
        <div class="form-group">
          <label for="phone">${t('employee.fields.phone')}</label>
          <input 
            type="text" 
            id="phone" 
            placeholder="+90 XXX XXX XX XX"
            .value="${this.employee.phone}" 
            @input="${(e) => this._handleInput('phone', e)}" 
            class="${this.errors.phone ? 'error' : ''}"
          >
          ${this.errors.phone 
            ? html`<div class="error-message">${this.errors.phone}</div>` 
            : ''
          }
        </div>
        
        <div class="form-group">
          <label for="email">${t('employee.fields.email')}</label>
          <input 
            type="email" 
            id="email" 
            .value="${this.employee.email}" 
            @input="${(e) => this._handleInput('email', e)}" 
            class="${this.errors.email ? 'error' : ''}"
          >
          ${this.errors.email 
            ? html`<div class="error-message">${this.errors.email}</div>` 
            : ''
          }
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="department">${t('employee.fields.department')}</label>
            <select 
              id="department" 
              .value="${this.employee.department}" 
              @change="${(e) => this._handleInput('department', e)}" 
              class="${this.errors.department ? 'error' : ''}"
            >
              <option value="Analytics">${t('employee.departments.analytics')}</option>
              <option value="Tech">${t('employee.departments.tech')}</option>
            </select>
            ${this.errors.department 
              ? html`<div class="error-message">${this.errors.department}</div>` 
              : ''
            }
          </div>
          
          <div class="form-group">
            <label for="position">${t('employee.fields.position')}</label>
            <select 
              id="position" 
              .value="${this.employee.position}" 
              @change="${(e) => this._handleInput('position', e)}" 
              class="${this.errors.position ? 'error' : ''}"
            >
              <option value="Junior">${t('employee.positions.junior')}</option>
              <option value="Medior">${t('employee.positions.medior')}</option>
              <option value="Senior">${t('employee.positions.senior')}</option>
            </select>
            ${this.errors.position 
              ? html`<div class="error-message">${this.errors.position}</div>` 
              : ''
            }
          </div>
        </div>
        
        <div class="form-actions">
          <button 
            type="button" 
            class="cancel-btn" 
            @click="${this._handleCancel}"
          >
            ${t('employee.actions.cancel')}
          </button>
          <button type="submit" class="submit-btn">
            ${this.mode === 'create' 
              ? t('employee.actions.add') 
              : t('employee.actions.update')
            }
          </button>
        </div>
      </form>
      
      ${this.showConfirm ? html`
        <confirm-dialog 
          @confirm="${this._handleUpdateConfirm}"
        ></confirm-dialog>
      ` : ''}
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
