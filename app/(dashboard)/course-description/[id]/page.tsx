"use client";

import { useState } from "react";
import {
  PlayCircle,
  Star,
  Users,
  Globe,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Smartphone,
  Captions,
  Award,
  Heart,
  Share2,
  Clock3,
} from "lucide-react";
import type { CourseDetail } from "@/app/types/CourseDetail";
import styles from "./page.module.css";


// Dummy data - replace with a fetch by params.id
const course: CourseDetail = {
  id: "1",
  breadcrumb: ["Yoga & Wellness", "Teacher Training", "Ashtanga Yoga"],
  title: "200 Hour Yoga Teacher Training",
  subtitle:
    "A complete, hands-on training covering asana, pranayama, philosophy and teaching methodology - everything you need to teach with confidence.",
  badges: ["Bestseller", "Live Sessions"],
  instructor: "Rishikesh Yogacharya",
  lastUpdated: "7/2026",
  languages: ["English", "Hindi (Auto)"],
  rating: 4.8,
  ratingCount: 2143,
  students: 18426,
  thumbnail: "/images/course1.jpg",
  price: 4999,
  originalPrice: 14999,
  discountPercent: 67,
  subscriptionPrice: 999,
  whatYoullLearn: [
    "Master the fundamentals of Hatha and Ashtanga asana practice",
    "Build a safe, structured 60-minute class from warm-up to savasana",
    "Understand classical yoga philosophy and the eight limbs of yoga",
    "Practice and teach pranayama and meditation techniques",
    "Learn anatomy and alignment principles for safe adjustments",
    "Develop your own authentic voice and teaching style",
  ],
  relatedTopics: ["Ashtanga Yoga", "Pranayama", "Yoga Philosophy", "Meditation"],
  includes: [
    { label: "12 Live Role Play Sessions", icon: "roleplay" },
    { label: "48 hours on-demand video", icon: "video" },
    { label: "16 articles", icon: "article" },
    { label: "22 downloadable resources", icon: "download" },
    { label: "Access on mobile and TV", icon: "mobile" },
    { label: "Closed captions", icon: "captions" },
    { label: "Certificate of completion", icon: "certificate" },
  ],
  curriculum: [
    {
      id: "s1",
      title: "Module 1 - Yoga Concepts",
      lectureCount: 5,
      duration: "1h 20min",
      lectures: [
        { id: "l1", title: "Welcome and course orientation", duration: "4:12", preview: true },
        { id: "l2", title: "The history and roots of yoga", duration: "18:30" },
        { id: "l3", title: "Yoga Philosophy - Introduction", duration: "22:45" },
        { id: "l4", title: "The eight limbs of yoga", duration: "16:20" },
        { id: "l5", title: "Setting your intentions for the training", duration: "9:03" },
      ],
    },
    {
      id: "s2",
      title: "Module 2 - Asanas",
      lectureCount: 6,
      duration: "3h 05min",
      lectures: [
        { id: "l6", title: "Surya Namaskar - step by step", duration: "28:10", preview: true },
        { id: "l7", title: "Standing asanas", duration: "35:20" },
        { id: "l8", title: "Seated and forward-bending asanas", duration: "31:00" },
        { id: "l9", title: "Backbends and their benefits", duration: "27:40" },
        { id: "l10", title: "Inversions for beginners", duration: "24:15" },
        { id: "l11", title: "Ashtanga Yoga - Primary Series overview", duration: "38:50" },
      ],
    },
    {
      id: "s3",
      title: "Module 3 - Pranayama",
      lectureCount: 4,
      duration: "1h 32min",
      lectures: [
        { id: "l12", title: "Pranayama for beginners", duration: "22:30" },
        { id: "l13", title: "Nadi Shodhana - alternate nostril breathing", duration: "18:12" },
        { id: "l14", title: "Kapalabhati and Bhastrika", duration: "20:44" },
        { id: "l15", title: "Building a daily pranayama practice", duration: "16:35" },
      ],
    },
    {
      id: "s4",
      title: "Module 4 - Meditation",
      lectureCount: 3,
      duration: "1h 12min",
      lectures: [
        { id: "l16", title: "Meditation techniques", duration: "26:15" },
        { id: "l17", title: "Guided body-scan meditation", duration: "24:00" },
        { id: "l18", title: "Integrating meditation into teaching", duration: "22:10" },
      ],
    },
  ],
  requirements: [
    "No prior yoga teaching experience required",
    "A yoga mat and a quiet space to practice at home",
    "Willingness to complete guided practice hours between modules",
  ],
  description:
    "Welcome to the 200 Hour Yoga Teacher Training! This program is designed to take you from a dedicated practitioner to a confident, certified teacher. Across four structured modules you'll build a strong foundation in asana, pranayama, philosophy and meditation, then learn how to translate that knowledge into safe, well-sequenced classes.\n\nEach module combines recorded lessons with live role-play sessions, so you get real feedback on your teaching before you ever step in front of a class. By the end of the training you'll have a personal practice, a teaching toolkit and a certificate recognized by our partner studios.",
  related: [
    {
      id: "r1",
      title: "300 Hour Advanced Yoga Training",
      thumbnail: "/images/course2.jpg",
      rating: 4.7,
      students: 6210,
      hours: 52,
      updated: "6/2026",
      price: 7999,
      originalPrice: 19999,
      badge: "Premium",
    },
    {
      id: "r2",
      title: "Prenatal Yoga Teacher Training",
      thumbnail: "/images/course3.jpg",
      rating: 4.9,
      students: 3120,
      hours: 24,
      updated: "5/2026",
      price: 3999,
      originalPrice: 9999,
      badge: "Bestseller",
    },
    {
      id: "r3",
      title: "Yin Yoga & Restorative Practice",
      thumbnail: "/images/course4.jpg",
      rating: 4.6,
      students: 8940,
      hours: 18,
      updated: "3/2026",
      price: 2499,
      originalPrice: 6999,
    },
  ],
};

