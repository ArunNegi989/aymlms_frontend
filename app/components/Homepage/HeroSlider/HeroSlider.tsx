"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroSlider.module.css";

type Slide = {
  id: string;
  type: "video" | "image";
  src: string;
  poster?: string;
  eyebrow: string;
  titlePlain: string;
  titleAccent: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  scheduleTitle: string;
  scheduleTime: string;
  scheduleInstructor: string;
};

const SLIDE_DURATION = 6500;

const slides: Slide[] = [
  {
    id: "s1",
    type: "video",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    poster:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "200 HR TEACHER TRAINING",
    titlePlain: "Breathe. Move.",
    titleAccent: "Teach.",
    subtitle:
      "Certified yoga teacher training taught live by real instructors, from anywhere in the world.",
    ctaLabel: "Explore Courses",
    ctaHref: "#all-courses",
    scheduleTitle: "Hatha Foundations",
    scheduleTime: "7:00 AM · Live now",
    scheduleInstructor: "Anjali Rawat",
  },
  {
    id: "s2",
    type: "image",
    src: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "NEW BATCH OPEN",
    titlePlain: "Ayurveda meets",
    titleAccent: "modern practice",
    subtitle:
      "Blend ancient wisdom with a structured, certificate-backed curriculum.",
    ctaLabel: "View Ayurveda Track",
    ctaHref: "#ayurveda",
    scheduleTitle: "Ayurveda Foundations",
    scheduleTime: "Enrolment closes in 4 days",
    scheduleInstructor: "Dr. Meera Nair",
  },
  {
    id: "s3",
    type: "image",
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "LIVE CLASSES DAILY",
    titlePlain: "Learn from instructors",
    titleAccent: "who show up daily",
    subtitle: "Small live batches, real feedback, recordings included.",
    ctaLabel: "Meet Instructors",
    ctaHref: "#instructors",
    scheduleTitle: "Ashtanga Primary Series",
    scheduleTime: "7:00 AM · Today",
    scheduleInstructor: "Rishikesh Yogacharya",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    startRef.current = Date.now() - elapsedRef.current;

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      elapsedRef.current = elapsed;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        setActive((prev) => (prev + 1) % slides.length);
        elapsedRef.current = 0;
        startRef.current = Date.now();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused]);

  const goTo = (index: number) => {
    setActive((index + slides.length) % slides.length);
    setProgress(0);
    elapsedRef.current = 0;
  };

  return (
    <section
      className={styles.hero}
      aria-label="Featured yoga programs"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 3000)}
    >
      {/* Background Stack */}
      <div className={styles.bgStack}>
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`${styles.bgSlide} ${
              index === active ? styles.bgSlideActive : ""
            }`}
            aria-hidden={index !== active}
          >
            {s.type === "video" ? (
              <video
                className={styles.bgMedia}
                src={s.src}
                poster={s.poster}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img className={styles.bgMedia} src={s.src} alt="" />
            )}
          </div>
        ))}
        <div className={styles.scrim} />
        <div className={styles.gradientOverlay} />
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorativeCircle1} />
      <div className={styles.decorativeCircle2} />

      {/* Foreground Content */}
      <div className={styles.inner}>
        <div className={styles.contentBlock} key={`content-${slides[active].id}`}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span className={styles.eyebrowLine} />
            {slides[active].eyebrow}
          </div>

          <h1 className={styles.title}>
            {slides[active].titlePlain}{" "}
            <span className={styles.titleAccent}>
              {slides[active].titleAccent}
            </span>
          </h1>

          <p className={styles.subtitle}>{slides[active].subtitle}</p>

          <div className={styles.ctaRow}>
            <a href={slides[active].ctaHref} className={styles.ctaPrimary}>
              <span>{slides[active].ctaLabel}</span>
              <svg viewBox="0 0 20 20" className={styles.ctaArrow}>
                <line x1="4" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <polyline points="10.5 5 15.5 10 10.5 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button className={styles.ctaSecondary} type="button">
              <span className={styles.playIcon}>
                <svg viewBox="0 0 24 24" className={styles.playSvg}>
                  <polygon points="5,3 19,12 5,21" fill="currentColor" />
                </svg>
              </span>
              <span>Watch a class</span>
            </button>
          </div>
        </div>

        {/* Floating Schedule Card */}
        <div
          className={styles.scheduleCard}
          key={`schedule-${slides[active].id}`}
        >
          <span className={styles.liveDot} />
          <div className={styles.scheduleText}>
            <p className={styles.scheduleTitle}>
              {slides[active].scheduleTitle}
            </p>
            <p className={styles.scheduleMeta}>
              {slides[active].scheduleInstructor} · {slides[active].scheduleTime}
            </p>
          </div>
          <button className={styles.joinMiniBtn} type="button">
            Join Now
          </button>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          <div className={styles.statChip}>
            <span className={styles.statIcon}>👥</span>
            <strong>12,000+</strong> students trained
          </div>
          <div className={styles.statChip}>
            <span className={styles.statIcon}>⭐</span>
            <strong>4.8 ★</strong> average rating
          </div>
          <div className={styles.statChip}>
            <span className={styles.statIcon}>📚</span>
            <strong>150+</strong> live classes / month
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.rail}>
            {slides.map((s, index) => (
              <button
                key={s.id}
                className={`${styles.railItem} ${
                  index === active ? styles.railItemActive : ""
                }`}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === active}
                type="button"
              >
                <span className={styles.railNum}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.railBar}>
                  <span
                    className={styles.railFill}
                    style={{
                      width:
                        index < active
                          ? "100%"
                          : index === active
                          ? `${progress}%`
                          : "0%",
                    }}
                  />
                </span>
              </button>
            ))}
          </div>

          <div className={styles.arrowGroup}>
            <button
              className={styles.navBtn}
              onClick={() => goTo(active - 1)}
              aria-label="Previous slide"
              type="button"
            >
              <svg viewBox="0 0 20 20" className={styles.navIcon}>
                <polyline points="13 4 7 10 13 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className={styles.navBtn}
              onClick={() => goTo(active + 1)}
              aria-label="Next slide"
              type="button"
            >
              <svg viewBox="0 0 20 20" className={styles.navIcon}>
                <polyline points="7 4 13 10 7 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}