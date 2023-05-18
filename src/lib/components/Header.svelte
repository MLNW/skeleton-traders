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
      <nav class="flex">
        <ol>
          <li><a class="btn" href="/systems">Systems</a></li>
        </ol>
        <form method="post" action="/logout" use:enhance>
          <button class="btn" type="submit">Logout</button>
        </form>
      </nav>
    {/if}
  </svelte:fragment>
</AppBar>
