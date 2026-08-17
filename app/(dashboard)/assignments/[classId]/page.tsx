"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  FileText,
  Calendar,
  CheckCircle2,
  Clock3,
  ChevronRight,
} from "lucide-react";
import { getAssignmentCourse } from "@/app/data/assignments";
import styles from "./page.module.css";

export default function AssignmentsCoursePage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;
  const course = getAssignmentCourse(classId);

  if (!course) {
    return (
      <div className={styles.notFound}>
        <p>Course not found.</p>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ChevronLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => router.push("/assignments")}
        >
          <ChevronLeft size={18} />
          Back to Assignments
        </button>

        <div className={styles.headerInfo}>
          <h1 className={styles.title}>{course.title}</h1>
          {course.subtitle && <p className={styles.subtitle}>{course.subtitle}</p>}
        </div>
      </div>

      <div className={styles.assignmentList}>
        {course.assignments.map((assignment, index) => {
          const totalPoints = assignment.questions.reduce(
            (sum, q) => sum + q.points,
            0
          );
          const isSubmitted = assignment.status !== "pending";

          return (
            <Link
              key={assignment.id}
              href={`/assignments/${classId}/${assignment.id}`}
              className={styles.assignmentCard}
            >
              <div className={styles.cardLeft}>
                <span className={styles.cardIndex}>{index + 1}</span>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{assignment.title}</h3>
                  {assignment.description && (
                    <p className={styles.cardDescription}>
                      {assignment.description}
                    </p>
                  )}
                  <div className={styles.cardMeta}>
                    <span className={styles.metaItem}>
                      <FileText size={13} />
                      {assignment.questions.length} questions
                    </span>
                    <span className={styles.metaItem}>
                      <Clock3 size={13} />
                      {totalPoints} points
                    </span>
                    {assignment.dueDate && (
                      <span className={styles.metaItem}>
                        <Calendar size={13} />
                        Due {assignment.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.cardRight}>
                {isSubmitted ? (
                  <span className={styles.statusSubmitted}>
                    <CheckCircle2 size={14} />
                    Submitted
                  </span>
                ) : (
                  <span className={styles.statusPending}>Pending</span>
                )}
                <ChevronRight size={18} className={styles.chevron} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}