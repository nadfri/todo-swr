import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './src/mocks/server';
import { cleanup } from '@testing-library/react';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

server.events.on('request:start', ({ request }) => {
  console.info('MSW intercepted:', request.method, request.url);
});
