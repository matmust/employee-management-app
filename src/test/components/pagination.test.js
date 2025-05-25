import { expect, fixture, html } from '@open-wc/testing';
import '../../../src/components/pagination.js';

describe('Pagination', () => {
  let el;
  beforeEach(async () => {
    el = await fixture(html`<emp-pagination currentPage="1" totalPages="5"></emp-pagination>`);
  });

  it('renders pagination buttons', () => {
    const buttons = el.shadowRoot.querySelectorAll('.page-link');
    expect(buttons.length).to.be.greaterThan(0);
  });
});
