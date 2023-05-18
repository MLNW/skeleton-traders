<script lang="ts">
  import { page } from '$app/stores';

  $: ({ symbol, systemSymbol, type, x, y, faction, traits, chart } = $page.data.waypoint.data);
</script>

<div class="flex flex-col">
  <h1>{symbol} ({type})</h1>
  <a href="/systems/{systemSymbol}">System: {systemSymbol}</a>
  <span>Position: ({x}, {y})</span>
  <span>Faction: {faction.symbol}</span>
  <span>Charted by {chart.submittedBy} on {chart.submittedOn}</span>
  <div>
    {#each traits as trait}
      <span class="chip variant-filled m-0.5 cursor-default">{trait.name}</span>
    {/each}
  </div>
</div>
