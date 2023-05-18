<script lang="ts">
  import { goto } from '$app/navigation';
  import { convertSymbolToName } from '$lib/utils/symbols';
  import { Paginator } from '@skeletonlabs/skeleton';
  import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
  import { readable } from 'svelte/store';
  import Badge from './Badge.svelte';
  import Number from './tables/Number.svelte';

  export let systems: object;
  export let onPageChange: (e: CustomEvent) => void;
  export let onAmountChange: (e: CustomEvent) => void;

  $: tableData = readable(systems.data);

  $: pageOptions = {
    offset: systems.meta.page - 1,
    limit: systems.meta.limit,
    size: systems.meta.total,
    amounts: [5, 10, 15, 20]
  };

  $: table = createTable(tableData);
  $: columns = table.createColumns([
    table.column({ header: 'Name', accessor: 'symbol' }),
    table.column({ header: 'Sector', accessor: 'sectorSymbol' }),
    table.column({
      header: 'Type',
      accessor: (e) => convertSymbolToName(e.type),
      cell: ({ value }) => createRender(Badge, { text: value })
    }),
    table.column({ header: 'Coordinates', accessor: (e) => `(${e.x}, ${e.y})` }),
    table.column({
      header: () => createRender(Number, { value: 'Waypoints' }),
      accessor: (e) => `${e.waypoints.length}`,
      cell: ({ value }) => createRender(Number, { value })
    }),
    table.column({
      header: () => createRender(Number, { value: 'Factions' }),
      accessor: (e) => `${e.factions.length}`,
      cell: ({ value }) => createRender(Number, { value })
    })
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
            on:click={() => goto(`/systems/${row.original.symbol}`)}
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
