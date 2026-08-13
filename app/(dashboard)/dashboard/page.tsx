import ProgressBar from "@/app/components/ui/ProgressBar";
import {
  PlayCircle,
  FileText,
  ClipboardList,
  HelpCircle,
  Award,
} from "lucide-react";
import styles from "./page.module.css";

const quickAccess = [
  { label: "Recorded Classes", icon: PlayCircle },
  { label: "Notes", icon: FileText },
  { label: "Assignments", icon: ClipboardList },
  { label: "Quizzes", icon: HelpCircle },
  { label: "My Certificates", icon: Award },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className={styles.title}>Welcome back, Priya! 👋</h1>
      <p className={styles.subtitle}>Stay consistent, stay mindful.</p>

      <div className={styles.topGrid}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Current Course</span>
          <h3 className={styles.courseName}>200 Hour Yoga Teacher Training</h3>
          <ProgressBar value={65} />
          <div className={styles.progressRow}>
            <span>65%</span>
          </div>
          <button className={styles.primaryBtn}>Continue Learning</button>
        </div>

        <div className={styles.card}>
          <span className={styles.cardLabel}>Upcoming Live Class</span>
          <h3 className={styles.courseName}>Ashtanga Yoga - Primary Series</h3>
          <p className={styles.meta}>By Rishikesh Yogacharya</p>
          <p className={styles.meta}>Today, 7:00 AM - 8:30 AM</p>
          <div className={styles.rowBtns}>
            <button className={styles.primaryBtn}>Join Class</button>
            <button className={styles.linkBtn}>View Full Schedule</button>
          </div>
        </div>
      </div>

      <h4 className={styles.sectionTitle}>Quick Access</h4>
      <div className={styles.quickGrid}>
        {quickAccess.map(({ label, icon: Icon }) => (
          <button key={label} className={styles.quickItem}>
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <h4 className={styles.sectionTitle}>Recent Activity</h4>
      <div className={styles.activityCard}>
        <div className={styles.activityRow}>
          <span className={styles.activityDot} />
          <span>You completed the class "Pranayama for Beginners"</span>
          <span className={styles.activityTime}>2 days ago</span>
        </div>
      </div>
    </div>
  );
}