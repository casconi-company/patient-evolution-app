interface TableProps {
  columns: { key: string; name: string }[];
  data: any[];
}
const Table = ({ columns, data }: TableProps) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs text-white bg-blue-50">
          <tr>
            {columns.map((col, index) => (
              <th scope="col" className="px-6 py-3" key={index}>
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-zinc-800 border-b border-secondary">
              {columns.map((col) => (
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-white whitespace-nowrap"
                >
                  {item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
