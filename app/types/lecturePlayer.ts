export interface QuizOption {
    id: string;
    text: string;
  }
  
  export interface QuizQuestion {
    id: string;
    question: string;
    options: QuizOption[];
    correctOptionId: string;
    explanation?: string;
  }
  
  export interface LectureQuiz {
    lectureId: string;
    title: string;
    questions: QuizQuestion[];
  }
  
  export interface LectureNote {
    id: string;
    lectureId: string;
    lectureTitle: string;
    timestampSeconds: number;
    timestampLabel: string;
    text: string;
    createdAt: string;
  }