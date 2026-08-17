"use client";

import Link from "next/link";
import { Video, Radio } from "lucide-react";
import { liveClassCourses } from "@/app/data/liveClasses";
import { computeLiveStatus, useNow } from "./liveStatus";
import styles from "./page.module.css";

export default function LiveClassesPage() {
  const courses = Object.values(liveClassCourses);
  const now = useNow(); // null on first render (server + client match), set after mount

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Live Classes</h1>
        <p className={styles.subtitle}>
          Join your scheduled live sessions on Zoom or Google Meet.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className={styles.empty}>
          <Video size={40} />
          <p>No live classes scheduled yet.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {courses.map((course) => {
            const liveNowCount = now
              ? course.liveClasses.filter(
                  (c) =>
                    computeLiveStatus(c.startDateTime, c.durationMinutes, now) ===
                    "live"
                ).length
              : 0;
            const upcomingCount = now
              ? course.liveClasses.filter(
                  (c) =>
                    computeLiveStatus(c.startDateTime, c.durationMinutes, now) ===
                    "upcoming"
                ).length
              : 0;

            return (
              <Link
                key={course.id}
                href={`/live-classes/${course.id}`}
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
                    <Video size={40} />
                  </div>
                  {liveNowCount > 0 && (
                    <span className={styles.liveNowBadge}>
                      <Radio size={12} />
                      LIVE NOW
                    </span>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{course.title}</h3>
                  {course.subtitle && (
                    <p className={styles.cardSubtitle}>{course.subtitle}</p>
                  )}

                  <div className={styles.cardMeta}>
                    <span className={styles.metaItem}>
                      {course.liveClasses.length} sessions
                    </span>
                    {upcomingCount > 0 && (
                      <span className={styles.upcomingBadge}>
                        {upcomingCount} upcoming
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