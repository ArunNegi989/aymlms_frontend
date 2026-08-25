// File: app/free-course/[id]/page.tsx
import FreeCourseDetails from "@/app/components/FreeCourseDetails";
import { freeCourses } from "@/app/data/freeCourses";

// Pre-render known course slugs at build time (optional but good for SEO)
export function generateStaticParams() {
  return freeCourses.map((course) => ({ id: course.id }));
}

export default function FreeCourseDetailsPage() {
  return <FreeCourseDetails />;
}