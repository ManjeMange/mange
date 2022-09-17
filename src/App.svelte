<script lang="ts">
  import { Route, useHandlers } from '@mpaupulaire4/svelte-router';
  import handlers from 'virtual:fs-routes';

  useHandlers(handlers);
</script>

<Route />
