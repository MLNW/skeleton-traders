<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
  import SystemTable from '$lib/components/SystemTable.svelte';

  let pageNumber = 1;
  let limit = 5;

  const handlePagination = (e: CustomEvent) => {
    if (e.type === 'amount') {
      limit = e.detail;
    } else if (e.type === 'page') {
      pageNumber = e.detail + 1;
    }
    goto(`?page=${pageNumber}&limit=${limit}`);
  };
</script>

<div class="card">
  <header class="card-header">
    <h1>Systems</h1>
  </header>
  <div class="p-4">
    {#await $page.data.stream.systems}
      <LoadingIndicator />
    {:then systems}
      <SystemTable {systems} onAmountChange={handlePagination} onPageChange={handlePagination} />
    {/await}
  </div>
</div>
