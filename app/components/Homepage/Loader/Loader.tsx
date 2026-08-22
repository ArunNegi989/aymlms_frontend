import styles from "./Loader.module.css";

type LoaderProps = {
  label?: string;
};

export default function Loader({ label = "Preparing your practice..." }: LoaderProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.ring}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <div className={styles.core}>
          <span className={styles.logo}>AYM</span>
        </div>
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
