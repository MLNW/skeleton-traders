<script lang="ts">
  export let crew;
</script>

<div class="card">
  <header>
    <h2>Crew</h2>
  </header>
  <section class="flex flex-col">
    <span>Current: {crew.current} of {crew.capacity}</span>
    <span>Required: {crew.required}</span>
    <span>Rotation: {crew.rotation}</span>
    <span>Moral: {crew.morale}</span>
    <span>Wages: {crew.wages}</span>
  </section>
</div>
