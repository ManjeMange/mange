<script lang="ts">
  import { useHandlers, Route } from '@mpaupulaire4/svelte-router';
  import handlers from 'virtual:fs-routes';

  useHandlers(handlers);
</script>

<Route />
