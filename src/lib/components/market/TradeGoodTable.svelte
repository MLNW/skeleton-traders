<script lang="ts">
  import { convertSymbolToName } from '$lib/utils/symbols';
  import { Render, Subscribe, createTable } from 'svelte-headless-table';
  import { readable } from 'svelte/store';

  export let data: object[];

  $: tableData = readable(data);

  $: table = createTable(tableData);
  $: columns = table.createColumns([
    table.column({ header: 'Name', accessor: (e) => convertSymbolToName(e.symbol) }),
    table.column({ header: 'Volume', accessor: 'tradeVolume' }),
    table.column({ header: 'Supply', accessor: (e) => convertSymbolToName(e.supply) }),
    table.column({ header: 'Buy', accessor: 'purchasePrice' }),
    table.column({ header: 'Sell', accessor: 'sellPrice' })
  ]);
  $: ({ headerRows, rows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns));
</script>

<div class="table-container flex flex-col space-y-2">
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
