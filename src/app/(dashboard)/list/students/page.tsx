import FromDialog from "@/components/FromDialog";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { studentsData } from "@/lib/data";
import { Filter, Plus, SortAscIcon, Trash2, View } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  grade: number;
  class: string;
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const StudentList = () => {
  const renderRow = (item: Student) => (
    <tr key={item?.id}>
      <td className="flex items-center gap-3 p-5">
        <Image
          src={item?.photo}
          alt="photo"
          width={50}
          height={50}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item?.name}</h3>
          <p className="text-xs text-gray-500">{item?.class}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item?.studentId}</td>
      <td className="hidden md:table-cell">{item?.grade}</td>
      <td className="hidden lg:table-cell">{item?.phone}</td>
      <td className="hidden lg:table-cell">{item?.address}</td>
      <td>
        <div className="flex items-center gap-3 text-gray-500">
          <Link href={`/list/students/${item?.id}`}>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-lamaSkyLight">
              <View className="size-5" />
            </button>
          </Link>
          <FromDialog tableName="student" requestType="delete" id={item?.id} />
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
            <FromDialog tableName="student" requestType="create" />
          </div>
        </div>
      </div>
      {/* List */}

      <Table columns={columns} renderRow={renderRow} data={studentsData} />

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default StudentList;
