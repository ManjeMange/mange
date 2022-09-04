<script lang="ts">
  import Route from 'lib/Router/Route.svelte';
  import { useRoutes } from 'lib/Router';
  import Home from './pages/Home.svelte';

  const { clickHandler } = useRoutes([
    {
      path: '/',
      component: Home,
    },
  ]);
</script>

<svelte:window on:click={clickHandler} />
<Route />
