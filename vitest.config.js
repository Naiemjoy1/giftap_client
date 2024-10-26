import { defineConfig } from 'vite';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Use jsdom to render components
  },
});
