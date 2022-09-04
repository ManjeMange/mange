import { defineConfig } from 'windicss/helpers';
import defaultTheme from 'windicss/defaultTheme';
import Forms from 'windicss/plugin/forms';

export default defineConfig({
  extract: {
    include: ['./index.html', './src/**/*.{svelte,html,js,ts}'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [Forms],
});
