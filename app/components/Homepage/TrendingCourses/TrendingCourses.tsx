// TrendingCourses.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./TrendingCourses.module.css";

type Course = {
  id: string;
  title: string;
  instructor: string;
  image: string;
  rating: number;
  students: string;
  price: number;
  originalPrice: number;
  nextBatch: string;
  hours: string;
  description: string;
  bullets: string[];
};

const courses: Course[] = [
  {
    id: "c1",
    title: "200-Hour Yoga Teacher Training (Yoga Alliance Certified)",
    instructor: "Rishikesh Yogacharya, AYM Faculty",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=700&auto=format&fit=crop",
    rating: 4.8,
    students: "12,400",
    price: 24999,
    originalPrice: 39999,
    nextBatch: "10 Sept 2026",
    hours: "200 total hours",
    description:
      "Live-taught 200-hour YTT covering asana, anatomy, philosophy and teaching methodology.",
    bullets: [
      "Live daily classes with certified instructors",
      "Yoga Alliance recognised certification",
      "Recordings included for every session",
    ],
  },
  {
    id: "c2",
    title: "Ayurveda Foundations: Diet, Doshas & Daily Practice",
    instructor: "Dr. Meera Kulkarni, Ayurveda Physician",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=700&auto=format&fit=crop",
    rating: 4.7,
    students: "6,120",
    price: 5999,
    originalPrice: 9999,
    nextBatch: "3 Sept 2026",
    hours: "24 total hours",
    description:
      "Understand your dosha and build a daily Ayurvedic routine backed by classical texts.",
    bullets: [
      "Dosha assessment and personalised guidance",
      "Seasonal diet and routine planning",
      "Certificate on completion",
    ],
  },
  {
    id: "c3",
    title: "Ashtanga Primary Series: Foundations to Flow",
    instructor: "Anjali Rawat, Senior Instructor",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=700&auto=format&fit=crop",
    rating: 4.8,
    students: "9,850",
    price: 7999,
    originalPrice: 12999,
    nextBatch: "1 Sept 2026",
    hours: "30 total hours",
    description:
      "Build strength and breath control through the traditional Ashtanga primary sequence.",
    bullets: [
      "Live 7:00 AM batches, small group size",
      "Modifications for every experience level",
      "Weekly 1:1 feedback calls",
    ],
  },
  {
    id: "c4",
    title: "Prenatal Yoga: Safe Practice Through Every Trimester",
    instructor: "Kavita Sharma, Prenatal Specialist",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=700&auto=format&fit=crop",
    rating: 4.9,
    students: "4,310",
    price: 4999,
    originalPrice: 7999,
    nextBatch: "8 Sept 2026",
    hours: "18 total hours",
    description:
      "Trimester-specific sequences designed with obstetric guidance for a safe practice.",
    bullets: [
      "Trimester-wise class plans",
      "Doctor-reviewed sequencing",
      "Private community for new mothers",
    ],
  },
  {
    id: "c5",
    title: "Meditation & Pranayama: A 21-Day Reset",
    instructor: "Suresh Bhatt, Meditation Teacher",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=700&auto=format&fit=crop&sat=-100",
    rating: 4.8,
    students: "7,540",
    price: 3999,
    originalPrice: 6499,
    nextBatch: "5 Sept 2026",
    hours: "14 total hours",
    description:
      "A guided 21-day breathwork and meditation sequence to build a lasting daily practice.",
    bullets: [
      "Daily 20-minute guided live sessions",
      "Breathwork techniques from classical texts",
      "Private practice tracker included",
    ],
  },
  {
    id: "c6",
    title: "Yin Yoga: Deep Stretch & Restorative Flow",
    instructor: "Priya Menon, Senior Instructor",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=700&auto=format&fit=crop&sat=-40",
    rating: 4.7,
    students: "5,290",
    price: 4499,
    originalPrice: 7499,
    nextBatch: "12 Sept 2026",
    hours: "16 total hours",
    description:
      "Long-held, restorative postures designed to release deep tension and calm the mind.",
    bullets: [
      "Slow-paced, prop-supported sequences",
      "Ideal after long work hours or travel",
      "Evening batches, live + recorded",
    ],
  },
  {
    id: "c7",
    title: "300-Hour Advanced Yoga Teacher Training",
    instructor: "Rishikesh Yogacharya, AYM Faculty",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=700&auto=format&fit=crop&sat=-30",
    rating: 4.9,
    students: "3,180",
    price: 34999,
    originalPrice: 54999,
    nextBatch: "15 Oct 2026",
    hours: "300 total hours",
    description:
      "For 200-hour graduates ready to deepen practice and teaching across advanced sequences.",
    bullets: [
      "Advanced asana, adjustments and sequencing",
      "Yoga therapy and subtle body anatomy",
      "Mentored teaching practicum included",
    ],
  },
  {
    id: "c8",
    title: "Kids Yoga Instructor Certification",
    instructor: "Neha Kapoor, Child Yoga Specialist",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=700&auto=format&fit=crop&sat=-20",
    rating: 4.6,
    students: "2,470",
    price: 6999,
    originalPrice: 10999,
    nextBatch: "20 Sept 2026",
    hours: "20 total hours",
    description:
      "Learn to design playful, age-appropriate yoga sessions for children aged 4 to 12.",
    bullets: [
      "Games, storytelling and breath-play techniques",
      "Classroom management for group sessions",
      "Certificate accepted by partner schools",
    ],
  },
];

