import prisma from "@/lib/prisma";
import FromDialog from "./FromDialog";
import { auth } from "@clerk/nextjs/server";

export type FormContainerProps = {
  table:
    | "doctor"
    | "student"
    | "subject"
    | "class"
    | "lecture"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectdoctors = await prisma.doctor.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { doctors: subjectdoctors };
        break;
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classdoctors = await prisma.doctor.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { doctors: classdoctors, grades: classGrades };
        break;
      case "doctor":
        const doctorSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: doctorSubjects };
        break;
      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        relatedData = { classes: studentClasses, grades: studentGrades };
        break;
      case "exam":
        const examLessons = await prisma.lecture.findMany({
          where: {
            ...(role === "doctor" ? { doctorId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: examLessons };
        break;

      default:
        break;
    }
  }

  return (
    <div className="">
      <FromDialog
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData || {}}
      />
    </div>
  );
};

export default FormContainer;
