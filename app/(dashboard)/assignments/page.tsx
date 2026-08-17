"use client";

import Link from "next/link";
import { ClipboardList, FileCheck2 } from "lucide-react";
import { assignmentCourses } from "@/app/data/assignments";
import styles from "./page.module.css";

export default function AssignmentsPage() {
  const courses = Object.values(assignmentCourses);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Assignments</h1>
        <p className={styles.subtitle}>
          Complete your course assignments and submit them for review.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className={styles.empty}>
          <ClipboardList size={40} />
          <p>No assignments available yet.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {courses.map((course) => {
            const total = course.assignments.length;
            const pending = course.assignments.filter(
              (a) => a.status === "pending"
            ).length;

            return (
              <Link
                key={course.id}
                href={`/assignments/${course.id}`}
                className={styles.card}
              >
                <div className={styles.thumbWrap}>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className={styles.thumb}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className={styles.thumbOverlay}>
                    <ClipboardList size={40} />
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{course.title}</h3>
                  {course.subtitle && (
                    <p className={styles.cardSubtitle}>{course.subtitle}</p>
                  )}

                  <div className={styles.cardMeta}>
                    <span className={styles.metaItem}>
                      <FileCheck2 size={14} />
                      {total} assignments
                    </span>
                    {pending > 0 && (
                      <span className={styles.pendingBadge}>
                        {pending} pending
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}