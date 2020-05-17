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
      format: 'cjs',
      banner,
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
    css({ output: pkg.style }),
    typescript({
      typescript: require('typescript'),
    }),
  ],
};
