import { defineConfig, loadEnv } from 'vite';
import vituum from 'vituum';
import nunjucks from '@vituum/vite-plugin-nunjucks';
import tsconfigPaths from 'vite-tsconfig-paths';
import process from 'node:process';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_BASE_PATH,
    resolve: {
      alias: {
        '@/': `${__dirname}/src/`,
        '@scss/': `${__dirname}/src/styles/`,
      },
    },
    server: {
      host: true,
    },
    plugins: [
      vituum({
        imports: {
          paths: ['./src/styles/*/**', './src/components/*/**', './src/scripts/*/**'],
          filenamePattern: {
            '+.css': [],
            '+.scss': ['src/styles/', 'src/components/'],
            '+.js': [],
            '+.ts': ['src/scripts/', 'src/components/'],
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
  };
});
