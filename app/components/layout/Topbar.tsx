"use client";

import { Bell, Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import styles from "./Topbar.module.css";

export default function Topbar({
  userName = "Priya S.",
  onMenuClick,
}: {
  userName?: string;
  onMenuClick?: () => void;
}) {
  const { totalItems, toggleCart } = useCart();

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

        <button className={styles.iconBtn} aria-label="Open cart" onClick={toggleCart}>
          <ShoppingCart size={19} />
          {totalItems > 0 && (
            <span className={styles.badge}>{totalItems > 9 ? "9+" : totalItems}</span>
          )}
        </button>

        <Link href="/" className={styles.iconBtn} aria-label="Profile">
          <User size={19} />
        </Link>

        <div className={styles.divider} />

        <Link href="/" className={styles.user}>
          <div className={styles.avatar}>{userName.charAt(0)}</div>
          <span className={styles.userName}>{userName}</span>
        </Link>
      </div>
    </header>
  );
}