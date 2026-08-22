import styles from "./Certifications.module.css";

type Certification = {
  id: string;
  name: string;
  tags: string;
  image: string;
};

const certifications: Certification[] = [
  { id: "cert1", name: "Yoga Alliance RYT-200", tags: "Hatha, Vinyasa, Ashtanga", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop" },
  { id: "cert2", name: "AYM Ayurveda Certificate", tags: "Nutrition, Doshas, Ritucharya", image: "https://images.unsplash.com/photo-1611072965169-e3733f373f7c?q=80&w=500&auto=format&fit=crop" },
  { id: "cert3", name: "Meditation & Breathwork", tags: "Pranayama, Mindfulness", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500&auto=format&fit=crop" },
];

export default function Certifications() {
  return (
    <section className={styles.section}>
      <div className={styles.textCol}>
        <h2 className={styles.heading}>Get certified and get ahead in your practice</h2>
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
            <img src={cert.image} alt={cert.name} className={styles.thumb} />
            <p className={styles.name}>{cert.name}</p>
            <p className={styles.tags}>{cert.tags}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
