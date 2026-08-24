"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FeaturedVideo.module.css";

export default function FeaturedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className={styles.section}>
      {/* Decorative elements */}
      <div className={styles.decorativeCircle1} />
      <div className={styles.decorativeCircle2} />
      <div className={styles.decorativeLine} />

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
          <div className={styles.statItem}>
            <span className={styles.statNum}>4.9/5</span>
            <span className={styles.statLabel}>Average rating</span>
            <div className={styles.statBar}>
              <div className={styles.statBarFill} style={{ width: '98%' }} />
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>12k+</span>
            <span className={styles.statLabel}>Students taught</span>
            <div className={styles.statBar}>
              <div className={styles.statBarFill} style={{ width: '85%' }} />
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>6</span>
            <span className={styles.statLabel}>Certified instructors</span>
            <div className={styles.statBar}>
              <div className={styles.statBarFill} style={{ width: '70%' }} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.videoCol}>
        <div className={styles.videoFrame}>
          <div 
            className={styles.videoWrap}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
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
            
            {/* Gradient overlay */}
            <div className={styles.videoOverlay} />
            
            {/* Play/Pause button */}
            <button 
              className={`${styles.playBtn} ${isHovering ? styles.playBtnVisible : ''}`}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" className={styles.playIcon}>
                  <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                  <rect x="14" y="4" width="4" height="16" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className={styles.playIcon}>
                  <polygon points="5,3 19,12 5,21" fill="currentColor" />
                </svg>
              )}
            </button>

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

          <div className={styles.timestampBadge}>
            <svg viewBox="0 0 24 24" className={styles.clockIcon}>
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <polyline points="12,6 12,12 16,14" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>2:34</span>
          </div>
        </div>
      </div>
    </section>
  );
}