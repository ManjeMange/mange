import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { FileRouter, SvelteRouterOptions } from '@mpaupulaire4/rollup-plugin-pages';
import Unocss from 'unocss/vite';
import presetIcons from '@unocss/preset-icons';
import presetWind from '@unocss/preset-wind';
import { extractorSvelte } from '@unocss/core';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { presetForms } from '@julr/unocss-preset-forms';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    Unocss({
      extractors: [extractorSvelte],
      presets: [
        presetForms(),
        presetWind({}),
        presetIcons({
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
      transformers: [transformerVariantGroup()],
    }),
    svelte({
      experimental: {
        prebundleSvelteLibraries: false,
      },
    }),
    FileRouter({
      rootDir: './src/pages/',
      extension: 'svelte',
      meta: {
        data: 'ts',
      },
      ...SvelteRouterOptions,
    }),
  ],
  resolve: {
    dedupe: ['svelte'],
    alias: {
      lib: resolve(__dirname, './src/lib'),
      components: resolve(__dirname, './src/components'),
      assets: resolve(__dirname, './src/assets'),
    },
  },
});
