"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Instructors.module.css";

type Instructor = {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  schedule: string;
  bio: string;
};

const instructors: Instructor[] = [
  {
    id: "i1",
    name: "Anjali Rawat",
    role: "Hatha & Alignment",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop",
    experience: "9 yrs experience",
    schedule: "Mon–Fri, 6:30 AM",
    bio: "Anjali specializes in slow, precise alignment work — helping students build a safe foundation before moving into deeper postures. Her classes focus on breath-led movement and injury prevention.",
  },
  {
    id: "i2",
    name: "Rohan Bisht",
    role: "Vinyasa & Power Flow",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=500&auto=format&fit=crop",
    experience: "7 yrs experience",
    schedule: "Mon–Sat, 7:00 PM",
    bio: "Rohan brings high-energy, music-driven vinyasa flows that build strength and stamina. Expect fast transitions, creative sequencing, and a strong mind-body connection.",
  },
  {
    id: "i3",
    name: "Meera Nair",
    role: "Ashtanga",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop",
    experience: "11 yrs experience",
    schedule: "Tue/Thu/Sat, 6:00 AM",
    bio: "A traditionally trained Ashtanga teacher, Meera follows the classical primary series with an emphasis on discipline, consistency, and steady long-term progress.",
  },
  {
    id: "i4",
    name: "Kabir Singh",
    role: "Meditation & Breathwork",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop",
    experience: "6 yrs experience",
    schedule: "Daily, 8:00 PM",
    bio: "Kabir guides evening meditation and pranayama sessions designed to help students unwind, regulate the nervous system, and close the day with calm focus.",
  },
  {
    id: "i5",
    name: "Simran Kaur",
    role: "Yin & Restorative",
    image:
      "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=500&auto=format&fit=crop",
    experience: "8 yrs experience",
    schedule: "Wed/Fri/Sun, 9:00 AM",
    bio: "Simran's classes are slow-paced and prop-supported, holding postures for longer to release deep tension in the connective tissue. Ideal for recovery days.",
  },
  {
    id: "i6",
    name: "Arjun Thapa",
    role: "Prenatal Yoga",
    image:
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=500&auto=format&fit=crop",
    experience: "5 yrs experience",
    schedule: "Mon/Wed/Fri, 11:00 AM",
    bio: "Arjun is a certified prenatal yoga instructor helping expecting mothers stay active safely, with modifications for every trimester and a strong focus on breathing.",
  },
  {
    id: "i7",
    name: "Devika Joshi",
    role: "Pranayama & Kriya",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop",
    experience: "10 yrs experience",
    schedule: "Daily, 6:00 AM",
    bio: "Devika teaches classical pranayama and kriya techniques passed down through her own decade-long practice, focused on energy regulation and mental clarity.",
  },
];

