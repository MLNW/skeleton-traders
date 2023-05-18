<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
  import ShipTable from '$lib/components/ships/ShipTable.svelte';

  $: ({ symbol, headquarters, credits } = $page.data.user);

  let pageNumber = 1;
  let limit = 5;

  const handleShipPagination = (e: CustomEvent) => {
    if (e.type === 'amount') {
      limit = e.detail;
    } else if (e.type === 'page') {
      pageNumber = e.detail;
    }
    goto(`?page=${pageNumber}&limit=${limit}`);
  };
</script>

<div class="container mx-auto flex">
  <div class="card">
    <h1>{symbol}</h1>
    <p>{headquarters}</p>
    <p>{credits}</p>
  </div>
  <div class="card">
    <header class="card-header">
      <h2>Ships</h2>
    </header>
    <div class="p-4">
      {#await $page.data.stream.ships}
        <LoadingIndicator />
      {:then ships}
        <ShipTable
          ships={ships.data}
          page={pageNumber}
          {limit}
          onAmountChange={handleShipPagination}
          onPageChange={handleShipPagination}
        />
      {/await}
    </div>
  </div>
</div>
