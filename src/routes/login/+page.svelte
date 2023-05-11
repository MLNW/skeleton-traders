<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';

  $: ({ factions } = $page.data);
</script>

<div class="grid grid-cols-2 gap-4">
  <form method="post" action="?/login" use:enhance>
    <label>
      <span>Token</span>
      <input class="input" type="password" name="token" id="token" placeholder="Token" required />
    </label>
    <button class="btn" type="submit">Login</button>
  </form>
  <form method="post" action="?/register" use:enhance>
    <label>
      <span>Name</span>
      <input
        class="input"
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        required
      />
    </label>
    <label>
      <span>Faction</span>
      <select class="select" id="faction" name="faction">
        {#each factions as faction}
          <option value={faction.symbol}>{faction.name}</option>
        {/each}
      </select>
    </label>
    <button type="submit" class="btn">Register</button>
  </form>
</div>
