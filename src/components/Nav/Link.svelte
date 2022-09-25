<script lang="ts">
  export let href = '';

  // pull this from router automatically some how
  // also add `aria-current="page"` when active
  export let active = false;
</script>

<a
  {href}
  class="{active
    ? 'bg-indigo-700 text-white'
    : 'text-white hover:bg-indigo-500 hover:bg-opacity-75'} rounded-md py-2 px-3 text-sm font-medium"
>
  <slot />
</a>
