export interface CurriculumLecture {
    id: string;
    title: string;
    duration: string;
    preview?: boolean;
    type?: "video" | "quiz" | "notes" | "assignment" | "reading";
    description?: string;
    videoUrl?: string;
    resources?: {
      title: string;
      url: string;
      type: "pdf" | "doc" | "video" | "link";
    }[];
    completed?: boolean;
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
    instructorAvatar?: string;
    instructorBio?: string;
    lastUpdated: string;
    languages: string[];
    rating: number;
    ratingCount: number;
    students: number;
    thumbnail: string;
    coverImage?: string;
    price: number;
    originalPrice: number;
    discountPercent: number;
    subscriptionPrice: number;
    whatYoullLearn: string[];
    relatedTopics: string[];
    includes: { 
      label: string; 
      icon: "roleplay" | "video" | "article" | "download" | "mobile" | "captions" | "certificate" 
    }[];
    curriculum: CurriculumSection[];
    requirements: string[];
    description: string;
    related: RelatedCourse[];
    // New fields for course player
    totalHours?: number;
    totalLectures?: number;
    level?: "beginner" | "intermediate" | "advanced" | "all";
    prerequisites?: string[];
    learningOutcomes?: string[];
    targetAudience?: string[];
  }
  
  // New types for the player functionality
  export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    points?: number;
  }
  
  export interface Note {
    id: string;
    lectureId: string;
    content: string;
    timestamp: number;
    createdAt: string;
    updatedAt?: string;
  }
  
  export interface CourseProgress {
    userId: string;
    courseId: string;
    completedLectures: string[];
    quizScores: Record<string, number>;
    notes: Note[];
    lastAccessed: string;
    overallProgress: number;
    timeSpent: number; // in minutes
  }
  
  export interface PlayerState {
    currentSectionId: string;
    currentLectureId: string;
    isPlaying: boolean;
    isMuted: boolean;
    isFullscreen: boolean;
    progress: number;
    currentTime: number;
    duration: number;
    playbackRate: number;
    quality: "auto" | "1080p" | "720p" | "480p" | "360p";
  }