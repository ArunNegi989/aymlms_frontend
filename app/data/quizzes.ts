import { QuizQuestion } from "@/app/types/lecturePlayer";

export const quizData: Record<string, QuizQuestion[]> = {
  // Module 1 Quiz
  "l5": [
    {
      id: "q1",
      question: "What are the eight limbs of yoga?",
      options: [
        "Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi",
        "Asana, Pranayama, Mudra, Bandha, Kriya, Shatkarma, Dhyana, Samadhi",
        "Yama, Niyama, Asana, Pranayama, Mudra, Bandha, Dhyana, Samadhi",
      ],
      correctAnswer: 0,
      explanation: "The eight limbs are Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, and Samadhi.",
      points: 10,
    },
    {
      id: "q2",
      question: "Which of the following is NOT one of the Yamas?",
      options: [
        "Ahimsa (Non-violence)",
        "Satya (Truthfulness)",
        "Tapas (Discipline)",
        "Asteya (Non-stealing)",
      ],
      correctAnswer: 2,
      explanation: "Tapas is a Niyama, not a Yama. The Yamas are Ahimsa, Satya, Asteya, Brahmacharya, and Aparigraha.",
      points: 10,
    },
    {
      id: "q3",
      question: "What does 'Pranayama' refer to in yoga?",
      options: [
        "Physical postures",
        "Breath control techniques",
        "Meditation practices",
        "Ethical guidelines",
      ],
      correctAnswer: 1,
      explanation: "Pranayama refers to breath control techniques that help regulate the flow of prana (life force energy).",
      points: 10,
    },
  ],
  
  // Module 2 Quiz
  "l11": [
    {
      id: "q4",
      question: "What is the first pose in Surya Namaskar (Sun Salutation)?",
      options: [
        "Uttanasana (Forward Fold)",
        "Adho Mukha Svanasana (Downward Dog)",
        "Pranamasana (Prayer Pose)",
        "Bhujangasana (Cobra Pose)",
      ],
      correctAnswer: 2,
      explanation: "Surya Namaskar begins with Pranamasana (Prayer Pose), standing at the front of the mat with hands together at the heart.",
      points: 10,
    },
    {
      id: "q5",
      question: "Which asana is known as the 'King of Asanas'?",
      options: [
        "Padmasana (Lotus Pose)",
        "Sirsasana (Headstand)",
        "Trikonasana (Triangle Pose)",
        "Savasana (Corpse Pose)",
      ],
      correctAnswer: 1,
      explanation: "Sirsasana (Headstand) is often referred to as the 'King of Asanas' due to its many benefits for the entire body.",
      points: 10,
    },
  ],
};

export const courseNotes: Record<string, any[]> = {
  "1": [
    {
      id: "n1",
      lectureId: "l1",
      content: "Remember to practice the Surya Namaskar sequence daily",
      timestamp: 120,
      createdAt: "2026-08-10T10:30:00Z",
    },
  ],
};