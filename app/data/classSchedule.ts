// data/classSchedule.ts
// Static dummy data for AYM Yoga School - Class Schedule Calendar
// Replace this with an API call (e.g. lib/api/classes.ts) once the backend is ready.

export type ClassType = "live" | "recorded";
export type Platform = "Google Meet" | "Zoom" | "Recorded";

export interface ClassEvent {
  id: string;
  date: string; // "YYYY-MM-DD"
  title: string;
  type: ClassType;
  startTime: string; // display string, e.g. "06:00 AM"
  endTime: string; // display string, e.g. "07:30 AM"
  instructor: string;
  courseName: string;
  platform: Platform;
  meetingLink?: string; // for live classes
  recordingUrl?: string; // for recorded classes
  level: "beginner" | "intermediate" | "advanced";
  description: string;
}

// NOTE: Dates below are set in August 2026 so the calendar has data to show
// out of the box. Update / generate dynamically once wired to the backend.
export const CLASS_SCHEDULE: ClassEvent[] = [
  {
    id: "cls-001",
    date: "2026-08-03",
    title: "Hatha Yoga Flow – Morning Session",
    type: "live",
    startTime: "06:00 AM",
    endTime: "07:30 AM",
    instructor: "Yogi Anjali Sharma",
    courseName: "200Hr Yoga Teacher Training",
    platform: "Google Meet",
    meetingLink: "https://meet.google.com/aym-hth-flow",
    level: "beginner",
    description:
      "A gentle morning Hatha flow focusing on breath-aligned movement and foundational postures.",
  },
  {
    id: "cls-002",
    date: "2026-08-03",
    title: "Pranayama Basics",
    type: "recorded",
    startTime: "08:00 PM",
    endTime: "09:00 PM",
    instructor: "Acharya Ramesh Giri",
    courseName: "200Hr Yoga Teacher Training",
    platform: "Recorded",
    recordingUrl: "https://cdn.aymyogaschool.com/lessons/pranayama-basics.mp4",
    level: "beginner",
    description: "Introduction to core breathing techniques: Nadi Shodhana, Kapalbhati and Bhramari.",
  },
  {
    id: "cls-003",
    date: "2026-08-05",
    title: "Ashtanga Primary Series",
    type: "live",
    startTime: "06:30 AM",
    endTime: "08:00 AM",
    instructor: "Yogi Anjali Sharma",
    courseName: "300Hr Advanced Yoga Teacher Training",
    platform: "Google Meet",
    meetingLink: "https://meet.google.com/aym-ashtanga-01",
    level: "advanced",
    description: "Full Primary Series practice with alignment cues and modifications.",
  },
  {
    id: "cls-004",
    date: "2026-08-07",
    title: "Meditation & Mindfulness Q&A",
    type: "live",
    startTime: "07:00 PM",
    endTime: "08:00 PM",
    instructor: "Acharya Ramesh Giri",
    courseName: "200Hr Yoga Teacher Training",
    platform: "Zoom",
    meetingLink: "https://zoom.us/j/9876543210",
    level: "intermediate",
    description: "Live open Q&A session on meditation techniques and common practice blocks.",
  },
  {
    id: "cls-005",
    date: "2026-08-10",
    title: "Yin Yoga – Deep Stretch",
    type: "recorded",
    startTime: "05:00 PM",
    endTime: "06:00 PM",
    instructor: "Yogi Priya Nair",
    courseName: "Free Course – Yoga for Flexibility",
    platform: "Recorded",
    recordingUrl: "https://cdn.aymyogaschool.com/lessons/yin-deep-stretch.mp4",
    level: "beginner",
    description: "Slow-paced deep stretch class holding postures for 3–5 minutes each.",
  },
  {
    id: "cls-006",
    date: "2026-08-12",
    title: "Anatomy for Yoga Teachers",
    type: "live",
    startTime: "06:00 PM",
    endTime: "07:30 PM",
    instructor: "Dr. Kavita Rawat",
    courseName: "200Hr Yoga Teacher Training",
    platform: "Google Meet",
    meetingLink: "https://meet.google.com/aym-anatomy-201",
    level: "intermediate",
    description: "Musculoskeletal anatomy basics relevant to asana alignment and injury prevention.",
  },
  {
    id: "cls-007",
    date: "2026-08-14",
    title: "Vinyasa Flow – Power Session",
    type: "live",
    startTime: "06:00 AM",
    endTime: "07:15 AM",
    instructor: "Yogi Anjali Sharma",
    courseName: "300Hr Advanced Yoga Teacher Training",
    platform: "Google Meet",
    meetingLink: "https://meet.google.com/aym-vinyasa-pwr",
    level: "advanced",
    description: "Dynamic breath-to-movement sequences building strength and stamina.",
  },
  {
    id: "cls-008",
    date: "2026-08-14",
    title: "Yoga Nidra – Deep Relaxation",
    type: "recorded",
    startTime: "09:00 PM",
    endTime: "09:45 PM",
    instructor: "Acharya Ramesh Giri",
    courseName: "Free Course – Yoga for Flexibility",
    platform: "Recorded",
    recordingUrl: "https://cdn.aymyogaschool.com/lessons/yoga-nidra.mp4",
    level: "beginner",
    description: "Guided Yoga Nidra practice for deep rest and nervous system reset.",
  },
  {
    id: "cls-009",
    date: "2026-08-18",
    title: "Adjustments & Alignment Workshop",
    type: "live",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    instructor: "Yogi Priya Nair",
    courseName: "300Hr Advanced Yoga Teacher Training",
    platform: "Google Meet",
    meetingLink: "https://meet.google.com/aym-adjust-wksp",
    level: "advanced",
    description: "Hands-on adjustment techniques for common standing and seated postures.",
  },
  {
    id: "cls-010",
    date: "2026-08-21",
    title: "Restorative Yoga Evening",
    type: "recorded",
    startTime: "06:30 PM",
    endTime: "07:15 PM",
    instructor: "Yogi Priya Nair",
    courseName: "Free Course – Yoga for Flexibility",
    platform: "Recorded",
    recordingUrl: "https://cdn.aymyogaschool.com/lessons/restorative-evening.mp4",
    level: "beginner",
    description: "Prop-supported restorative postures to release tension after a long day.",
  },
  {
    id: "cls-011",
    date: "2026-08-24",
    title: "Philosophy of Yoga – Patanjali Sutras",
    type: "live",
    startTime: "05:30 PM",
    endTime: "07:00 PM",
    instructor: "Acharya Ramesh Giri",
    courseName: "200Hr Yoga Teacher Training",
    platform: "Zoom",
    meetingLink: "https://zoom.us/j/1122334455",
    level: "intermediate",
    description: "Discussion on the eight limbs of yoga and their application in modern practice.",
  },
  {
    id: "cls-012",
    date: "2026-08-27",
    title: "Ashtanga Primary Series",
    type: "live",
    startTime: "06:30 AM",
    endTime: "08:00 AM",
    instructor: "Yogi Anjali Sharma",
    courseName: "300Hr Advanced Yoga Teacher Training",
    platform: "Google Meet",
    meetingLink: "https://meet.google.com/aym-ashtanga-02",
    level: "advanced",
    description: "Full Primary Series practice with alignment cues and modifications.",
  },
  {
    id: "cls-013",
    date: "2026-08-27",
    title: "Beginner Basics – Sun Salutations",
    type: "recorded",
    startTime: "07:00 PM",
    endTime: "07:45 PM",
    instructor: "Yogi Priya Nair",
    courseName: "Free Course – Yoga for Flexibility",
    platform: "Recorded",
    recordingUrl: "https://cdn.aymyogaschool.com/lessons/sun-salutations.mp4",
    level: "beginner",
    description: "Step-by-step breakdown of Surya Namaskar A and B for beginners.",
  },
];

// Helper to quickly group events by date (YYYY-MM-DD) for calendar rendering
export function groupClassesByDate(events: ClassEvent[]): Record<string, ClassEvent[]> {
  return events.reduce((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, ClassEvent[]>);
}