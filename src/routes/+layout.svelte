<script lang="ts">
  import '../app.postcss';
  import { AppBar, AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <a href="/">SkeletonTraders</a>
    </AppBar>
  </svelte:fragment>
  <div class="m-4">
    <slot />
  </div>
</AppShell>
