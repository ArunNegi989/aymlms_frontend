import styles from "./Certifications.module.css";

type Certification = {
  id: string;
  name: string;
  tags: string;
  badges: { icon: string; bg: string }[];
};

const certifications: Certification[] = [
  {
    id: "cert1",
    name: "Yoga Alliance RYT-200",
    tags: "Hatha, Vinyasa, Ashtanga",
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
  return (
    <section className={styles.section}>
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
          Explore certifications <span>&rarr;</span>
        </a>
      </div>

      <div className={styles.cards}>
        {certifications.map((cert) => (
          <div key={cert.id} className={styles.card}>
            <div className={styles.thumb}>
              {cert.badges.map((b, i) => (
                <span
                  key={i}
                  className={styles.badgeIcon}
                  style={{
                    background: b.bg,
                    color: b.bg === "#ffffff" ? "var(--aym-charcoal, #2e1e14)" : "#ffffff",
                  }}
                >
                  {b.icon}
                </span>
              ))}
            </div>
            <p className={styles.name}>{cert.name}</p>
            <p className={styles.tags}>{cert.tags}</p>
          </div>
        ))}
      </div>
    </section>
  );
}