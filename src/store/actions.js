import { ActionTypes } from './reducers.js';

// Employee actions
export const setEmployees = (employees) => ({
  type: ActionTypes.SET_EMPLOYEES,
  payload: employees
});

export const setFilteredEmployees = (filteredEmployees) => ({
  type: ActionTypes.SET_FILTERED_EMPLOYEES,
  payload: filteredEmployees
});

export const addEmployee = (employee) => ({
  type: ActionTypes.ADD_EMPLOYEE,
  payload: employee
});

export const updateEmployee = (employee) => ({
  type: ActionTypes.UPDATE_EMPLOYEE,
  payload: employee
});

export const deleteEmployee = (id) => ({
  type: ActionTypes.DELETE_EMPLOYEE,
  payload: id
});

// UI actions
export const setSearchQuery = (query) => ({
  type: ActionTypes.SET_SEARCH_QUERY,
  payload: query
});

export const setCurrentPage = (pageNumber) => ({
  type: ActionTypes.SET_CURRENT_PAGE,
  payload: pageNumber
});

export const setViewMode = (mode) => ({
  type: ActionTypes.SET_VIEW_MODE,
  payload: mode
});

export const selectEmployee = (employee) => ({
  type: ActionTypes.SELECT_EMPLOYEE,
  payload: employee
});
