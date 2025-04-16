import FromDialog from "@/components/FromDialog";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { assignmentsData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getUserRole } from "@/lib/utitlies";
import { Assignment, Class, Doctor, Prisma, Subject } from "@prisma/client";
import { Trash2, View } from "lucide-react";
import Image from "next/image";

type AssignmentList = Assignment & {
  lecture: {
    subject: Subject;
    class: Class;
    doctor: Doctor;
  };
};

const AssignmentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { role, userId } = await getUserRole();
  const renderRow = (item: AssignmentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        {item?.lecture?.subject?.name}
      </td>
      <td>{item?.lecture?.class?.name}</td>
      <td className="hidden md:table-cell">
        {item?.lecture?.doctor?.name + " " + item?.lecture?.doctor?.surname}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US")?.format(item?.dueDate)}
      </td>
      <td>
        <div className="flex items-center gap-3">
          {role === "admin" ||
            (role === "doctor" && (
              <>
                <FromDialog
                  tableName="assignment"
                  requestType="update"
                  data={item}
                />
                <FromDialog
                  tableName="assignment"
                  requestType="delete"
                  id={item?.id}
                />
              </>
            ))}
        </div>
      </td>
    </tr>
  );
  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Doctor",
      accessor: "Doctor",
      className: "hidden md:table-cell",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "doctor"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const query: Prisma.AssignmentWhereInput = {};

  query.lecture = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lecture.classId = parseInt(value);
            break;
          case "doctorId":
            query.lecture.doctorId = value;
            break;
          case "search":
            query.OR = [
              {
                lecture: {
                  subject: { name: { contains: value, mode: "insensitive" } },
                },
              },
              {
                lecture: {
                  doctor: { name: { contains: value, mode: "insensitive" } },
                },
              },
              {
                lecture: {
                  class: { name: { contains: value, mode: "insensitive" } },
                },
              },
            ];
        }
      }
    }
  }

  switch (role) {
    case "admin":
      break;
    case "doctor":
      query.lecture.doctorId = userId!;
      break;
    case "student":
      query.lecture.class = {
        students: {
          some: {
            id: userId!,
          },
        },
      };
      break;
    default:
      break;
  }

  const [assigments, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lecture: {
          include: {
            class: {
              select: {
                name: true,
              },
            },
            subject: {
              select: {
                name: true,
              },
            },
            doctor: {
              select: {
                name: true,
                surname: true,
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Assignments
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-3 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            <FromDialog tableName="assignment" requestType="create" />
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={assigments} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AssignmentListPage;
