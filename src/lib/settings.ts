export const ITEM_PER_PAGE = 10;

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["admin"],
  "/student(.*)": ["student"],
  "/doctor(.*)": ["doctor"],
  "/parent(.*)": ["parent"],
  "/list/doctors": ["admin", "doctor"],
  "/list/students": ["admin", "doctor"],
  "/list/parents": ["admin", "doctor"],
  "/list/subjects": ["admin"],
  "/list/classes": ["admin", "doctor"],
  "/list/exams": ["admin", "doctor", "student"],
  "/list/assignments": ["admin", "doctor", "student"],
  "/list/results": ["admin", "doctor", "student"],
  "/list/attendance": ["admin", "doctor", "student"],
  "/list/events": ["admin", "doctor", "student"],
  "/list/announcements": ["admin", "doctor", "student"],
};
