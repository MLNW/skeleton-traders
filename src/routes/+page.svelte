<script lang="ts">
  import { page } from '$app/stores';
  import ShipTable from '$lib/components/ships/ShipTable.svelte';
  import { readable } from 'svelte/store';

  $: ({ symbol, headquarters, credits } = $page.data.user);
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
      <ShipTable ships={readable($page.data.ships.data)} />
    </div>
  </div>
</div>
