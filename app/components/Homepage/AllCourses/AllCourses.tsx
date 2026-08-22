"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./AllCourses.module.css";

type Course = {
  id: string;
  title: string;
  category: "Hatha" | "Vinyasa" | "Ashtanga" | "Prenatal" | "Meditation";
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  instructor: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  students: string;
  tagline: string;
};

const courses: Course[] = [
  {
    id: "c1",
    title: "Foundations of Hatha Yoga",
    category: "Hatha",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1200&auto=format&fit=crop",
    instructor: "Anjali Rawat",
    duration: "4 weeks",
    price: 2999,
    originalPrice: 4499,
    rating: 4.8,
    reviews: 412,
    students: "3.2k",
    tagline: "Build your practice from the ground up — breath, alignment, stillness.",
  },
  {
    id: "c2",
    title: "Vinyasa Flow Intensive",
    category: "Vinyasa",
    level: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    instructor: "Rohan Bisht",
    duration: "6 weeks",
    price: 3499,
    rating: 4.7,
    reviews: 268,
    students: "1.8k",
    tagline: "Dynamic sequencing that builds strength and breath-led movement.",
  },
  {
    id: "c3",
    title: "Ashtanga Primary Series",
    category: "Ashtanga",
    level: "Advanced",
    image:
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop",
    instructor: "Meera Nair",
    duration: "8 weeks",
    price: 4999,
    rating: 4.9,
    reviews: 190,
    students: "980",
    tagline: "The traditional set sequence, taught with discipline and depth.",
  },
  {
    id: "c4",
    title: "Prenatal Yoga Essentials",
    category: "Prenatal",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    instructor: "Sunita Joshi",
    duration: "3 weeks",
    price: 2499,
    rating: 4.9,
    reviews: 356,
    students: "2.1k",
    tagline: "Doctor-reviewed, trimester-specific sequences for a safe practice.",
  },
  {
    id: "c5",
    title: "Guided Meditation & Breathwork",
    category: "Meditation",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    instructor: "Kabir Singh",
    duration: "2 weeks",
    price: 1999,
    rating: 4.6,
    reviews: 224,
    students: "4.5k",
    tagline: "A daily reset for the mind — breath, stillness, and presence.",
  },
  {
    id: "c6",
    title: "Vinyasa for Athletes",
    category: "Vinyasa",
    level: "Advanced",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop",
    instructor: "Rohan Bisht",
    duration: "5 weeks",
    price: 3999,
    rating: 4.8,
    reviews: 145,
    students: "760",
    tagline: "Mobility and recovery-focused flow built for high-output bodies.",
  },
];

const categories = ["All", "Hatha", "Vinyasa", "Ashtanga", "Prenatal", "Meditation"] as const;

const categoryAccent: Record<Course["category"], string> = {
  Hatha: "#c98a3e",
  Vinyasa: "#a5622f",
  Ashtanga: "#5b4636",
  Prenatal: "#8fa382",
  Meditation: "#7c6a94",
};

const PAGE_SIZE = 8;

function StarIcon({ fill }: { fill: "full" | "half" | "empty" }) {
  const id = useMemo(() => Math.random().toString(36).slice(2), []);
  return (
    <svg viewBox="0 0 20 20" className={styles.starIcon}>
      {fill === "half" && (
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.2-5.4 3.2 1.3-6L1.3 7.7l6.1-.6L10 1.5z"
        fill={fill === "empty" ? "none" : fill === "half" ? `url(#${id})` : "currentColor"}
        stroke="currentColor"
        strokeWidth={fill === "empty" ? 1.3 : 0}
      />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.4;
  return (
    <span className={styles.starsRow}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} fill={i < full ? "full" : i === full && hasHalf ? "half" : "empty"} />
      ))}
    </span>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={styles.heartIcon}>
      <path
        d="M12 20.5s-7.4-4.6-10-9.2C0.3 8 1.6 4.4 5 3.4c2.1-.6 4.1.3 5.3 2 .3.4.9.4 1.2 0 1.2-1.7 3.2-2.6 5.3-2 3.4 1 4.7 4.6 3 7.9-2.6 4.6-10 9.2-10 9.2z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className={styles.arrowIcon}>
      <line x1="4" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <polyline points="10.5 5 15.5 10 10.5 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" className={styles.chevronIcon}>
      <polyline points="5 7.5 10 13 15 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" className={styles.searchIcon}>
      <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <line x1="13" y1="13" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function AllCourses() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchCategory = category === "All" || c.category === category;
      const matchQuery =
        query.trim() === "" ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.instructor.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [category, query]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category, query]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className={styles.section} id="all-courses">
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Course library · {courses.length} programs</span>
          <h2 className={styles.heading}>Find your practice</h2>
        </div>

        <div className={styles.searchBox}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.chipRow}>
        {categories.map((c) => (
          <button
            key={c}
            className={`${styles.chip} ${category === c ? styles.chipActive : ""}`}
            onClick={() => setCategory(c)}
            style={
              category === c && c !== "All"
                ? { background: categoryAccent[c as Course["category"]], borderColor: categoryAccent[c as Course["category"]] }
                : undefined
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((course) => {
          const isSaved = saved.has(course.id);
          const discount = course.originalPrice
            ? Math.round((1 - course.price / course.originalPrice) * 100)
            : null;
          const accent = categoryAccent[course.category];

          return (
            <article key={course.id} className={styles.card} style={{ ["--accent" as string]: accent }}>
              <div className={styles.thumbWrap}>
                <img src={course.image} alt={course.title} className={styles.thumb} />
                <div className={styles.thumbScrim} />

                <button
                  className={`${styles.saveBtn} ${isSaved ? styles.saveBtnActive : ""}`}
                  onClick={() => toggleSave(course.id)}
                  aria-label="Save course"
                >
                  <HeartIcon filled={isSaved} />
                </button>

                <span className={styles.categoryTag} style={{ background: accent }}>
                  {course.category}
                </span>

                {discount && <span className={styles.discountTag}>{discount}% off</span>}

                <div className={styles.levelStrip}>
                  <span className={styles.levelText}>{course.level}</span>
                  <span className={styles.durationText}>{course.duration}</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{course.title}</h3>
                <p className={styles.cardTagline}>{course.tagline}</p>

                <div className={styles.instructorRow}>
                  <span className={styles.avatar}>{initials(course.instructor)}</span>
                  <span>{course.instructor}</span>
                </div>

                <div className={styles.ratingRow}>
                  <Stars rating={course.rating} />
                  <span className={styles.ratingText}>{course.rating}</span>
                  <span className={styles.reviewsText}>({course.reviews})</span>
                  <span className={styles.dotSep}>·</span>
                  <span className={styles.studentsText}>{course.students}</span>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.priceLine}>
                    <span className={styles.price}>{formatPrice(course.price)}</span>
                    {course.originalPrice && (
                      <span className={styles.originalPrice}>{formatPrice(course.originalPrice)}</span>
                    )}
                  </div>
                  <button className={styles.enrollBtn}>
                    <ArrowIcon />
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No courses match your search</p>
            <p className={styles.emptyText}>Try a different category or keyword.</p>
            <button
              className={styles.emptyResetBtn}
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {hasMore && (
        <div className={styles.viewMoreWrap}>
          <button
            className={styles.viewMoreBtn}
            onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
          >
            View more courses <ChevronDownIcon />
          </button>
        </div>
      )}
    </section>
  );
}