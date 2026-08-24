"use client";

import { useState } from "react";
import styles from "./SubscribePlan.module.css";

const perks = [
  { id: "pk1", icon: "📚", tone: "orange", text: "Get access to 28,000+ top-rated courses" },
  { id: "pk2", icon: "💡", tone: "gold", text: "Learn from 9,000+ expert instructors" },
  { id: "pk3", icon: "🧘", tone: "rose", text: "Ayurveda, wellness, Design and 50+ more topics" },
  { id: "pk4", icon: "🏆", tone: "teal", text: "Certification prep for AWS, Microsoft, PMI, and more" },
];

export default function SubscribePlan() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className={styles.section}>
      {/* Decorative Elements */}
      <div className={styles.decorativeCircle1} />
      <div className={styles.decorativeCircle2} />
      <div className={styles.decorativeDots} />

      <div className={styles.textCol}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span className={styles.eyebrow}>AYM MEMBERSHIP</span>
        </div>

        <h2 className={styles.heading}>
          Build your career with a <span className={styles.headingAccent}>Personal Plan</span> subscription
        </h2>
        <p className={styles.subtext}>
          Subscribers save an average of <strong>₹4,000+</strong> in their first month, stop
          paying per course. Join <strong>5 lakh+ learners</strong>, starting at ₹500/month.
        </p>

        <ul className={styles.perks}>
          {perks.map((perk, index) => (
            <li 
              key={perk.id} 
              className={styles.perk}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className={`${styles.perkIcon} ${styles[perk.tone]}`}>{perk.icon}</span>
              <span>{perk.text}</span>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button 
            className={styles.subscribeBtn}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span>Subscribe now</span>
            <svg viewBox="0 0 20 20" className={`${styles.btnArrow} ${isHovered ? styles.btnArrowHover : ""}`}>
              <line x1="4" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <polyline points="10.5 5 15.5 10 10.5 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <a href="#" className={styles.learnMore}>
            Learn more
            <svg viewBox="0 0 20 20" className={styles.learnMoreArrow}>
              <line x1="4" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <polyline points="10.5 5 15.5 10 10.5 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className={styles.trustBadges}>
          <span className={styles.trustBadge}>
            <svg viewBox="0 0 24 24" className={styles.trustIcon}>
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </svg>
            4.9/5 Rating
          </span>
          <span className={styles.trustBadge}>
            <svg viewBox="0 0 24 24" className={styles.trustIcon}>
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <polyline points="12,6 12,12 16,14" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            24/7 Support
          </span>
          <span className={styles.trustBadge}>
            <svg viewBox="0 0 24 24" className={styles.trustIcon}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <polyline points="9,12 11,14 15,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Risk Free
          </span>
        </div>
      </div>

      <div className={styles.imageCol}>
        <div className={styles.mainImageWrap}>
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=900&auto=format&fit=crop"
            alt="Instructor smiling"
            className={styles.mainImage}
          />
          <div className={styles.imageOverlay} />
          
          {/* Floating Cards */}
          <div className={`${styles.floatCard} ${styles.floatCard1}`}>
            <span className={styles.floatIcon}>★</span>
            <div className={styles.floatText}>
              <div className={styles.floatNum}>4.9/5</div>
              <div className={styles.floatLabel}>Learner rating</div>
            </div>
          </div>

          <div className={`${styles.floatCard} ${styles.floatCard2}`}>
            <span className={styles.floatIcon}>👥</span>
            <div className={styles.floatText}>
              <div className={styles.floatNum}>5L+</div>
              <div className={styles.floatLabel}>Students enrolled</div>
            </div>
          </div>

          <div className={`${styles.floatCard} ${styles.floatCard3}`}>
            <span className={styles.floatIcon}>🏅</span>
            <div className={styles.floatText}>
              <div className={styles.floatNum}>50+</div>
              <div className={styles.floatLabel}>Certifications</div>
            </div>
          </div>

          <div className={styles.priceTag}>
            <span className={styles.priceAmount}>₹500</span>
            <span className={styles.pricePeriod}>/month</span>
          </div>
        </div>

        <div className={styles.accentWrap}>
          <span className={`${styles.accentBlob} ${styles.b1}`} />
          <span className={`${styles.accentBlob} ${styles.b2}`} />
          <span className={`${styles.accentBlob} ${styles.b3}`} />
          <div className={styles.accentContent}>
            <span className={styles.accentEmoji}>✨</span>
            <span className={styles.accentText}>Start your journey today</span>
          </div>
        </div>
      </div>
    </section>
  );
}