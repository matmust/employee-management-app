import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../../../src/components/employee-list.js';
import { store } from '../../store/store.js';
import { Router } from '@vaadin/router';
import { setViewMode, setEmployees, setFilteredEmployees } from '../../../src/store/actions.js';

describe('EmployeeList', () => {
  let element;
  const sampleEmployees = [
    {
      id: '1',
      firstName: 'TEST',
      lastName: 'Employee',
      dateOfEmployment: '15/01/2023',
      dateOfBirth: '12/05/1990',
      phone: '+90 555 111 22 33',
      email: 'test.employee@example.com',
      department: 'Tech',
      position: 'Senior'
    },
    {
      id: '2',
      firstName: 'DEMO',
      lastName: 'User',
      dateOfEmployment: '20/03/2022',
      dateOfBirth: '08/11/1988',
      phone: '+90 555 222 33 44',
      email: 'demo.user@example.com',
      department: 'Analytics',
      position: 'Medior'
    },
  ];

  beforeEach(async () => {
    //Set up store state BEFORE creating the element
    store.dispatch(setEmployees(sampleEmployees));
    store.dispatch(setFilteredEmployees(sampleEmployees));

    element = await fixture(html`<employee-list></employee-list>`);
    await element.updateComplete;
  });

  it('renders the component with initial state', () => {
    const title = element.shadowRoot.querySelector('.list-title');
    expect(title).to.exist;
    expect(element.employees.length).to.equal(sampleEmployees.length);
    expect(element.filteredEmployees.length).to.equal(sampleEmployees.length);
  });

  it('switches between table and list view modes', async () => {
    const listButton = element.shadowRoot.querySelector('.toggle-btn:not(.active)');
    listButton.click();
    await element.updateComplete;

    expect(element.viewMode).to.equal('list');
    expect(element.shadowRoot.querySelector('.employee-cards')).to.exist;

    const tableButton = element.shadowRoot.querySelector('.toggle-btn:not(.active)');
    tableButton.click();
    await element.updateComplete;

    expect(element.viewMode).to.equal('table');
    expect(element.shadowRoot.querySelector('table')).to.exist;
  });

  it('filters employees based on search query', async () => {
    const searchInput = element.shadowRoot.querySelector('.search-input');
    const event = new Event('input');
    searchInput.value = 'TEST';
    searchInput.dispatchEvent(event);

    await element.updateComplete;
    expect(store.getState().searchQuery).to.equal('TEST');
    searchInput.value = '';
    searchInput.dispatchEvent(event);
  });

  it('navigates to edit page when edit button is clicked', async () => {
    const routerStub = stub(Router, 'go');
    const editButton = element.shadowRoot.querySelector('.action-btn.edit-btn');

    editButton.click();
    await element.updateComplete;
    expect(routerStub.calledWith('/employees/1/edit')).to.be.true;
    routerStub.restore();
  });

  it('shows delete confirmation dialog', async () => {
    const routerStub = stub(Router, 'go');
    const deleteButton = element.shadowRoot.querySelector('.action-btn.delete-btn');
    deleteButton.click();

    await element.updateComplete;
    expect(element.showDeleteConfirm).to.be.true;
    expect(element.employeeToDelete).to.deep.equal(sampleEmployees[0]);
    routerStub.restore();
  });

  it('handles delete confirmation', async () => {
    // Setup delete confirmation
    element.employeeToDelete = sampleEmployees[0];
    element.showDeleteConfirm = true;
    await element.updateComplete;
    const confirmDialog = element.shadowRoot.querySelector('confirm-dialog');
    confirmDialog.dispatchEvent(new CustomEvent('confirm', {
      detail: { confirmed: true }
    }));

    await element.updateComplete;
    expect(element.showDeleteConfirm).to.be.false;
    expect(element.employeeToDelete).to.be.null;

    store.dispatch(setEmployees(sampleEmployees));
    store.dispatch(setFilteredEmployees(sampleEmployees));
    await element.updateComplete;

  });

  it('renders employee data correctly in table view', () => {
    const tableRows = element.shadowRoot.querySelectorAll('tbody tr');
    expect(tableRows.length).to.equal(sampleEmployees.length);

    const firstRow = tableRows[0];
    const cells = firstRow.querySelectorAll('td');
    expect(cells[0].textContent).to.equal('TEST');
    expect(cells[1].textContent).to.equal('Employee');
    expect(cells[5].textContent).to.equal('test.employee@example.com');
  });

  it('renders employee data correctly in list view', async () => {
    // Switch to list view
    store.dispatch(setViewMode('list'));
    await element.updateComplete;

    const cards = element.shadowRoot.querySelectorAll('.employee-card');
    expect(cards.length).to.equal(sampleEmployees.length);

    const firstCard = cards[0];
    const cardName = firstCard.querySelector('.card-name');
    expect(cardName.textContent).to.equal('TEST Employee');

    const fieldValues = firstCard.querySelectorAll('.field-value');
    expect(fieldValues[2].textContent).to.equal('test.employee@example.com');

    // Switch to table view
    store.dispatch(setViewMode('table'));
    await element.updateComplete;
  });

  it('displays empty message when no employees', async () => {
    // Clear employees
    store.dispatch(setEmployees([]));
    store.dispatch(setFilteredEmployees([]));
    await element.updateComplete;

    const emptyMessage = element.shadowRoot.querySelector('.empty-message');
    expect(emptyMessage).to.exist;
  });
});