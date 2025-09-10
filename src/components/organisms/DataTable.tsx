type Column<T> = { key: keyof T; header: string; render?: (value: any, row: T) => React.ReactNode };

type Props<T> = { columns: Column<T>[]; data: T[] };

export function DataTable<T extends Record<string, any>>({ columns, data }: Props<T>) {
  return (
    <div className="card" role="table">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={String(col.key)} style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '8px 6px' }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={String(col.key)} style={{ padding: '8px 6px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;

