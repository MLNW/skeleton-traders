<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import { AppShell } from '@skeletonlabs/skeleton';
  import '../app.postcss';
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <div class="m-4">
    <slot />
  </div>
</AppShell>
