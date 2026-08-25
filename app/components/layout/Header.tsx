"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Menu, X, Search, User } from "lucide-react";
import styles from "./Header.module.css";

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Header({
  cartCount = 0,
  wishlistCount = 0,
}: {
  cartCount?: number;
  wishlistCount?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/courses?search=${encodeURIComponent(trimmed)}`);
    setMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/aym-yoga-school-logo.png"
            alt="AYM Yoga School"
            width={130}
            height={36}
            className={styles.logoImage}
          />
        </Link>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <div className={styles.rightGroup}>
            <form className={styles.searchForm} role="search" onSubmit={handleSearch}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for courses..."
                className={styles.searchInput}
                aria-label="Search for courses"
              />
            </form>

            <div className={styles.navLinks}>
              <Link href="/AllCourses" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                All Courses
              </Link>
              <Link href="/free-coursess" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                Free Lessons
              </Link>
              <Link href="/contact-us" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                Contact Us
              </Link>
            </div>

            <div className={styles.mobileDivider} />

            <div className={styles.actions}>
              <Link
                href="/wishlist"
                className={styles.iconBtn}
                aria-label="Wishlist"
                onClick={() => setMenuOpen(false)}
              >
                <Heart size={19} />
                {wishlistCount > 0 && <span className={styles.cartBadge}>{wishlistCount}</span>}
              </Link>

              <Link
                href="/cart"
                className={styles.iconBtn}
                aria-label="Cart"
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingCart size={19} />
                {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
              </Link>

               <Link
    href="/admin/login"
    className={styles.iconBtn}
    aria-label="Login"
    onClick={() => setMenuOpen(false)}
  >
    <User size={19} />
  </Link>
              {/* <Link href="/admin/register" className={styles.signupBtn} onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link> */}
            </div>
          </div>
        </nav>
      </div>

      {menuOpen && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}