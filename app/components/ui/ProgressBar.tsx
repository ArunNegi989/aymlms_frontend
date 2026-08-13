import styles from "./ProgressBar.module.css";

export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: `${value}%` }} />
    </div>
  );
}