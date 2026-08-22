"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Testimonials.module.css";

type Testimonial = {
  id: string;
  name: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
  course: string;
};

const testimonials: Testimonial[] = [
  {
    id: "r1",
    name: "Priya Sharma",
    location: "Dehradun",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    quote:
      "The live classes made all the difference — I finally got my alignment corrected in real time instead of guessing from a video.",
    rating: 5,
    course: "Hatha Foundations",
  },
  {
    id: "r2",
    name: "Vikram Mehta",
    location: "Delhi",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    quote:
      "Completed the 200-hour training here. The instructors actually know your name and your practice by week two.",
    rating: 5,
    course: "200 HR Teacher Training",
  },
  {
    id: "r3",
    name: "Ananya Bhatt",
    location: "Haridwar",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
    quote:
      "The Ayurveda module tied everything together in a way no other yoga course I'd tried had done before.",
    rating: 4,
    course: "Ayurveda Foundations",
  },
];

const AUTOPLAY_DELAY = 5000; // ms

const photoVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
    scale: 0.96,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    scale: 0.96,
  }),
};

const quoteVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: 18,
    x: direction > 0 ? 24 : -24,
  }),
  center: {
    opacity: 1,
    y: 0,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: -14,
    x: direction > 0 ? -24 : 24,
  }),
};

export default function Testimonials() {
  const [[active, direction], setActiveState] = useState<[number, number]>([0, 1]);
  const [isPaused, setIsPaused] = useState(false);
  const canHoverRef = useRef(true);

  const current = testimonials[active];

  // Detect if the device actually supports hover (desktop/mouse).
  // On touch devices we never want hover-pause to get "stuck" true.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    canHoverRef.current = mq.matches;
  }, []);

  function goTo(index: number) {
    setActiveState(([prevActive]) => {
      const dir = index > prevActive ? 1 : index < prevActive ? -1 : 1;
      return [index, dir];
    });
  }

  function handlePointerEnter() {
    if (canHoverRef.current) setIsPaused(true);
  }

  function handlePointerLeave() {
    if (canHoverRef.current) setIsPaused(false);
  }

  useEffect(() => {
    if (isPaused) return;

    const id = setInterval(() => {
      setActiveState(([prevActive]) => [
        (prevActive + 1) % testimonials.length,
        1,
      ]);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(id);
  }, [isPaused, active]);

  return (
    <section
      className={styles.section}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.header}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          STUDENT STORIES
        </span>
        <span className={styles.counter}>
          {String(active + 1).padStart(2, "0")}
          <span className={styles.counterSlash}>/</span>
          {String(testimonials.length).padStart(2, "0")}
        </span>
      </div>

      <div className={styles.stage}>
        {/* ---------- Left: photo ---------- */}
        <div className={styles.photoCol}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              className={styles.photoShape}
              custom={direction}
              variants={photoVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={current.image}
                alt={current.name}
                className={styles.photo}
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`badge-${current.id}`}
              className={styles.ratingBadge}
              custom={direction}
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 10, x: "-50%" }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.ratingStars}>
                {"★".repeat(current.rating)}
                {"☆".repeat(5 - current.rating)}
              </span>
              <span className={styles.ratingCourse}>{current.course}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---------- Right: quote ---------- */}
        <div className={styles.quoteCol}>
          <span className={styles.quoteMark}>&ldquo;</span>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={quoteVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className={styles.quote}>{current.quote}</p>
              <div className={styles.person}>
                <span className={styles.personLine} />
                <div>
                  <p className={styles.name}>{current.name}</p>
                  <p className={styles.location}>{current.location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ---------- Bottom: name-tab switcher ---------- */}
      <div className={styles.tabRow}>
        {testimonials.map((t, index) => (
          <button
            key={t.id}
            className={`${styles.tab} ${
              index === active ? styles.tabActive : ""
            }`}
            onClick={() => goTo(index)}
            aria-current={index === active}
            type="button"
          >
            <span className={styles.tabName}>{t.name}</span>
            <span className={styles.tabLoc}>{t.location}</span>
            {index === active && (
              <motion.span
                layoutId="tabUnderline"
                className={styles.tabUnderline}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}