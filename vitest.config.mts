/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';  // Importing from the correct package
//import { server } from "./app/mocks/server.js";

//beforeAll(() => server.listen());
//afterEach(() => server.resetHandlers());
//afterAll(() => server.close());
export default defineConfig({
  resolve: {
    alias: {
      // Use an absolute path to the source directory
      '@': 'C:/Users/pitts/Desktop/Git/Contact-Editor-Next.js/app',
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});
