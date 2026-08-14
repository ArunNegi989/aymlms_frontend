export interface Lecture {
    id: string;
    title: string;
    duration: string;
    preview?: boolean;
    type?: "video" | "quiz" | "notes" | "assignment" | "reading";
    completed?: boolean;
    videoUrl?: string;
    thumbnail?: string;
    description?: string;
    resources?: {
      title: string;
      url: string;
      type: "pdf" | "doc" | "video" | "link";
    }[];
  }
  
  export interface Section {
    id: string;
    title: string;
    lectureCount: number;
    duration: string;
    lectures: Lecture[];
  }
  
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
  }