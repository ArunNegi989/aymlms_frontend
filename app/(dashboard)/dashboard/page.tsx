"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProgressBar from "@/app/components/ui/ProgressBar";
import {
  Lock,
  TrendingUp,
  Sparkles,
  Star,
  Users,
  Filter,
  ChevronDown,
  X,
  Clock,
  BookOpen,
} from "lucide-react";
import {
  
  enrolledCourses,
  recommendedCourses,
  trendingCourses,
  recentActivity,
  FALLBACK_THUMBNAIL,
} from "@/app/data/dashboard";
import styles from "./page.module.css";

export default function DashboardPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter trending courses
  const filteredTrending = trendingCourses.filter((course) => {
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  // Calculate total enrolled courses
  const totalEnrolled = enrolledCourses.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, Priya! 👋</h1>
          <p className={styles.subtitle}>Stay consistent, stay mindful.</p>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.statBadge}>
            <span className={styles.statValue}>{totalEnrolled}</span>
            <span className={styles.statLabel}>Active Courses</span>
          </div>
          <div className={styles.statBadge}>
            <span className={styles.statValue}>42</span>
            <span className={styles.statLabel}>Hours Learned</span>
          </div>
        </div>
      </div>

      <div className={styles.topGrid}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Current Course</span>
          <h3 className={styles.courseName}>200 Hour Yoga Teacher Training</h3>
          <ProgressBar value={65} />
          <div className={styles.progressRow}>
            <span>65% Complete</span>
          </div>
          <Link href="/course-description/1/player">
            <button className={styles.primaryBtn}>Continue Learning</button>
          </Link>
        </div>

        <div className={styles.card}>
          <span className={styles.cardLabel}>Upcoming Live Class</span>
          <h3 className={styles.courseName}>Ashtanga Yoga - Primary Series</h3>
          <p className={styles.meta}>By Rishikesh Yogacharya</p>
          <p className={styles.meta}>Today, 7:00 AM - 8:30 AM</p>
          <div className={styles.rowBtns}>
            <button className={styles.primaryBtn}>Join Class</button>
            <button className={styles.linkBtn}>View Full Schedule</button>
          </div>
        </div>
      </div>

      

      {/* Recommended Courses - Not Enrolled */}
      <div className={styles.recommendedSection}>
        <div className={styles.sectionHeader}>
          <h4 className={styles.sectionTitle}>
            <Sparkles size={18} className={styles.sectionIcon} />
            Recommended For You
          </h4>
          <span className={styles.sectionSubtitle}>Explore new courses</span>
        </div>
        <div className={styles.courseGrid}>
          {recommendedCourses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.courseThumbnail}>
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className={styles.thumbnailImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = FALLBACK_THUMBNAIL;
                  }}
                />
                {!course.isEnrolled && (
                  <div className={styles.lockBadge}>
                    <Lock size={14} />
                    <span>Not Enrolled</span>
                  </div>
                )}
              </div>
              <div className={styles.courseInfo}>
                <h4 className={styles.courseCardTitle}>{course.title}</h4>
                <p className={styles.courseCardInstructor}>{course.instructor}</p>
                <div className={styles.courseMeta}>
                  <span className={styles.metaItem}>
                    <Clock size={12} />
                    12 hours
                  </span>
                  <span className={styles.metaItem}>
                    <BookOpen size={12} />
                    8 modules
                  </span>
                </div>
                <Link href={`/course-description/${course.id}`}>
                  <button className={styles.viewBtn}>View Course</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Courses with Filters - Not Enrolled */}
      <div className={styles.trendingSection}>
        <div className={styles.sectionHeader}>
          <h4 className={styles.sectionTitle}>
            <TrendingUp size={18} className={styles.sectionIcon} />
            Trending Courses
          </h4>
          <button
            className={styles.filterToggle}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={16} />
            Filters
            <ChevronDown size={14} className={filterOpen ? styles.rotate : ""} />
          </button>
        </div>

        {filterOpen && (
          <div className={styles.filterPanel}>
            <div className={styles.filterRow}>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Level:</span>
                <div className={styles.filterButtons}>
                  {["all", "beginner", "intermediate", "advanced"].map((level) => (
                    <button
                      key={level}
                      className={`${styles.filterBtn} ${
                        selectedLevel === level ? styles.activeFilter : ""
                      }`}
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {(searchTerm || selectedLevel !== "all") && (
                <button
                  className={styles.clearFilters}
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedLevel("all");
                  }}
                >
                  <X size={14} />
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        <div className={styles.courseGrid}>
          {filteredTrending.length === 0 ? (
            <p className={styles.noResults}>No courses match your filters</p>
          ) : (
            filteredTrending.map((course) => (
              <div key={course.id} className={styles.courseCard}>
                <div className={styles.courseThumbnail}>
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className={styles.thumbnailImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = FALLBACK_THUMBNAIL;
                    }}
                  />
                  <div className={styles.trendingBadge}>
                    <TrendingUp size={12} />
                    Trending
                  </div>
                  {!course.isEnrolled && (
                    <div className={styles.lockBadge}>
                      <Lock size={14} />
                      <span>Not Enrolled</span>
                    </div>
                  )}
                </div>
                <div className={styles.courseInfo}>
                  <h4 className={styles.courseCardTitle}>{course.title}</h4>
                  <p className={styles.courseCardInstructor}>{course.instructor}</p>
                  <div className={styles.courseMeta}>
                    <span className={styles.rating}>
                      <Star size={14} fill="#ff7a00" color="#ff7a00" />
                      {course.rating}
                    </span>
                    <span className={styles.students}>
                      <Users size={14} />
                      {course.students.toLocaleString()}
                    </span>
                    <span className={styles.level}>{course.level}</span>
                  </div>
                  <Link href={`/course-description/${course.id}`}>
                    <button className={styles.viewBtn}>View Course</button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.activitySection}>
        <h4 className={styles.sectionTitle}>Recent Activity</h4>
        <div className={styles.activityCard}>
          {recentActivity.map((item) => (
            <div key={item.id} className={styles.activityRow}>
              <span className={styles.activityDot} style={{ background: item.color }} />
              <span>{item.text}</span>
              <span className={styles.activityTime}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}