"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
    id: "all-c1",
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
    id: "all-c2",
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
    id: "all-c3",
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
    id: "all-c4",
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
    id: "all-c5",
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
    id: "all-c6",
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

const categoryEmoji: Record<Course["category"], string> = {
  Hatha: "🧘",
  Vinyasa: "🌊",
  Ashtanga: "🔥",
  Prenatal: "🤰",
  Meditation: "🧠",
};

const PAGE_SIZE = 8;

function StarIcon({ fill }: { fill: "full" | "half" | "empty" }) {
  return (
    <svg viewBox="0 0 20 20" className={styles.starIcon}>
      <path
        d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.2-5.4 3.2 1.3-6L1.3 7.7l6.1-.6L10 1.5z"
        fill={fill === "full" ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={fill === "empty" ? 1.3 : 0}
      />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <span className={styles.starsRow}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} fill={i < full ? "full" : "empty"} />
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

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" className={styles.calendarIcon}>
      <rect x="2" y="4" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="2" x2="6" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="2" x2="14" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="13" r="2" fill="currentColor" />
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
  const router = useRouter();
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

  const goToCourse = (course: Course) => {
    router.push(`/course/${course.id}`);
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
    <section className={styles.section}>
      {/* Decorative Element */}
      <div className={styles.decorativeCircle1} />
      <div className={styles.decorativeCircle2} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Course Library
            </div>
            <h2 className={styles.heading}>
              Find Your<span className={styles.headingHighlight}> Practice</span>
            </h2>
            <p className={styles.subheading}>
              Explore our curated collection of yoga courses designed for every level
            </p>
          </div>

          <div className={styles.searchBox}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className={styles.clearBtn} onClick={() => setQuery("")}>
                ×
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className={styles.chipRow}>
          {categories.map((c) => (
            <button
              key={c}
              className={`${styles.chip} ${category === c ? styles.chipActive : ""}`}
              onClick={() => setCategory(c)}
            >
              {c === "All" ? "🎯 All" : `${categoryEmoji[c as Course["category"]]} ${c}`}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className={styles.resultsCount}>
          <span>{filtered.length} courses found</span>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {visible.map((course) => {
            const isSaved = saved.has(course.id);
            const discount = course.originalPrice
              ? Math.round((1 - course.price / course.originalPrice) * 100)
              : null;
            const accent = categoryAccent[course.category];

            return (
              <article
                key={course.id}
                className={styles.card}
                style={{ ["--accent" as string]: accent }}
                onClick={() => goToCourse(course)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") goToCourse(course);
                }}
              >
                <div className={styles.thumbWrap}>
                  <img src={course.image} alt={course.title} className={styles.thumb} />
                  <div className={styles.thumbScrim} />

                  <button
                    className={`${styles.saveBtn} ${isSaved ? styles.saveBtnActive : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(course.id);
                    }}
                    aria-label="Save course"
                  >
                    <HeartIcon filled={isSaved} />
                  </button>

                  <span className={styles.categoryTag} style={{ background: accent }}>
                    {course.category}
                  </span>

                  {discount && (
                    <span className={styles.discountTag}>
                      {discount}% OFF
                    </span>
                  )}

                  <div className={styles.levelStrip}>
                    <span className={styles.levelBadge}>
                      {course.level === "Beginner" && "🌱"}
                      {course.level === "Intermediate" && "🌿"}
                      {course.level === "Advanced" && "🌳"}
                      {course.level}
                    </span>
                    <span className={styles.durationBadge}>
                      <CalendarIcon />
                      {course.duration}
                    </span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{course.title}</h3>
                  <p className={styles.cardTagline}>{course.tagline}</p>

                  <div className={styles.instructorRow}>
                    <span className={styles.avatar} style={{ background: accent }}>
                      {initials(course.instructor)}
                    </span>
                    <span className={styles.instructorName}>{course.instructor}</span>
                    <span className={styles.studentCount}>
                      • {course.students} students
                    </span>
                  </div>

                  <div className={styles.ratingRow}>
                    <Stars rating={course.rating} />
                    <span className={styles.ratingText}>{course.rating}</span>
                    <span className={styles.reviewsText}>
                      ({course.reviews} reviews)
                    </span>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.priceLine}>
                      <span className={styles.price}>{formatPrice(course.price)}</span>
                      {course.originalPrice && (
                        <span className={styles.originalPrice}>
                          {formatPrice(course.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      className={styles.enrollBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToCourse(course);
                      }}
                    >
                      <span className={styles.btnText}>Enroll</span>
                      <ArrowIcon />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🔍</div>
              <p className={styles.emptyTitle}>No courses found</p>
              <p className={styles.emptyText}>
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                className={styles.emptyResetBtn}
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* View More */}
        {hasMore && (
          <div className={styles.viewMoreWrap}>
            <button
              className={styles.viewMoreBtn}
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
            >
              View More Courses
              <ChevronDownIcon />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}