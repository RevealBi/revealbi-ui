/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/ui',

  plugins: [
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
    viteStaticCopy({
      targets: [
        { src: 'src/themes/light.css', dest: 'themes' },
        { src: 'src/themes/dark.css', dest: 'themes' }
      ],
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../dist/packages/ui',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'rv',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
    },
  },

  test: {
    watch: false,
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest/packages/ui',
    },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/ui',
      provider: 'v8',
    },
  },
});
