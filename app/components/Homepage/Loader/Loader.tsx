import Image from "next/image";
import styles from "./Loader.module.css";

type LoaderProps = {
  label?: string;
  logoSrc?: string;
};

export default function Loader({
  label = "Preparing your practice...",
  logoSrc = "/assets/aymloader.png",
}: LoaderProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.stage}>
        {/* soft glow behind everything */}
        <span className={styles.glow} />

        {/* bahar expand-fade hone wale pulse rings */}
        <span className={styles.pulseRing} />
        <span className={styles.pulseRing} style={{ animationDelay: "0.7s" }} />
        <span className={styles.pulseRing} style={{ animationDelay: "1.4s" }} />
        <span className={styles.pulseRing} style={{ animationDelay: "2.1s" }} />

        {/* twinkling sparkles around the stage */}
        <span className={`${styles.spark} ${styles.spark1}`} />
        <span className={`${styles.spark} ${styles.spark2}`} />
        <span className={`${styles.spark} ${styles.spark3}`} />
        <span className={`${styles.spark} ${styles.spark4}`} />

        {/* outer dashed ring — slow rotate */}
        <div className={styles.dashRing} />

        {/* inner gradient arc ring — fast rotate, opposite direction */}
        <div className={styles.spinnerRing} />

        {/* orbiting dots — outer orbit */}
        <div className={styles.orbitOuter}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>

        {/* orbiting dots — inner orbit, reverse + smaller */}
        <div className={styles.orbitInner}>
          <span className={styles.dotSmall} />
          <span className={styles.dotSmall} />
        </div>

        {/* center core with big logo */}
        <div className={styles.core}>
          <Image
            src={logoSrc}
            alt="AYM Yoga"
            width={170}
            height={170}
            className={styles.logoImg}
            priority
          />
        </div>
      </div>

      <p className={styles.label}>{label}</p>
    </div>
  );
}