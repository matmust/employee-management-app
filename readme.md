# Employee Management Application

A simple web application built with Lit to manage employee information.

## Features

- List all employee records with pagination and search
- Toggle between table and list view
- Add new employee records with validation
- Update existing employee records
- Delete employee records with confirmation
- Localization support for English and Turkish
- State management for data persistence

## Tech Stack

- **Lit** - Web Components library
- **Vite** - Frontend Tooling
- **Vaadin Router** - Client-side routing
- **Web Test Runner** - Testing framework
- **@open-wc/testing** - Browser-based testing helpers
- **@esm-bundle/chai** - ESM-compatible Chai assertions for browser tests
- **Sinon** - Test spies, stubs, and mocks

## Project Structure

```
src/
├── components/             # Reusable components
├── data/                   # Sample data
├── localization/           # Localization files
├── router/                 # Vaadin router configuration
├── store/                  # Redux Like state management
├── styles/                 # CSS files
├── test/                   # Test files
├── utils/                  # Utility functions
└── views/                  # Page views
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/matmust/employee-management-app.git
cd employee-management-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

This will open the application in your default browser at `http://localhost:3000`.

### Running Tests

To run the tests:

```bash
npm test
```

This will:
- Run all unit tests
- Show test coverage

#### Test areas:

- Component rendering and UI states (table/list view, dialogs, navigation, language switcher, pagination)
- User interactions (form input, button clicks, confirmation dialogs, navigation, language switching)
- Data validation (email, phone, date, required fields, unique email)
- Store actions (add, update, select, delete, set page)