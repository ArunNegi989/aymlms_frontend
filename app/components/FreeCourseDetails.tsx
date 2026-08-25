// File: FreeCourseDetails.tsx
"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClock, FaBook, FaUser, FaStar, FaPlay, FaCheck, FaLock,
  FaTimes, FaChevronDown, FaOm, FaArrowLeft,
} from "react-icons/fa";
import { freeCourses, getCourseById, YogaLesson } from "../data/freeCourses";
import styles from "./FreeCourseDetails.module.css";

// ===== PROGRESS STORAGE HELPERS =====
const PROGRESS_KEY_PREFIX = "aym-free-course-progress:";

const loadProgress = (courseId: string): Record<string, boolean> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY_PREFIX + courseId);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveProgress = (courseId: string, progress: Record<string, boolean>) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PROGRESS_KEY_PREFIX + courseId, JSON.stringify(progress));
  } catch {
    /* ignore quota errors */
  }
};

// ===== YOUTUBE HELPER =====
// Detects youtu.be / youtube.com links and returns an embeddable URL.
// Returns null for regular video files (.mp4 etc.) so those keep using <video>.
const getYouTubeEmbedUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    let videoId: string | null = null;

    if (parsed.hostname === "youtu.be") {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/embed/")[1];
      }
    }

    if (!videoId) return null;
    // Strip any trailing query params off the id itself (e.g. from /embed/xyz?...)
    videoId = videoId.split("?")[0].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  } catch {
    return null;
  }
};

