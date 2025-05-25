import { LitElement, html, css } from 'lit';
import { t } from '../localization/index.js';

export class ConfirmDialog extends LitElement {
  static properties() {
    return {
      title: { type: String },
      message: { type: String },
      confirmText: { type: String },
      cancelText: { type: String }
    };
  }

  static styles = css`
      :host {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
      }
      
      .dialog {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        width: 90%;
        max-width: 400px;
        overflow: hidden;
      }
      
      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background-color: var(--primary-color);
        color: white;
      }
      
      .dialog-title {
        margin: 0;
        font-size: 18px;
        font-weight: 500;
      }
      
      .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
      }
      
      .dialog-content {
        padding: 24px 16px;
      }
      
      .dialog-message {
        margin: 0 0 16px;
        font-size: 16px;
        line-height: 1.5;
      }
      
      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        padding: 16px;
        border-top: 1px solid var(--border-color);
      }
      
      .dialog-btn {
        padding: 8px 16px;
        margin-left: 8px;
        border-radius: 4px;
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
      
      .confirm-btn {
        background-color: var(--primary-color);
        color: white;
        border: none;
      }
      
      .confirm-btn:hover {
        background-color: var(--secondary-color);
      }
    `;

  constructor() {
    super();
    this.title = t('employee.confirmUpdate.title');
    this.message = t('employee.confirmUpdate.message');
    this.confirmText = t('employee.actions.proceed');
    this.cancelText = t('employee.actions.cancel');
  }
  
  // Handle confirm button click
  _handleConfirm() {
    this.dispatchEvent(new CustomEvent('confirm', {
      detail: { confirmed: true }
    }));
  }
  
  // Handle cancel button click
  _handleCancel() {
    this.dispatchEvent(new CustomEvent('confirm', {
      detail: { confirmed: false }
    }));
  }

  render() {
    return html`
      <div class="dialog">
        <div class="dialog-header">
          <h3 class="dialog-title">${this.title}</h3>
          <button class="close-btn" @click="${this._handleCancel}">×</button>
        </div>
        
        <div class="dialog-content">
          <p class="dialog-message">${this.message}</p>
        </div>
        
        <div class="dialog-actions">
          <button class="dialog-btn cancel-btn" @click="${this._handleCancel}">
            ${this.cancelText}
          </button>
          <button class="dialog-btn confirm-btn" @click="${this._handleConfirm}">
            ${this.confirmText}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-dialog', ConfirmDialog);
