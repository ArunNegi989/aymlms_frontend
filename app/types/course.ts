export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  status: "enrolled" | "completed";
  isEnrolled?: boolean; // Optional flag to explicitly mark enrollment
}

export interface CourseFilters {
  search?: string;
  level?: "beginner" | "intermediate" | "advanced" | "all";
  status?: "enrolled" | "completed" | "all";
  sortBy?: "recent" | "title" | "progress" | "instructor";
  category?: string;
}

export interface CourseStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHoursLearned: number;
  completionRate: number;
}

export interface CourseWithDetails extends Course {
  subtitle?: string;
  description: string;
  rating: number;
  ratingCount: number;
  students: number;
  lastUpdated: string;
  totalHours: number;
  totalLectures: number;
  level: "beginner" | "intermediate" | "advanced" | "all";
  badges?: string[];
  enrolledDate?: string;
  completionDate?: string;
  lastAccessed?: string;
  certificateUrl?: string;
}