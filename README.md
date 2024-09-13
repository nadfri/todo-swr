# Todo List React + TypeScript + useSWR + Vite

This project aims to test caching with ```useSWR``` in a Todo List application. It also serves as a playground to test custom drag and drop functionality and others.

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
npx json-server --watch db.json --port 3000
```

2. Start the Vite application:

```sh
npm run dev
# or
yarn dev
```

## Project Structure
- src/components: React components used in the application.
- src/pages: Application pages.
- src/api: Functions to interact with the API.
- src/utils: Utility functions.
- db.json: JSON file used by json-server to simulate an API.



