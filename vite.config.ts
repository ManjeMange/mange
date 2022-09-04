import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import WindiCSS from 'vite-plugin-windicss';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), WindiCSS()],
  resolve: {
    dedupe: ['svelte'],
    alias: {
      lib: resolve(__dirname, './src/lib'),
      components: resolve(__dirname, './src/components'),
    },
  },
});
