import { auth } from "@clerk/nextjs/server";

export const getUserRole = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return { role, userId };
};

const getLatestMonday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const latestMonday = today;
  latestMonday.setDate(today.getDate() - daysSinceMonday);
  return latestMonday;
};

export const adjustScheduleToCurrentWeek = (
  lectures: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const latestMonday = getLatestMonday();

  return lectures.map((lecture) => {
    const lectureDayOfWeek = lecture.start.getDay();

    const daysFromMonday = lectureDayOfWeek === 0 ? 6 : lectureDayOfWeek - 1;

    const adjustedStartDate = new Date(latestMonday);

    adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lecture.start.getHours(),
      lecture.start.getMinutes(),
      lecture.start.getSeconds()
    );
    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      lecture.end.getHours(),
      lecture.end.getMinutes(),
      lecture.end.getSeconds()
    );

    return {
      title: lecture.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};
