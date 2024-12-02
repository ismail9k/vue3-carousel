import { resolve } from 'node:path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import { compilerOptions } from '../tsconfig.json'

const resolvePaths = () => {
  return Object.fromEntries(
    Object.entries(compilerOptions.paths || {}).map(([key, value]) => [
      key.replace('/*', ''),
      resolve(__dirname, '..', value[0].replace('/*', '')),
    ])
  )
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: resolvePaths(),
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
})
