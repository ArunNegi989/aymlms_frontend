import styles from "./Instructors.module.css";

type Instructor = {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  schedule: string;
};

const instructors: Instructor[] = [
  { id: "i1", name: "Anjali Rawat", role: "Hatha & Alignment", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop", experience: "9 yrs experience", schedule: "Mon–Fri, 6:30 AM" },
  { id: "i2", name: "Rohan Bisht", role: "Vinyasa & Power Flow", image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=500&auto=format&fit=crop", experience: "7 yrs experience", schedule: "Mon–Sat, 7:00 PM" },
  { id: "i3", name: "Meera Nair", role: "Ashtanga", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop", experience: "11 yrs experience", schedule: "Tue/Thu/Sat, 6:00 AM" },
  { id: "i4", name: "Kabir Singh", role: "Meditation & Breathwork", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop", experience: "6 yrs experience", schedule: "Daily, 8:00 PM" },
];

export default function Instructors() {
  return (
    <section className={styles.section} id="instructors">
      <div className={styles.header}>
        <span className={styles.eyebrow}>MEET YOUR TEACHERS</span>
        <h2 className={styles.heading}>Learn from instructors who teach live, every week</h2>
      </div>

      <div className={styles.grid}>
        {instructors.map((instructor) => (
          <article key={instructor.id} className={styles.card}>
            <div className={styles.imageWrap}>
              <img src={instructor.image} alt={instructor.name} className={styles.image} />
            </div>
            <h3 className={styles.name}>{instructor.name}</h3>
            <p className={styles.role}>{instructor.role}</p>
            <div className={styles.divider} />
            <p className={styles.detail}>{instructor.experience}</p>
            <p className={styles.detail}>{instructor.schedule}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
