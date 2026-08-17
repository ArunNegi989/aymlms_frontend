"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  PlayCircle,
  Clock,
  Calendar,
  User,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";
import { getRecordedCourse } from "@/app/data/recordedClasses";
import type { RecordedModule } from "@/app/types/RecordedClass";
import styles from "./page.module.css";

export default function RecordedCourseModulesPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;
  const course = getRecordedCourse(classId);

  const [activeModule, setActiveModule] = useState<RecordedModule | null>(null);

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

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => router.push("/recorded-classes")}
        >
          <ChevronLeft size={18} />
          Back to Recorded Classes
        </button>

        <div className={styles.headerInfo}>
          <h1 className={styles.title}>{course.title}</h1>
          {course.subtitle && <p className={styles.subtitle}>{course.subtitle}</p>}
          <div className={styles.headerMeta}>
            <span className={styles.metaItem}>
              <PlayCircle size={14} />
              {course.modules.length} recorded classes
            </span>
            <span className={styles.metaItem}>
              <Clock size={14} />
              {course.totalHours}
            </span>
          </div>
        </div>
      </div>

      {/* Modules list */}
      <div className={styles.moduleList}>
        {course.modules.map((module, index) => (
          <div key={module.id} className={styles.moduleCard}>
            <div className={styles.moduleLeft}>
              <span className={styles.moduleIndex}>{index + 1}</span>
              <div className={styles.moduleInfo}>
                <h3 className={styles.moduleTitle}>{module.title}</h3>
                {module.description && (
                  <p className={styles.moduleDescription}>{module.description}</p>
                )}
                <div className={styles.moduleMeta}>
                  <span className={styles.metaItem}>
                    <Calendar size={13} />
                    {module.classDate}
                  </span>
                  <span className={styles.metaItem}>
                    <Clock size={13} />
                    {module.duration}
                  </span>
                  {module.instructor && (
                    <span className={styles.metaItem}>
                      <User size={13} />
                      {module.instructor}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              className={styles.watchBtn}
              onClick={() => setActiveModule(module)}
            >
              <Play size={16} />
              Watch Now
            </button>
          </div>
        ))}
      </div>

      {/* Watch Now modal */}
      {activeModule && (
        <RecordedClassModal
          module={activeModule}
          onClose={() => setActiveModule(null)}
        />
      )}
    </div>
  );
}

// ---------- Modal video player ----------

function RecordedClassModal({
  module,
  onClose,
}: {
  module: RecordedModule;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100 || 0);
    };
    const handleLoadedMetadata = () => setDuration(video.duration);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) video.pause();
    else video.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!wrapRef.current) return;
    if (!document.fullscreenElement) {
      wrapRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
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

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{module.title}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div ref={wrapRef} className={styles.videoWrapper}>
          <video
            ref={videoRef}
            className={styles.videoPlayer}
            src={module.videoUrl}
            onClick={togglePlay}
          />
          <div className={styles.videoControls}>
            <button className={styles.controlBtn} onClick={togglePlay}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <span className={styles.timeDisplay}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className={styles.progressBar} onClick={handleProgressClick}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>

            <button className={styles.controlBtn} onClick={toggleMute}>
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <button className={styles.controlBtn} onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <span className={styles.metaItem}>
            <Calendar size={13} />
            {module.classDate}
          </span>
          <span className={styles.metaItem}>
            <Clock size={13} />
            {module.duration}
          </span>
          {module.instructor && (
            <span className={styles.metaItem}>
              <User size={13} />
              {module.instructor}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}