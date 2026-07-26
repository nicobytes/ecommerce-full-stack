import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      'apps/**/vite.config.{mjs,js,ts,mts}',
      'apps/**/vitest.config.{mjs,js,ts,mts}',
      'libs/**/vite.config.{mjs,js,ts,mts}',
      'libs/**/vitest.config.{mjs,js,ts,mts}',
    ],
  },
});
