import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { announcementsData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { getUserRole } from "@/lib/utitlies";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Announcement, Class, Prisma } from "@prisma/client";
import { Trash2, View } from "lucide-react";
import Image from "next/image";

type AnnouncementList = Announcement & { class: Class };

const renderRow = (item: AnnouncementList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td>{item.class.name}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.date)}
    </td>
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

const AnnouncementListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { role, userId } = await getUserRole();
  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
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

  const query: Prisma.AnnouncementWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.OR = [
              { title: { contains: value, mode: "insensitive" } },
              { class: { name: { contains: value, mode: "insensitive" } } },
            ];
        }
      }
    }
  }

  const roleConditions = {
    doctor: { lectures: { some: { doctorId: userId! } } },
    student: { students: { some: { id: userId! } } },
  };

  query.OR = [{ classId: null }];

  const [announcements, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.announcement.count({ where: query }),
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Announcements
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={announcements} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AnnouncementListPage;
