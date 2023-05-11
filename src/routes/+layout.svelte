<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import '../app.postcss';
  import { AppBar, AppShell } from '@skeletonlabs/skeleton';

  $: ({ user } = $page.data);
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <a href="/">SkeletonTraders</a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        {#if user}
          <form method="post" action="/logout" use:enhance>
            <button class="btn" type="submit">Logout</button>
          </form>
        {/if}
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <div class="m-4">
    <slot />
  </div>
</AppShell>
