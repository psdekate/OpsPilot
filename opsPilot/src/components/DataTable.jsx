export default function DataTable({ columns, data, sortConfig, onSort }) {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.accessor}
              onClick={() => {
                if (columns.sortable) {
                  onSort(columns.accessible);
                }
              }}
            >
              {col.header}

              {sortConfig?.key === col.accessor &&
              sortConfig.direction === "asc"
                ? "^"
                : "V"}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              // <td key={col.accessor}>{row[col.accessor]}</td>
              <td key={col.accessor || col.header}>
                {col.render ? col.render(row) : row[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
