"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FileText, Eye, X, ArrowLeft } from "lucide-react";
import type { NoteItem } from "@/app/types/classItem";
import styles from "./page.module.css";

const notesByCourse: Record<string, { courseName: string; notes: NoteItem[] }> = {
  c1: {
    courseName: "Yoga Philosophy",
    notes: [
      { id: "1", title: "Introduction to Yoga Philosophy", sizeMb: 2.4, fileUrl: "/notes/lms_platform_plan.pdf" },
      { id: "2", title: "History & Origins", sizeMb: 1.6, fileUrl: "/notes/yoga-history.pdf" },
    ],
  },
  c2: {
    courseName: "Ashtanga Yoga",
    notes: [
      { id: "3", title: "Ashtanga Yoga Notes - Primary Series", sizeMb: 3.1, fileUrl: "/notes/ashtanga-primary.pdf" },
      { id: "4", title: "Asana Alignment Guide", sizeMb: 2.0, fileUrl: "/notes/asana-alignment.pdf" },
    ],
  },
  c3: {
    courseName: "Pranayama",
    notes: [{ id: "5", title: "Pranayama Guide", sizeMb: 1.8, fileUrl: "/notes/pranayama-guide.pdf" }],
  },
  c4: {
    courseName: "Meditation",
    notes: [{ id: "6", title: "Meditation Notes - Foundations", sizeMb: 2.2, fileUrl: "/notes/meditation-notes.pdf" }],
  },
};

export default function CourseNotesPage() {
  const params = useParams<{ courseId: string }>();
  const router = useRouter();
  const [activeNote, setActiveNote] = useState<NoteItem | null>(null);

  const course = notesByCourse[params.courseId];

  if (!course) {
    return (
      <div>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ArrowLeft size={16} />
          Back
        </button>
        <p className={styles.empty}>No notes found for this course.</p>
      </div>
    );
  }

  return (
    <div>
      <button className={styles.backBtn} onClick={() => router.back()}>
        <ArrowLeft size={16} />
        Back to courses
      </button>

      <h1 className={styles.title}>{course.courseName}</h1>
      <p className={styles.subtitle}>
        {course.notes.length} note{course.notes.length !== 1 ? "s" : ""} available
      </p>

      <div className={styles.list}>
        {course.notes.map((note) => (
          <div key={note.id} className={styles.row}>
            <div className={styles.iconWrap}>
              <FileText size={18} />
            </div>
            <div className={styles.info}>
              <h4 className={styles.noteTitle}>{note.title}</h4>
              <span className={styles.size}>{note.sizeMb} MB</span>
            </div>
            <button className={styles.viewBtn} onClick={() => setActiveNote(note)}>
              <Eye size={16} />
              View
            </button>
          </div>
        ))}
      </div>

      {activeNote && (
        <div className={styles.modalOverlay} onClick={() => setActiveNote(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h4 className={styles.modalTitle}>{activeNote.title}</h4>
              <button className={styles.closeBtn} onClick={() => setActiveNote(null)}>
                <X size={18} />
              </button>
            </div>
            <div className={styles.modalBody} onContextMenu={(e) => e.preventDefault()}>
              <iframe
                src={`${activeNote.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className={styles.pdfFrame}
                title={activeNote.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}