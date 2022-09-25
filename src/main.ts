import '@unocss/reset/tailwind.css'
import 'uno.css';

import App from './App.svelte';

const app = new App({
  target: document.getElementById('app') as HTMLElement,
});

export default app;
