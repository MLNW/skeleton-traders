<script lang="ts">
  import TradeGoodTable from '$lib/components/market/TradeGoodTable.svelte';
  import TransactionTable from '$lib/components/market/TransactionTable.svelte';
  import Chips from '../Chips.svelte';

  export let market: object;
</script>

{#if Object.keys(market).length > 0}
  <div class="card m-2">
    <header class="card-header">
      <h2>Market</h2>
    </header>
    <footer class="card-footer xl:flex xl:space-x-2">
      {#if market.tradeGoods}
        <section>
          <h3>Trade Goods</h3>
          <TradeGoodTable data={market.tradeGoods} />
        </section>
        <section>
          <h3>Transactions</h3>
          <TransactionTable data={market.transactions} />
        </section>
      {:else}
        <section>
          <h3>Imports</h3>
          <Chips values={market.imports} />
        </section>
        <section>
          <h3>Exports</h3>
          <Chips values={market.exports} />
        </section>
        <section>
          <h3>Exchange</h3>
          <Chips values={market.exchange} />
        </section>
      {/if}
    </footer>
  </div>
{/if}
