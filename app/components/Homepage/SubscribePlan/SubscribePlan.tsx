import styles from "./SubscribePlan.module.css";

const perks = [
  { id: "pk1", icon: "🧘", text: "Access to 150+ recorded classes" },
  { id: "pk2", icon: "📅", text: "Unlimited live sessions every week" },
  { id: "pk3", icon: "🥗", text: "Ayurveda & nutrition guides included" },
  { id: "pk4", icon: "🎓", text: "Certificate on every completed course" },
];

export default function SubscribePlan() {
  return (
    <section className={styles.section}>
      <div className={styles.textCol}>
        <h2 className={styles.heading}>Build your practice with an AYM Membership</h2>
        <p className={styles.subtext}>
          Members save on every course and get unlimited access to live and recorded
          classes. Join 5,000+ practitioners, starting at ₹499/month.
        </p>

        <ul className={styles.perks}>
          {perks.map((perk) => (
            <li key={perk.id} className={styles.perk}>
              <span className={styles.perkIcon}>{perk.icon}</span>
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
        <img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=900&auto=format&fit=crop"
          alt="Yoga instructor practicing"
          className={styles.mainImage}
        />
        <img
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500&auto=format&fit=crop"
          alt="Meditation practice"
          className={styles.sideImage}
        />
      </div>
    </section>
  );
}
