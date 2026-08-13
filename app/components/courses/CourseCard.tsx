import Image from "next/image";
import ProgressBar from "@/app/components/ui/ProgressBar";
import type { Course } from "@/app/types/course";
import styles from "./CourseCard.module.css";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className={styles.card}>
      <div className={styles.thumbWrap}>
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className={styles.thumb}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.instructor}>Instructor: {course.instructor}</p>

        <div className={styles.progressRow}>
          <ProgressBar value={course.progress} />
          <span className={styles.percent}>{course.progress}%</span>
        </div>

        <button className={styles.continueBtn}>
          {course.status === "completed" ? "View Certificate" : "Continue"}
        </button>
      </div>
    </div>
  );
}