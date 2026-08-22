"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Video,
  PlayCircle,
  FileText,
  ClipboardList,
  HelpCircle,
  Users,
  Calendar,
  Award,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "/my-courses", icon: BookOpen },
  { label: "Live Classes", href: "/live-classess", icon: Video },
  { label: "Recorded Classes", href: "/recorded-classess", icon: PlayCircle },
  { label: "Notes", href: "/notes", icon: FileText },
  { label: "Assignments", href: "/assignments", icon: ClipboardList },
  { label: "Quizzes", href: "/quizzes", icon: HelpCircle },
  { label: "Community", href: "/community", icon: Users },
  { label: "Calendar", href: "/calendarr", icon: Calendar },
  { label: "My Certificates", href: "/my-certificates", icon: Award },
];

const bottomItems = [
  { label: "Profile", href: "/", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🪷</span>
          <div>
            <div className={styles.logoTitle}>AYM</div>
            <div className={styles.logoSubtitle}>YOGA SCHOOL</div>
          </div>
          <button
            className={styles.closeToggle}
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.navItem} ${active ? styles.active : ""}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.bottomNav}>
          {bottomItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.navItem} ${active ? styles.active : ""}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
          <button className={styles.navItem} onClick={() => console.log("logout")}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}