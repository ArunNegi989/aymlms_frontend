"use client";

import { useState } from "react";
import styles from "./Certifications.module.css";

type Certification = {
  id: string;
  name: string;
  tags: string;
  badges: { icon: string; bg: string }[];
  description?: string;
};

const certifications: Certification[] = [
  {
    id: "cert1",
    name: "Yoga Alliance RYT-200",
    tags: "Hatha, Vinyasa, Ashtanga",
    description: "Internationally recognized 200-hour teacher training certification",
    badges: [
      { icon: "🧘", bg: "linear-gradient(135deg, #f0923f, #d9631a)" },
      { icon: "🕉", bg: "#ffffff" },
      { icon: "🧘‍♀️", bg: "linear-gradient(135deg, #f6b26b, #e67e22)" },
      { icon: "☀️", bg: "#ffffff" },
      { icon: "🪷", bg: "linear-gradient(135deg, #d9631a, #b34e15)" },
      { icon: "🧘", bg: "#ffffff" },
    ],
  },
  {
    id: "cert2",
    name: "AYM Ayurveda Certificate",
    tags: "Nutrition, Doshas, Ritucharya",
    description: "Comprehensive Ayurveda certification covering classical texts",
    badges: [
      { icon: "🌿", bg: "linear-gradient(135deg, #17a37a, #0f8163)" },
      { icon: "🥗", bg: "#ffffff" },
      { icon: "🌾", bg: "linear-gradient(135deg, #2f9e6e, #1c7a53)" },
      { icon: "💧", bg: "#ffffff" },
      { icon: "🌱", bg: "linear-gradient(135deg, #17a37a, #0f8163)" },
      { icon: "🍵", bg: "#ffffff" },
    ],
  },
  {
    id: "cert3",
    name: "Meditation & Breathwork",
    tags: "Pranayama, Mindfulness",
    description: "Master ancient meditation and breathing techniques",
    badges: [
      { icon: "🌬", bg: "linear-gradient(135deg, #6c63d1, #4b3fa0)" },
      { icon: "🧠", bg: "#ffffff" },
      { icon: "✨", bg: "linear-gradient(135deg, #8a7fe0, #6c63d1)" },
      { icon: "🕯", bg: "#ffffff" },
      { icon: "🔮", bg: "linear-gradient(135deg, #4b3fa0, #362d78)" },
      { icon: "🌙", bg: "#ffffff" },
    ],
  },
];

export default function Certifications() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className={styles.section}>
      {/* Decorative Elements */}
      <div className={styles.decorativeCircle1} />
      <div className={styles.decorativeCircle2} />
      <div className={styles.decorativeLine} />

      <div className={styles.textCol}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span className={styles.eyebrow}>CERTIFICATIONS</span>
        </div>

        <h2 className={styles.heading}>
          Get certified and get <span className={styles.headingAccent}>ahead</span> in your practice
        </h2>
        <p className={styles.text}>
          Every AYM course path ends with a recognized certificate — with practice
          assessments and instructor sign-off along the way.
        </p>
        <a href="#" className={styles.link}>
          Explore certifications
          <svg viewBox="0 0 20 20" className={styles.linkArrow}>
            <line x1="4" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <polyline points="10.5 5 15.5 10 10.5 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <div className={styles.cards}>
        {certifications.map((cert) => {
          const isHovered = hoveredId === cert.id;
          return (
            <div
              key={cert.id}
              className={`${styles.card} ${isHovered ? styles.cardHovered : ""}`}
              onMouseEnter={() => setHoveredId(cert.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={styles.cardGlow} />
              <div className={styles.thumb}>
                {cert.badges.map((b, i) => (
                  <span
                    key={i}
                    className={styles.badgeIcon}
                    style={{
                      background: b.bg,
                      color: b.bg === "#ffffff" ? "#1a1a1a" : "#ffffff",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    {b.icon}
                  </span>
                ))}
              </div>
              <h3 className={styles.name}>{cert.name}</h3>
              <p className={styles.tags}>{cert.tags}</p>
              {cert.description && (
                <p className={styles.description}>{cert.description}</p>
              )}
              <div className={styles.cardFooter}>
                <span className={styles.certBadge}>✓ Certified</span>
                <span className={styles.learnMoreBtn}>
                  Learn More
                  <svg viewBox="0 0 20 20" className={styles.cardArrow}>
                    <line x1="4" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <polyline points="10.5 5 15.5 10 10.5 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}