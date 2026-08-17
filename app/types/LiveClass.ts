// Types for the "Live Classes" feature (Zoom / Google Meet join links)

export type LiveClassPlatform = "zoom" | "google-meet";

export interface LiveClass {
  id: string;
  title: string;
  description?: string;
  platform: LiveClassPlatform;
  joinUrl: string; // the actual zoom.us / meet.google.com link
  meetingId?: string; // optional, mainly for Zoom
  passcode?: string; // optional, mainly for Zoom
  scheduledDate: string; // display date, e.g. "20 Aug 2026"
  scheduledTime: string; // display time, e.g. "6:00 PM"
  startDateTime: string; // ISO datetime string, used to compute live status
  durationMinutes: number;
  instructor?: string;
}

export interface LiveClassCourse {
  id: string; // slug, used in the URL: /live-classes/[classId]
  title: string; // "100 Hour YTT"
  subtitle?: string;
  thumbnail: string;
  liveClasses: LiveClass[];
}

export type LiveClassStatus = "upcoming" | "live" | "ended";