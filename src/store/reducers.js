// Action types
export const ActionTypes = {
  ADD_EMPLOYEE: 'ADD_EMPLOYEE',
  UPDATE_EMPLOYEE: 'UPDATE_EMPLOYEE',
  DELETE_EMPLOYEE: 'DELETE_EMPLOYEE',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_VIEW_MODE: 'SET_VIEW_MODE',
  SELECT_EMPLOYEE: 'SELECT_EMPLOYEE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_EMPLOYEES: 'SET_EMPLOYEES',
  SET_FILTERED_EMPLOYEES: 'SET_FILTERED_EMPLOYEES'
};

// Employee reducer
export function employeeReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, { ...action.payload, id: generateId() }],
        currentPage: 1 // Reset to first page after adding
      };
      
    case ActionTypes.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map(emp => 
          emp.id === action.payload.id ? action.payload : emp
        )
      };
      
    case ActionTypes.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload)
      };
      
    case ActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
        currentPage: 1 // Reset to first page when searching
      };
      
    case ActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
      
    case ActionTypes.SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload
      };
      
    case ActionTypes.SELECT_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: action.payload
      };
      
    case ActionTypes.SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      };
      
    case ActionTypes.SET_FILTERED_EMPLOYEES:
      return {
        ...state,
        filteredEmployees: action.payload
      };
      
    default:
      return state;
  }
}

// Helper function to generate unique IDs
function generateId() {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).slice(2, 7);
  return `${timestamp}${randomPart}`;
}
