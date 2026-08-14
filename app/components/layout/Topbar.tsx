"use client";

import { Bell, Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import styles from "./Topbar.module.css";

export default function Topbar({
  userName = "Priya S.",
  cartCount = 0,
  onMenuClick,
}: {
  userName?: string;
  cartCount?: number;
  onMenuClick?: () => void;
}) {
  return (
    <header className={styles.topbar}>
      <button
        className={styles.menuToggle}
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={19} />
        </button>

        <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
          <ShoppingCart size={19} />
          {cartCount > 0 && (
            <span className={styles.badge}>{cartCount > 9 ? "9+" : cartCount}</span>
          )}
        </Link>

        

        <div className={styles.divider} />

        <Link href="/profile" className={styles.user}>
          <div className={styles.avatar}>{userName.charAt(0)}</div>
          <span className={styles.userName}>{userName}</span>
        </Link>
      </div>
    </header>
  );
}