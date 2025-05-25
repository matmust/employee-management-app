import { expect } from '@esm-bundle/chai';
import {
  addEmployee,
  updateEmployee,
  setCurrentPage,
  selectEmployee,
  deleteEmployee
} from '../../../src/store/actions.js';
import { ActionTypes } from '../../../src/store/reducers.js';

describe('Store Actions', () => {
  let sampleEmployee;

  beforeEach(() => {
    sampleEmployee = {
      id: 111,
      firstName: 'SAMPLE',
      lastName: 'Data',
      dateOfEmployment: '10/06/2023',
      dateOfBirth: '25/03/1992',
      phone: '+90 555 333 44 55',
      email: 'sample.data@example.com',
      department: 'Tech',
      position: 'Junior'
    };
  });

  describe('addEmployee', () => {
    it('creates an action to add an employee', () => {
      const expectedAction = {
        type: ActionTypes.ADD_EMPLOYEE,
        payload: sampleEmployee
      };
      expect(addEmployee(sampleEmployee)).to.deep.equal(expectedAction);
    });
  });

  describe('updateEmployee', () => {
    it('creates an action to update an employee', () => {
      const updatedEmployee = { ...sampleEmployee, lastName: 'Data-update' };
      const expectedAction = {
        type: ActionTypes.UPDATE_EMPLOYEE,
        payload: updatedEmployee
      };
      expect(updateEmployee(updatedEmployee)).to.deep.equal(expectedAction);
    });
  });

  describe('selectEmployee', () => {
    it('creates an action to select an employee', () => {
      const expectedAction = {
        type: ActionTypes.SELECT_EMPLOYEE,
        payload: sampleEmployee
      };
      expect(selectEmployee(sampleEmployee)).to.deep.equal(expectedAction);
    });
  });

  describe('deleteEmployee', () => {
    it('creates an action to delete an employee by id', () => {
      const expectedAction = {
        type: ActionTypes.DELETE_EMPLOYEE,
        payload: sampleEmployee.id
      };
      expect(deleteEmployee(sampleEmployee.id)).to.deep.equal(expectedAction);
    });
  });
  
  describe('setCurrentPage', () => {
    it('creates an action to set the current page', () => {
      const pageNumber = 2;
      const expectedAction = {
        type: ActionTypes.SET_CURRENT_PAGE,
        payload: pageNumber
      };
      expect(setCurrentPage(pageNumber)).to.deep.equal(expectedAction);
    });
  });
});
