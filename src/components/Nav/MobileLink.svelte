<script lang="ts">
  export let href = '';

  // pull this from router automatically some how
  // also add `aria-current="page"` when active
  // export let active = false;
</script>

<a
  {href}
  class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:(bg-gray-100 text-gray-800)"
>
  <slot />
</a>
