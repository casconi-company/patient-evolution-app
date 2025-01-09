import { Button } from "../Button";
import { Loader } from "../Loader";

interface TableProps {
  columns: { key: string; name: string }[];
  data?: any[];
  total?: number;
  onChangePage?: () => void;
  isLoading?: boolean;
}
const Table = ({
  columns,
  data,
  total,
  onChangePage,
  isLoading,
}: TableProps) => {
  return (
    <div className="relative overflow-x-auto">
      {isLoading ? (
        <div className="w-full flex flex-row justify-center overflow-hidden">
          <Loader />
        </div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right mb-4">
          <thead className="text-xs text-white bg-green-50">
            <tr>
              {columns.map((col, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {!!data?.length &&
              data.map((item, index) => (
                <tr
                  key={index}
                  className="bg-zinc-800 border-b border-secondary"
                >
                  {columns.map((col, index) => (
                    <td
                      key={index}
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
      )}

      {data?.length! < total! && (
        <div className="w-full flex justify-center">
          <Button
            text="Carregar mais"
            className="!bg-yellow-50 !h-10 md:w-[200px]"
            textStyle="text-sm "
            onClick={onChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
