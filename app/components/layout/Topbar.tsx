"use client";

import { Bell } from "lucide-react";
import styles from "./Topbar.module.css";

export default function Topbar({
  userName = "Priya S.",
}: {
  userName?: string;
}) {
  return (
    <header className={styles.topbar}>
      <div />
      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <Bell size={19} />
        </button>
        <div className={styles.user}>
          <div className={styles.avatar}>
            {userName.charAt(0)}
          </div>
          <span className={styles.userName}>{userName}</span>
        </div>
      </div>
    </header>
  );
}