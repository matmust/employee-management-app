import { expect, fixture, html } from '@open-wc/testing';
import '../../../src/components/navigation.js';

describe('Navigation', () => {
  let el;
  beforeEach(async () => {
    el = await fixture(html`<app-navigation></app-navigation>`);
  });

  it('renders navigation links', () => {
    const links = el.shadowRoot.querySelectorAll('a.nav-item');
    expect(links.length).to.be.greaterThan(0);
  });
});
