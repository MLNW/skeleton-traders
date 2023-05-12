<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';

  export let form;
</script>

<div class="grid grid-cols-2 gap-4">
  <form class="card flex flex-col p-4 justify-between" method="post" action="?/login" use:enhance>
    <section class="flex flex-col space-y-4">
      <h2>Login</h2>
      <label>
        <span>Token</span>
        <input
          class="input {form?.login?.error ? 'input-error' : ''}"
          type="password"
          name="token"
          id="token"
          placeholder="Token"
          required
        />
        {#if form?.login?.error}
          <span>{form?.login.error}</span>
        {/if}
      </label>
    </section>
    <footer class="card-footer flex justify-center">
      <button class="btn variant-filled" type="submit">Login</button>
    </footer>
  </form>
  <form class="card flex flex-col space-y-4 p-4" method="post" action="?/register" use:enhance>
    <section class="flex flex-col space-y-4">
      <h2>Register</h2>
      <label>
        <span>Name</span>
        <input
          class="input {form?.register?.error ? 'input-error' : ''}"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
        />
        {#if form?.register?.error}
          <span>{form?.register.error}</span>
        {/if}
      </label>
      <label>
        <span>Faction</span>
        <select class="select" id="faction" name="faction">
          {#await $page.data.stream.factions}
            <option>Loading ...</option>
          {:then factions}
            {#each factions.data as faction}
              <option value={faction.symbol}>{faction.name}</option>
            {/each}
          {:catch}
            <option>Failed to get factions!</option>
          {/await}
        </select>
      </label>
    </section>
    <footer class="card-footer flex justify-center">
      <button type="submit" class="btn variant-filled">Register</button>
    </footer>
  </form>
</div>
