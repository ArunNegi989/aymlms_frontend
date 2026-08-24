"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  ShoppingCart,
} from "lucide-react";
import type { CourseDetail } from "@/app/types/CourseDetail";
import { useCart } from "@/app/context/CartContext";
import { getCourseDetailById } from "@/app/data/courseDetails"; // adjust path if your data file lives elsewhere
import styles from "./CourseDetailContent.module.css"; // rename/copy your existing page.module.css to this filename
import { useWishlist } from "@/app/context/WishlistContext";

const includeIcon = {
  roleplay: Users,
  video: PlayCircle,
  article: FileText,
  download: Download,
  mobile: Smartphone,
  captions: Captions,
  certificate: Award,
};

type Props = {
  id: string;
  /** Base path for "students also bought" links, so each context links within itself.
   *  e.g. "/course-description" inside the dashboard, "/course" on the public site. */
  basePath: string;
};

export default function CourseDetailContent({ id, basePath }: Props) {
  const router = useRouter();
  const course: CourseDetail | undefined = getCourseDetailById(id);

  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(course ? [course.curriculum[0]?.id] : [])
  );
  const [learnExpanded, setLearnExpanded] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  if (!course) {
    return (
      <div className={styles.page}>
        <div className={styles.headerBand}>
          <div className={styles.headerInner}>
            <h1 className={styles.title}>Course not found</h1>
            <p className={styles.subtitle}>
              We couldn&apos;t find a course matching that link. It may have been moved or removed.
            </p>
            <button className={styles.enrollBtn} onClick={() => router.push("/")}>
              Back to courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(sectionId) ? next.delete(sectionId) : next.add(sectionId);
      return next;
    });
  };

  const totalLectures = course.curriculum.reduce((sum, s) => sum + s.lectureCount, 0);
  const learnItems = learnExpanded ? course.whatYoullLearn : course.whatYoullLearn.slice(0, 4);
  const alreadyInCart = isInCart(course.id);
    
  const handleAddToCart = () => {
    if (alreadyInCart) return;
    addToCart({
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      price: course.price,
      originalPrice: course.originalPrice,
    });
  };

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
          {course.related.length > 0 && (
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Students also bought</h3>
              <div className={styles.relatedList}>
                {course.related.map((r) => (
                  <div
                    key={r.id}
                    className={styles.relatedRow}
                    onClick={() => router.push(`${basePath}/${r.id}`)}
                    style={{ cursor: "pointer" }}
                  >
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
          )}
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
            <button
              className={styles.cartBtn}
              onClick={handleAddToCart}
              disabled={alreadyInCart}
            >
              <ShoppingCart size={15} />
              {alreadyInCart ? "Added to Cart" : "Add to Cart"}
            </button>
            
            <div className={styles.sidebarActions}>
              {/* <button className={styles.iconTextBtn}>
                <Heart size={14} /> Wishlist
              </button> */}
              <button className={styles.iconTextBtn} onClick={() => toggleWishlist({ id: course.id, title: course.title, instructor: course.instructor, image: course.thumbnail, price: course.price, originalPrice: course.originalPrice, rating: course.rating, students: String(course.students) })}>
  <Heart size={14} fill={isWishlisted(course.id) ? "#ff7a00" : "none"} /> Wishlist
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

      {/* Mobile-only sticky purchase bar */}
      <div className={styles.mobileActionBar}>
        <div className={styles.mobileActionPrice}>
          <span className={styles.mobileActionNow}>₹{course.price.toLocaleString()}</span>
          <span className={styles.mobileActionOld}>₹{course.originalPrice.toLocaleString()}</span>
        </div>
        <button
          className={styles.mobileEnrollBtn}
          onClick={handleAddToCart}
          disabled={alreadyInCart}
        >
          {alreadyInCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}