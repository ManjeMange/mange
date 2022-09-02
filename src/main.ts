import App from './App.svelte'
import 'virtual:windi.css'

const app = new App({
  target: document.getElementById('app') as HTMLElement
})

export default app
