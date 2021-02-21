import css from 'rollup-plugin-css-only';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const banner = `/**
 * Vue 3 Carousel ${pkg.version}
 * (c) ${new Date().getFullYear()}
 * @license MIT
 */`;

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'VueCarousel',
      banner,
      globals: {
        vue: 'Vue',
      },
    },
    {
      file: pkg.module,
      format: 'es',
      banner,
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    css({ output: 'carousel.css' }),
    typescript({
      typescript: require('typescript'),
    }),
  ],
};
