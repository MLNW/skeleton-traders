<script lang="ts">
  import { goto } from '$app/navigation';
  import { createTable, Render, Subscribe } from 'svelte-headless-table';
  import type { Readable } from 'svelte/store';

  export let ships: Readable<any>;

  $: table = createTable(ships);
  $: columns = table.createColumns([
    table.column({ header: 'Name', accessor: 'symbol' }),
    table.column({ header: 'Crew', accessor: (e) => `${e.crew.current}/${e.crew.capacity}` }),
    table.column({ header: 'Status', accessor: (e) => e.nav.status }),
    table.column({ header: 'Speed', accessor: (e) => e.engine.speed }),
    table.column({ header: 'Fuel', accessor: (e) => `${e.fuel.current}/${e.fuel.capacity}` }),
    table.column({ header: 'Cargo', accessor: (e) => `${e.cargo.units}/${e.cargo.capacity}` })
  ]);
  $: ({ headerRows, rows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns));
</script>

<div class="table-container">
  <table class="table table-hover" {...$tableAttrs}>
    <thead>
      {#each $headerRows as headerRow (headerRow.id)}
        <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
          <tr {...rowAttrs}>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <th {...attrs}>
                  <Render of={cell.render()} />
                </th>
              </Subscribe>
            {/each}
          </tr>
        </Subscribe>
      {/each}
    </thead>
    <tbody {...$tableBodyAttrs}>
      {#each $rows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
          <tr class="cursor-pointer" {...rowAttrs} on:click={() => goto(`/ships/${row.original.symbol}`)}>
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <td {...attrs}>
                  <Render of={cell.render()} />
                </td>
              </Subscribe>
            {/each}
          </tr>
        </Subscribe>
      {/each}
    </tbody>
  </table>
</div>
