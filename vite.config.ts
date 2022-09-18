import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { FileRouter, SvelteRouterOptions } from '@mpaupulaire4/rollup-plugin-pages';
import WindiCSS from 'vite-plugin-windicss';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    svelte({
      experimental: {
        prebundleSvelteLibraries: false,
      },
    }),
    WindiCSS(),
    FileRouter({
      rootDir: './src/pages/',
      extensions: ['svelte'],
      meta: {
        data: ['ts'],
      },
      ...SvelteRouterOptions,
    }),
  ],
  resolve: {
    dedupe: ['svelte'],
    alias: {
      lib: resolve(__dirname, './src/lib'),
      components: resolve(__dirname, './src/components'),
    },
  },
});
