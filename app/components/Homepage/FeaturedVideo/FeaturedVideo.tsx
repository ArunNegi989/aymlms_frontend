"use client";

import { useEffect, useRef } from "react";
import styles from "./FeaturedVideo.module.css";

export default function FeaturedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.textCol}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span className={styles.eyebrow}>INSIDE A LIVE CLASS</span>
        </div>

        <h2 className={styles.heading}>
          See how our classes <span className={styles.headingAccent}>actually feel</span>
        </h2>
        <p className={styles.text}>
          A short look inside a real live session — small batches, real-time correction,
          and a pace that meets you wherever you are in your practice.
        </p>

        <ul className={styles.points}>
          <li>
            <span className={styles.checkIcon}>✓</span>
            Live correction from certified instructors
          </li>
          <li>
            <span className={styles.checkIcon}>✓</span>
            Recordings available for every session
          </li>
          <li>
            <span className={styles.checkIcon}>✓</span>
            Beginner-friendly pacing, no prior experience needed
          </li>
        </ul>

        <div className={styles.statsRow}>
          <div>
            <span className={styles.statNum}>4.9/5</span>
            <span className={styles.statLabel}>Average rating</span>
          </div>
          <div>
            <span className={styles.statNum}>12k+</span>
            <span className={styles.statLabel}>Students taught</span>
          </div>
          <div>
            <span className={styles.statNum}>6</span>
            <span className={styles.statLabel}>Certified instructors</span>
          </div>
        </div>
      </div>

      <div className={styles.videoCol}>
        <div className={styles.videoFrame}>
          <div className={styles.videoWrap}>
            <video
              ref={videoRef}
              className={styles.video}
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
              poster="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1000&auto=format&fit=crop"
              autoPlay
              loop
              muted
              playsInline
            />
            <span className={styles.liveTag}>
              <span className={styles.liveDot} />
              LIVE SESSION
            </span>
            <div className={styles.captionBar}>
              <div className={styles.captionTitle}>Morning Flow Batch</div>
              <div className={styles.captionSub}>Recorded this week</div>
            </div>
          </div>

          <div className={styles.floatCard}>
            <span className={styles.floatIcon}>★</span>
            <div className={styles.floatText}>
              <div className={styles.floatNum}>4.9/5</div>
              <div className={styles.floatLabel}>Student rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}