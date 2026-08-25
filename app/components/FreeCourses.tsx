// File: components/FreeCourses.tsx
"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaSlidersH,
  FaTimes,
  FaClock,
  FaBook,
  FaUsers,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import { freeCourses, FreeYogaCourse } from "../data/freeCourses";
import styles from "./FreeCourses.module.css";

// A Link that also accepts framer-motion animation props.
const MotionLink = motion(Link);

// ===== FILTER OPTIONS =====
const yogaStyles = ["All", "Hatha", "Vinyasa", "Ashtanga", "Yin Yoga", "Pranayama", "Meditation"];
const levels = ["All", "Beginner", "Intermediate", "Advanced", "All Levels"];
const durations = ["All", "7 Days", "10 Days", "14 Days", "21 Days", "30 Days"];
const categories = ["All", "Yoga Practice", "Breathwork", "Meditation", "Philosophy", "Wellness"];
const sortOptions = ["Most Popular", "Highest Rated", "Newest", "Shortest Duration", "Longest Duration"];

type FilterKey = "style" | "level" | "duration" | "category";

interface FilterConfig {
  key: FilterKey;
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

// ===== MAIN COMPONENT =====
const FreeCourses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCourses, setVisibleCourses] = useState(6);

  const filterConfigs: FilterConfig[] = [
    { key: "style", label: "Style", options: yogaStyles, value: selectedStyle, onChange: setSelectedStyle },
    { key: "level", label: "Level", options: levels, value: selectedLevel, onChange: setSelectedLevel },
    { key: "duration", label: "Duration", options: durations, value: selectedDuration, onChange: setSelectedDuration },
    { key: "category", label: "Category", options: categories, value: selectedCategory, onChange: setSelectedCategory },
  ];

  const activeFilters = filterConfigs.filter((f) => f.value !== "All");
  const activeFilterCount = activeFilters.length + (searchTerm ? 1 : 0);

  const clearFilter = (key: FilterKey) => {
    filterConfigs.find((f) => f.key === key)?.onChange("All");
    setVisibleCourses(6);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    filterConfigs.forEach((f) => f.onChange("All"));
    setVisibleCourses(6);
  };

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = [...freeCourses];

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(q) ||
          course.description.toLowerCase().includes(q) ||
          course.yogaStyle.toLowerCase().includes(q) ||
          course.instructor.toLowerCase().includes(q)
      );
    }

    if (selectedStyle !== "All") filtered = filtered.filter((c) => c.yogaStyle === selectedStyle);
    if (selectedLevel !== "All") filtered = filtered.filter((c) => c.level === selectedLevel);
    if (selectedDuration !== "All") filtered = filtered.filter((c) => c.duration === selectedDuration);
    if (selectedCategory !== "All") filtered = filtered.filter((c) => c.category === selectedCategory);

    switch (sortBy) {
      case "Most Popular":
        filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
        break;
      case "Highest Rated":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "Shortest Duration":
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case "Longest Duration":
        filtered.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedStyle, selectedLevel, selectedDuration, selectedCategory, sortBy]);

  const visibleFilteredCourses = useMemo(
    () => filteredCourses.slice(0, visibleCourses),
    [filteredCourses, visibleCourses]
  );

  const handleLoadMore = () => setVisibleCourses((prev) => prev + 6);

  // ===== COURSE CARD (entire card is a single link) =====
  const CourseCard = ({ course, index }: { course: FreeYogaCourse; index: number }) => {
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const freeLessons = course.modules.reduce(
      (acc, m) => acc + m.lessons.filter((l) => l.isFree).length,
      0
    );

    return (
      <MotionLink
        href={`/free-courses/${course.id}`}
        className={styles.courseCard}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.06 }}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={styles.cardImage}>
          <img src={course.thumbnail} alt={course.title} loading="lazy" />
          <div className={styles.cardImageOverlay} />
          <div className={styles.freeBadge}>Free</div>
          {course.rating && (
            <div className={styles.ratingBadge}>
              <FaStar /> {course.rating}
            </div>
          )}
          <div className={styles.styleBadge}>{course.yogaStyle}</div>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.cardTop}>
            <span className={styles.cardCategory}>{course.category}</span>
            <span className={styles.cardLevel}>{course.level}</span>
          </div>

          <h3 className={styles.cardTitle}>{course.title}</h3>
          <p className={styles.cardDescription}>{course.description}</p>

          <div className={styles.cardInstructor}>
            {course.instructorImage && <img src={course.instructorImage} alt={course.instructor} />}
            <span>{course.instructor}</span>
          </div>

          <div className={styles.cardStats}>
            <span>
              <FaClock /> {course.duration}
            </span>
            <span>
              <FaBook /> {course.modules.length} modules
            </span>
            <span>
              <FaUsers /> {totalLessons} lessons
            </span>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.cardMeta}>
              <span className={styles.freeLessons}>{freeLessons} free lessons</span>
              {course.students && (
                <span className={styles.students}>{course.students.toLocaleString()} students</span>
              )}
            </div>
            <span className={styles.viewBtn}>
              Explore <FaChevronRight />
            </span>
          </div>
        </div>
      </MotionLink>
    );
  };

  // ===== SHARED FILTER SELECT (used on desktop bar + mobile drawer) =====
  const FilterSelect = ({ config, variant }: { config: FilterConfig; variant: "bar" | "drawer" }) => (
    <div className={variant === "bar" ? styles.filterField : styles.drawerField}>
      <label className={variant === "bar" ? styles.filterFieldLabel : styles.drawerFieldLabel}>
        {config.label}
      </label>
      <select
        value={config.value}
        onChange={(e) => {
          config.onChange(e.target.value);
          setVisibleCourses(6);
        }}
        className={variant === "bar" ? styles.filterSelect : styles.drawerSelect}
        data-active={config.value !== "All"}
      >
        {config.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  // ===== ACTIVE FILTER PILLS =====
  const ActiveFilters = () =>
    activeFilterCount === 0 ? null : (
      <div className={styles.activeFilters}>
        {searchTerm && (
          <button className={styles.activePill} onClick={() => setSearchTerm("")}>
            “{searchTerm}” <FaTimes />
          </button>
        )}
        {activeFilters.map((f) => (
          <button key={f.key} className={styles.activePill} onClick={() => clearFilter(f.key)}>
            {f.value} <FaTimes />
          </button>
        ))}
        <button className={styles.clearAllBtn} onClick={clearAllFilters}>
          Clear all
        </button>
      </div>
    );

  // ===== MOBILE FILTER DRAWER =====
  const MobileFilterDrawer = () => (
    <AnimatePresence>
      {isFilterOpen && (
        <>
          <motion.div
            className={styles.drawerBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFilterOpen(false)}
          />
          <motion.div
            className={styles.drawer}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            <div className={styles.drawerHandle} />
            <div className={styles.drawerHeader}>
              <h3>Filter &amp; sort</h3>
              <button onClick={() => setIsFilterOpen(false)} aria-label="Close filters">
                <FaTimes />
              </button>
            </div>

            <div className={styles.drawerContent}>
              <div className={styles.drawerField}>
                <label className={styles.drawerFieldLabel}>Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.drawerSelect}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {filterConfigs.map((f) => (
                <FilterSelect key={f.key} config={f} variant="drawer" />
              ))}

              <div className={styles.drawerActions}>
                <button className={styles.drawerResetBtn} onClick={clearAllFilters}>
                  Reset
                </button>
                <button className={styles.applyBtn} onClick={() => setIsFilterOpen(false)}>
                  Show {filteredCourses.length} courses
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className={styles.pageContainer}>
      {/* ===== HERO ===== */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className={styles.heroBadge}>AYM Yoga School</span>
          </motion.div>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Begin your <span className={styles.highlight}>yoga journey</span> — free
          </motion.h1>
          <motion.p
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explore authentic yoga practices, meditation techniques and mindful living through our
            free introductory courses, taught by experienced teachers.
          </motion.p>
          <motion.div
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <button
              className={styles.btnPrimary}
              onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore free courses
            </button>
            <button className={styles.btnSecondary}>Start your practice</button>
          </motion.div>
          <motion.div
            className={styles.heroStats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span>{freeCourses.length} free courses</span>
            <span>Expert teachers</span>
            <span>Start anytime</span>
          </motion.div>
        </div>
        <div className={styles.heroDecorations} aria-hidden="true">
          <div className={styles.float1}>🕉️</div>
          <div className={styles.float2}>🌸</div>
          <div className={styles.float3}>🌿</div>
          <div className={styles.float4}>☀️</div>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section id="courses" className={styles.filterSection}>
        <div className={styles.filterContainer}>
          <div className={styles.filterHeader}>
            <h2>Explore free yoga courses</h2>
            <span className={styles.resultCount}>{filteredCourses.length} courses</span>
          </div>

          <div className={styles.filterBar}>
            <div className={styles.searchWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search courses, styles, instructors…"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleCourses(6);
                }}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button
                  className={styles.searchClear}
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Desktop: inline dropdowns, no repeated "All" chips */}
            <div className={styles.desktopFields}>
              {filterConfigs.map((f) => (
                <FilterSelect key={f.key} config={f} variant="bar" />
              ))}
              <div className={styles.filterField}>
                <label className={styles.filterFieldLabel}>Sort</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.filterSelect}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile: single button opens the drawer */}
            <button className={styles.mobileFilterBtn} onClick={() => setIsFilterOpen(true)}>
              <FaSlidersH /> Filter &amp; sort
              {activeFilterCount > 0 && <span className={styles.filterCountBadge}>{activeFilterCount}</span>}
            </button>
          </div>

          <ActiveFilters />
        </div>
      </section>

      {/* ===== COURSE GRID ===== */}
      <section className={styles.gridSection}>
        <div className={styles.gridContainer}>
          {visibleFilteredCourses.length > 0 ? (
            <div className={styles.courseGrid}>
              {visibleFilteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span aria-hidden="true">🧘</span>
              <h3>No courses match those filters</h3>
              <p>Try a different combination, or clear filters to see everything.</p>
              <button className={styles.clearAllBtn} onClick={clearAllFilters}>
                Clear all filters
              </button>
            </div>
          )}

          {visibleFilteredCourses.length < filteredCourses.length && filteredCourses.length > 0 && (
            <div className={styles.loadMore}>
              <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                Load more courses
              </button>
            </div>
          )}
        </div>
      </section>

      <MobileFilterDrawer />
    </div>
  );
};

export default FreeCourses;