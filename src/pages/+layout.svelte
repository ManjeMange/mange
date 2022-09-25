<script lang="ts">
  import { writable } from '@crikey/stores-strict';
  import { Route } from '@mpaupulaire4/svelte-router';
  import NavBar from 'components/Nav/Bar.svelte';
  const title = writable('');

  // TODO: Clean up temporary stop gap
  // router dousen't allow layout resets yet
  const reset = writable(false);
</script>

{#if $reset}
  <Route {title} {reset} />
{:else}
  <div class="min-h-full">
    <!-- TODO: maybe change this background to the recipe cover image -->
    <div class="bg-indigo-600 pb-32">
      <NavBar />
      {#if $title}
        <header class="py-10">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold tracking-tight text-white">{$title}</h1>
          </div>
        </header>
      {/if}
    </div>

    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <Route {title} {reset} />
        <!-- Replace with your content -->
        <!-- <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6"> -->
        <!--   <div class="h-96 rounded-lg border-4 border-dashed border-gray-200" /> -->
        <!-- </div> -->
        <!-- /End replace -->
      </div>
    </main>
  </div>
{/if}
