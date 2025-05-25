import { expect, fixture, html } from '@open-wc/testing';
import { stub } from 'sinon';
import { Router } from '@vaadin/router';
import { store } from '../../store/store.js';
import { setEmployees } from '../../../src/store/actions.js';
import '../../../src/components/employee-form.js';

describe('EmployeeForm', () => {
  let el;
  let sampleEmployee;
  let goStub;

  beforeEach(async () => {
    sampleEmployee = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '01/01/2020',
      dateOfBirth: '01/01/1990',
      phone: '+90 555 111 22 33',
      email: 'john.doe@example.com',
      department: 'Tech',
      position: 'Senior'
    };
    store.dispatch(setEmployees([sampleEmployee]));
    el = await fixture(html`<employee-form></employee-form>`);
    goStub = stub(Router, 'go');
  });

  afterEach(() => {
    goStub.restore();
  });

  it('renders the form', () => {
    expect(el.shadowRoot.querySelector('form')).to.exist;
  });

  describe('Form Validation', () => {
    it('shows errors for empty required fields', async () => {
      const form = el.shadowRoot.querySelector('form');
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      await el.updateComplete;
      expect(Object.keys(el.errors).length).to.be.greaterThan(0);
    });

    it('clears error when input changes', async () => {
      el.errors = { firstName: 'Error' };
      const input = el.shadowRoot.querySelector('#firstName');
      input.value = 'John';
      input.dispatchEvent(new Event('input'));
      await el.updateComplete;
      expect(el.errors.firstName).to.equal('');
    });
  });

  describe('User Actions', () => {
    it('navigates away when cancel button is clicked', () => {
      const cancelBtn = el.shadowRoot.querySelector('.cancel-btn');
      cancelBtn.click();
      expect(goStub.calledWith('/employees')).to.be.true;
    });

    it('shows confirmation dialog in edit mode and saves on confirm', async () => {
      el.mode = 'edit';
      el.employee = { ...sampleEmployee };
      await el.updateComplete;
      const form = el.shadowRoot.querySelector('form');
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      await el.updateComplete;
      expect(el.showConfirm).to.be.true;
      // Simulate confirm event
      const saveStub = stub(el, '_saveEmployee');
      el._handleUpdateConfirm({ detail: { confirmed: true } });
      expect(saveStub.calledOnce).to.be.true;
      saveStub.restore();
    });
  });
});
