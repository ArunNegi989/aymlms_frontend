// File location: app/course/[id]/page.tsx  (a NEW top-level folder, outside (dashboard))
// Only inherits app/layout.tsx (your root layout with the top navbar) - no LMS sidebar.
// URL: /course/[id]

"use client";

import { useParams } from "next/navigation";
import CourseDetailContent from "@/app/components/courseDetail/CourseDetailContent";

export default function PublicCourseDetailPage() {
  const params = useParams<{ id: string }>();
  return <CourseDetailContent id={params.id} basePath="/course" />;
}