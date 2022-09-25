<script lang="ts">
  import logo from 'assets/SVG/mange-no-logo-w.svg';
  import { onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { title } from './title';

  export let reset: Writable<boolean>;

  onMount(() => {
    reset.set(true);
  });
</script>

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <img class="mx-auto h-24 w-auto" src={logo} alt="Mange Logo" />
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
      {$title}
    </h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <slot />
    </div>
  </div>
</div>
