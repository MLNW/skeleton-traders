<script lang="ts">
  export let crew;

  $: crewFillPercentage = (crew.current / crew.capacity) * 100;
  $: minCrewPercentage = (crew.required / crew.capacity) * 100;

  const crewIndicatorColor = (crew) => {
    const difference = crew.current - crew.required;
    let color = 'variant-filled-success';
    if (difference < 0) color = 'variant-filled-error';
    else if (difference >= 0 && difference <= 5) color = 'variant-filled-warning';
    return color;
  };
</script>

<div class="card m-2">
  <header class="card-header">
    <h2>Crew</h2>
  </header>
  <footer class="card-footer flex flex-col">
    <div class="h-8 mt-4">
      <div class="w-full variant-filled-surface h-4 relative">
        <span class="text-xs absolute left-0 -top-4">{crew.current}</span>
        <span class="text-xs absolute right-0 -top-4">{crew.capacity}</span>
        <div class="h-4 pt-4 {crewIndicatorColor(crew)}" style="width: {crewFillPercentage}%" />
        <div class="absolute h-4 -top-[6px]" style="left: {minCrewPercentage}%">
          <span class="text-xs -ml-1 border-l-4 border-error-500">{crew.required}</span>
        </div>
        <span class="absolute text-xs">{crewFillPercentage}%</span>
        <span class="absolute right-0 text-xs">{100 - crewFillPercentage}%</span>
      </div>
    </div>

    <span>Rotation: <span class="badge variant-filled">{crew.rotation}</span></span>
    <span>Morale: {crew.morale}%</span>
    <span>Wages: {crew.wages}</span>
  </footer>
</div>
