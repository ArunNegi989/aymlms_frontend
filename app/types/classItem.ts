export interface ClassItem {
  id: string;
  title: string;
  module: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  attachments: { label: string; url: string }[];
}

export interface NoteItem {
  id: string;
  title: string;
  sizeMb: number;
  fileUrl: string;
}

export interface CourseSummary {
  courseId: string;
  courseName: string;
  thumbnail: string;
  notesCount: number;
}