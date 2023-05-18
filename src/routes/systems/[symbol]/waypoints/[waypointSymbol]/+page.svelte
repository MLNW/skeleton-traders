<script lang="ts">
  import { page } from '$app/stores';
  import Badges from '$lib/components/Badges.svelte';
  import Market from '$lib/components/market/Market.svelte';

  $: ({ symbol, systemSymbol, type, x, y, faction, traits, chart } = $page.data.waypoint.data);
</script>

<div class="flex flex-col">
  <h1>{symbol} ({type})</h1>
  <span>
    <a href="/systems/{systemSymbol}">System: {systemSymbol}</a>
  </span>
  <span>Position: ({x}, {y})</span>
  <span>Faction: {faction.symbol}</span>
  <span>Charted by {chart.submittedBy} on {chart.submittedOn}</span>
  <div>
    <Badges values={traits} none={false} />
  </div>

  <Market market={$page.data.market.data} />
</div>
