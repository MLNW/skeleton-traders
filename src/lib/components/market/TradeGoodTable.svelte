<script lang="ts">
  import { convertSymbolToName } from '$lib/utils/symbols';
  import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
  import { readable } from 'svelte/store';
  import Badge from './Badge.svelte';
  import BuySellButton from './BuySellButton.svelte';
  import Number from './Number.svelte';

  export let data: object[];

  $: tableData = readable(data);

  $: table = createTable(tableData);
  $: columns = table.createColumns([
    table.column({
      header: 'Name',
      accessor: (e) => convertSymbolToName(e.symbol),
      cell: ({ value }) => createRender(Badge, { text: value })
    }),
    table.column({
      header: 'Supply',
      accessor: (e) => convertSymbolToName(e.supply),
      cell: ({ value }) => createRender(Badge, { text: value })
    }),
    table.column({
      header: () => createRender(Number, { value: 'Trade Volume' }),
      accessor: 'tradeVolume',
      cell: ({ value }) => createRender(Number, { value })
    }),
    table.column({
      header: () => createRender(Number, { value: 'Buy' }),
      accessor: 'purchasePrice',
      cell: ({ value }) => createRender(BuySellButton, { price: value })
    }),
    table.column({
      header: () => createRender(Number, { value: 'Sell' }),
      accessor: 'sellPrice',
      cell: ({ value }) => createRender(BuySellButton, { price: value })
    })
  ]);
  $: ({ headerRows, rows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns));
</script>

<div class="table-container">
  <table class="table table-compact table-hover">
    <thead />
  </table>
</div>

<div class="table-container">
  <table class="table table-compact table-hover" {...$tableAttrs}>
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
          <tr {...rowAttrs}>
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
