import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { classesData } from "@/lib/data";
import { Filter, Plus, SortAscIcon, Trash2, View } from "lucide-react";
import React from "react";

type Class = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ClassessList = () => {
  const renderRow = (item: Class) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaSkyLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.supervisor}</td>
      <td>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaSky">
            <View className="size-5" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaPurpleLight">
            <Trash2 className="size-5" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-6 m-5 mt-0 rounded-lg">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg">All Classes</h1>
        <div className="flex flex-col items-center gap-5 md:flex-row w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-3 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaSky">
              <Filter />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaSky">
              <SortAscIcon />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaSky">
              <Plus />
            </button>
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={classesData} />
      <Pagination />
    </div>
  );
};

export default ClassessList;
