import { LitElement, html, css } from 'lit';

export class Pagination extends LitElement {
  static get properties() {
    return {
      currentPage: { type: Number },
      totalPages: { type: Number }
    };
  }

  static styles = css`
      :host {
        display: block;
        margin: 24px 0;
      }
      
      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px;
      }
      
      .page-link {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 32px;
        height: 32px;
        padding: 0 8px;
        border-radius: 4px;
        border: 1px solid var(--border-color);
        background-color: white;
        color: var(--text-color);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .page-link:hover:not(.disabled) {
        background-color: #f1f1f1;
      }
      
      .page-link.active {
        background-color: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }
      
      .page-link.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      @media (max-width: 576px) {
        .page-link {
          min-width: 28px;
          height: 28px;
          font-size: 12px;
        }
      }
  `;
  
  render() {
    const pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    
    return html`
      <div class="pagination">
        <button 
          class="page-link ${this.currentPage === 1 ? 'disabled' : ''}" 
          @click="${() => this.dispatchEvent(new CustomEvent('page-change', { detail: { page: this.currentPage - 1 } }))}"
          ?disabled="${this.currentPage === 1}"
        >
          &lt;
        </button>
        
        ${pages.map(page => html`
          <button 
            class="page-link ${page === this.currentPage ? 'active' : ''}" 
            @click="${() => this.dispatchEvent(new CustomEvent('page-change', { detail: { page } }))}"
          >
            ${page}
          </button>
        `)}
        
        <button 
          class="page-link ${this.currentPage === this.totalPages ? 'disabled' : ''}" 
          @click="${() => this.dispatchEvent(new CustomEvent('page-change', { detail: { page: this.currentPage + 1 } }))}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          &gt;
        </button>
      </div>
    `;
  }
}

customElements.define('emp-pagination', Pagination);
