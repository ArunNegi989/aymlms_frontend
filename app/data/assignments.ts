import type { AssignmentCourse } from "@/app/types/Assignment";

// TODO: Replace with API fetch (GET /api/assignments) once backend is ready.
export const assignmentCourses: Record<string, AssignmentCourse> = {
  "100-hour-ytt": {
    id: "100-hour-ytt",
    title: "100 Hour YTT",
    subtitle: "Yoga Teacher Training",
    thumbnail: "/images/courses/100-hour.jpg",
    assignments: [
      {
        id: "a1",
        title: "Assignment 1 - Yoga Philosophy Basics",
        description: "Covers the 8 limbs of yoga and foundational philosophy.",
        dueDate: "20 Aug 2026",
        status: "pending",
        questions: [
          {
            id: "q1",
            type: "mcq",
            question: "How many limbs of Ashtanga Yoga are described by Patanjali?",
            points: 5,
            options: ["6", "7", "8", "9"],
            correctAnswer: 2,
            explanation: "Patanjali's Yoga Sutras describe 8 limbs (Ashtanga Yoga).",
          },
          {
            id: "q2",
            type: "mcq",
            question: "Which limb refers to ethical restraints (moral disciplines)?",
            points: 5,
            options: ["Niyama", "Yama", "Asana", "Dharana"],
            correctAnswer: 1,
            explanation: "Yama refers to the ethical restraints / moral disciplines.",
          },
          {
            id: "q3",
            type: "text",
            question: "In your own words, explain why Yama and Niyama form the foundation of yoga practice.",
            points: 10,
          },
          {
            id: "q4",
            type: "text",
            question: "Describe one personal experience where practicing a Niyama (e.g. Santosha - contentment) helped you.",
            points: 10,
          },
        ],
      },
      {
        id: "a2",
        title: "Assignment 2 - Asana Alignment",
        description: "Standing pose alignment principles and common mistakes.",
        dueDate: "25 Aug 2026",
        status: "pending",
        questions: [
          {
            id: "q1",
            type: "mcq",
            question: "In Tadasana (Mountain Pose), where should body weight be evenly distributed?",
            points: 5,
            options: ["Heels only", "Toes only", "Both feet evenly", "Outer edge of feet"],
            correctAnswer: 2,
            explanation: "Weight should be evenly distributed across both feet.",
          },
          {
            id: "q2",
            type: "text",
            question: "List 3 common alignment mistakes students make in Trikonasana (Triangle Pose).",
            points: 10,
          },
        ],
      },
    ],
  },

  "200-hour-ytt": {
    id: "200-hour-ytt",
    title: "200 Hour YTT",
    subtitle: "Advanced Yoga Teacher Training",
    thumbnail: "/images/courses/200-hour.jpg",
    assignments: [
      {
        id: "a1",
        title: "Assignment 1 - Teaching Methodology",
        description: "Class sequencing and cueing fundamentals.",
        dueDate: "22 Aug 2026",
        status: "pending",
        questions: [
          {
            id: "q1",
            type: "mcq",
            question: "What should typically come first in a well-sequenced yoga class?",
            points: 5,
            options: ["Deep backbends", "Warm-up / centering", "Inversions", "Final relaxation"],
            correctAnswer: 1,
            explanation: "Classes should begin with warm-up and centering before deeper work.",
          },
          {
            id: "q2",
            type: "text",
            question: "Design a 5-step sequence outline for a beginner-level 60 minute class.",
            points: 15,
          },
        ],
      },
    ],
  },
};

export function getAssignmentCourse(classId: string) {
  return assignmentCourses[classId];
}

export function getAssignment(classId: string, assignmentId: string) {
  const course = assignmentCourses[classId];
  return course?.assignments.find((a) => a.id === assignmentId);
}