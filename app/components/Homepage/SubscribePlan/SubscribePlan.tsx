import styles from "./SubscribePlan.module.css";

const perks = [
  { id: "pk1", icon: "📚", tone: "orange", text: "Get access to 28,000+ top-rated courses" },
  { id: "pk2", icon: "💡", tone: "gold", text: "Learn from 9,000+ expert instructors" },
  { id: "pk3", icon: "🧘", tone: "rose", text: "Ayurveda, wellness, Design and 50+ more topics" },
  { id: "pk4", icon: "🏆", tone: "teal", text: "Certification prep for AWS, Microsoft, PMI, and more" },
];

export default function SubscribePlan() {
  return (
    <section className={styles.section}>
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
          {perks.map((perk) => (
            <li key={perk.id} className={styles.perk}>
              <span className={`${styles.perkIcon} ${styles[perk.tone]}`}>{perk.icon}</span>
              <span>{perk.text}</span>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button className={styles.subscribeBtn}>Subscribe now</button>
          <a href="#" className={styles.learnMore}>Learn more</a>
        </div>
      </div>

      <div className={styles.imageCol}>
        <div className={styles.mainImageWrap}>
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=900&auto=format&fit=crop"
            alt="Instructor smiling"
            className={styles.mainImage}
          />
          <div className={styles.floatCard}>
            <span className={styles.floatIcon}>★</span>
            <div className={styles.floatText}>
              <div className={styles.floatNum}>4.9/5</div>
              <div className={styles.floatLabel}>Learner rating</div>
            </div>
          </div>
        </div>

        <div className={styles.accentWrap}>
          <span className={`${styles.accentBlob} ${styles.b1}`} />
          <span className={`${styles.accentBlob} ${styles.b2}`} />
        </div>
      </div>
    </section>
  );
}