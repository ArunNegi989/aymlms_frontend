"use client";

import { useState } from "react";
import CourseCard from "@/app/components/courses/CourseCard";
import type { Course } from "@/app/types/course";
import styles from "./page.module.css";
import {
  PlayCircle,
  FileText,
  ClipboardList,
  HelpCircle,
  Award,
} from "lucide-react";

const quickAccess = [
  { label: "Recorded Classes", icon: PlayCircle },
  { label: "Notes", icon: FileText },
  { label: "Assignments", icon: ClipboardList },
  { label: "Quizzes", icon: HelpCircle },
  { label: "My Certificates", icon: Award },
];

const dummyCourses: Course[] = [
  {
    id: "1",
    title: "200 Hour Yoga Teacher Training",
    instructor: "Rishikesh Yogacharya",
    thumbnail: "/images/course1.jpg",
    progress: 65,
    status: "enrolled",
  },
  {
    id: "2",
    title: "300 Hour Advanced Yoga Training",
    instructor: "Himalayan Siddha",
    thumbnail: "/images/course2.jpg",
    progress: 20,
    status: "enrolled",
  },
  {
    id: "3",
    title: "Prenatal Yoga Teacher Training",
    instructor: "Shalini Devi",
    thumbnail: "/images/course3.jpg",
    progress: 40,
    status: "enrolled",
  },
];

export default function MyCoursesPage() {
  const [tab, setTab] = useState<"enrolled" | "completed">("enrolled");

  const filtered = dummyCourses.filter((c) => c.status === tab);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Courses</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === "enrolled" ? styles.activeTab : ""}`}
          onClick={() => setTab("enrolled")}
        >
          Enrolled Courses
        </button>
        <button
          className={`${styles.tab} ${tab === "completed" ? styles.activeTab : ""}`}
          onClick={() => setTab("completed")}
        >
          Completed Courses
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No courses in this tab yet.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      <div className={styles.quickAccessSection}>
        <h4 className={styles.sectionTitle}>Quick Access</h4>
        <div className={styles.quickGrid}>
          {quickAccess.map(({ label, icon: Icon }) => (
            <button key={label} className={styles.quickItem}>
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.activitySection}>
        <h4 className={styles.sectionTitle}>Recent Activity</h4>
        <div className={styles.activityCard}>
          <div className={styles.activityRow}>
            <span className={styles.activityDot} />
            <span>You completed the class "Pranayama for Beginners"</span>
            <span className={styles.activityTime}>2 days ago</span>
          </div>
          <div className={styles.activityRow}>
            <span className={styles.activityDot} style={{ background: "#ff7a00" }} />
            <span>You started "200 Hour Yoga Teacher Training"</span>
            <span className={styles.activityTime}>3 days ago</span>
          </div>
          <div className={styles.activityRow}>
            <span className={styles.activityDot} style={{ background: "#2196f3" }} />
            <span>You completed the quiz "Module 1 Quiz"</span>
            <span className={styles.activityTime}>5 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}