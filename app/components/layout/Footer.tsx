"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import styles from "./Footer.module.css";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "My Courses", href: "/my-courses" },
  { label: "Recorded Classes", href: "/recorded-classes" },
  { label: "Notes", href: "/notes" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact", href: "/contact" },
];

const trendingCourses = [
  { label: "200 Hour Yoga Teacher Training", href: "/course-description/1" },
  { label: "300 Hour Advanced Yoga Training", href: "/course-description/2" },
  { label: "Prenatal Yoga Teacher Training", href: "/course-description/3" },
  { label: "Ashtanga Yoga - Primary Series", href: "/course-description/1" },
];

const popularCourses = [
  { label: "Pranayama for Beginners", href: "/course-description/1" },
  { label: "Meditation Techniques", href: "/course-description/1" },
  { label: "Himalayan Meditation Traditions", href: "/course-description/2" },
  { label: "Prenatal Yoga", href: "/course-description/3" },
];

// Small monochrome brand marks — lucide-react no longer ships these icons
// (trademark reasons), so they're plain inline SVGs using currentColor,
// which means they automatically pick up .socialIcon's color/hover styles.
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 3H21.7l-6.1 7 7.2 9.5h-5.6l-4.4-5.8-5 5.8H4.9l6.5-7.5L4.5 3h5.7l4 5.3L18.9 3Zm-1 15h1.6L8.2 4.9H6.5L17.9 18Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.6 7.6a2.8 2.8 0 0 0-1.97-1.98C17.9 5.2 12 5.2 12 5.2s-5.9 0-7.63.42A2.8 2.8 0 0 0 2.4 7.6 29 29 0 0 0 2 12a29 29 0 0 0 .4 4.4 2.8 2.8 0 0 0 1.97 1.98C6.1 18.8 12 18.8 12 18.8s5.9 0 7.63-.42a2.8 2.8 0 0 0 1.97-1.98A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.4ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.85-2.06 3.8-2.06 4.06 0 4.82 2.67 4.82 6.14V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}

const socialLinks = [
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
  { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Logo + about + social */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/aym-yoga-school-logo.png"
              alt="AYM Yoga School"
              width={140}
              height={40}
              className={styles.logoImage}
            />
          </Link>
          <p className={styles.tagline}>
            Rooted in tradition, taught for today. Learn yoga teacher
            training, asana, pranayama and meditation from certified
            instructors, anywhere in the world.
          </p>
          <div className={styles.socialRow}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={styles.socialIcon}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className={styles.col}>
          <h5 className={styles.colTitle}>Quick Links</h5>
          <ul className={styles.linkList}>
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Trending courses */}
        <div className={styles.col}>
          <h5 className={styles.colTitle}>Trending Courses</h5>
          <ul className={styles.linkList}>
            {trendingCourses.map((c) => (
              <li key={c.label}>
                <Link href={c.href} className={styles.link}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular courses */}
        <div className={styles.col}>
          <h5 className={styles.colTitle}>Popular Courses</h5>
          <ul className={styles.linkList}>
            {popularCourses.map((c) => (
              <li key={c.label}>
                <Link href={c.href} className={styles.link}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + map */}
        <div className={styles.col}>
          <h5 className={styles.colTitle}>Visit Us</h5>
          <div className={styles.contactItem}>
            <MapPin size={14} />
            <span>Tapovan, Rishikesh, Uttarakhand, India</span>

          </div>
          <div className={styles.mapWrap}>
            <iframe
              title="AYM Yoga School location"
              src="https://www.google.com/maps?q=Rishikesh,India&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.map}
            />
          </div>
          <div className={styles.contactItem}>
            <Mail size={14} />
            <a href="mailto:hello@aymyogaschool.com" className={styles.link}>
              hello@aymyogaschool.com
            </a>
          </div>
          <div className={styles.contactItem}>
            <Phone size={14} />
            <a href="tel:+911234567890" className={styles.link}>
              +91 123 456 7890
            </a>
          </div>
          
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} AYM Yoga School. All rights reserved.
        </p>
        <div className={styles.legalLinks}>
          <Link href="/privacy" className={styles.legalLink}>
            Privacy Policy
          </Link>
          <span className={styles.dot}>•</span>
          <Link href="/terms" className={styles.legalLink}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}