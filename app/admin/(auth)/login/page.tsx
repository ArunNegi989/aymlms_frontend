'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './login.module.css';

// Free-to-use photo (Unsplash License) — "silhouette of woman doing yoga
// during sunset" by Jason Mavrommatis. Swap for AYM's own photography
// whenever it's ready.
const HERO_IMAGE =
  'https://aymyogaschool.com/uploads/1778491107400-455102719.jpg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Enter your email and password to continue.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Wire this up to your auth endpoint, e.g.:
      // const res = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) throw new Error('Invalid email or password.');
      await new Promise((resolve) => setTimeout(resolve, 700));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      {/* Left — image / branding panel */}
      <section className={styles.leftPanel} aria-hidden="true">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="(max-width: 900px) 100vw, 45vw"
          className={styles.heroImage}
        />
        <div className={styles.leftOverlay} />
        <div className={styles.leftContent}>
          <span className={styles.brandTag}>AYM Yoga School</span>
          <h1 className={styles.leftTitle}>Breathe in. Begin again.</h1>
          <p className={styles.leftSubtitle}>
            Log in to pick up your practice — recorded classes, live sessions, and everything
            you&apos;re working on, right where you left it.
          </p>
        </div>
      </section>

      {/* Right — form panel */}
      <section className={styles.rightPanel}>
        <div className={styles.formWrap}>
          <a href="/" className={styles.brandMark} aria-label="AYM Yoga School home">
            <img
              src="https://aymyogaschool.com/_next/static/media/aym-yoga-school-logo.80503ca5.png"
              alt=""
            />
          </a>

          <div className={styles.formHeader}>
            <h2 className={styles.title}>Welcome back</h2>
            <p className={styles.subtitle}>Log in to continue your yoga journey</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email address
              </label>
              <div className={styles.inputWrap}>
                <MailIcon className={styles.inputIcon} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@aymyogaschool.com"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrap}>
                <LockIcon className={styles.inputIcon} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className={styles.metaRow}>
              <Link href="/admin/forgot-password" className={styles.link}>
                Forgot password?
              </Link>
            </div>

            {error && (
              <p className={styles.errorText} role="alert">
                {error}
              </p>
            )}

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting && <LoaderIcon className={styles.spin} />}
              {isSubmitting ? 'Logging in…' : 'Login'}
            </button>

            <p className={styles.terms}>
              Don&apos;t have an account?{' '}
              <Link href="/admin/signup" className={styles.link}>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

/* ---------- Icons ---------- */

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 6l10 7 10-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 10V7a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 3l18 18M9.9 5.2A10.9 10.9 0 0 1 12 5c7 0 11 7 11 7a15.6 15.6 0 0 1-4.2 4.6M6.2 6.2A15.7 15.7 0 0 0 1 12s4 7 11 7c1.3 0 2.6-.2 3.8-.6M14.1 14.1a3 3 0 0 1-4.2-4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}