import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-css-only'
import del from 'rollup-plugin-delete'
import dts from 'vite-plugin-dts'

import pkg from './package.json' with { type: 'json' }

const banner = `/**
 * Vue 3 Carousel ${pkg.version}
 * (c) ${new Date().getFullYear()}
 * @license MIT
 */`

const output = [
  {
    file: 'dist/carousel.js',
    format: 'umd',
    name: 'VueCarousel',
    banner,
    globals: {
      vue: 'Vue',
    },
    sourcemap: true,
  },
  {
    file: 'dist/carousel.min.js',
    format: 'umd',
    name: 'VueCarousel',
    banner,
    globals: {
      vue: 'Vue',
    },
    plugins: [terser()],
    sourcemap: true,
  },
  {
    file: 'dist/carousel.mjs',
    format: 'es',
    banner,
    sourcemap: true,
  },
  {
    file: 'dist/carousel.cjs',
    format: 'cjs',
    banner,
    sourcemap: true,
  },
]

export default [
  {
    input: 'src/index.ts',
    output: output,
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      css({ output: 'carousel.css' }),
      typescript(),
      del({ targets: 'dist/*', hook: 'buildStart' }), // Clean 'dist' folder before each build
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/carousel.d.ts', format: 'es' }],
    external: ['vue', /\.css$/],
    plugins: [
      typescript(),
      dts({
        rollupTypes: true,
        pathsToAliases: true,
        declarationOnly: true,
      }),
    ],
  },
]
