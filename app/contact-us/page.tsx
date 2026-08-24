// File location: app/contact-us/page.tsx
// Public route: /contact-us
// Uses the same dark-band / cream / orange-accent language as the course
// description page, so it reads as part of the same product.

"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2 } from "lucide-react";
import styles from "./ContactUs.module.css";

const STUDIO = {
  name: "AYM Yoga School",
  addressLine1: "12 Tapovan Road, Near Ganga Ghat",
  addressLine2: "Rishikesh, Uttarakhand 249192, India",
  phone: "+91 98765 43210",
  email: "hello@aymyoga.school",
  mapQuery: "Tapovan, Rishikesh, Uttarakhand, India",
};

// Studio hours, used to power the live open/closed indicator in the banner.
// 0 = Sunday ... 6 = Saturday. Times are in 24h IST.
const HOURS: Record<number, [number, number] | null> = {
  0: [7, 13], // Sunday - morning only
  1: [6, 20],
  2: [6, 20],
  3: [6, 20],
  4: [6, 20],
  5: [6, 20],
  6: [7, 18], // Saturday
};

function useStudioOpenStatus() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  return useMemo(() => {
    if (!now) return { label: "Checking hours…", open: null as boolean | null };
    const day = now.getDay();
    const hour = now.getHours() + now.getMinutes() / 60;
    const window = HOURS[day];
    const open = !!window && hour >= window[0] && hour < window[1];

    if (!window) return { label: "Closed today", open: false };
    const formatHour = (h: number) => {
      const period = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 === 0 ? 12 : h % 12;
      return `${h12}${period}`;
    };
    const label = open
      ? `Open now · closes ${formatHour(window[1])}`
      : `Closed · opens ${formatHour(window[0])}`;
    return { label, open };
  }, [now]);
}

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "" };

export default function ContactUsPage() {
  const { label: hoursLabel, open } = useStudioOpenStatus();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!form.email.trim()) next.email = "Enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.message.trim()) next.message = "Write a short message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Wire this up to your real endpoint (API route, email service, CRM, etc).
    setSubmitted(true);
    setForm(EMPTY_FORM);
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    STUDIO.mapQuery
  )}&output=embed`;

  return (
    <div className={styles.page}>
      {/* ---------------- Banner ---------------- */}
      <div className={styles.banner}>
        <svg className={styles.bannerPattern} viewBox="0 0 600 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5">
            <circle cx="80" cy="40" r="26" />
            <circle cx="80" cy="40" r="14" />
            <circle cx="520" cy="150" r="34" />
            <circle cx="520" cy="150" r="18" />
            <path d="M 250 20 Q 300 0 350 20 Q 300 55 250 20 Z" />
            <path d="M 130 170 Q 180 150 230 170 Q 180 205 130 170 Z" />
          </g>
        </svg>

        <div className={styles.bannerInner}>
          <span className={styles.eyebrow}>We&apos;d love to hear from you</span>
          <h1 className={styles.bannerTitle}>Get in Touch</h1>
          <p className={styles.bannerSubtitle}>
            Questions about a course, a batch date, or just want to say namaste?
            Reach out — a real person from our team replies within one business day.
          </p>

          <span className={`${styles.statusPill} ${open ? styles.statusOpen : styles.statusClosed}`}>
            <Clock size={14} />
            {hoursLabel}
          </span>
        </div>
      </div>

      {/* ---------------- Body ---------------- */}
      <div className={styles.body}>
        {/* Quick contact cards */}
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon} style={{ background: "#ff7a00" }}>
              <MapPin size={18} />
            </span>
            <h3 className={styles.infoTitle}>Visit the studio</h3>
            <p className={styles.infoText}>
              {STUDIO.addressLine1}
              <br />
              {STUDIO.addressLine2}
            </p>
          </div>

          <div className={styles.infoCard}>
            <span className={styles.infoIcon} style={{ background: "#a5622f" }}>
              <Phone size={18} />
            </span>
            <h3 className={styles.infoTitle}>Call us</h3>
            <p className={styles.infoText}>
              <a className={styles.infoLink} href={`tel:${STUDIO.phone.replace(/\s+/g, "")}`}>
                {STUDIO.phone}
              </a>
              <br />
              Mon–Sat, 6am–8pm IST
            </p>
          </div>

          <div className={styles.infoCard}>
            <span className={styles.infoIcon} style={{ background: "#7c6a94" }}>
              <Mail size={18} />
            </span>
            <h3 className={styles.infoTitle}>Email us</h3>
            <p className={styles.infoText}>
              <a className={styles.infoLink} href={`mailto:${STUDIO.email}`}>
                {STUDIO.email}
              </a>
              <br />
              We reply within 1 business day
            </p>
          </div>
        </div>

        {/* Form + Map */}
        <div className={styles.mainGrid}>
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Send us a message</h2>
            <p className={styles.panelSubtitle}>
              Tell us what you&apos;re looking for and we&apos;ll point you to the right course or batch.
            </p>

            {submitted && (
              <div className={styles.successBanner}>
                <CheckCircle2 size={18} />
                <span>Thanks — your message is in. We&apos;ll get back to you soon.</span>
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={update("name")}
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={update("email")}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="subject">
                  Subject <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  id="subject"
                  className={styles.input}
                  type="text"
                  placeholder="e.g. Batch timing for 200-Hour YTT"
                  value={form.subject}
                  onChange={update("subject")}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                  placeholder="How can we help?"
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                />
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>

              <button type="submit" className={styles.submitBtn}>
                <Send size={15} />
                Send message
              </button>
            </form>
          </div>

          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Find us</h2>
            <p className={styles.panelSubtitle}>
              Nestled by the Ganga in Tapovan — a two-minute walk from Laxman Jhula.
            </p>
            <div className={styles.mapWrap}>
              <iframe
                className={styles.map}
                src={mapSrc}
                title="AYM Yoga School location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              className={styles.directionsLink}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                STUDIO.mapQuery
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}