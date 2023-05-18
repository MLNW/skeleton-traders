<script lang="ts">
  export let crew;
</script>

<div class="card m-2">
  <header class="card-header">
    <h2>Crew</h2>
  </header>
  <footer class="card-footer flex flex-col">
    <span>Current: {crew.current} of {crew.capacity}</span>
    <span>Required: {crew.required}</span>
    <span>Rotation: <span class="badge variant-filled">{crew.rotation}</span></span>
    <span>Moral: {crew.morale}</span>
    <span>Wages: {crew.wages}</span>
  </footer>
</div>
