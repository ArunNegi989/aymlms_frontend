// Types for the "Assignments" feature (MCQ + text/note answer questions)

export type QuestionType = "mcq" | "text";

export interface AssignmentQuestion {
  id: string;
  type: QuestionType;
  question: string;
  points: number;
  options?: string[]; // required when type === "mcq"
  correctAnswer?: number; // index into options, required when type === "mcq"
  explanation?: string; // shown after submit for mcq
}

export type AssignmentStatus = "pending" | "submitted" | "graded";

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // e.g. "20 Aug 2026"
  status: AssignmentStatus;
  questions: AssignmentQuestion[];
}

export interface AssignmentCourse {
  id: string; // slug, used in the URL: /assignments/[classId]
  title: string; // "100 Hour YTT"
  subtitle?: string;
  thumbnail: string;
  assignments: Assignment[];
}

// ---- Submission shape (what you'd POST to the backend) ----
export interface QuestionAnswer {
  questionId: string;
  mcqAnswer?: number; // selected option index
  textAnswer?: string; // free text answer
}

export interface AssignmentSubmission {
  assignmentId: string;
  answers: QuestionAnswer[];
  submittedAt: string;
  score?: number; // out of total mcq points, computed client-side for mcq only
  totalMcqPoints?: number;
}