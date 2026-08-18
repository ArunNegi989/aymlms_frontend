"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Star,
  Users,
  Clock,
  Sparkles,
} from "lucide-react";
import styles from "./page.module.css";

// Flexible shape so this works with both recommendedCourses and
// trendingCourses (or any future course list) without changing your
// existing data types. Fields you don't have yet just fall back gracefully.
export interface DemoModalCourse {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  level?: string;
  rating?: number;
  students?: number;
  isFree?: boolean;
  price?: number;
  originalPrice?: number;
  demoVideoUrl?: string;
  overview?: string;
}

interface CourseDemoModalProps {
  course: DemoModalCourse | null;
  onClose: () => void;
}

const FALLBACK_DEMO_VIDEO =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const FALLBACK_OVERVIEW =
  "Get a quick feel for this course before you enroll — watch a short excerpt from an actual lesson to see the teaching style, pacing and production quality.";

export default function CourseDemoModal({ course, onClose }: CourseDemoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Reset player state whenever a different course's demo is opened
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setIsMuted(false);
  }, [course?.id]);

  // Close on Escape
  useEffect(() => {
    if (!course) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [course, onClose]);

  if (!course) return null;

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
    setProgress(percent * 100);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isFree = course.isFree ?? false;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Demo preview for ${course.title}`}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {/* Video */}
        <div className={styles.videoWrapper}>
          <video
            ref={videoRef}
            className={styles.video}
            src={course.demoVideoUrl || FALLBACK_DEMO_VIDEO}
            poster={course.thumbnail}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlay}
            onEnded={() => setIsPlaying(false)}
          />

          <div className={styles.demoTag}>
            <Sparkles size={12} />
            {isFree ? "Free Preview" : "Demo Preview"}
          </div>

          <div className={styles.videoControls}>
            <button className={styles.controlBtn} onClick={togglePlay} aria-label="Play/Pause">
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <span className={styles.timeDisplay}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className={styles.progressBar} onClick={handleProgressClick}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>

            <button className={styles.controlBtn} onClick={toggleMute} aria-label="Mute/Unmute">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>

        {/* Details */}
        <div className={styles.details}>
          <h3 className={styles.courseTitle}>{course.title}</h3>
          <p className={styles.instructor}>By {course.instructor}</p>

          <div className={styles.metaRow}>
            {typeof course.rating === "number" && (
              <span className={styles.metaItem}>
                <Star size={13} fill="#ff7a00" color="#ff7a00" />
                {course.rating}
              </span>
            )}
            {typeof course.students === "number" && (
              <span className={styles.metaItem}>
                <Users size={13} />
                {course.students.toLocaleString()} learners
              </span>
            )}
            {course.level && <span className={styles.levelTag}>{course.level}</span>}
          </div>

          <div className={styles.overviewBox}>
            <h4 className={styles.overviewTitle}>Course overview</h4>
            <p className={styles.overviewText}>{course.overview || FALLBACK_OVERVIEW}</p>
          </div>

          <div className={styles.footer}>
            {isFree ? (
              <span className={styles.freeLabel}>Free course</span>
            ) : (
              <div className={styles.priceBlock}>
                <span className={styles.priceNow}>
                  ₹{(course.price ?? 0).toLocaleString()}
                </span>
                {course.originalPrice && (
                  <span className={styles.priceOld}>
                    ₹{course.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            )}

            <Link href={`/course-description/${course.id}`} className={styles.enrollBtn}>
              {isFree ? "Start Learning" : "Enroll Now"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}