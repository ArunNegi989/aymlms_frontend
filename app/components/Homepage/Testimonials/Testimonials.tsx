"use client";

import { useState } from "react";
import styles from "./Testimonials.module.css";

type Testimonial = {
  id: string;
  name: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  { id: "r1", name: "Priya Sharma", location: "Dehradun", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop", quote: "The live classes made all the difference — I finally got my alignment corrected in real time instead of guessing from a video.", rating: 5 },
  { id: "r2", name: "Vikram Mehta", location: "Delhi", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop", quote: "Completed the 200-hour training here. The instructors actually know your name and your practice by week two.", rating: 5 },
  { id: "r3", name: "Ananya Bhatt", location: "Haridwar", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop", quote: "The Ayurveda module tied everything together in a way no other yoga course I'd tried had done before.", rating: 4 },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>STUDENT STORIES</span>
      <h2 className={styles.heading}>What our students say</h2>

      <div className={styles.card}>
        <span className={styles.quoteMark}>&ldquo;</span>
        <p className={styles.quote}>{current.quote}</p>
        <div className={styles.person}>
          <img src={current.image} alt={current.name} className={styles.avatar} />
          <div>
            <p className={styles.name}>{current.name}</p>
            <p className={styles.location}>{current.location}</p>
          </div>
          <span className={styles.stars}>{"★".repeat(current.rating)}{"☆".repeat(5 - current.rating)}</span>
        </div>
      </div>

      <div className={styles.dots}>
        {testimonials.map((t, index) => (
          <button
            key={t.id}
            className={`${styles.dot} ${index === active ? styles.dotActive : ""}`}
            onClick={() => setActive(index)}
            aria-label={`Show testimonial from ${t.name}`}
          />
        ))}
      </div>
    </section>
  );
}
