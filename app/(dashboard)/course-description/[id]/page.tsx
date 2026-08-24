// File location: app/(dashboard)/course-description/[id]/page.tsx
// Stays inside the (dashboard) route group, so it keeps the LMS sidebar.
// URL: /course-description/[id]

"use client";

import { useParams } from "next/navigation";
import CourseDetailContent from "@/app/components/courseDetail/CourseDetailContent";

export default function DashboardCourseDetailPage() {
  const params = useParams<{ id: string }>();
  return <CourseDetailContent id={params.id} basePath="/course-description" />;
}