const includeIcon = {
  roleplay: Users,
  video: PlayCircle,
  article: FileText,
  download: Download,
  mobile: Smartphone,
  captions: Captions,
  certificate: Award,
};

export default function CourseDetailPage() {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set([course.curriculum[0]?.id])
  );
  const [learnExpanded, setLearnExpanded] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const totalLectures = course.curriculum.reduce((sum, s) => sum + s.lectureCount, 0);
  const learnItems = learnExpanded ? course.whatYoullLearn : course.whatYoullLearn.slice(0, 4);

  return (
    <div className={styles.page}>
      {/* Header band */}
      <div className={styles.headerBand}>
        <div className={styles.headerInner}>
          <div className={styles.breadcrumb}>
            {course.breadcrumb.map((crumb, i) => (
              <span key={crumb}>
                <a className={styles.crumbLink}>{crumb}</a>
                {i < course.breadcrumb.length - 1 && <span className={styles.crumbSep}>›</span>}
              </span>
            ))}
          </div>

          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.subtitle}>{course.subtitle}</p>

          <div className={styles.badgeRow}>
            {course.badges.map((b) => (
              <span key={b} className={styles.badge}>
                {b}
              </span>
            ))}
          </div>

          <p className={styles.instructorLine}>
            Created by <a className={styles.crumbLink}>{course.instructor}</a>
          </p>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <Calendar size={14} /> Last updated {course.lastUpdated}
            </span>
            <span className={styles.metaItem}>
              <Globe size={14} /> {course.languages.join(", ")}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.mainCol}>
          {/* Rating strip */}
          <div className={styles.ratingStrip}>
            <span className={styles.ratingScore}>{course.rating}</span>
            <span className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(course.rating) ? "#ff7a00" : "none"}
                  color="#ff7a00"
                />
              ))}
            </span>
            <a className={styles.ratingCount}>{course.ratingCount.toLocaleString()} ratings</a>
            <span className={styles.studentsCount}>
              <Users size={14} /> {course.students.toLocaleString()} learners
            </span>
          </div>

          {/* What you'll learn */}
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>What you&apos;ll learn</h3>
            <div className={styles.learnGrid}>
              {learnItems.map((item) => (
                <div key={item} className={styles.learnItem}>
                  <Check size={16} className={styles.checkIcon} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            {course.whatYoullLearn.length > 4 && (
              <button className={styles.showMoreBtn} onClick={() => setLearnExpanded((v) => !v)}>
                {learnExpanded ? "Show less" : "Show more"}
                {learnExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
          </div>

          {/* Related topics */}
          <div className={styles.topicsRow}>
            {course.relatedTopics.map((t) => (
              <span key={t} className={styles.topicPill}>
                {t}
              </span>
            ))}
          </div>

          {/* This course includes */}
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>This course includes</h3>
            <div className={styles.includesGrid}>
              {course.includes.map(({ label, icon }) => {
                const Icon = includeIcon[icon];
                return (
                  <div key={label} className={styles.includeItem}>
                    <Icon size={16} />
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Course content / curriculum */}
          <div className={styles.panel}>
            <div className={styles.curriculumHeader}>
              <h3 className={styles.panelTitle}>Course content</h3>
              <button
                className={styles.linkBtn}
                onClick={() =>
                  setOpenSections(
                    openSections.size === course.curriculum.length
                      ? new Set()
                      : new Set(course.curriculum.map((s) => s.id))
                  )
                }
              >
                {openSections.size === course.curriculum.length ? "Collapse all" : "Expand all"}
              </button>
            </div>
            <p className={styles.curriculumMeta}>
              {course.curriculum.length} modules • {totalLectures} lectures •{" "}
              {course.curriculum.reduce((sum, s) => {
                const [h, m] = s.duration.match(/\d+/g)?.map(Number) ?? [0, 0];
                return sum + h * 60 + m;
              }, 0) > 0
                ? "hands-on training"
                : ""}
            </p>

            <div className={styles.accordion}>
              {course.curriculum.map((section) => {
                const isOpen = openSections.has(section.id);
                return (
                  <div key={section.id} className={styles.accordionSection}>
                    <button
                      className={styles.accordionHead}
                      onClick={() => toggleSection(section.id)}
                    >
                      <span className={styles.accordionHeadLeft}>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        <span className={styles.accordionTitle}>{section.title}</span>
                      </span>
                      <span className={styles.accordionMeta}>
                        {section.lectureCount} lectures • {section.duration}
                      </span>
                    </button>
                    {isOpen && (
                      <div className={styles.lectureList}>
                        {section.lectures.map((lecture) => (
                          <div key={lecture.id} className={styles.lectureRow}>
                            <PlayCircle size={15} className={styles.lectureIcon} />
                            <span className={styles.lectureTitle}>{lecture.title}</span>
                            {lecture.preview && (
                              <span className={styles.previewTag}>Preview</span>
                            )}
                            <span className={styles.lectureDuration}>{lecture.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Requirements */}
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Requirements</h3>
            <ul className={styles.plainList}>
              {course.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Description</h3>
            <div className={`${styles.description} ${descExpanded ? "" : styles.clamped}`}>
              {course.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <button className={styles.showMoreBtn} onClick={() => setDescExpanded((v) => !v)}>
              {descExpanded ? "Show less" : "Show more"}
              {descExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* Instructor */}
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Instructor</h3>
            <div className={styles.instructorCard}>
              <div className={styles.instructorAvatar}>
                {course.instructor
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </div>
              <div>
                <a className={styles.instructorName}>{course.instructor}</a>
                <p className={styles.instructorRole}>Yoga Teacher &amp; Wellness Coach</p>
              </div>
            </div>
          </div>

          {/* Students also bought */}
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Students also bought</h3>
            <div className={styles.relatedList}>
              {course.related.map((r) => (
                <div key={r.id} className={styles.relatedRow}>
                  <div className={styles.relatedThumb} />
                  <div className={styles.relatedInfo}>
                    <h4 className={styles.relatedTitle}>{r.title}</h4>
                    <div className={styles.relatedMeta}>
                      {r.badge && <span className={styles.miniBadge}>{r.badge}</span>}
                      <span className={styles.relatedRating}>
                        <Star size={12} fill="#ff7a00" color="#ff7a00" /> {r.rating}
                      </span>
                      <span>{r.students.toLocaleString()}</span>
                      <span>
                        <Clock3 size={12} /> {r.hours} hours
                      </span>
                      <span>Updated {r.updated}</span>
                    </div>
                  </div>
                  <div className={styles.relatedPrice}>
                    <span className={styles.priceNow}>₹{r.price.toLocaleString()}</span>
                    <span className={styles.priceOld}>₹{r.originalPrice.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky purchase sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <div className={styles.previewThumb}>
              <PlayCircle size={44} className={styles.previewPlay} />
              <span className={styles.previewLabel}>Preview this course</span>
            </div>

            <div className={styles.priceBlock}>
              <span className={styles.priceNowBig}>₹{course.price.toLocaleString()}</span>
              <span className={styles.priceOldBig}>₹{course.originalPrice.toLocaleString()}</span>
              <span className={styles.discountTag}>{course.discountPercent}% off</span>
            </div>

            <button className={styles.enrollBtn}>Enroll Now</button>
            <button className={styles.cartBtn}>Add to Cart</button>

            <div className={styles.sidebarActions}>
              <button className={styles.iconTextBtn}>
                <Heart size={14} /> Wishlist
              </button>
              <button className={styles.iconTextBtn}>
                <Share2 size={14} /> Share
              </button>
            </div>

            <ul className={styles.includesMini}>
              {course.includes.slice(0, 4).map(({ label, icon }) => {
                const Icon = includeIcon[icon];
                return (
                  <li key={label}>
                    <Icon size={14} />
                    <span>{label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}