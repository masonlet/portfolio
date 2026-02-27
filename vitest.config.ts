import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: '.',
    coverage: {
      provider: 'v8',
    }
  }
});
