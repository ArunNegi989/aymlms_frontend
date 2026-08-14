"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ChevronLeft,
  Clock,
  BookOpen,
  FileText,
  CheckCircle,
  Circle,
  HelpCircle,
  PenTool,
  Download,
  Share2,
  Heart,
  AlertCircle,
  X,
  Save,
  Edit,
  Trash2,
  Award,
  BarChart3,
  Menu,
} from "lucide-react";
import styles from "./page.module.css";
import { courseDetails } from "@/app/data/courseDetails";
import { quizData } from "@/app/data/quizzes";
import type { 
  CourseDetail, 
  CurriculumSection, 
  CurriculumLecture 
} from "@/app/types/CourseDetail";

// Types for the player
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  points?: number;
}

interface Note {
  id: string;
  lectureId: string;
  content: string;
  timestamp: number;
  createdAt: string;
  updatedAt?: string;
}

export default function CoursePlayerPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const course = courseDetails[courseId];

  // All hooks must be called in the same order every time
  const [currentSection, setCurrentSection] = useState<CurriculumSection | null>(null);
  const [currentLecture, setCurrentLecture] = useState<CurriculumLecture | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteContent, setNoteContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "notes" | "quiz">("content");
  const [showSidebar, setShowSidebar] = useState(true);
  const [completedLectures, setCompletedLectures] = useState<Set<string>>(new Set());

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Initialize with first lecture - always called
  useEffect(() => {
    if (course && course.curriculum && course.curriculum.length > 0) {
      const firstSection = course.curriculum[0];
      const firstLecture = firstSection.lectures[0];
      setCurrentSection(firstSection);
      setCurrentLecture(firstLecture);
      
      if (firstLecture.type === "quiz") {
        setShowQuiz(true);
      }
    }
  }, [course]);

  // Handle video playback - always called, but checks conditions inside
  useEffect(() => {
    const video = videoRef.current;
    const isQuiz = currentLecture?.type === "quiz";
    if (!video || isQuiz || !currentLecture) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentLecture]);

  // Early returns after all hooks
  if (!course) {
    return <div className={styles.notFound}>Course not found</div>;
  }

  if (!currentLecture || !currentSection) {
    return <div className={styles.loading}>Loading course content...</div>;
  }

  const isQuiz = currentLecture.type === "quiz";
  const currentQuizQuestions: QuizQuestion[] = isQuiz 
    ? quizData[currentLecture.id] || [] 
    : [];

  // Toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || isQuiz) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Toggle mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!playerRef.current) return;

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || isQuiz) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
    setProgress(percent * 100);
  };

  // Format time
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle lecture selection
  const selectLecture = (section: CurriculumSection, lecture: CurriculumLecture) => {
    setCurrentSection(section);
    setCurrentLecture(lecture);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setQuizSubmitted(false);
    setQuizAnswers({});
    setShowQuiz(false);
    setActiveTab("content");
    
    if (lecture.type === "quiz") {
      setShowQuiz(true);
    }
  };

  // Handle quiz answer selection
  const handleQuizAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers({ ...quizAnswers, [questionId]: optionIndex });
  };

  // Submit quiz
  const submitQuiz = () => {
    setQuizSubmitted(true);
    const correct = currentQuizQuestions.filter(
      (q) => quizAnswers[q.id] === q.correctAnswer
    ).length;
    const total = currentQuizQuestions.length;
    const score = Math.round((correct / total) * 100);
    
    if (score >= 70) {
      setCompletedLectures(new Set([...completedLectures, currentLecture.id]));
    }
  };

  // Add note
  const addNote = () => {
    if (!noteContent.trim()) return;
    const newNote: Note = {
      id: `n${Date.now()}`,
      lectureId: currentLecture.id,
      content: noteContent,
      timestamp: currentTime,
      createdAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
    setNoteContent("");
  };

  // Delete note
  const deleteNote = (noteId: string) => {
    setNotes(notes.filter((n) => n.id !== noteId));
  };

  // Edit note
  const updateNote = (noteId: string, content: string) => {
    setNotes(notes.map((n) => 
      n.id === noteId ? { ...n, content, updatedAt: new Date().toISOString() } : n
    ));
    setEditingNoteId(null);
  };

  // Toggle lecture completion
  const toggleCompletion = (lectureId: string) => {
    const newCompleted = new Set(completedLectures);
    if (newCompleted.has(lectureId)) {
      newCompleted.delete(lectureId);
    } else {
      newCompleted.add(lectureId);
    }
    setCompletedLectures(newCompleted);
  };

  // Get progress percentage
  const getOverallProgress = () => {
    if (!course || !course.curriculum) return 0;
    const total = course.curriculum.reduce(
      (sum, section) => sum + section.lectures.length,
      0
    );
    if (total === 0) return 0;
    return Math.round((completedLectures.size / total) * 100);
  };

  // Filter notes for current lecture
  const lectureNotes = notes.filter((n) => n.lectureId === currentLecture.id);

  return (
    <div className={styles.playerPage}>
      {/* Top Navigation */}
      <div className={styles.topNav}>
        <div className={styles.navLeft}>
          <button className={styles.backBtn} onClick={() => window.history.back()}>
            <ChevronLeft size={20} />
            Back to Course
          </button>
          <h2 className={styles.courseTitle}>{course.title}</h2>
        </div>
        <div className={styles.navRight}>
          <div className={styles.progressBadge}>
            <BarChart3 size={16} />
            {getOverallProgress()}% Complete
          </div>
          <button className={styles.iconBtn}>
            <Heart size={20} />
          </button>
          <button className={styles.iconBtn}>
            <Share2 size={20} />
          </button>
          <button 
            className={styles.iconBtn} 
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <div className={styles.playerBody}>
        {/* Player Area */}
        <div className={styles.playerArea}>
          <div ref={playerRef} className={styles.videoWrapper}>
            {isQuiz ? (
              <div className={styles.quizContainer}>
                <div className={styles.quizHeader}>
                  <HelpCircle size={24} className={styles.quizIcon} />
                  <h2>{currentLecture.title}</h2>
                  <span className={styles.quizDuration}>
                    <Clock size={16} />
                    {currentLecture.duration}
                  </span>
                </div>

                <div className={styles.quizBody}>
                  {currentQuizQuestions.map((q, index) => (
                    <div key={q.id} className={styles.quizQuestion}>
                      <p className={styles.questionText}>
                        {index + 1}. {q.question}
                      </p>
                      <div className={styles.options}>
                        {q.options.map((option, optIndex) => (
                          <label
                            key={optIndex}
                            className={`${styles.option} ${
                              quizSubmitted && quizAnswers[q.id] === optIndex
                                ? optIndex === q.correctAnswer
                                  ? styles.correct
                                  : styles.wrong
                                : ""
                            } ${
                              quizSubmitted && optIndex === q.correctAnswer
                                ? styles.correct
                                : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q${q.id}`}
                              value={optIndex}
                              checked={quizAnswers[q.id] === optIndex}
                              onChange={() => handleQuizAnswer(q.id, optIndex)}
                              disabled={quizSubmitted}
                            />
                            <span>{option}</span>
                            {quizSubmitted && optIndex === q.correctAnswer && (
                              <CheckCircle size={16} className={styles.checkIcon} />
                            )}
                            {quizSubmitted &&
                              quizAnswers[q.id] === optIndex &&
                              optIndex !== q.correctAnswer && (
                                <X size={16} className={styles.xIcon} />
                              )}
                          </label>
                        ))}
                      </div>
                      {quizSubmitted && q.explanation && (
                        <div className={styles.explanation}>
                          <AlertCircle size={16} />
                          <span>{q.explanation}</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {!quizSubmitted && (
                    <button
                      className={styles.submitQuizBtn}
                      onClick={submitQuiz}
                      disabled={Object.keys(quizAnswers).length < currentQuizQuestions.length}
                    >
                      Submit Quiz
                    </button>
                  )}

                  {quizSubmitted && (
                    <div className={styles.quizResults}>
                      <div className={styles.resultScore}>
                        <Award size={32} className={styles.awardIcon} />
                        <div>
                          <h3>
                            {currentQuizQuestions.filter(
                              (q) => quizAnswers[q.id] === q.correctAnswer
                            ).length}{" "}
                            / {currentQuizQuestions.length}
                          </h3>
                          <p>
                            {Math.round(
                              (currentQuizQuestions.filter(
                                (q) => quizAnswers[q.id] === q.correctAnswer
                              ).length /
                                currentQuizQuestions.length) *
                                100
                            )}
                            % Score
                          </p>
                        </div>
                      </div>
                      {Math.round(
                        (currentQuizQuestions.filter(
                          (q) => quizAnswers[q.id] === q.correctAnswer
                        ).length /
                          currentQuizQuestions.length) *
                          100
                      ) >= 70 ? (
                        <div className={styles.successMsg}>
                          <CheckCircle size={20} />
                          Congratulations! You passed the quiz.
                        </div>
                      ) : (
                        <div className={styles.failMsg}>
                          <AlertCircle size={20} />
                          You need 70% to pass. Review the material and try again.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className={styles.videoPlayer}
                  src={currentLecture.videoUrl || "/api/video/placeholder"}
                  poster={course.thumbnail}
                  onClick={togglePlay}
                />
                <div className={styles.videoControls}>
                  <button className={styles.controlBtn} onClick={togglePlay}>
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>

                  <span className={styles.timeDisplay}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>

                  <div className={styles.progressBar} onClick={handleProgressClick}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <button className={styles.controlBtn} onClick={toggleMute}>
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>

                  <button className={styles.controlBtn} onClick={toggleFullscreen}>
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "content" ? styles.active : ""}`}
              onClick={() => setActiveTab("content")}
            >
              <FileText size={16} />
              Content
            </button>
            <button
              className={`${styles.tab} ${activeTab === "notes" ? styles.active : ""}`}
              onClick={() => setActiveTab("notes")}
            >
              <PenTool size={16} />
              Notes ({lectureNotes.length})
            </button>
            {isQuiz && (
              <button
                className={`${styles.tab} ${activeTab === "quiz" ? styles.active : ""}`}
                onClick={() => setActiveTab("quiz")}
              >
                <HelpCircle size={16} />
                Quiz
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {activeTab === "content" && (
              <div className={styles.lectureInfo}>
                <h3>{currentLecture.title}</h3>
                {currentLecture.description && (
                  <p className={styles.lectureDescription}>{currentLecture.description}</p>
                )}
                <div className={styles.lectureActions}>
                  <button
                    className={styles.completeBtn}
                    onClick={() => toggleCompletion(currentLecture.id)}
                  >
                    {completedLectures.has(currentLecture.id) ? (
                      <>
                        <CheckCircle size={16} />
                        Completed
                      </>
                    ) : (
                      <>
                        <Circle size={16} />
                        Mark Complete
                      </>
                    )}
                  </button>
                  <button className={styles.downloadBtn}>
                    <Download size={16} />
                    Download Resources
                  </button>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className={styles.notesPanel}>
                <div className={styles.addNote}>
                  <textarea
                    className={styles.noteInput}
                    placeholder="Write a note about this lecture..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    rows={3}
                  />
                  <button className={styles.saveNoteBtn} onClick={addNote}>
                    <Save size={16} />
                    Save Note
                  </button>
                </div>

                <div className={styles.notesList}>
                  {lectureNotes.length === 0 ? (
                    <p className={styles.noNotes}>No notes yet for this lecture</p>
                  ) : (
                    lectureNotes.map((note) => (
                      <div key={note.id} className={styles.noteItem}>
                        {editingNoteId === note.id ? (
                          <div className={styles.editNote}>
                            <textarea
                              className={styles.editNoteInput}
                              defaultValue={note.content}
                              onBlur={(e) => updateNote(note.id, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && e.ctrlKey) {
                                  updateNote(note.id, e.currentTarget.value);
                                }
                              }}
                              autoFocus
                            />
                            <div className={styles.editActions}>
                              <button
                                className={styles.saveEditBtn}
                                onClick={(e) => {
                                  const textarea = e.currentTarget
                                    .parentElement?.previousElementSibling as HTMLTextAreaElement;
                                  if (textarea) {
                                    updateNote(note.id, textarea.value);
                                  }
                                }}
                              >
                                Save
                              </button>
                              <button
                                className={styles.cancelEditBtn}
                                onClick={() => setEditingNoteId(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className={styles.noteContent}>
                              <span className={styles.noteTimestamp}>
                                {formatTime(note.timestamp)}
                              </span>
                              <p>{note.content}</p>
                            </div>
                            <div className={styles.noteActions}>
                              <button
                                className={styles.noteActionBtn}
                                onClick={() => setEditingNoteId(note.id)}
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                className={styles.noteActionBtn}
                                onClick={() => deleteNote(note.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === "quiz" && isQuiz && (
              <div className={styles.quizTabContent}>
                <div className={styles.quizStatus}>
                  <span className={styles.quizStatusLabel}>
                    {quizSubmitted ? "Completed" : "Not Started"}
                  </span>
                  <span className={styles.quizQuestionCount}>
                    {currentQuizQuestions.length} questions
                  </span>
                </div>
                <button
                  className={styles.startQuizBtn}
                  onClick={() => setShowQuiz(true)}
                >
                  {quizSubmitted ? "Review Quiz" : "Start Quiz"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h3>Course Content</h3>
              <span className={styles.sidebarProgress}>
                {getOverallProgress()}% Complete
              </span>
            </div>

            <div className={styles.sidebarProgressBar}>
              <div
                className={styles.sidebarProgressFill}
                style={{ width: `${getOverallProgress()}%` }}
              />
            </div>

            <div className={styles.sectionList}>
              {course.curriculum.map((section) => (
                <div key={section.id} className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h4>{section.title}</h4>
                    <span className={styles.sectionMeta}>
                      {section.lectureCount} lectures • {section.duration}
                    </span>
                  </div>

                  <div className={styles.lectureList}>
                    {section.lectures.map((lecture) => {
                      const isActive =
                        currentLecture.id === lecture.id &&
                        currentSection.id === section.id;
                      const isCompleted = completedLectures.has(lecture.id);
                      const isQuiz = lecture.type === "quiz";

                      return (
                        <button
                          key={lecture.id}
                          className={`${styles.lectureItem} ${
                            isActive ? styles.active : ""
                          } ${isCompleted ? styles.completed : ""}`}
                          onClick={() => selectLecture(section, lecture)}
                        >
                          <div className={styles.lectureLeft}>
                            {isCompleted ? (
                              <CheckCircle size={16} className={styles.completeIcon} />
                            ) : isQuiz ? (
                              <HelpCircle size={16} className={styles.quizIconSmall} />
                            ) : (
                              <Play size={16} className={styles.playIconSmall} />
                            )}
                            <span className={styles.lectureTitle}>
                              {lecture.title}
                              {lecture.preview && (
                                <span className={styles.previewBadge}>Preview</span>
                              )}
                            </span>
                          </div>
                          <div className={styles.lectureRight}>
                            {isQuiz && (
                              <span className={styles.quizBadge}>Quiz</span>
                            )}
                            <span className={styles.lectureDuration}>
                              {lecture.duration}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.sidebarStats}>
              <div className={styles.statItem}>
                <BookOpen size={16} />
                <span>
                  {completedLectures.size} /{" "}
                  {course.curriculum.reduce(
                    (sum, s) => sum + s.lectures.length,
                    0
                  )}{" "}
                  Completed
                </span>
              </div>
              <div className={styles.statItem}>
                <Clock size={16} />
                <span>Total: {course.totalHours || "6h 45min"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}