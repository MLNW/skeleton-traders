<script lang="ts">
  import { page } from '$app/stores';
  import Chips from '$lib/components/Chips.svelte';
  import TradeGoodTable from '$lib/components/market/TradeGoodTable.svelte';
  import TransactionTable from '$lib/components/market/TransactionTable.svelte';

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
    <Chips values={traits} none={false} />
  </div>

  {#if Object.keys($page.data.market.data).length > 0}
    <div class="card m-2">
      <header class="card-header">
        <h2>Market</h2>
      </header>
      <footer class="card-footer">
        <section>
          <h3>Imports</h3>
          <Chips values={$page.data.market.data.imports} />
        </section>
        <section>
          <h3>Exports</h3>
          <Chips values={$page.data.market.data.exports} />
        </section>
        <section>
          <h3>Exchange</h3>
          <Chips values={$page.data.market.data.exchange} />
        </section>
        {#if $page.data.market.data.tradeGoods}
          <section>
            <h3>Trade Goods</h3>
            <TradeGoodTable data={$page.data.market.data.tradeGoods} />
          </section>
          <section>
            <h3>Transactions</h3>
            <TransactionTable data={$page.data.market.data.transactions} />
          </section>
        {/if}
      </footer>
    </div>
  {/if}
</div>
