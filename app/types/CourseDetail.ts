export interface CurriculumLecture {
    id: string;
    title: string;
    duration: string;
    preview?: boolean;
  }
  
  export interface CurriculumSection {
    id: string;
    title: string;
    lectureCount: number;
    duration: string;
    lectures: CurriculumLecture[];
  }
  
  export interface RelatedCourse {
    id: string;
    title: string;
    thumbnail: string;
    rating: number;
    students: number;
    hours: number;
    updated: string;
    price: number;
    originalPrice: number;
    badge?: string;
  }
  
  export interface CourseDetail {
    id: string;
    breadcrumb: string[];
    title: string;
    subtitle: string;
    badges: string[];
    instructor: string;
    lastUpdated: string;
    languages: string[];
    rating: number;
    ratingCount: number;
    students: number;
    thumbnail: string;
    price: number;
    originalPrice: number;
    discountPercent: number;
    subscriptionPrice: number;
    whatYoullLearn: string[];
    relatedTopics: string[];
    includes: { label: string; icon: "roleplay" | "video" | "article" | "download" | "mobile" | "captions" | "certificate" }[];
    curriculum: CurriculumSection[];
    requirements: string[];
    description: string;
    related: RelatedCourse[];
  }

  