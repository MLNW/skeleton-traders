<script lang="ts">
  import { page } from '$app/stores';
  import Chips from '$lib/components/Chips.svelte';
  import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';

  $: ({ symbol, type, x, y, factions } = $page.data.system.data);
</script>

<div>
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
            <a
              class="card card-hover m-1 w-[18rem]"
              href="/systems/{symbol}/waypoints/{waypoint.symbol}"
            >
              <header class="card-header">
                <h3>{waypoint.symbol} ({waypoint.type})</h3>
              </header>
              <div class="flex flex-col space-y-1 px-4 pb-4">
                <span>Position: ({waypoint.x}, {waypoint.y})</span>
                <div>
                  <Chips values={waypoint.traits} none={false} />
                </div>
                <!-- TODO: Show orbitals? -->
              </div>
            </a>
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
