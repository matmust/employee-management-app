import { t } from '../localization/index.js';

// Email validation
export function validateEmail(email) {
  if (!email) {
    return t('employee.validation.required');
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return t('employee.validation.email');
  }
  
  return '';
}

// Phone validation
export function validatePhone(phone) {
  if (!phone) {
    return t('employee.validation.required');
  }
  
  const phoneRegex = /^\+?[\d\s()-]{8,20}$/;
  if (!phoneRegex.test(phone)) {
    return t('employee.validation.phone');
  }
  
  return '';
}

// Date validation (DD/MM/YYYY format)
export function validateDate(date) {
  if (!date) {
    return t('employee.validation.required');
  }

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    return t('employee.validation.date');
  }
  
  return '';
}

// Required field validation
export function validateRequired(value) {
  if (value === '' || value === null || value === undefined) {
    return t('employee.validation.required');
  }
  return '';
}

// Validate employee form
export function validateEmployeeForm(employee) {
  const errors = {};
  
  ['firstName', 'lastName', 'department', 'position'].forEach(field => {
    const error = validateRequired(employee[field]);
    if (error) {
      errors[field] = error;
    }
  });
  
  ['dateOfEmployment', 'dateOfBirth'].forEach(field => {
    const error = validateDate(employee[field]);
    if (error) {
      errors[field] = error;
    }
  });
  
  const emailError = validateEmail(employee.email);
  if (emailError) {
    errors.email = emailError;
  }
  
  const phoneError = validatePhone(employee.phone);
  if (phoneError) {
    errors.phone = phoneError;
  }
  
  return errors;
}

// Check if email is unique
export function isEmailUnique(email, employees, currentEmployeeId = null) {
  return !employees.some(emp => 
    emp.email === email && (!currentEmployeeId || emp.id !== currentEmployeeId)
  );
}

// Check if form has errors
export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
