import { LitElement, html, css } from 'lit';
import { store } from '../store/store.js';
import { setSearchQuery, setCurrentPage, setViewMode, deleteEmployee } from '../store/actions.js';
import { t } from '../localization/index.js';
import { Router } from '@vaadin/router';
import { LanguageMixin } from '../utils/language-mixin.js';
import './pagination.js';
import './confirm-dialog.js';

export class EmployeeList extends LanguageMixin(LitElement) {
  static get properties() {
    return {
      employees: { type: Array },
      filteredEmployees: { type: Array },
      searchQuery: { type: String },
      currentPage: { type: Number },
      totalPages: { type: Number },
      viewMode: { type: String },
      showDeleteConfirm: { type: Boolean },
      employeeToDelete: { type: Object }
    };
  }

  static styles = css`
      :host {
        display: block;
      }
      
      .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }
      
      .list-title {
        font-size: 24px;
        font-weight: 500;
        color: var(--primary-color);
        margin: 0;
      }
      
      .search-container {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      }
      
      .search-input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 14px;
      }
      
      .view-toggle {
        display: flex;
        align-items: center;
      }
      
      .toggle-btn {
        padding: 6px 12px;
        border: 1px solid var(--border-color);
        background-color: white;
        cursor: pointer;
        font-size: 14px;
      }
      
      .toggle-btn:first-child {
        border-radius: 4px 0 0 4px;
      }
      
      .toggle-btn:last-child {
        border-radius: 0 4px 4px 0;
      }
      
      .toggle-btn.active {
        background-color: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }
      
      /* Table styles */
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      }
      
      th, td {
        padding: 12px 8px;
        text-align: left;
        border-bottom: 1px solid var(--border-color);
      }
      
      th {
        font-weight: 600;
        color: var(--primary-color);
      }
      
      tr:hover {
        background-color: rgba(0, 0, 0, 0.02);
      }
      
      .checkbox-column {
        width: 40px;
        text-align: center;
      }
      
      .actions-column {
        width: 100px;
        text-align: right;
      }
      
      .action-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--primary-color);
        padding: 4px;
        margin-left: 4px;
      }
      
      .edit-btn {
        color: #2196F3;
      }
      
      .delete-btn {
        color: #F44336;
      }
      
      /* List styles */
      .employee-cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
      }
      
      .employee-card {
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 16px;
        background-color: white;
      }
      
      .card-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
      }
      
      .card-name {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
      }
      
      .card-actions {
        display: flex;
      }
      
      .card-field {
        display: flex;
        margin-bottom: 8px;
      }
      
      .field-label {
        width: 40%;
        font-weight: 500;
        font-size: 14px;
        color: #666;
      }
      
      .field-value {
        width: 60%;
        font-size: 14px;
      }
      
      .empty-message {
        text-align: center;
        padding: 32px;
        color: #666;
        font-style: italic;
      }
      
      @media (max-width: 768px) {
        .list-header {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .view-toggle {
          margin-top: 12px;
        }
        
        /* Make table responsive */
        table, thead, tbody, th, td, tr {
          display: block;
        }
        
        thead tr {
          position: absolute;
          top: -9999px;
          left: -9999px;
        }
        
        tr {
          border: 1px solid var(--border-color);
          margin-bottom: 16px;
          border-radius: 4px;
        }
        
        td {
          border: none;
          border-bottom: 1px solid #eee;
          position: relative;
          padding-left: 50%;
          min-height: 30px;
        }
        
        td:last-child {
          border-bottom: none;
        }
        
        td:before {
          position: absolute;
          top: 12px;
          left: 8px;
          width: 45%;
          white-space: nowrap;
          font-weight: 500;
          color: var(--primary-color);
        }
        

        .checkbox-column, .actions-column {
          width: auto;
          text-align: left;
        }
        
        /* List view in mobile */
        .employee-cards {
          grid-template-columns: 1fr;
        }
      }
    `;

