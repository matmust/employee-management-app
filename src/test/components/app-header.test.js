import { expect, fixture, html } from '@open-wc/testing';
import '../../../src/components/app-header.js';

describe('AppHeader', () => {
  let el;
  beforeEach(async () => {
    el = await fixture(html`<app-header></app-header>`);
  });

  it('renders the logo', () => {
    const logo = el.shadowRoot.querySelector('.logo');
    expect(logo).to.exist;
  });

  it('renders the navigation', () => {
    const nav = el.shadowRoot.querySelector('app-navigation');
    expect(nav).to.exist;
  });
});
