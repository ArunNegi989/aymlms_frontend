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
  module: string;
  sizeMb: number;
  fileUrl: string;
  downloaded: boolean;
}