import { defineConfig } from 'vite';
import vituum from 'vituum';
import nunjucks from '@vituum/vite-plugin-nunjucks';
import tsconfigPaths from 'vite-tsconfig-paths';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${__dirname}/src/`,
      '@scss/': `${__dirname}/src/styles/`,
    },
  },
  plugins: [
    vituum({
      imports: {
        filenamePattern: {
          '+.css': [],
          '+.scss': 'src/styles',
          '+.js': [],
          '+.ts': 'src/scripts',
        },
      },
    }),
    nunjucks({
      root: './src',
    }),
    tsconfigPaths(),
  ],
  build: {
    emptyOutDir: true,
    polyfillModulePreload: false,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/css/[name].[ext]',
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      },
    },
  },
});
