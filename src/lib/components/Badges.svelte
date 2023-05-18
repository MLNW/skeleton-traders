<script lang="ts">
  type BadgeValue = {
    name: string;
    description?: string;
  };

  export let values: BadgeValue[];
  export let none: boolean = true;
</script>

{#if none && values.length === 0}
  <span>None</span>
{/if}
{#each values as value}
  <!-- TODO: Add tooltip from description -->
  <span class="badge variant-filled m-0.5">
    {value.name}
  </span>
{/each}
