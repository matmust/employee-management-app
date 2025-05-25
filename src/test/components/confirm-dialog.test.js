import { html, fixture, expect } from '@open-wc/testing';
import '../../../src/components/confirm-dialog.js';

describe('ConfirmDialog', () => {
  let element;
  let confirmButton;
  let cancelButton;
  let closeButton;

  beforeEach(async () => {
    element = await fixture(html`<confirm-dialog></confirm-dialog>`);
    confirmButton = element.shadowRoot.querySelector('.confirm-btn');
    cancelButton = element.shadowRoot.querySelector('.cancel-btn');
    closeButton = element.shadowRoot.querySelector('.close-btn');
  });

  describe('Confirm and Cancel Actions', () => {
    it('dispatches confirm event with confirmed: true when confirm button is clicked', () => {
      let eventDetail = null;
      element.addEventListener('confirm', (e) => {
        eventDetail = e.detail;
      });
      confirmButton.click();
      expect(eventDetail).to.deep.equal({ confirmed: true });
    });

    it('dispatches confirm event with confirmed: false when cancel button is clicked', () => {
      let eventDetail = null;
      element.addEventListener('confirm', (e) => {
        eventDetail = e.detail;
      });
      cancelButton.click();
      expect(eventDetail).to.deep.equal({ confirmed: false });
    });

    it('dispatches confirm event with confirmed: false when close button is clicked', () => {
      let eventDetail = null;
      element.addEventListener('confirm', (e) => {
        eventDetail = e.detail;
      });
      closeButton.click();
      expect(eventDetail).to.deep.equal({ confirmed: false });
    });
  });
});
