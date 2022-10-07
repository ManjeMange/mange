<script lang="ts">
  export let label: string;
  export let checked = false;
  export let name: string;
</script>

<div class="flex items-center">
  <input
    id={name}
    {name}
    bind:checked
    type="checkbox"
    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    {...$$restProps}
  />
  <label for={name} class="ml-2 block text-sm text-gray-900">{label}</label>
</div>
