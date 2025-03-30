import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { studentsData, subjectsData } from "@/lib/data";
import { Filter, Plus, SortAscIcon, Trash2, View } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const SubjectsList = () => {
  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaSkyLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.teachers?.join(",")}</td>
      <td>
        <div className="flex items-center gap-2">
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
    <div className="bg-white p-5 mt-0 rounded-lg m-5">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg">All Students</h1>
        <div className="flex flex-col items-center md:flex-row gap-5 w-full md:w-auto">
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
      {/* List */}

      <Table columns={columns} renderRow={renderRow} data={subjectsData} />

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default SubjectsList;
