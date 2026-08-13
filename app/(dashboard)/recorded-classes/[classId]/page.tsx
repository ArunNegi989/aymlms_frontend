"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import styles from "./page.module.css";

// Dummy fetch by id — replace with real API call
const classData = {
  title: "Surya Namaskar - Step by Step",
  videoUrl: "/videos/class2.mp4",
  progressLabel: "12:35 / 28:10",
  description:
    "Learn the benefits and detailed steps of Surya Namaskar. This sequence is perfect to energize your body and calm your mind.",
  attachments: [
    { label: "Class Notes (PDF)", url: "#" },
    { label: "Step Guide (PDF)", url: "#" },
  ],
};

export default function ClassPlayerPage() {
  const [completed, setCompleted] = useState(false);

  return (
    <div>
      <Link href="/recorded-classes" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to Recorded Classes
      </Link>

      <div className={styles.playerHeader}>
        <h1 className={styles.title}>{classData.title}</h1>
        <button
          className={styles.completeBtn}
          onClick={() => setCompleted(true)}
        >
          {completed ? "Completed ✓" : "Mark as Complete"}
        </button>
      </div>

      <div className={styles.videoWrap}>
        <video controls className={styles.video} src={classData.videoUrl} />
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.aboutCard}>
          <h4 className={styles.cardHeading}>About this class</h4>
          <p className={styles.description}>{classData.description}</p>
        </div>

        <div className={styles.attachCard}>
          <h4 className={styles.cardHeading}>Attachments</h4>
          {classData.attachments.map((a) => (
            <a key={a.label} href={a.url} className={styles.attachRow}>
              <FileText size={16} />
              <span>{a.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}