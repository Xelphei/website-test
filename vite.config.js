import { defineConfig } from 'vite';

export default defineConfig({
  base: '/website-test/',
  build: {
    outDir: 'dist',
  },
  assetsInclude: ['**/*.md', '**/*.yaml'],
});
