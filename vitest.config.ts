import { resolve } from 'path'

import { defineConfig } from 'vitest/config'

import { compilerOptions } from './tsconfig.json'

const resolvePaths = () => {
  return Object.fromEntries(
    Object.entries(compilerOptions.paths || {}).map(([key, value]) => [
      key.replace('/*', ''),
      resolve(__dirname, value[0].replace('/*', '')),
    ])
  )
}

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
    globals: true,
    include: ['**/*.spec.{ts,tsx,js,jsx}'],
    coverage: {
      include: ['src/**/*.ts'],
    },
    alias: resolvePaths(),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
})
