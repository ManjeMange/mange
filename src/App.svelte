<script lang="ts">
  import Route from 'lib/Router/Route.svelte';
  import { useRoutes } from 'lib/Router';
  import Home from './pages/Home.svelte';

  useRoutes([
    {
      path: '/',
      component: Home,
    },
  ]);
</script>

<Route />
