"use client";

import { useState } from "react";
import CourseCard from "@/app/components/courses/CourseCard";
import type { Course } from "@/app/types/course";
import styles from "./page.module.css";

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
    <div>
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
    </div>
  );
}