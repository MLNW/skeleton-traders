<script lang="ts">
  import { page } from '$app/stores';
  import Crew from '$lib/components/ships/Crew.svelte';
</script>

<div class="card">
  {#await $page.data.stream.ship}
    <p class="variant-filled-primary">Loading</p>
  {:then ship}
    <h2>{ship.data.symbol} ({ship.data.frame.name})</h2>
    <p>{ship.data.nav.status}</p>
    <p>Flight mode: {ship.data.nav.flightMode}</p>

    <Crew crew={ship.data.crew} />
  {:catch error}
    <p class="variant-filled-error">{error.code} {error.message}</p>
  {/await}
</div>