function getItemsPerView(width: number) {
  if (width >= 1200) return 4;
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

const AUTOPLAY_MS = 2500;

export default function Instructors() {
  const [itemsPerView, setItemsPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<Instructor | null>(null);
  const [mounted, setMounted] = useState(false);
  const total = instructors.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const update = () => setItemsPerView(getItemsPerView(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const clonesCount = itemsPerView;
  const extended = [
    ...instructors.slice(total - clonesCount),
    ...instructors,
    ...instructors.slice(0, clonesCount),
  ];

  useEffect(() => {
    setWithTransition(false);
    setIndex(clonesCount);
    const raf = requestAnimationFrame(() => setWithTransition(true));
    return () => cancelAnimationFrame(raf);
  }, [itemsPerView]);

  const goNext = useCallback(() => {
    setWithTransition(true);
    setIndex((prev) => prev + 1);
  }, []);

  const goPrev = useCallback(() => {
    setWithTransition(true);
    setIndex((prev) => prev - 1);
  }, []);

  const goToReal = (realIdx: number) => {
    setWithTransition(true);
    setIndex(clonesCount + realIdx);
  };

  useEffect(() => {
    if (paused || selected) return;
    const t = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, selected, goNext]);

  const handleTransitionEnd = () => {
    if (index >= total + clonesCount) {
      setWithTransition(false);
      setIndex(index - total);
    } else if (index < clonesCount) {
      setWithTransition(false);
      setIndex(index + total);
    }
  };

  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const slideWidthPct = 100 / itemsPerView;
  const translatePct = -(index * slideWidthPct);
  const realActive = (((index - clonesCount) % total) + total) % total;

  const openInstructor = (instructor: Instructor) => {
    setSelected(instructor);
  };

  const modalContent = selected && (
    <div className={styles.modalBackdrop} onClick={() => setSelected(null)}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${selected.name} details`}
      >
        <button
          className={styles.modalClose}
          onClick={() => setSelected(null)}
          aria-label="Close"
          type="button"
        >
          ✕
        </button>

        <div className={styles.modalGrid}>
          <div className={styles.modalImageWrap}>
            <img
              src={selected.image}
              alt={selected.name}
              className={styles.modalImage}
            />
            <div className={styles.modalImageBadge}>
              <span className={styles.modalBadgeIcon}>⭐</span>
              <span>Top Instructor</span>
            </div>
          </div>

          <div className={styles.modalContent}>
            <span className={styles.modalRole}>{selected.role}</span>
            <h3 className={styles.modalName}>{selected.name}</h3>

            <div className={styles.modalMetaRow}>
              <div className={styles.modalMetaItem}>
                <span className={styles.modalMetaLabel}>Experience</span>
                <span className={styles.modalMetaValue}>
                  {selected.experience}
                </span>
              </div>
              <div className={styles.modalMetaDivider} />
              <div className={styles.modalMetaItem}>
                <span className={styles.modalMetaLabel}>Schedule</span>
                <span className={styles.modalMetaValue}>
                  {selected.schedule}
                </span>
              </div>
              <div className={styles.modalMetaDivider} />
              <div className={styles.modalMetaItem}>
                <span className={styles.modalMetaLabel}>Rating</span>
                <span className={styles.modalMetaValue}>4.9 ★</span>
              </div>
            </div>

            <p className={styles.modalBio}>{selected.bio}</p>

            <button className={styles.modalCta} type="button">
              Book a class
              <svg viewBox="0 0 20 20" className={styles.modalCtaArrow}>
                <line x1="4" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <polyline points="10.5 5 15.5 10 10.5 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className={styles.section}
      id="instructors"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative Elements */}
      <div className={styles.decorativeCircle1} />
      <div className={styles.decorativeCircle2} />
      <div className={styles.decorativeLine} />

      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          <span className={styles.eyebrowLine} />
          MEET YOUR TEACHERS
        </div>
        <h2 className={styles.heading}>
          Learn from instructors who <span className={styles.headingAccent}>teach live</span>, every week
        </h2>
        <p className={styles.subheading}>
          Experienced, certified, and passionate about guiding your practice
        </p>
      </div>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(${translatePct}%)`,
            transition: withTransition
              ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((instructor, i) => {
            const realIndex = instructors.findIndex(
              (x) => x.id === instructor.id
            );
            return (
              <div
                key={`${instructor.id}-${i}`}
                className={styles.slide}
                style={{ flex: `0 0 ${slideWidthPct}%` }}
              >
                <article
                  className={`${styles.card} ${
                    i % 2 === 1 ? styles.cardOffset : ""
                  }`}
                  onClick={() => openInstructor(instructor)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openInstructor(instructor);
                    }
                  }}
                >
                  <span className={styles.cardNum}>
                    {String(realIndex + 1).padStart(2, "0")}
                  </span>

                  <div className={styles.imageWrap}>
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className={styles.image}
                      draggable={false}
                    />
                    <div className={styles.scrim} />

                    <div className={styles.overlay}>
                      <div className={styles.overlayBadge}>
                        <span className={styles.overlayIcon}>👨‍🏫</span>
                        <span>{instructor.experience}</span>
                      </div>
                      <div className={styles.overlayBadge}>
                        <span className={styles.overlayIcon}>🕐</span>
                        <span>{instructor.schedule}</span>
                      </div>
                      <span className={styles.viewLink}>
                        View Profile
                        <svg viewBox="0 0 20 20" className={styles.viewArrow}>
                          <line x1="4" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <polyline points="10.5 5 15.5 10 10.5 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className={styles.info}>
                    <h3 className={styles.name}>{instructor.name}</h3>
                    <p className={styles.role}>{instructor.role}</p>
                    <div className={styles.infoBadge}>
                      <span>⭐ 4.9</span>
                      <span>•</span>
                      <span>{instructor.experience}</span>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <button
          className={`${styles.navBtn} ${styles.navPrev}`}
          onClick={goPrev}
          aria-label="Previous instructor"
          type="button"
        >
          <svg viewBox="0 0 20 20" className={styles.navIcon}>
            <polyline points="13 4 7 10 13 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className={`${styles.navBtn} ${styles.navNext}`}
          onClick={goNext}
          aria-label="Next instructor"
          type="button"
        >
          <svg viewBox="0 0 20 20" className={styles.navIcon}>
            <polyline points="7 4 13 10 7 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={styles.dots}>
        {instructors.map((instructor, i) => (
          <button
            key={instructor.id}
            className={`${styles.dot} ${
              i === realActive ? styles.dotActive : ""
            }`}
            onClick={() => goToReal(i)}
            aria-label={`Go to ${instructor.name}`}
            type="button"
          />
        ))}
      </div>

      {mounted && modalContent
        ? createPortal(modalContent, document.body)
        : null}
    </section>
  );
}