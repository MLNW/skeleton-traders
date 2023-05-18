<script lang="ts">
  import InventoryTable from './InventoryTable.svelte';

  export let cargo: object;

  $: cargoFillPercentage = (cargo.units / cargo.capacity) * 100;
</script>

<section class="card m-2">
  <header class="card-header">
    <h3>Cargo</h3>
  </header>
  <footer class="card-footer">
    <div class="h-12 mt-4">
      <div class="w-full variant-filled-surface h-4 relative">
        <span class="text-xs absolute left-0 -top-4">{cargo.units}</span>
        <span class="text-xs absolute right-0 -top-4">{cargo.capacity}</span>
        <div class="variant-filled h-4 pt-4" style="width: {cargoFillPercentage}%" />
        <span class="absolute text-xs">{cargoFillPercentage}%</span>
        <span class="absolute right-0 text-xs">{100 - cargoFillPercentage}%</span>
      </div>
    </div>
    <InventoryTable data={cargo.inventory} />
  </footer>
</section>
