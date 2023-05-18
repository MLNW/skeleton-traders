<script lang="ts">
  import { Render, Subscribe, createTable } from 'svelte-headless-table';
  import { readable } from 'svelte/store';

  export let data: object[];

  $: tableData = readable(data);

  $: table = createTable(tableData);
  $: columns = table.createColumns([
    table.column({ header: 'Name', accessor: 'symbol' }),
    table.column({ header: 'Units', accessor: 'units' })
  ]);
  $: ({ headerRows, rows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns));
</script>

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
