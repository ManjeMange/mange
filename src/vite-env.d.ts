/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module 'virtual:fs-routes' {
  import { useHandlers } from '@mpaupulaire4/svelte-router'
  const routes: Parameters<typeof useHandlers>[0];
  export default routes;
}

declare module 'pocketbase/umd' {
  import Client from 'pocketbase'
  export default Client;
}
