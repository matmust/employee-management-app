import { expect, fixture, html } from '@open-wc/testing';
import '../../../src/components/language-switcher.js';

describe('LanguageSwitcher', () => {
  let el;
  let buttons;
  let enBtn;
  let trBtn;
  beforeEach(async () => {
    el = await fixture(html`<language-switcher></language-switcher>`);
    buttons = Array.from(el.shadowRoot.querySelectorAll('.lang-btn'));
    enBtn = buttons.find(btn => btn.textContent.trim() === 'EN');
    trBtn = buttons.find(btn => btn.textContent.trim() === 'TR');
  });

  it('renders language buttons', () => {
    expect(buttons.length).to.equal(2);
  });

  it('activates the correct button when language is switched via click', async () => {
    enBtn.click();
    await el.updateComplete;
    expect(enBtn.classList.contains('active')).to.be.true;
    expect(trBtn.classList.contains('active')).to.be.false;
    trBtn.click();
    await el.updateComplete;
    expect(enBtn.classList.contains('active')).to.be.false;
    expect(trBtn.classList.contains('active')).to.be.true;
  });
});
