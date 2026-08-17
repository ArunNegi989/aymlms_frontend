"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Calendar,
  Award,
  CheckCircle,
  X,
  AlertCircle,
  Send,
} from "lucide-react";
import { getAssignment } from "@/app/data/assignments";
import type { QuestionAnswer } from "@/app/types/Assignment";
import styles from "./page.module.css";

export default function AssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;
  const assignmentId = params.assignmentId as string;
  const assignment = getAssignment(classId, assignmentId);

  // mcqAnswers: questionId -> selected option index
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  // textAnswers: questionId -> written answer
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!assignment) {
    return (
      <div className={styles.notFound}>
        <p>Assignment not found.</p>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ChevronLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  const mcqQuestions = assignment.questions.filter((q) => q.type === "mcq");
  const textQuestions = assignment.questions.filter((q) => q.type === "text");

  const totalPoints = assignment.questions.reduce((s, q) => s + q.points, 0);
  const mcqTotalPoints = mcqQuestions.reduce((s, q) => s + q.points, 0);
  const mcqScore = mcqQuestions.reduce(
    (s, q) => (mcqAnswers[q.id] === q.correctAnswer ? s + q.points : s),
    0
  );

  const allAnswered =
    mcqQuestions.every((q) => mcqAnswers[q.id] !== undefined) &&
    textQuestions.every((q) => (textAnswers[q.id] || "").trim().length > 0);

  const handleMcqSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setMcqAnswers({ ...mcqAnswers, [questionId]: optionIndex });
  };

  const handleTextChange = (questionId: string, value: string) => {
    if (submitted) return;
    setTextAnswers({ ...textAnswers, [questionId]: value });
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    const answers: QuestionAnswer[] = assignment.questions.map((q) => ({
      questionId: q.id,
      mcqAnswer: q.type === "mcq" ? mcqAnswers[q.id] : undefined,
      textAnswer: q.type === "text" ? textAnswers[q.id] : undefined,
    }));

    const submission = {
      assignmentId: assignment.id,
      answers,
      submittedAt: new Date().toISOString(),
      score: mcqScore,
      totalMcqPoints: mcqTotalPoints,
    };

    // TODO: replace with actual API call
    // await fetch("/api/assignments/submit", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(submission),
    // });
    console.log("Submitting assignment:", submission);

    await new Promise((r) => setTimeout(r, 500)); // simulate network
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => router.push(`/assignments/${classId}`)}
        >
          <ChevronLeft size={18} />
          Back to Assignments
        </button>

        <div className={styles.headerInfo}>
          <h1 className={styles.title}>{assignment.title}</h1>
          {assignment.description && (
            <p className={styles.subtitle}>{assignment.description}</p>
          )}
          <div className={styles.headerMeta}>
            {assignment.dueDate && (
              <span className={styles.metaItem}>
                <Calendar size={14} />
                Due {assignment.dueDate}
              </span>
            )}
            <span className={styles.metaItem}>
              <Award size={14} />
              {totalPoints} points
            </span>
          </div>
        </div>
      </div>

      {/* Result banner after submit */}
      {submitted && (
        <div className={styles.resultBanner}>
          <Award size={28} className={styles.resultIcon} />
          <div>
            <h3 className={styles.resultTitle}>Assignment Submitted!</h3>
            <p className={styles.resultText}>
              MCQ Score: {mcqScore} / {mcqTotalPoints} points
              {textQuestions.length > 0 &&
                " · Written answers submitted for review"}
            </p>
          </div>
        </div>
      )}

      {/* Questions */}
      <div className={styles.questionsList}>
        {assignment.questions.map((q, index) => (
          <div key={q.id} className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.questionNumber}>
                Q{index + 1}
                <span className={styles.questionType}>
                  {q.type === "mcq" ? "MCQ" : "Written"}
                </span>
              </span>
              <span className={styles.questionPoints}>{q.points} pts</span>
            </div>

            <p className={styles.questionText}>{q.question}</p>

            {q.type === "mcq" && q.options && (
              <div className={styles.options}>
                {q.options.map((option, optIndex) => {
                  const isSelected = mcqAnswers[q.id] === optIndex;
                  const isCorrect = optIndex === q.correctAnswer;

                  return (
                    <label
                      key={optIndex}
                      className={`${styles.option} ${
                        submitted && isSelected
                          ? isCorrect
                            ? styles.correct
                            : styles.wrong
                          : ""
                      } ${submitted && isCorrect ? styles.correct : ""}`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={isSelected}
                        onChange={() => handleMcqSelect(q.id, optIndex)}
                        disabled={submitted}
                      />
                      <span>{option}</span>
                      {submitted && isCorrect && (
                        <CheckCircle size={16} className={styles.checkIcon} />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <X size={16} className={styles.xIcon} />
                      )}
                    </label>
                  );
                })}
                {submitted && q.explanation && (
                  <div className={styles.explanation}>
                    <AlertCircle size={16} />
                    <span>{q.explanation}</span>
                  </div>
                )}
              </div>
            )}

            {q.type === "text" && (
              <textarea
                className={styles.textAnswer}
                placeholder="Write your answer here..."
                value={textAnswers[q.id] || ""}
                onChange={(e) => handleTextChange(q.id, e.target.value)}
                disabled={submitted}
                rows={4}
              />
            )}
          </div>
        ))}
      </div>

      {/* Submit bar */}
      {!submitted && (
        <div className={styles.submitBar}>
          <span className={styles.submitHint}>
            {allAnswered
              ? "All questions answered"
              : "Please answer all questions before submitting"}
          </span>
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
          >
            <Send size={16} />
            {submitting ? "Submitting..." : "Submit Assignment"}
          </button>
        </div>
      )}
    </div>
  );
}