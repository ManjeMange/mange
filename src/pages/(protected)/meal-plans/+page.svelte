<script lang="ts">
  import type { Writable } from 'svelte/store';

  export let title: Writable<string>;

  title.set('Meal Plans');
</script>

<div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">Meal Plans</div>
