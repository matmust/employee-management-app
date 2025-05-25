import { expect } from '@esm-bundle/chai';
import {
    validateEmail,
    validatePhone,
    validateDate,
    validateRequired,
    validateEmployeeForm,
    isEmailUnique,
    hasErrors
} from '../../../src/utils/validation.js';

describe('Validation Utilities', () => {
  let translations;
  before(() => {
    translations = {
      'employee.validation.required': 'This field is required',
      'employee.validation.email': 'Please enter a valid email address',
      'employee.validation.phone': 'Please enter a valid phone number',
      'employee.validation.date': 'Please enter a valid date (DD/MM/YYYY)',
      'employee.validation.emailUnique': 'Email already exists'
    };
    window.t = (key) => translations[key] || key;
  });

  describe('validateEmail', () => {
    it('returns error for empty email', () => {
      expect(validateEmail('')).to.equal('This field is required');
    });
    it('returns error for invalid email format', () => {
      expect(validateEmail('invalid')).to.equal('Please enter a valid email address');
      expect(validateEmail('invalid@')).to.equal('Please enter a valid email address');
      expect(validateEmail('invalid@domain')).to.equal('Please enter a valid email address');
    });
    it('returns empty string for valid email', () => {
      expect(validateEmail('valid@example.com')).to.equal('');
    });
  });

  describe('validatePhone', () => {
    it('returns error for empty phone', () => {
      expect(validatePhone('')).to.equal('This field is required');
    });
    it('returns error for invalid phone format', () => {
      expect(validatePhone('123')).to.equal('Please enter a valid phone number');
      expect(validatePhone('abc123')).to.equal('Please enter a valid phone number');
    });
    it('returns empty string for valid phone', () => {
      expect(validatePhone('+90 532 123 45 67')).to.equal('');
      expect(validatePhone('(555) 123-4567')).to.equal('');
    });
  });

  describe('validateDate', () => {
    it('returns error for empty date', () => {
      expect(validateDate('')).to.equal('This field is required');
    });
    it('returns error for invalid date format', () => {
      expect(validateDate('2020-01-01')).to.equal('Please enter a valid date (DD/MM/YYYY)');
      expect(validateDate('01-01-2020')).to.equal('Please enter a valid date (DD/MM/YYYY)');
      expect(validateDate('Jan 1, 2020')).to.equal('Please enter a valid date (DD/MM/YYYY)');
    });
    it('returns empty string for valid date', () => {
      expect(validateDate('01/01/2020')).to.equal('');
      expect(validateDate('29/02/2020')).to.equal('');
      expect(validateDate('31/12/2020')).to.equal('');
    });
  });

  describe('validateRequired', () => {
    it('returns error for empty value', () => {
      expect(validateRequired('')).to.equal('This field is required');
      expect(validateRequired(null)).to.equal('This field is required');
      expect(validateRequired(undefined)).to.equal('This field is required');
    });
    it('returns empty string for non-empty value', () => {
      expect(validateRequired('value')).to.equal('');
      expect(validateRequired(0)).to.equal('');
      expect(validateRequired(false)).to.equal('');
    });
  });

  describe('validateEmployeeForm', () => {
    it('returns errors for invalid employee fields', () => {
      const employee = {
        firstName: '',
        lastName: 'Doe',
        dateOfEmployment: '01/01/2020',
        dateOfBirth: 'invalid-date',
        phone: '123',
        email: 'invalid-email',
        department: '',
        position: 'Junior'
      };
      const errors = validateEmployeeForm(employee);
      expect(errors.firstName).to.equal('This field is required');
      expect(errors.lastName).to.be.undefined;
      expect(errors.dateOfBirth).to.equal('Please enter a valid date (DD/MM/YYYY)');
      expect(errors.phone).to.equal('Please enter a valid phone number');
      expect(errors.email).to.equal('Please enter a valid email address');
      expect(errors.department).to.equal('This field is required');
      expect(errors.position).to.be.undefined;
    });
    it('returns empty object for valid employee', () => {
      const employee = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '01/01/2020',
        dateOfBirth: '01/01/1990',
        phone: '+90 532 123 45 67',
        email: 'john.doe@example.com',
        department: 'Analytics',
        position: 'Junior'
      };
      const errors = validateEmployeeForm(employee);
      expect(Object.keys(errors).length).to.equal(0);
    });
  });

  describe('isEmailUnique', () => {
    let employees;
    beforeEach(() => {
      employees = [
        { id: '1', email: 'john@example.com' },
        { id: '2', email: 'jane@example.com' }
      ];
    });
    it('returns true if email is unique', () => {
      expect(isEmailUnique('new@example.com', employees)).to.be.true;
    });
    it('returns false if email already exists', () => {
      expect(isEmailUnique('john@example.com', employees)).to.be.false;
    });
    it('ignores the current employee in edit mode', () => {
      expect(isEmailUnique('john@example.com', employees, '1')).to.be.true;
    });
  });

  describe('hasErrors', () => {
    it('returns true if errors object has properties', () => {
      expect(hasErrors({ firstName: 'Error' })).to.be.true;
    });
    it('returns false if errors object is empty', () => {
      expect(hasErrors({})).to.be.false;
    });
  });
});