function StarIcon() {
  return (
    <svg className={styles.starIcon} viewBox="0 0 20 20">
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.2-5.4 3.2 1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 20 20">
      <polyline points="4 10.5 8 14.5 16 5.5" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`${styles.chevronIcon} ${open ? styles.chevronOpen : ""}`}
      viewBox="0 0 20 20"
    >
      <polyline points="5 7.5 10 12.5 15 7.5" />
    </svg>
  );
}

const POPOVER_WIDTH = 336;
const POPOVER_MARGIN = 16;
const GAP = 24;
const AUTOPLAY_MS = 3500;
const TRANSITION_MS = 420;
const MOBILE_BREAKPOINT = 680;
const TAP_MOVE_TOLERANCE = 10;

type PopoverState = {
  course: Course;
  top: number;
  left: number;
  flipped: boolean;
};

// How many cards are visible at once, per breakpoint.
function getCardsPerView(width: number) {
  if (width >= 1280) return 4;
  if (width >= 980) return 3;
  if (width >= MOBILE_BREAKPOINT) return 2;
  return 1;
}

export default function TrendingCourses() {
  const [popover, setPopover] = useState<PopoverState | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [cardsPerView, setCardsPerView] = useState(4);
  const [cardWidth, setCardWidth] = useState(0);
  const [withTransition, setWithTransition] = useState(true);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchMoved = useRef(false);

  // Infinite loop: clone the full list before and after itself, so there's
  // always a full buffer of real-looking cards on either side of the
  // visible viewport, no matter how many are shown at once.
  const CLONE = courses.length;
  const slides = useMemo(() => [...courses, ...courses, ...courses], []);
  const [index, setIndex] = useState(CLONE); // start at the first "real" copy

  useEffect(() => setMounted(true), []);

  // Recalculate cardsPerView + pixel card width + mobile flag on mount/resize.
  const recalc = useCallback(() => {
    const width = window.innerWidth;
    const perView = getCardsPerView(width);
    setCardsPerView(perView);
    setIsMobile(width < MOBILE_BREAKPOINT);

    const viewportWidth = viewportRef.current?.offsetWidth ?? 0;
    if (viewportWidth) {
      const w = (viewportWidth - GAP * (perView - 1)) / perView;
      setCardWidth(w);
    }
  }, []);

  useEffect(() => {
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [recalc]);

  // Re-measure after fonts/images settle and after expand/collapse changes
  // card heights (doesn't affect width, but keeps things accurate on rotate).
  useEffect(() => {
    const id = requestAnimationFrame(recalc);
    return () => cancelAnimationFrame(id);
  }, [recalc, expandedId]);

  const next = useCallback(() => {
    setWithTransition(true);
    setIndex((i) => i + 1);
  }, []);
  const prev = useCallback(() => {
    setWithTransition(true);
    setIndex((i) => i - 1);
  }, []);

  // Silently snap back into the middle copy once we drift into a clone set,
  // so the loop feels endless with no visible jump.
  const handleTransitionEnd = () => {
    if (index >= CLONE * 2) {
      setWithTransition(false);
      setIndex((i) => i - CLONE);
    } else if (index < CLONE) {
      setWithTransition(false);
      setIndex((i) => i + CLONE);
    }
  };

  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  // Autoplay, paused on hover / while a popover is open / while a mobile
  // card is expanded (so the user isn't reading and the card yanked away).
  useEffect(() => {
    if (isHovering || popover || expandedId) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isHovering, popover, expandedId, next]);

  // Collapse any expanded mobile card whenever the slide changes.
  useEffect(() => {
    setExpandedId(null);
  }, [index]);

  const activeDot = ((index % CLONE) + CLONE) % CLONE;
  const goToDot = (dotIndex: number) => {
    setWithTransition(true);
    setIndex(CLONE + dotIndex);
  };

  // ---- touch: swipe to change slide, tap to expand (mobile only) ----
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    touchMoved.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = Math.abs(e.touches[0].clientX - touchStart.current.x);
    const dy = Math.abs(e.touches[0].clientY - touchStart.current.y);
    if (dx > TAP_MOVE_TOLERANCE || dy > TAP_MOVE_TOLERANCE) {
      touchMoved.current = true;
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const delta = e.changedTouches[0].clientX - touchStart.current.x;
    if (touchMoved.current) {
      if (delta > 45) prev();
      else if (delta < -45) next();
    }
    touchStart.current = null;
  };

  const handleCardTap = (course: Course, slideKey: string) => {
    if (!isMobile) return;
    // A real swipe shouldn't also toggle the card open/closed.
    if (touchMoved.current) return;
    setExpandedId((cur) => (cur === slideKey ? null : slideKey));
  };

  // ---- desktop hover popover (unchanged behaviour, disabled on mobile) ----
  useEffect(() => {
    if (!popover || !popoverRef.current) return;
    const rect = popoverRef.current.getBoundingClientRect();
    let { top, left } = popover;
    let changed = false;

    if (rect.bottom > window.innerHeight - POPOVER_MARGIN) {
      top = Math.max(POPOVER_MARGIN, window.innerHeight - POPOVER_MARGIN - rect.height);
      changed = true;
    }
    if (rect.right > window.innerWidth - POPOVER_MARGIN) {
      left = Math.max(POPOVER_MARGIN, window.innerWidth - POPOVER_MARGIN - rect.width);
      changed = true;
    }
    if (changed) setPopover((prev) => (prev ? { ...prev, top, left } : prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popover?.course.id]);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setPopover(null), 120);
  };
  const openPopover = (course: Course, cardEl: HTMLElement) => {
    if (isMobile) return;
    clearCloseTimer();
    const rect = cardEl.getBoundingClientRect();
    const spaceOnRight = window.innerWidth - rect.right;
    const flipped = spaceOnRight < POPOVER_WIDTH + 40;
    const left = flipped ? rect.left - POPOVER_WIDTH + 44 : rect.right - 44;
    const top = rect.top - 14;
    setPopover({ course, top, left, flipped });
  };
  const handleMouseLeave = () => {
    if (isMobile) return;
    scheduleClose();
  };

  useEffect(() => {
    if (!popover) return;
    const closeNow = () => setPopover(null);
    window.addEventListener("scroll", closeNow, { passive: true });
    window.addEventListener("resize", closeNow);
    return () => {
      window.removeEventListener("scroll", closeNow);
      window.removeEventListener("resize", closeNow);
    };
  }, [popover]);

  const translateX = cardWidth ? -(index * (cardWidth + GAP)) : 0;

  return (
    <section className={styles.section} aria-label="AYM Yoga School courses">
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Trending Courses</h2>
      </div>

      <div
        className={styles.carouselWrap}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className={styles.viewport}
          ref={viewportRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={styles.track}
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(${translateX}px)`,
              transition: withTransition
                ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
              alignItems: "flex-start",
            }}
          >
            {slides.map((course, i) => {
              const slideKey = `${course.id}-${i}`;
              const isExpanded = isMobile && expandedId === slideKey;
              return (
                <div
                  key={slideKey}
                  className={`${styles.cardWrap} ${
                    popover?.course.id === course.id && !isMobile
                      ? styles.isHovered
                      : ""
                  }`}
                  style={{ width: cardWidth ? `${cardWidth}px` : undefined }}
                  onMouseEnter={(e) => openPopover(course, e.currentTarget)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleCardTap(course, slideKey)}
                >
                  <article
                    className={`${styles.card} ${
                      isExpanded ? styles.cardExpanded : ""
                    }`}
                  >
                    <div className={styles.thumbWrap}>
                      <img
                        className={styles.thumb}
                        src={course.image}
                        alt={course.title}
                        draggable={false}
                      />
                      <span className={styles.thumbScrim} />
                    </div>
                    <div className={styles.body}>
                      <h3 className={styles.title}>{course.title}</h3>
                      <p className={styles.instructor}>{course.instructor}</p>
                      <div className={styles.metaRow}>
                        <span className={styles.badge}>Bestseller</span>
                        <span className={styles.rating}>
                          <StarIcon />
                          {course.rating}
                        </span>
                        <span className={styles.studentsCount}>
                          {course.students} students
                        </span>
                      </div>
                      <div className={styles.priceRow}>
                        <span className={styles.price}>
                          ₹{course.price.toLocaleString("en-IN")}
                        </span>
                        <span className={styles.originalPrice}>
                          ₹{course.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Mobile-only: tap-to-expand affordance + inline details */}
                      {isMobile && (
                        <>
                          <button
                            type="button"
                            className={styles.detailsToggle}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardTap(course, slideKey);
                            }}
                            aria-expanded={isExpanded}
                          >
                            {isExpanded ? "Hide details" : "View details"}
                            <ChevronIcon open={isExpanded} />
                          </button>

                          <div
                            className={styles.expandPanel}
                            style={{
                              maxHeight: isExpanded ? "600px" : "0px",
                            }}
                          >
                            <div className={styles.expandInner}>
                              <p className={styles.popoverSub}>
                                {course.hours} · All Levels · Live + Recorded
                              </p>
                              <p className={styles.popoverDesc}>
                                {course.description}
                              </p>
                              <ul className={styles.bulletList}>
                                {course.bullets.map((bullet) => (
                                  <li key={bullet}>
                                    <CheckIcon />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                              <p className={styles.nextBatch}>
                                Next batch{" "}
                                <strong>{course.nextBatch}</strong>
                              </p>
                              <button
                                className={styles.enrollBtn}
                                onClick={(e) => e.stopPropagation()}
                              >
                                Enroll Now
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={prev}
          aria-label="Previous courses"
        >
          &#8249;
        </button>
        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={next}
          aria-label="Next courses"
        >
          &#8250;
        </button>

        <div className={styles.dots}>
          {courses.map((c, i) => (
            <button
              key={c.id}
              className={`${styles.dot} ${i === activeDot ? styles.dotActive : ""}`}
              onClick={() => goToDot(i)}
              aria-label={`Go to ${c.title}`}
            />
          ))}
        </div>
      </div>

      {mounted &&
        popover &&
        !isMobile &&
        createPortal(
          <div
            ref={popoverRef}
            className={styles.popover}
            style={{ top: popover.top, left: popover.left }}
            role="dialog"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
          >
            <span
              className={`${styles.popoverArrow} ${
                popover.flipped ? styles.arrowRight : styles.arrowLeft
              }`}
            />
            <h4 className={styles.popoverTitle}>{popover.course.title}</h4>
            <div className={styles.popoverMetaRow}>
              <span className={styles.badge}>Bestseller</span>
              <span className={styles.nextBatch}>
                Next batch <strong>{popover.course.nextBatch}</strong>
              </span>
            </div>
            <p className={styles.popoverSub}>
              {popover.course.hours} · All Levels · Live + Recorded
            </p>
            <p className={styles.popoverDesc}>{popover.course.description}</p>
            <ul className={styles.bulletList}>
              {popover.course.bullets.map((bullet) => (
                <li key={bullet}>
                  <CheckIcon />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <button className={styles.enrollBtn}>Enroll Now</button>
          </div>,
          document.body
        )}
    </section>
  );
}