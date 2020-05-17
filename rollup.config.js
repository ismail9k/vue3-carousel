import css from 'rollup-plugin-css-only';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
  name: pkg.name,
  banner: `/**
  * Vue 3 Carousel ${pkg.version}
  * (c) ${new Date().getFullYear()}
    * @license MIT
    */`,
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
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
