"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Menu, ShoppingCart, User, Settings, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // outside click pe dropdown close karo
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("logout");
    setDropdownOpen(false);
    // yaha apna logout logic (token clear, api call, etc.) daal sakte ho
    router.push("/login");
  };

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

        <div className={styles.divider} />

        <div className={styles.userWrapper} ref={dropdownRef}>
          <button
            className={styles.user}
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <div className={styles.avatar}>{userName.charAt(0)}</div>
            <span className={styles.userName}>{userName}</span>
            <ChevronDown
              size={16}
              className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className={styles.dropdown}>
              <Link
                href="/profile"
                className={styles.dropdownItem}
                onClick={() => setDropdownOpen(false)}
              >
                <User size={16} />
                <span>Profile</span>
              </Link>
             
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem} onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}