import type { RecordedCourse } from "@/app/types/RecordedClass";

// TODO: Replace with API fetch (GET /api/recorded-classes) once backend is ready.
// Structure kept the same so swapping the data source later needs no UI changes.
export const recordedClasses: Record<string, RecordedCourse> = {
  "100-hour-ytt": {
    id: "100-hour-ytt",
    title: "100 Hour YTT",
    subtitle: "Yoga Teacher Training",
    thumbnail: "/images/courses/100-hour.jpg",
    totalHours: "48h 30min",
    description: "Recorded live sessions for the 100 Hour Yoga Teacher Training batch.",
    modules: [
      {
        id: "m1",
        title: "Introduction to Yoga Philosophy",
        description: "Live Zoom session covering yoga history, philosophy and the 8 limbs.",
        videoUrl: "/api/video/placeholder",
        duration: "1h 20min",
        classDate: "05 Aug 2026",
        uploadedAt: "2026-08-05",
        instructor: "Acharya Devendra",
      },
      {
        id: "m2",
        title: "Foundational Asanas - Standing Poses",
        description: "Alignment and breakdown of standing asana series.",
        videoUrl: "/api/video/placeholder",
        duration: "1h 45min",
        classDate: "07 Aug 2026",
        uploadedAt: "2026-08-07",
        instructor: "Acharya Devendra",
      },
      {
        id: "m3",
        title: "Pranayama Basics",
        description: "Breathing techniques: Nadi Shodhana, Kapalbhati, Bhastrika.",
        videoUrl: "/api/video/placeholder",
        duration: "1h 10min",
        classDate: "10 Aug 2026",
        uploadedAt: "2026-08-10",
        instructor: "Acharya Devendra",
      },
      {
        id: "m4",
        title: "Anatomy for Yoga Teachers",
        description: "Skeletal and muscular system basics relevant to asana practice.",
        videoUrl: "/api/video/placeholder",
        duration: "2h 00min",
        classDate: "12 Aug 2026",
        uploadedAt: "2026-08-12",
        instructor: "Dr. Kavita Rawat",
      },
    ],
  },

  "200-hour-ytt": {
    id: "200-hour-ytt",
    title: "200 Hour YTT",
    subtitle: "Advanced Yoga Teacher Training",
    thumbnail: "/images/courses/200-hour.jpg",
    totalHours: "96h 15min",
    description: "Recorded live sessions for the 200 Hour Yoga Teacher Training batch.",
    modules: [
      {
        id: "m1",
        title: "Advanced Asana - Inversions",
        description: "Headstand, shoulderstand and safe progressions.",
        videoUrl: "/api/video/placeholder",
        duration: "2h 05min",
        classDate: "02 Aug 2026",
        uploadedAt: "2026-08-02",
        instructor: "Acharya Devendra",
      },
      {
        id: "m2",
        title: "Yoga Nidra & Meditation",
        description: "Guided yoga nidra practice and meditation techniques.",
        videoUrl: "/api/video/placeholder",
        duration: "1h 30min",
        classDate: "04 Aug 2026",
        uploadedAt: "2026-08-04",
        instructor: "Acharya Devendra",
      },
      {
        id: "m3",
        title: "Teaching Methodology",
        description: "How to structure and deliver a yoga class as a teacher.",
        videoUrl: "/api/video/placeholder",
        duration: "1h 50min",
        classDate: "06 Aug 2026",
        uploadedAt: "2026-08-06",
        instructor: "Dr. Kavita Rawat",
      },
    ],
  },
};

export function getRecordedCourse(courseId: string): RecordedCourse | undefined {
  return recordedClasses[courseId];
}