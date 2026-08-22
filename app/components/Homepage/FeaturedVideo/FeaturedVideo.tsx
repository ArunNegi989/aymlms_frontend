"use client";

import { useRef, useState } from "react";
import styles from "./FeaturedVideo.module.css";

export default function FeaturedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <section className={styles.section}>
      <div className={styles.textCol}>
        <span className={styles.eyebrow}>INSIDE A LIVE CLASS</span>
        <h2 className={styles.heading}>See how our classes actually feel</h2>
        <p className={styles.text}>
          A short look inside a real live session — small batches, real-time correction,
          and a pace that meets you wherever you are in your practice.
        </p>
        <ul className={styles.points}>
          <li>Live correction from certified instructors</li>
          <li>Recordings available for every session</li>
          <li>Beginner-friendly pacing, no prior experience needed</li>
        </ul>
      </div>

      <div className={styles.videoCol}>
        <div className={styles.videoWrap}>
          <video
            ref={videoRef}
            className={styles.video}
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
            poster="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1000&auto=format&fit=crop"
            playsInline
            onEnded={() => setPlaying(false)}
          />
          <button className={styles.playBtn} onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"}>
            {playing ? "❚❚" : "▶"}
          </button>
        </div>
      </div>
    </section>
  );
}
