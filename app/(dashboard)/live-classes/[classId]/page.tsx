"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Video,
  Radio,
  ExternalLink,
  Key,
  Copy,
} from "lucide-react";
import { getLiveClassCourse } from "@/app/data/liveClasses";
import { computeLiveStatus, useNow } from "../liveStatus";
import type { LiveClass } from "@/app/types/LiveClass";
import styles from "./page.module.css";

export default function LiveClassesCoursePage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;
  const course = getLiveClassCourse(classId);
  const now = useNow();

  if (!course) {
    return (
      <div className={styles.notFound}>
        <p>Course not found.</p>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ChevronLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  // Sort: live now first, then upcoming (soonest first), then ended
  const sorted = [...course.liveClasses].sort((a, b) => {
    return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => router.push("/live-classes")}
        >
          <ChevronLeft size={18} />
          Back to Live Classes
        </button>

        <div className={styles.headerInfo}>
          <h1 className={styles.title}>{course.title}</h1>
          {course.subtitle && <p className={styles.subtitle}>{course.subtitle}</p>}
        </div>
      </div>

      <div className={styles.classList}>
        {sorted.map((liveClass) => (
          <LiveClassCard key={liveClass.id} liveClass={liveClass} now={now} />
        ))}
      </div>
    </div>
  );
}

function LiveClassCard({
  liveClass,
  now,
}: {
  liveClass: LiveClass;
  now: Date | null;
}) {
  // Before mount (now === null) default to "upcoming" styling, harmless
  // since it's not tied to server-rendered numbers/text that could mismatch -
  // Join button stays enabled either way.
  const status = now
    ? computeLiveStatus(liveClass.startDateTime, liveClass.durationMinutes, now)
    : "upcoming";

  const platformLabel = liveClass.platform === "zoom" ? "Zoom" : "Google Meet";

  const copyText = (text: string) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className={`${styles.classCard} ${styles[status]}`}>
      <div className={styles.classLeft}>
        <div className={styles.platformIcon}>
          <Video size={20} />
        </div>
        <div className={styles.classInfo}>
          <div className={styles.titleRow}>
            <h3 className={styles.classTitle}>{liveClass.title}</h3>
            {status === "live" && (
              <span className={styles.liveBadge}>
                <Radio size={11} />
                LIVE NOW
              </span>
            )}
            {status === "ended" && (
              <span className={styles.endedBadge}>Ended</span>
            )}
          </div>

          {liveClass.description && (
            <p className={styles.classDescription}>{liveClass.description}</p>
          )}

          <div className={styles.classMeta}>
            <span className={styles.metaItem}>
              <Calendar size={13} />
              {liveClass.scheduledDate}
            </span>
            <span className={styles.metaItem}>
              <Clock size={13} />
              {liveClass.scheduledTime} · {liveClass.durationMinutes} min
            </span>
            {liveClass.instructor && (
              <span className={styles.metaItem}>
                <User size={13} />
                {liveClass.instructor}
              </span>
            )}
            <span className={styles.platformTag}>{platformLabel}</span>
          </div>

          {(liveClass.meetingId || liveClass.passcode) && (
            <div className={styles.credentials}>
              {liveClass.meetingId && (
                <button
                  className={styles.credentialItem}
                  onClick={() => copyText(liveClass.meetingId!)}
                  title="Click to copy"
                >
                  <Key size={12} />
                  ID: {liveClass.meetingId}
                  <Copy size={11} />
                </button>
              )}
              {liveClass.passcode && (
                <button
                  className={styles.credentialItem}
                  onClick={() => copyText(liveClass.passcode!)}
                  title="Click to copy"
                >
                  <Key size={12} />
                  Passcode: {liveClass.passcode}
                  <Copy size={11} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <a
        href={liveClass.joinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.joinBtn} ${status === "live" ? styles.joinBtnLive : ""} ${
          status === "ended" ? styles.joinBtnEnded : ""
        }`}
      >
        <ExternalLink size={16} />
        {status === "live"
          ? "Join Now"
          : status === "ended"
          ? "View Recording Link"
          : `Join via ${platformLabel}`}
      </a>
    </div>
  );
}