// ===== MAIN COMPONENT =====
const FreeCourseDetails: React.FC = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const courseId = params?.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<YogaLesson | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const course = useMemo(() => getCourseById(courseId), [courseId]);

  // Simulate a brief load + hydrate progress from localStorage
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (course) {
        setCompleted(loadProgress(course.id));
        setOpenModuleId(course.modules[0]?.id ?? null);
      }
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [course]);

  // ESC closes whichever modal is open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setActiveLesson(null);
      setShowCompletionModal(false);
      setShowLockedModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const totalLessons = useMemo(
    () => course?.modules.reduce((acc, m) => acc + m.lessons.length, 0) ?? 0,
    [course]
  );

  const completedCount = useMemo(
    () => Object.values(completed).filter(Boolean).length,
    [completed]
  );

  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const handleLessonClick = useCallback(
    (lesson: YogaLesson) => {
      if (!lesson.isFree && !completed[lesson.id]) {
        setShowLockedModal(true);
        return;
      }
      setActiveLesson(lesson);
    },
    [completed]
  );

  const handleVideoComplete = useCallback(() => {
    if (!activeLesson || !course) return;
    const next = { ...completed, [activeLesson.id]: true };
    setCompleted(next);
    saveProgress(course.id, next);
    setActiveLesson(null);
    setShowCompletionModal(true);
  }, [activeLesson, completed, course]);

  const lessonState = (lesson: YogaLesson): "completed" | "free" | "locked" => {
    if (completed[lesson.id]) return "completed";
    if (lesson.isFree) return "free";
    return "locked";
  };

  const activeEmbedUrl = activeLesson ? getYouTubeEmbedUrl(activeLesson.videoUrl) : null;

  // ===== LOADING STATE =====
  if (isLoading) {
    return (
      <div className={styles.stateContainer}>
        <div className={styles.spinner} aria-label="Loading course" />
        <p>Loading your practice...</p>
      </div>
    );
  }

  // ===== INVALID COURSE STATE =====
  if (!course) {
    return (
      <div className={styles.stateContainer}>
        <span className={styles.stateIcon}>🧘</span>
        <h2>Course Not Found</h2>
        <p>The yoga course you're looking for may have been removed or is currently unavailable.</p>
        <Link href="/free-courses" className={styles.primaryBtn}>
          Explore Free Yoga Courses
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src={course.thumbnail} alt="" aria-hidden="true" />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroInner}>
          <Link href="/free-courses" className={styles.backLink}>
            <FaArrowLeft /> Back to Free Courses
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.freeCourseBadge}>🎓 Free Course</span>
            <h1 className={styles.heroTitle}>{course.title}</h1>
            <p className={styles.heroDescription}>{course.description}</p>

            <div className={styles.heroMeta}>
              <span><FaOm /> {course.yogaStyle}</span>
              <span><FaUser /> {course.level}</span>
              <span><FaClock /> {course.duration}</span>
              <span><FaBook /> {course.modules.length} Modules</span>
              <span>🧘 {totalLessons} Lessons</span>
              {course.rating && (
                <span><FaStar className={styles.starIcon} /> {course.rating} ({course.students?.toLocaleString()})</span>
              )}
            </div>

            <div className={styles.heroInstructor}>
              {course.instructorImage && <img src={course.instructorImage} alt={course.instructor} />}
              <span>Taught by <strong>{course.instructor}</strong></span>
            </div>

            <button
              className={styles.startClassBtn}
              onClick={() => {
                const firstFree = course.modules.flatMap((m) => m.lessons).find((l) => l.isFree);
                if (firstFree) handleLessonClick(firstFree);
              }}
            >
              <FaPlay /> Start Free Class
            </button>
          </motion.div>
        </div>
      </section>

      <div className={styles.contentLayout}>
        {/* ===== MAIN COLUMN ===== */}
        <div className={styles.mainColumn}>
          {/* ABOUT */}
          <section className={styles.section}>
            <h2>About This Course</h2>
            <p className={styles.aboutText}>
              This introductory course is designed to help you establish a mindful yoga practice.
              Explore {course.yogaStyle.toLowerCase()} techniques, breathing awareness and relaxation
              practices while developing a deeper connection between body, breath and mind.
            </p>
          </section>

          {/* WHAT YOU WILL LEARN */}
          {course.learningOutcomes && course.learningOutcomes.length > 0 && (
            <section className={styles.section}>
              <h2>What You Will Learn</h2>
              <div className={styles.outcomesGrid}>
                {course.learningOutcomes.map((outcome, i) => (
                  <motion.div
                    key={i}
                    className={styles.outcomeCard}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <FaCheck className={styles.outcomeIcon} />
                    <span>{outcome}</span>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* WHO THIS COURSE IS FOR */}
          {course.targetAudience && (
            <section className={styles.section}>
              <h2>Who This Course Is For</h2>
              <p className={styles.aboutText}>{course.targetAudience}</p>
            </section>
          )}

          {/* COURSE CONTENT / ACCORDION */}
          <section className={styles.section}>
            <h2>Course Curriculum</h2>
            <div className={styles.accordion}>
              {course.modules.map((module, mi) => {
                const isOpen = openModuleId === module.id;
                return (
                  <div key={module.id} className={styles.accordionItem}>
                    <button
                      className={styles.accordionHeader}
                      onClick={() => setOpenModuleId(isOpen ? null : module.id)}
                      aria-expanded={isOpen}
                      aria-controls={`module-panel-${module.id}`}
                    >
                      <span className={styles.moduleNumber}>{String(mi + 1).padStart(2, "0")}</span>
                      <span className={styles.moduleTitle}>{module.title}</span>
                      <motion.span
                        className={styles.chevron}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`module-panel-${module.id}`}
                          className={styles.accordionPanel}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                        >
                          <ul className={styles.lessonList}>
                            {module.lessons.map((lesson) => {
                              const state = lessonState(lesson);
                              return (
                                <li key={lesson.id}>
                                  <button
                                    className={`${styles.lessonRow} ${styles[state]}`}
                                    onClick={() => handleLessonClick(lesson)}
                                    aria-label={`${lesson.title} — ${state}`}
                                  >
                                    <span className={styles.lessonIcon}>
                                      {state === "completed" && <FaCheck />}
                                      {state === "free" && <FaPlay />}
                                      {state === "locked" && <FaLock />}
                                    </span>
                                    <span className={styles.lessonTitle}>{lesson.title}</span>
                                    <span className={styles.lessonDuration}>{lesson.duration}</span>
                                    <span className={styles.lessonStateLabel}>
                                      {state === "completed" && "Completed"}
                                      {state === "free" && "Free Lesson"}
                                      {state === "locked" && "Unlock Course"}
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ===== SIDEBAR ===== */}
        <aside className={styles.sidebar}>
          <div className={styles.progressCard}>
            <h3>Your Practice Progress</h3>
            <div className={styles.progressBarTrack}>
              <motion.div
                className={styles.progressBarFill}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <p className={styles.progressLabel}>
              {progressPercent}% — {completedCount} of {totalLessons} lessons completed
            </p>
            <button className={styles.unlockSidebarBtn} onClick={() => setShowLockedModal(true)}>
              Unlock Full Course
            </button>
          </div>

          {course.benefits && (
            <div className={styles.benefitsCard}>
              <h3>What's Included</h3>
              <ul>
                {course.benefits.map((b, i) => (
                  <li key={i}><FaCheck className={styles.outcomeIcon} /> {b}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* ===== VIDEO PLAYER MODAL ===== */}
      <AnimatePresence>
        {activeLesson && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLesson(null)}
          >
            <motion.div
              className={styles.videoModal}
              role="dialog"
              aria-modal="true"
              aria-label={activeLesson.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.videoModalHeader}>
                <div>
                  <h3>{activeLesson.title}</h3>
                  <span>{activeLesson.duration}</span>
                </div>
                <button
                  className={styles.closeBtn}
                  onClick={() => setActiveLesson(null)}
                  aria-label="Close video player"
                >
                  <FaTimes />
                </button>
              </div>
              <div className={styles.videoWrapper}>
                {activeEmbedUrl ? (
                  <iframe
                    key={activeLesson.id}
                    src={activeEmbedUrl}
                    title={activeLesson.title}
                    className={styles.videoPlayer}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    key={activeLesson.id}
                    src={activeLesson.videoUrl}
                    controls
                    preload="auto"
                    playsInline
                    onEnded={handleVideoComplete}
                    onError={(e) => console.error("Video failed to load:", e.currentTarget.error)}
                    className={styles.videoPlayer}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              {activeEmbedUrl && (
                <div className={styles.videoModalFooter}>
                  <button className={styles.primaryBtn} onClick={handleVideoComplete}>
                    Mark Practice Complete
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== COMPLETION MODAL ===== */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCompletionModal(false)}
          >
            <motion.div
              className={styles.compactModal}
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Practice Complete 🌿</h3>
              <p>Beautiful work. You have completed this free practice. Continue your journey by unlocking the complete course.</p>
              <div className={styles.compactModalActions}>
                <button
                  className={styles.primaryBtn}
                  onClick={() => {
                    setShowCompletionModal(false);
                    setShowLockedModal(true);
                  }}
                >
                  Unlock Full Course
                </button>
                <button className={styles.ghostBtn} onClick={() => setShowCompletionModal(false)}>
                  Continue Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== LOCKED LESSON / PURCHASE MODAL ===== */}
      <AnimatePresence>
        {showLockedModal && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLockedModal(false)}
          >
            <motion.div
              className={styles.purchaseModal}
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setShowLockedModal(false)}
                aria-label="Close"
              >
                <FaTimes />
              </button>
              <div className={styles.lockIconWrap}>
                <FaLock />
              </div>
              <h3>Continue Your Yoga Journey</h3>
              <p className={styles.purchaseCourseTitle}>{course.title}</p>
              <p>
                You've completed the available free practice. Unlock the full course to continue
                exploring the complete sequence, guided lessons and deeper practices.
              </p>
              <ul className={styles.purchaseBenefits}>
                {(course.benefits ?? []).map((b, i) => (
                  <li key={i}><FaCheck className={styles.outcomeIcon} /> {b}</li>
                ))}
              </ul>
              {course.price && (
                <div className={styles.priceRow}>
                  <span className={styles.priceNow}>₹{course.price}</span>
                  {course.originalPrice && (
                    <>
                      <span className={styles.priceOriginal}>₹{course.originalPrice}</span>
                      <span className={styles.priceDiscount}>
                        {Math.round(100 - (course.price / course.originalPrice) * 100)}% off
                      </span>
                    </>
                  )}
                </div>
              )}
              <div className={styles.compactModalActions}>
                <button className={styles.primaryBtn}>Unlock Full Course</button>
                <button className={styles.ghostBtn} onClick={() => setShowLockedModal(false)}>
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FreeCourseDetails;