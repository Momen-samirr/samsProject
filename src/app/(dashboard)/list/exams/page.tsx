import FormContainer from "@/components/FormContainer";
import FromDialog from "@/components/FromDialog";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getUserRole } from "@/lib/utitlies";
import { Class, Doctor, Exam, Lecture, Prisma, Subject } from "@prisma/client";
import {
  Download,
  Filter,
  Plus,
  SortAscIcon,
  Trash2,
  View,
} from "lucide-react";

type ExamList = Exam & {
  lecture: {
    subject: Subject;
    class: Class;
    doctor: Doctor;
  };
};

const ExamesList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { role, userId } = await getUserRole();

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
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Date",
      accessor: "date",
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
  const renderRow = (item: ExamList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        {item.lecture.subject.name}
      </td>
      <td>{item.lecture.class.name}</td>
      <td className="hidden md:table-cell">{item.lecture.doctor.name}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      <td>
        <div className="flex items-center gap-3">
          {(role === "admin" || role === "doctor") && (
            <>
              <FormContainer table="exam" type="update" data={item} />
              <FormContainer table="exam" type="delete" id={item?.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.ExamWhereInput = {};

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
  }

  const [exams, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      include: {
        lecture: {
          select: {
            subject: {
              select: {
                name: true,
              },
            },
            class: {
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
    }),
    prisma.exam.count({ where: query }),
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-3 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaSky">
              <Filter />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaSky">
              <SortAscIcon />
            </button>
            {(role === "admin" || role === "doctor") && (
              <FormContainer table="exam" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={exams} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ExamesList;
