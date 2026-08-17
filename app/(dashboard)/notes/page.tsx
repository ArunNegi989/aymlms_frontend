"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import type { CourseSummary } from "@/app/types/classItem";
import styles from "./page.module.css";

const dummyCourses: CourseSummary[] = [
  { courseId: "c1", courseName: "Yoga Philosophy", thumbnail: "/thumbs/yoga-philosophy.jpg", notesCount: 2 },
  { courseId: "c2", courseName: "Ashtanga Yoga", thumbnail: "/thumbs/ashtanga.jpg", notesCount: 2 },
  { courseId: "c3", courseName: "Pranayama", thumbnail: "/thumbs/pranayama.jpg", notesCount: 1 },
  { courseId: "c4", courseName: "Meditation", thumbnail: "/thumbs/meditation.jpg", notesCount: 1 },
];

export default function NotesCoursesPage() {
  return (
    <div>
      <h1 className={styles.title}>Course Notes</h1>
      <p className={styles.subtitle}>Select a course to view its notes</p>

      <div className={styles.grid}>
        {dummyCourses.map((course) => (
          <Link
            key={course.courseId}
            href={`/notes/${course.courseId}`}
            className={styles.card}
          >
            <div className={styles.thumbWrap}>
              <img src={course.thumbnail} alt={course.courseName} className={styles.thumb} />
            </div>
            <div className={styles.cardBody}>
              <h4 className={styles.courseName}>{course.courseName}</h4>
              <span className={styles.notesCount}>
                <FileText size={13} />
                {course.notesCount} note{course.notesCount !== 1 ? "s" : ""}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}