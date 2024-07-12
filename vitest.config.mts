/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';  // Importing from the correct package

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
