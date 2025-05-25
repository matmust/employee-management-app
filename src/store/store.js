import { ActionTypes, employeeReducer } from './reducers.js';
import { employees } from '../data/employees.js';

// Initial state including localStorage support
const initialState = {
  employees: localStorage.getItem('employees') 
    ? JSON.parse(localStorage.getItem('employees')) 
    : employees,
  filteredEmployees: [],
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 5,
  totalPages: 1,
  viewMode: 'table', // 'table' or 'list'
  selectedEmployee: null,
};

// Create a simple store implementation
class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
    this.listeners = [];
    this.persist();
    // Calculate initial derived state
    this.updateDerivedState();
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.updateDerivedState();

    const employeeActions = [
      ActionTypes.ADD_EMPLOYEE,
      ActionTypes.UPDATE_EMPLOYEE, 
      ActionTypes.DELETE_EMPLOYEE,
      ActionTypes.SET_EMPLOYEES
    ];
    
    if (employeeActions.includes(action.type)) {
      this.persist();
    }

    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Persist state to localStorage
  persist() {
    localStorage.setItem('employees', JSON.stringify(this.state.employees));
  }

  // Update derived state properties
  updateDerivedState() {
    // Filter employees based on search query
    let filtered = [...this.state.employees];
    
    if (this.state.searchQuery) {
      const query = this.state.searchQuery.toLowerCase();

      filtered = filtered.filter(emp => 
        Object.values(emp).some(val => 
          String(val).toLowerCase().includes(query)
        )
      );
    }
    
    // Calculate pagination
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / this.state.itemsPerPage);
    
    // Get current page items
    const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
    const endIndex = startIndex + this.state.itemsPerPage;
    const paginatedItems = filtered.slice(startIndex, endIndex);
    
    // Update state with derived values
    this.state = {
      ...this.state,
      filteredEmployees: paginatedItems,
      totalPages: totalPages
    };
  }
}

// Create and export the store
export const store = new Store(employeeReducer, initialState);
