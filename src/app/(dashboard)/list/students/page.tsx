import FormContainer from "@/components/FormContainer";
import FromDialog from "@/components/FromDialog";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { studentsData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Prisma, Student } from "@prisma/client";
import { Filter, Plus, SortAscIcon, Trash2, View } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type StudentList = Student & { class: Class };

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
    header: "Gender",
    accessor: "gender",
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

const renderRow = (item: StudentList) => (
  <tr key={item?.id}>
    <td className="flex items-center gap-3 p-5">
      <Image
        src={item?.img ?? "/avatar.png"}
        alt="photo"
        width={50}
        height={50}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item?.name}</h3>
        <p className="text-xs text-gray-500">{item?.class.name[0]}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item?.username}</td>
    <td className="hidden md:table-cell">{item?.gender}</td>
    <td className="hidden lg:table-cell">{item?.phone}</td>
    <td className="hidden lg:table-cell">{item?.address}</td>
    <td>
      <div className="flex items-center gap-3 text-gray-500">
        <Link href={`/list/students/${item?.id}`}>
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-lamaSkyLight">
            <View className="size-5" />
          </button>
        </Link>
        <FormContainer table="student" type="delete" id={item.id} />
      </div>
    </td>
  </tr>
);
const StudentList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const query: Prisma.StudentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "doctorId":
            query.class = {
              lectures: {
                some: {
                  doctorId: value,
                },
              },
            };
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
        }
      }
    }
  }

  const [students, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      include: {
        class: true,
      },
    }),
    prisma.student.count({
      where: query,
    }),
  ]);

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
            <FormContainer table="student" type="create" />
          </div>
        </div>
      </div>
      {/* List */}

      <Table columns={columns} renderRow={renderRow} data={students} />

      {/* Pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default StudentList;
