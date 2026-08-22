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
  badgeTitle: string;
  badgeSubtitle: string;
  joinedStat: string;
};

const SLIDE_DURATION = 6000;

const slides: Slide[] = [
  {
    id: "s1",
    type: "video",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    poster:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
    eyebrow: "200 HR TEACHER TRAINING",
    titlePlain: "Breathe. Move.",
    titleAccent: "Teach.",
    subtitle:
      "Certified yoga teacher training taught live by real instructors, from anywhere.",
    ctaLabel: "Explore Courses",
    ctaHref: "#all-courses",
    badgeTitle: "Live now · Hatha Foundations",
    badgeSubtitle: "Anjali Rawat · 7:00 AM batch",
    joinedStat: "340+ joined this week",
  },
  {
    id: "s2",
    type: "image",
    src: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1200&auto=format&fit=crop",
    eyebrow: "NEW BATCH OPEN",
    titlePlain: "Ayurveda meets",
    titleAccent: "modern practice",
    subtitle:
      "Blend ancient wisdom with a structured, certificate-backed curriculum.",
    ctaLabel: "View Ayurveda Track",
    ctaHref: "#ayurveda",
    badgeTitle: "New · Ayurveda Foundations",
    badgeSubtitle: "Enrollment closes in 4 days",
    joinedStat: "180+ enrolled this month",
  },
  {
    id: "s3",
    type: "image",
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    eyebrow: "LIVE CLASSES DAILY",
    titlePlain: "Learn from instructors",
    titleAccent: "who show up daily",
    subtitle: "Small live batches, real feedback, recordings included.",
    ctaLabel: "Meet Instructors",
    ctaHref: "#instructors",
    badgeTitle: "Today · Ashtanga Primary Series",
    badgeSubtitle: "Rishikesh Yogacharya · 7:00 AM",
    joinedStat: "12,000+ students trained",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  const runTimer = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = Date.now() - elapsedRef.current;

    const tick = () => {
      if (paused) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
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
  };

  useEffect(() => {
    runTimer();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  const goTo = (index: number) => {
    setActive((index + slides.length) % slides.length);
    setProgress(0);
    elapsedRef.current = 0;
    runTimer();
  };

  const slide = slides[active];

  return (
    <section
      className={styles.hero}
      aria-label="Featured yoga programs"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.grid}>
        {/* ---------- Left: content ---------- */}
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {slide.eyebrow}
          </span>

          <div className={styles.titleWrap}>
            <h1 className={styles.title} key={`title-${slide.id}`}>
              {slide.titlePlain}{" "}
              <span className={styles.titleAccent}>{slide.titleAccent}</span>
            </h1>
          </div>

          <p className={styles.subtitle} key={`sub-${slide.id}`}>
            {slide.subtitle}
          </p>

          <div className={styles.ctaRow}>
            <a href={slide.ctaHref} className={styles.ctaPrimary}>
              {slide.ctaLabel}
              <span className={styles.ctaArrow}>&rarr;</span>
            </a>
            <button className={styles.ctaSecondary}>
              <span className={styles.playIcon}>&#9654;</span>
              Watch a class
            </button>
          </div>

          {/* signature: rhythm rail replaces generic progress dots */}
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

          <div className={styles.statsRow}>
            <span className={styles.statChip}>
              <strong>12,000+</strong> students trained
            </span>
            <span className={styles.statChip}>
              <strong>4.8 ★</strong> average rating
            </span>
            <span className={styles.statChip}>
              <strong>150+</strong> live classes / month
            </span>
          </div>
        </div>

        {/* ---------- Right: media card ---------- */}
        <div className={styles.mediaCol}>
          <div className={styles.mediaCard}>
            <div className={styles.mediaFrame} key={slide.id}>
              {slide.type === "video" ? (
                <video
                  className={styles.media}
                  src={slide.src}
                  poster={slide.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img className={styles.media} src={slide.src} alt="" />
              )}
            </div>

            <div className={styles.mediaScrim} />

            <button
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={() => goTo(active - 1)}
              aria-label="Previous slide"
            >
              &#8249;
            </button>
            <button
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={() => goTo(active + 1)}
              aria-label="Next slide"
            >
              &#8250;
            </button>

            <div className={styles.badgeBottom}>
              <span className={styles.liveDot} />
              <div className={styles.badgeBottomText}>
                <p className={styles.badgeBottomTitle}>{slide.badgeTitle}</p>
                <p className={styles.badgeBottomSubtitle}>
                  {slide.badgeSubtitle}
                </p>
              </div>
              <button className={styles.joinMiniBtn}>Join</button>
            </div>
          </div>

          <div className={styles.badgeTop}>
            <div className={styles.avatarStack}>
              <span className={styles.avatarDot} />
              <span className={styles.avatarDot} />
              <span className={styles.avatarDot} />
            </div>
            <span className={styles.badgeTopValue}>{slide.joinedStat}</span>
          </div>
        </div>
      </div>
    </section>
  );
}