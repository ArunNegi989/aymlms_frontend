import { Clock, Users2, GitBranch, ClipboardCheck, BadgeCheck } from "lucide-react";
import styles from "./Footer.module.css";

const features = [
  { icon: Clock, title: "Learn at Your Own Pace", desc: "Access recorded classes anytime, anywhere." },
  { icon: Users2, title: "Expert Instructors", desc: "Learn from experienced yoga teachers." },
  { icon: GitBranch, title: "Structured Curriculum", desc: "Step-by-step learning path." },
  { icon: ClipboardCheck, title: "Assignments & Quizzes", desc: "Test your knowledge and track progress." },
  { icon: BadgeCheck, title: "Certifications", desc: "Get certified & advance your yoga career." },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {features.map(({ icon: Icon, title, desc }) => (
        <div key={title} className={styles.item}>
          <div className={styles.iconWrap}>
            <Icon size={20} />
          </div>
          <div>
            <h5 className={styles.itemTitle}>{title}</h5>
            <p className={styles.itemDesc}>{desc}</p>
          </div>
        </div>
      ))}
    </footer>
  );
}