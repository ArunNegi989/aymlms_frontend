// File location: app/faq/page.tsx
// Public route: /faq
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { faqItems } from "@/app/data/Faqs"; // only needed here for the stats count + topic cards
import styles from "./Faqpage.module.css";
import FAQ from "@/app/components/faq/Faq";

// Icon + short blurb per topic. Falls back to a generic icon for any
// category in faqItems that isn't listed here, so this never breaks if
// you add a new category to the data file later.
const TOPIC_META: Record<string, { icon: React.ElementType; blurb: string }> = {
  "Courses & Enrollment": {
    icon: GraduationCap,
    blurb: "Enrolling, switching batches, prerequisites.",
  },
  Certification: {
    icon: Award,
    blurb: "Yoga Alliance recognition, certificate timelines.",
  },
  "Payments & Refunds": {
    icon: CreditCard,
    blurb: "Payment methods, refund and transfer policy.",
  },
  "Live Classes": {
    icon: Video,
    blurb: "Time zones, what you need, missed sessions.",
  },
  Technical: {
    icon: Wrench,
    blurb: "Dashboard access, mobile, recording access.",
  },
};

const DEFAULT_TOPIC_META = { icon: HelpCircle, blurb: "Common questions on this topic." };

export default function FaqPage() {
  const router = useRouter();
  const [activeTopic, setActiveTopic] = useState<string>("All");

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

  return (
    <div className={styles.page}>
      {/* ---------------- Banner ---------------- */}
      <div className={styles.banner}>
        <svg
          className={styles.bannerPattern}
          viewBox="0 0 600 160"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5">
            <circle cx="90" cy="80" r="24" />
            <path d="M 90 56 L 90 64 M 90 96 L 90 104 M 66 80 L 74 80 M 106 80 L 114 80" strokeLinecap="round" />
            <path d="M470 30 Q 520 5 555 40 Q 520 65 470 30 Z" />
          </g>
        </svg>

        <div className={styles.bannerInner}>
          <span className={styles.eyebrow}>Got questions?</span>
          <h1 className={styles.bannerTitle}>Frequently Asked Questions</h1>
          <p className={styles.bannerSubtitle}>
            Everything you need to know about enrolling, certification, live classes, and
            payments. Can't find your answer?{" "}
            <button className={styles.contactLink} onClick={() => router.push("/contact-us")}>
              Contact us
            </button>{" "}
            directly.
          </p>

          {/* Quick stats */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <HelpCircle size={16} />
              <span>{faqItems.length}+ questions answered</span>
            </div>
            <div className={styles.statItem}>
              <Clock size={16} />
              <span>Under 24hr support response</span>
            </div>
            <div className={styles.statItem}>
              <Users size={16} />
              <span>10,000+ students helped</span>
            </div>
            <div className={styles.statItem}>
              <ThumbsUp size={16} />
              <span>Resolved on first reply, mostly</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Body ---------------- */}
      <div className={styles.body}>
        {/* Browse by topic */}
        <div className={styles.topicsSection}>
          <h2 className={styles.sectionTitle}>Browse by topic</h2>
          <div className={styles.topicsGrid}>
            {topics.map(({ category, count, icon: Icon, blurb }) => (
              <button
                key={category}
                className={`${styles.topicCard} ${
                  activeTopic === category ? styles.topicCardActive : ""
                }`}
                onClick={() =>
                  setActiveTopic((cur) => (cur === category ? "All" : category))
                }
              >
                <span className={styles.topicIcon}>
                  <Icon size={18} />
                </span>
                <span className={styles.topicName}>{category}</span>
                <span className={styles.topicBlurb}>{blurb}</span>
                <span className={styles.topicCount}>{count} question{count === 1 ? "" : "s"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ list, deep-linked to the selected topic card */}
        <div className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>
            {activeTopic === "All" ? "All questions" : activeTopic}
          </h2>
          <FAQ
            key={activeTopic}
            items={faqItems}
            initialCategory={activeTopic}
            title=""
            subtitle=""
            allowMultipleOpen={false}
          />
        </div>

        {/* Closing CTA */}
        <div className={styles.ctaBand}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>Still have a question?</h2>
            <p className={styles.ctaSubtitle}>
              Our team typically replies within a day. Reach out and we'll sort it out.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <button className={styles.ctaPrimary} onClick={() => router.push("/contact-us")}>
              <MessageCircle size={15} /> Contact us
            </button>
            <button className={styles.ctaSecondary} onClick={() => router.push("/")}>
              Browse courses <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}