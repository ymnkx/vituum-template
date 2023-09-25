import { defineConfig } from 'vite';
import vituum from 'vituum';
import nunjucks from '@vituum/vite-plugin-nunjucks';
import tsconfigPaths from 'vite-tsconfig-paths';

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
});

vituum({
  imports: {
    filenamePattern: {
      '+.css': [],
      '+.scss': 'src/styles',
    },
  },
});
