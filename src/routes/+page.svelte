<script lang="ts">
  import { page } from '$app/stores';

  $: ({ agent } = $page.data);
</script>

<div class="container mx-auto flex">
  <div class="card">
    <h1>{agent.symbol}</h1>
    <p>{agent.headquarters}</p>
    <p>{agent.credits}</p>
  </div>
</div>
