// Types for the "Recorded Classes" feature (admin-uploaded Zoom recordings)

export interface RecordedModule {
  id: string;
  title: string;
  description?: string;
  videoUrl: string; // uploaded recording URL (Zoom export, Cloudinary, etc.)
  thumbnail?: string;
  duration: string; // e.g. "1h 20min"
  classDate: string; // e.g. "05 Aug 2026" - date the live class happened
  uploadedAt: string; // ISO date - when admin uploaded the recording
  instructor?: string;
}

export interface RecordedCourse {
  id: string; // slug, used in the URL: /dashboard/recorded-classes/[courseId]
  title: string; // "100 Hour YTT"
  subtitle?: string; // "Yoga Teacher Training"
  thumbnail: string;
  totalHours: string; // "48h 30min"
  description?: string;
  modules: RecordedModule[];
}