import type { LiveClassCourse } from "@/app/types/LiveClass";

// TODO: Replace with API fetch (GET /api/live-classes) once backend is ready.
// startDateTime must be a real ISO datetime - it's what drives the
// Upcoming / Live Now / Ended badge on the UI.
export const liveClassCourses: Record<string, LiveClassCourse> = {
  "100-hour-ytt": {
    id: "100-hour-ytt",
    title: "100 Hour YTT",
    subtitle: "Yoga Teacher Training",
    thumbnail: "/images/courses/100-hour.jpg",
    liveClasses: [
      {
        id: "l1",
        title: "Week 3 - Pranayama & Breathwork",
        description: "Live guided pranayama session with Q&A.",
        platform: "zoom",
        joinUrl: "https://zoom.us/j/1234567890",
        meetingId: "123 456 7890",
        passcode: "yoga100",
        scheduledDate: "18 Aug 2026",
        scheduledTime: "6:00 PM",
        startDateTime: "2026-08-18T18:00:00+05:30",
        durationMinutes: 90,
        instructor: "Acharya Devendra",
      },
      {
        id: "l2",
        title: "Week 3 - Standing Asana Practice",
        description: "Live practice class - alignment corrections in real time.",
        platform: "google-meet",
        joinUrl: "https://meet.google.com/abc-defg-hij",
        scheduledDate: "20 Aug 2026",
        scheduledTime: "7:00 AM",
        startDateTime: "2026-08-20T07:00:00+05:30",
        durationMinutes: 60,
        instructor: "Acharya Devendra",
      },
      {
        id: "l3",
        title: "Week 2 - Yoga Philosophy Discussion",
        description: "Group discussion on the 8 limbs of yoga.",
        platform: "zoom",
        joinUrl: "https://zoom.us/j/9988776655",
        meetingId: "998 877 6655",
        passcode: "yoga100",
        scheduledDate: "12 Aug 2026",
        scheduledTime: "6:00 PM",
        startDateTime: "2026-08-12T18:00:00+05:30",
        durationMinutes: 90,
        instructor: "Dr. Kavita Rawat",
      },
    ],
  },

  "200-hour-ytt": {
    id: "200-hour-ytt",
    title: "200 Hour YTT",
    subtitle: "Advanced Yoga Teacher Training",
    thumbnail: "/images/courses/200-hour.jpg",
    liveClasses: [
      {
        id: "l1",
        title: "Advanced Inversions Workshop",
        description: "Live workshop covering headstand and shoulderstand progressions.",
        platform: "zoom",
        joinUrl: "https://zoom.us/j/5566778899",
        meetingId: "556 677 8899",
        passcode: "yoga200",
        scheduledDate: "19 Aug 2026",
        scheduledTime: "5:30 PM",
        startDateTime: "2026-08-19T17:30:00+05:30",
        durationMinutes: 120,
        instructor: "Acharya Devendra",
      },
      {
        id: "l2",
        title: "Teaching Methodology - Live Practicum",
        description: "Practice teaching session with peer feedback.",
        platform: "google-meet",
        joinUrl: "https://meet.google.com/xyz-uvwx-yzk",
        scheduledDate: "23 Aug 2026",
        scheduledTime: "6:00 PM",
        startDateTime: "2026-08-23T18:00:00+05:30",
        durationMinutes: 90,
        instructor: "Dr. Kavita Rawat",
      },
    ],
  },
};

export function getLiveClassCourse(classId: string) {
  return liveClassCourses[classId];
}