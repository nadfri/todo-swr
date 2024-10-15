# Todo List React + TypeScript + useSWR + Vite

This project aims to test caching with `useSWR` in a Todo List application. It also serves as a playground to test custom drag and drop functionality and others.

## Libraries

- **SWR**: Used for managing `cache` in HTTP requests, allowing efficient data fetching, caching, and synchronization in React.
- **json-Server**: Simulates a RESTful server quickly using a `db.json` file, acting as a mock backend.
- **zod**: A TypeScript schema validation library used to ensure the safety and validity of data handled in the application.
- **date-fns**: Provides the most comprehensive, yet simple and consistent toolset for manipulating JavaScript dates
- **react-error-boundary**: The simplest way to render a default "something went wrong" type of error message
- **Vitest**: Fast unit testing framework
- **react-testing-library**: Solution to test React Components
- **msw** : The simplest way to mock a server to use in tests
- **i18next** : Handle multi languages


## Prerequisites

- Node.js
- npm or yarn

## Installation

1. Clone the repository:

```sh
git clone https://github.com/nadfri/todo-swr.git
cd todo-swr
```

2. Install dependencies:
```sh
npm install
# or
yarn install
```

## Running the Project

1. Start the JSON server:
```sh
npm run server
# or
npx json-server --watch db.json --port 3001
```

2. Start the Vite application:

```sh
npm run dev
# or
yarn dev
```

## Testing

1. Start vitest:
```sh
npm run vitest
# or for coverage
npm run coverage
```

## Project Structure
- src/components: React components used in the application.
- src/pages: Application pages.
- src/api: Functions to interact with the API.
- src/utils: Utility functions.
- db.json: JSON file used by json-server to simulate an API.



