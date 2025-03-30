import React from "react";

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mt-3">
      <thead>
        <tr className="text-gray-500 text-sm text-left">
          {columns?.map((column) => (
            <th key={column?.accessor} className={column?.className}>
              {column?.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data?.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
