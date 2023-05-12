<script lang="ts">
  import { page } from '$app/stores';

  $: ({ symbol, headquarters, credits } = $page.data.user);
</script>

<div class="container mx-auto flex">
  <div class="card">
    <h1>{symbol}</h1>
    <p>{headquarters}</p>
    <p>{credits}</p>
  </div>
  <div class="card">
    <h2>Main Ship</h2>
    {#await $page.data.stream.ship}
      <p class="variant-filled-primary">Loading</p>
    {:then ship}
      <p>{ship.data.symbol}</p>
    {:catch data}
      <p class="variant-filled-error">{data.error.code} {data.error.message}</p>
    {/await}
  </div>
</div>
