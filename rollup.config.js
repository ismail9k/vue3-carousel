import css from 'rollup-plugin-css-only'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import { typescriptPaths } from 'rollup-plugin-typescript-paths'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

import pkg from './package.json' assert { type: 'json' }

const banner = `/**
 * Vue 3 Carousel ${pkg.version}
 * (c) ${new Date().getFullYear()}
 * @license MIT
 */`

export default [
  {
    input: 'src/index.ts',
    output: [
      // UMD output
      {
        file: pkg.main,
        format: 'umd',
        name: 'VueCarousel',
        banner,
        globals: {
          vue: 'Vue',
        },
      },
      // ES output
      {
        file: pkg.module,
        format: 'es',
        banner,
      },
      // Minified UMD output
      {
        file: 'dist/carousel.min.js',
        format: 'umd',
        name: 'VueCarousel',
        banner,
        globals: {
          vue: 'Vue',
        },
        plugins: [terser()],
      },
      // Minified ES output
      {
        file: 'dist/carousel.es.min.js',
        format: 'es',
        banner,
        plugins: [terser()],
      },
    ],
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
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/carousel.d.ts', format: 'es' }],
    external: [/\.css$/],
    plugins: [
      typescriptPaths({ preserveExtensions: true }),
      dts(),
      del({ hook: 'buildEnd', targets: ['dist/**', '!dist/carousel.*'], runOnce: true }),
    ],
  },
]
