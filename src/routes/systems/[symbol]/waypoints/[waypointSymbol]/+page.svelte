<script lang="ts">
  import { page } from '$app/stores';
  import Chips from '$lib/components/Chips.svelte';
  import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
  import TradeGoodTable from '$lib/components/market/TradeGoodTable.svelte';
  import TransactionTable from '$lib/components/market/TransactionTable.svelte';

  $: ({ symbol, systemSymbol, type, x, y, faction, traits, chart } = $page.data.waypoint.data);
</script>

<div class="flex flex-col">
  <h1>{symbol} ({type})</h1>
  <a href="/systems/{systemSymbol}">System: {systemSymbol}</a>
  <span>Position: ({x}, {y})</span>
  <span>Faction: {faction.symbol}</span>
  <span>Charted by {chart.submittedBy} on {chart.submittedOn}</span>
  <div>
    <Chips values={traits} />
  </div>
  <div class="card m-2">
    <header class="card-header">
      <h2>Market</h2>
    </header>
    <footer class="card-footer">
      {#await $page.data.stream.market}
        <LoadingIndicator />
      {:then market}
        <section>
          <h3>Imports</h3>
          <Chips values={market.data.imports} />
        </section>
        <section>
          <h3>Exports</h3>
          <Chips values={market.data.exports} />
        </section>
        <section>
          <h3>Exchange</h3>
          <Chips values={market.data.exchange} />
        </section>
        {#if market.data.tradeGoods}
          <section>
            <h3>Trade Goods</h3>
            <TradeGoodTable data={market.data.tradeGoods} />
          </section>
          <section>
            <h3>Transactions</h3>
            <TransactionTable data={market.data.transactions} />
          </section>
        {/if}
      {/await}
    </footer>
  </div>
</div>
