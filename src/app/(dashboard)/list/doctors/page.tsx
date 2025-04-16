import FormContainer from "@/components/FormContainer";
import FromDialog from "@/components/FromDialog";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { teachersData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getUserRole } from "@/lib/utitlies";
import { Class, Doctor, Prisma, Subject } from "@prisma/client";
import {
  Filter,
  Plus,
  SortAscIcon,
  Trash2,
  View,
  ViewIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type DoctorList = Doctor & { subjects: Subject[]; classes: Class[] };

const renderRow = (item: DoctorList) => (
  <tr
    key={item?.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaSkyLight"
  >
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
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item?.username}</td>
    <td className="hidden md:table-cell">
      {item?.subjects.map((s) => s.name).join(", ")}
    </td>
    <td className="hidden md:table-cell">
      {item?.classes.map((c) => c.name).join(", ")}
    </td>
    <td className="hidden lg:table-cell">{item?.phone}</td>
    <td className="hidden lg:table-cell">{item?.address}</td>
    <td>
      <div className="flex items-center gap-3 text-gray-500">
        <Link href={`/list/doctors/${item?.id}`}>
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-lamaSky">
            <View className="size-5" />
          </button>
        </Link>
        <FormContainer table="doctor" type="delete" id={item?.id} />
      </div>
    </td>
  </tr>
);

const TeacherList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { role, userId } = await getUserRole();
  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Doctor Id",
      accessor: "doctorId",
      className: "hidden md:table-cell",
    },
    {
      header: "Subjects",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },
    {
      header: "Classes",
      accessor: "classes",
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
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "actions",
          },
        ]
      : []),
  ];
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  //Query Conditions

  const query: Prisma.DoctorWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lectures = {
              some: {
                classId: parseInt(value),
              },
            };
          case "search":
            query.name = { contains: value, mode: "insensitive" };
        }
      }
    }
  }
  const [doctors, count] = await prisma.$transaction([
    prisma.doctor.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.doctor.count({
      where: query,
    }),
  ]);
  return (
    <div className="bg-white p-5 mt-0 rounded-lg m-5">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Doctors</h1>
        <div className="flex flex-col items-center gap-5 w-full md:flex-row md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-3 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaSky">
              <Filter />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaSky">
              <SortAscIcon />
            </button>
            <FormContainer table="doctor" type="create" />
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={doctors} />

      {/* Pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default TeacherList;