  constructor() {
    super();
    // Initialize properties from store
    const state = store.getState();
    this.employees = state.employees;
    this.filteredEmployees = state.filteredEmployees;
    this.searchQuery = state.searchQuery;
    this.currentPage = state.currentPage;
    this.totalPages = state.totalPages;
    this.viewMode = state.viewMode;
    this.showDeleteConfirm = false;
    this.employeeToDelete = null;
    
    // Subscribe to store updates
    this.unsubscribe = store.subscribe(() => this._storeUpdated());
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    // Unsubscribe from store
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  
  // Update component when store changes
  _storeUpdated() {
    const state = store.getState();
    this.employees = state.employees;
    this.filteredEmployees = state.filteredEmployees;
    this.searchQuery = state.searchQuery;
    this.currentPage = state.currentPage;
    this.totalPages = state.totalPages;
    this.viewMode = state.viewMode;
  }
  
  // Handle search input
  _handleSearch(e) {
    const query = e.target.value;
    store.dispatch(setSearchQuery(query));
  }
  
  // Handle page change
  _handlePageChange(e) {
    const page = e.detail.page;
    store.dispatch(setCurrentPage(page));
  }
  
  // Handle view mode toggle
  _handleViewModeChange(mode) {
    store.dispatch(setViewMode(mode));
  }
  
  // Navigate to edit employee page
  _editEmployee(employeeId) {
    Router.go(`/employees/${employeeId}/edit`);
  }
  
  // Show delete confirmation dialog
  _confirmDelete(employee) {
    this.employeeToDelete = employee;
    this.showDeleteConfirm = true;
    this.requestUpdate();
  }
  
  // Handle delete confirmation
  _handleDeleteConfirm(e) {
    const { confirmed } = e.detail;
    
    if (confirmed && this.employeeToDelete) {
      store.dispatch(deleteEmployee(this.employeeToDelete.id));
    }
    
    this.showDeleteConfirm = false;
    this.employeeToDelete = null;
  }

  render() {
    return html`
      <div class="list-header">
        <h2 class="list-title">${t('employee.list.title')}</h2>
        
        <div class="view-toggle">
          <button 
            class="toggle-btn ${this.viewMode === 'table' ? 'active' : ''}"
            @click="${() => this._handleViewModeChange('table')}"
          >
            ${t('employee.list.tableView')}
          </button>
          <button 
            class="toggle-btn ${this.viewMode === 'list' ? 'active' : ''}"
            @click="${() => this._handleViewModeChange('list')}"
          >
            ${t('employee.list.listView')}
          </button>
        </div>
      </div>
      
      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          placeholder="${t('employee.list.search')}" 
          .value="${this.searchQuery}"
          @input="${this._handleSearch}"
        >
      </div>
      
      ${this.filteredEmployees.length > 0 
        ? this.viewMode === 'table'
          ? this._renderTable()
          : this._renderList()
        : html`<div class="empty-message">${t('employee.list.empty')}</div>`
      }
      
      <emp-pagination 
        .currentPage="${this.currentPage}" 
        .totalPages="${this.totalPages}"
        @page-change="${this._handlePageChange}"
      ></emp-pagination>
      
      ${this.showDeleteConfirm ? html`
        <confirm-dialog 
          .title="${t('employee.confirmDelete.title')}"
          .message="${t('employee.confirmDelete.message')}"
          @confirm="${this._handleDeleteConfirm}"
        ></confirm-dialog>
      ` : ''}
    `;
  }
  
  _renderTable() {
    return html`
      <table>
        <thead>
          <tr>
            <th>${t('employee.fields.firstName')}</th>
            <th>${t('employee.fields.lastName')}</th>
            <th>${t('employee.fields.dateOfEmployment')}</th>
            <th>${t('employee.fields.dateOfBirth')}</th>
            <th>${t('employee.fields.phone')}</th>
            <th>${t('employee.fields.email')}</th>
            <th>${t('employee.fields.department')}</th>
            <th>${t('employee.fields.position')}</th>
            <th class="actions-column">${t('employee.fields.actions')}</th>
          </tr>
        </thead>
        <tbody>
          ${this.filteredEmployees.map(employee => html`
            <tr>
              <td>${employee.firstName}</td>
              <td>${employee.lastName}</td>
              <td>${employee.dateOfEmployment}</td>
              <td>${employee.dateOfBirth}</td>
              <td>${employee.phone}</td>
              <td>${employee.email}</td>
              <td>${t(`employee.departments.${employee.department.toLowerCase()}`)}</td>
              <td>${t(`employee.positions.${employee.position.toLowerCase()}`)}</td>
              <td class="actions-column">
                <button 
                  class="action-btn edit-btn" 
                  @click="${() => this._editEmployee(employee.id)}"
                  title="${t('employee.actions.edit')}"
                >
                  ✏️
                </button>
                <button 
                  class="action-btn delete-btn" 
                  @click="${() => this._confirmDelete(employee)}"
                  title="${t('employee.actions.delete')}"
                >
                  🗑️
                </button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }
  
  _renderList() {
    return html`
      <div class="employee-cards">
        ${this.filteredEmployees.map(employee => html`
          <div class="employee-card">
            <div class="card-header">
              <h3 class="card-name">${employee.firstName} ${employee.lastName}</h3>
              <div class="card-actions">
                <button 
                  class="action-btn edit-btn" 
                  @click="${() => this._editEmployee(employee.id)}"
                  title="${t('employee.actions.edit')}"
                >
                  ✏️
                </button>
                <button 
                  class="action-btn delete-btn" 
                  @click="${() => this._confirmDelete(employee)}"
                  title="${t('employee.actions.delete')}"
                >
                  🗑️
                </button>
              </div>
            </div>
            
            <div class="card-field">
              <div class="field-label">${t('employee.fields.department')}:</div>
              <div class="field-value">${t(`employee.departments.${employee.department.toLowerCase()}`)}</div>
            </div>
            
            <div class="card-field">
              <div class="field-label">${t('employee.fields.position')}:</div>
              <div class="field-value">${t(`employee.positions.${employee.position.toLowerCase()}`)}</div>
            </div>
            
            <div class="card-field">
              <div class="field-label">${t('employee.fields.email')}:</div>
              <div class="field-value">${employee.email}</div>
            </div>
            
            <div class="card-field">
              <div class="field-label">${t('employee.fields.phone')}:</div>
              <div class="field-value">${employee.phone}</div>
            </div>
            
            <div class="card-field">
              <div class="field-label">${t('employee.fields.dateOfEmployment')}:</div>
              <div class="field-value">${employee.dateOfEmployment}</div>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
