<script lang="ts">
  import { goto } from '$app/navigation';
  import { Paginator } from '@skeletonlabs/skeleton';
  import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
  import { readable } from 'svelte/store';
  import Badge from '../Badge.svelte';
  import Number from '../tables/Number.svelte';

  export let ships: object;
  export let onPageChange: (e: CustomEvent) => void;
  export let onAmountChange: (e: CustomEvent) => void;

  $: tableData = readable(ships.data);

  $: pageOptions = {
    page: ships.meta.page - 1,
    limit: ships.meta.limit,
    size: ships.meta.total,
    amounts: [5, 10, 15, 20]
  };

  $: table = createTable(tableData);
  $: columns = table.createColumns([
    table.column({ header: 'Name', accessor: 'symbol' }),
    table.column({ header: 'System', accessor: (e) => e.nav.systemSymbol }),
    table.column({ header: 'Waypoint', accessor: (e) => e.nav.waypointSymbol }),
    table.column({ header: 'Crew', accessor: (e) => `${e.crew.current}/${e.crew.capacity}` }),
    table.column({
      header: 'Status',
      accessor: (e) => e.nav.status,
      cell: ({ value }) => createRender(Badge, { text: value })
    }),
    table.column({
      header: () => createRender(Number, { value: 'Speed' }),
      accessor: (e) => e.engine.speed,
      cell: ({ value }) => createRender(Number, { value })
    }),
    table.column({ header: 'Fuel', accessor: (e) => `${e.fuel.current}/${e.fuel.capacity}` }),
    table.column({ header: 'Cargo', accessor: (e) => `${e.cargo.units}/${e.cargo.capacity}` })
  ]);
  $: ({ headerRows, rows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns));
</script>

<div class="table-container flex flex-col space-y-2">
  <table class="table table-interactive" {...$tableAttrs}>
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
          <tr
            class="cursor-pointer"
            {...rowAttrs}
            on:click={() => goto(`/ships/${row.original.symbol}`)}
          >
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
  <Paginator bind:settings={pageOptions} on:page={onPageChange} on:amount={onAmountChange} />
</div>
