<script lang="ts">
  let count = 0;
  const increment = () => {
    count += 1;
  };
</script>

<div class="bg-red-400">
  <button on:click={increment}>
    count is {count}
  </button>
</div>
