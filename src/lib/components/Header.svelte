<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import { AppBar } from '@skeletonlabs/skeleton';

  $: ({ user } = $page.data);
</script>

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
