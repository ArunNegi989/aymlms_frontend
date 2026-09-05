// File: app/faq/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Award,
  CreditCard,
  Video,
  Wrench,
  HelpCircle,
  MessageCircle,
  Clock,
  Users,
  ThumbsUp,
  ArrowRight,
  ChevronDown,
  Search,
  X,
  CheckCircle,
  Star,
  Sparkles,
} from "lucide-react";
import { faqItems } from "@/app/data/Faqs";
import styles from "./Faqpage.module.css";
import FAQ from "@/app/components/our-faq/Faq";

const TOPIC_META: Record<string, { icon: React.ElementType; blurb: string; color: string }> = {
  "Courses & Enrollment": {
    icon: GraduationCap,
    blurb: "Enrolling, switching batches, prerequisites.",
    color: "#ff7a00",
  },
  Certification: {
    icon: Award,
    blurb: "Yoga Alliance recognition, certificate timelines.",
    color: "#8e44ad",
  },
  "Payments & Refunds": {
    icon: CreditCard,
    blurb: "Payment methods, refund and transfer policy.",
    color: "#27ae60",
  },
  "Live Classes": {
    icon: Video,
    blurb: "Time zones, what you need, missed sessions.",
    color: "#3498db",
  },
  Technical: {
    icon: Wrench,
    blurb: "Dashboard access, mobile, recording access.",
    color: "#e67e22",
  },
};

const DEFAULT_TOPIC_META = {
  icon: HelpCircle,
  blurb: "Common questions on this topic.",
  color: "#7a6f5f",
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export default function FaqPage() {
  const router = useRouter();
  const [activeTopic, setActiveTopic] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    faqItems.forEach((item) => {
      if (!item.category) return;
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    });
    return Array.from(counts.entries()).map(([category, count]) => ({
      category,
      count,
      ...(TOPIC_META[category] ?? DEFAULT_TOPIC_META),
    }));
  }, []);

  // Filter FAQ items based on search
  const filteredFaqItems = useMemo(() => {
    if (!searchQuery.trim()) return faqItems;
    const q = searchQuery.toLowerCase();
    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Get filtered topics based on search results
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return topics;
    const q = searchQuery.toLowerCase();
    const matchingCategories = new Set(
      filteredFaqItems.map((item) => item.category).filter(Boolean)
    );
    return topics.filter((t) => matchingCategories.has(t.category));
  }, [searchQuery, topics, filteredFaqItems]);

  return (
    <div className={styles.page}>
      {/* ===== HERO BANNER ===== */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroPattern}>
          <svg viewBox="0 0 600 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none">
              <circle cx="90" cy="80" r="24" />
              <path d="M 90 56 L 90 64 M 90 96 L 90 104 M 66 80 L 74 80 M 106 80 L 114 80" strokeLinecap="round" />
              <path d="M470 30 Q 520 5 555 40 Q 520 65 470 30 Z" />
              <path d="M40 130 Q 60 115 80 130 Q 60 145 40 130 Z" />
              <path d="M520 120 Q 540 105 560 120 Q 540 135 520 120 Z" />
            </g>
          </svg>
        </div>

        <div className={styles.heroContent}>
          <motion.span
            className={styles.heroBadge}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={14} /> Got questions?
          </motion.span>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Frequently Asked <span className={styles.highlight}>Questions</span>
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to know about enrolling, certification, live classes, and
            payments. Can't find your answer?{" "}
            <button className={styles.contactLink} onClick={() => router.push("/contact-us")}>
              Contact us
            </button>{" "}
            directly.
          </motion.p>

          <motion.div
            className={styles.statsRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.statItem}>
              <HelpCircle size={16} />
              <span>{faqItems.length}+ questions answered</span>
            </div>
            <div className={styles.statItem}>
              <Clock size={16} />
              <span>Under 24hr support</span>
            </div>
            <div className={styles.statItem}>
              <Users size={16} />
              <span>10,000+ students helped</span>
            </div>
            <div className={styles.statItem}>
              <ThumbsUp size={16} />
              <span>98% satisfaction</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== BODY ===== */}
      <div className={styles.body}>
        {/* Search Bar */}
        <motion.div
          className={styles.searchSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                className={styles.clearSearch}
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Browse by topic */}
        <motion.div
          className={styles.topicsSection}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Browse by topic</h2>
            {activeTopic !== "All" && (
              <button
                className={styles.clearTopic}
                onClick={() => setActiveTopic("All")}
              >
                <X size={14} /> Clear filter
              </button>
            )}
          </div>

          <motion.div
            className={styles.topicsGrid}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredTopics.map(({ category, count, icon: Icon, blurb, color }) => (
              <motion.button
                key={category}
                className={`${styles.topicCard} ${
                  activeTopic === category ? styles.topicCardActive : ""
                }`}
                variants={fadeUp}
                onClick={() =>
                  setActiveTopic((cur) => (cur === category ? "All" : category))
                }
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                <span
                  className={styles.topicIcon}
                  style={{ background: `${color}15`, color }}
                >
                  <Icon size={18} />
                </span>
                <span className={styles.topicName}>{category}</span>
                <span className={styles.topicBlurb}>{blurb}</span>
                <span className={styles.topicCount}>
                  {count} question{count === 1 ? "" : "s"}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          className={styles.faqSection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className={styles.faqHeader}>
            <h2 className={styles.sectionTitle}>
              {activeTopic === "All" ? "All questions" : activeTopic}
            </h2>
            <span className={styles.faqCount}>
              {filteredFaqItems.length} answer
              {filteredFaqItems.length !== 1 ? "s" : ""}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopic + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FAQ
                items={filteredFaqItems}
                initialCategory={activeTopic}
                title=""
                subtitle=""
                allowMultipleOpen={false}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          className={styles.ctaBand}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>Still have a question?</h2>
            <p className={styles.ctaSubtitle}>
              Our team typically replies within a day. Reach out and we'll sort it out.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <motion.button
              className={styles.ctaPrimary}
              onClick={() => router.push("/contact-us")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={15} /> Contact us
            </motion.button>
            <motion.button
              className={styles.ctaSecondary}
              onClick={() => router.push("/AllCourses")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Browse courses <ArrowRight size={15} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}