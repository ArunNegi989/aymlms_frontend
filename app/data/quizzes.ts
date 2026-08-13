import type { LectureQuiz } from "@/app/types/lecturePlayer";

// Keyed by lecture id. Lectures with no entry here simply show
// an empty state in the Quiz tab — add more as you record them.
export const lectureQuizzes: Record<string, LectureQuiz> = {
  l2: {
    lectureId: "l2",
    title: "Quick Check: History & Roots of Yoga",
    questions: [
      {
        id: "q1",
        question:
          "Which ancient text is considered the earliest systematic guide to yoga philosophy?",
        options: [
          { id: "a", text: "The Bhagavad Gita" },
          { id: "b", text: "The Yoga Sutras of Patanjali" },
          { id: "c", text: "The Upanishads" },
          { id: "d", text: "The Hatha Yoga Pradipika" },
        ],
        correctOptionId: "b",
        explanation:
          "The Yoga Sutras, compiled around 400 CE, organized yoga philosophy into 196 aphorisms.",
      },
      {
        id: "q2",
        question: "The eight limbs of yoga are collectively known as:",
        options: [
          { id: "a", text: "Ashtanga" },
          { id: "b", text: "Hatha" },
          { id: "c", text: "Vinyasa" },
          { id: "d", text: "Kundalini" },
        ],
        correctOptionId: "a",
      },
    ],
  },
  l6: {
    lectureId: "l6",
    title: "Quick Check: Surya Namaskar",
    questions: [
      {
        id: "q1",
        question:
          "How many poses make up one traditional round of Surya Namaskar A?",
        options: [
          { id: "a", text: "6" },
          { id: "b", text: "8" },
          { id: "c", text: "12" },
          { id: "d", text: "16" },
        ],
        correctOptionId: "c",
        explanation: "A full round of Surya Namaskar A moves through 12 distinct poses.",
      },
    ],
  },
};

export function getQuizForLecture(lectureId: string): LectureQuiz | undefined {
  return lectureQuizzes[lectureId];
}