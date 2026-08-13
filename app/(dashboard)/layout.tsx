import type { ReactNode } from "react";
import Sidebar from "@/app/components/layout/Sidebar";
import Topbar from "@/app/components/layout/Topbar";
import styles from "./layout.module.css";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.mainSection}>
        <Topbar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}