<script lang="ts">
  import { page } from '$app/stores';

  $: ({ symbol, type, x, y, waypoints, factions } = $page.data.system.data);
</script>

<div class="container">
  <h1>{symbol} ({type})</h1>
  <p>Position: ({x}, {y})</p>

  <div class="card m-2">
    <header class="card-header">
      <h2>Waypoints</h2>
    </header>
    <div class="p-4">
      {#each waypoints as waypoint}
        <p>{waypoint.symbol} ({waypoint.type})</p>
      {/each}
    </div>
  </div>

  <div class="card m-2">
    <header class="card-header">
      <h2>Factions</h2>
    </header>
    <div class="p-4">
      {#if factions.length === 0}
        <p>None</p>
      {/if}
      {#each factions as faction}
        <p>{faction.symbol}</p>
      {/each}
    </div>
  </div>
</div>
