<script lang="ts">
  import { page } from '$app/stores';
  import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';

  $: ({ symbol, type, x, y, factions } = $page.data.system.data);
</script>

<div class="container">
  <h1>{symbol} ({type})</h1>
  <p>Position: ({x}, {y})</p>

  <div class="card m-2">
    <header class="card-header">
      <h2>Waypoints</h2>
    </header>
    <div class="p-4">
      {#await $page.data.stream.waypoints}
        <LoadingIndicator />
      {:then waypoints}
        <div class="flex flex-wrap">
          <!-- TODO: Integrate pagination -->
          {#each waypoints.data as waypoint}
            <div class="card card-hover m-1 w-[18rem]">
              <header class="card-header">
                <h3>{waypoint.symbol} ({waypoint.type})</h3>
              </header>
              <div class="flex flex-col space-y-1 px-4 pb-4">
                <span>Position: ({waypoint.x}, {waypoint.y})</span>
                <div>
                  {#each waypoint.traits as trait}
                    <!-- TODO: Add description as tooltip-->
                    <span class="chip variant-filled m-0.5 cursor-default">{trait.name}</span>
                  {/each}
                </div>
                <!-- TODO: Show orbitals? -->
              </div>
            </div>
          {/each}
        </div>
      {/await}
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
