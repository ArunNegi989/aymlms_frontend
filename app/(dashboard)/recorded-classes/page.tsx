"use client";

import Link from "next/link";
import { PlayCircle, Clock, Layers } from "lucide-react";
import { recordedClasses } from "@/app/data/recordedClasses";
import styles from "./page.module.css";

export default function RecordedClassesPage() {
  const courses = Object.values(recordedClasses);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Recorded Classes</h1>
        <p className={styles.subtitle}>
          Missed a live session? Watch the recorded Zoom classes anytime.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className={styles.empty}>
          <PlayCircle size={40} />
          <p>No recorded classes available yet.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/recorded-classes/${course.id}`}
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
                  <PlayCircle size={44} />
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{course.title}</h3>
                {course.subtitle && (
                  <p className={styles.cardSubtitle}>{course.subtitle}</p>
                )}

                <div className={styles.cardMeta}>
                  <span className={styles.metaItem}>
                    <Layers size={14} />
                    {course.modules.length} classes
                  </span>
                  <span className={styles.metaItem}>
                    <Clock size={14} />
                    {course.totalHours}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}