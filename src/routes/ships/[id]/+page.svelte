<script lang="ts">
  import { page } from '$app/stores';
  import Cargo from '$lib/components/ships/Cargo.svelte';
  import Crew from '$lib/components/ships/Crew.svelte';

  $: ({ symbol, frame, nav, crew, cargo } = $page.data.ship.data);
</script>

<div class="card">
  <header class="card-header">
    <h2>{symbol} ({frame.name})</h2>
  </header>
  <footer class="card-footer">
    <p>
      {nav.status} in
      <a href="/systems/{nav.systemSymbol}">{nav.systemSymbol}</a>
      {#if nav.waypointSymbol}
        at <a href="/systems/{nav.systemSymbol}/waypoints/{nav.waypointSymbol}">
          {nav.waypointSymbol}
        </a>
      {/if}
    </p>
    <p>Flight mode: {nav.flightMode}</p>
    <Crew {crew} />
    <Cargo {cargo} />
  </footer>
</div>
