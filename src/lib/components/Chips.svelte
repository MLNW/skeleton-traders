<script lang="ts">
  type ChipValue = {
    name: string;
    description?: string;
  };

  export let values: ChipValue[];
  export let none: boolean = true;
</script>

{#if none && values.length === 0}
  <span>None</span>
{/if}
{#each values as value}
  <!-- TODO: Add tooltip from description -->
  <span class="chip variant-filled m-0.5 cursor-default">
    {value.name}
  </span>
{/each}
