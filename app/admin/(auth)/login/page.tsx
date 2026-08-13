'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import styles from './login.module.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

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
    <main className={`${poppins.variable} ${styles.page}`}>
      <div className={`container-fluid ${styles.shell}`}>
        <div className={`row g-0 ${styles.card}`}>
          {/* Left — form panel */}
          <section className={`col-12 col-lg-5 ${styles.formCol}`}>
            <div className={styles.formWrap}>
              <a href="/" className={styles.brand} aria-label="AYM Yoga School home">
                <img src="https://aymyogaschool.com/_next/static/media/aym-yoga-school-logo.80503ca5.png" alt="" />
                {/* <span className={styles.brandText}>
                  <span className={styles.brandName}>AYM</span>
                  <span className={styles.brandSub}>Yoga School</span>
                </span> */}
              </a>

              <div className={styles.heading}>
                <h1 className={styles.title}>Welcome back</h1>
                <p className={styles.subtitle}>
                  Log in to continue your yoga journey
                </p>
              </div>

              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@aymyogaschool.com"
                    className={`form-control ${styles.input}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  <div className={styles.passwordRow}>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className={`form-control ${styles.input}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.toggleVisibility}
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      aria-pressed={showPassword}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                <div className={styles.metaRow}>
                  <a href="/forgot-password" className={styles.link}>
                    Forgot password?
                  </a>
                </div>

                {error && (
                  <p className={styles.error} role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in…' : 'Login'}
                </button>

                <p className={styles.signupRow}>
                  Don&apos;t have an account?{' '}
                  <a href="/signup" className={styles.link}>
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </section>

          {/* Right — hero image */}
          <section
            className={`col-12 col-lg-7 ${styles.heroCol}`}
            aria-hidden="true"
          >
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              priority
              sizes="(max-width: 992px) 100vw, 58vw"
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
            <p className={styles.heroCaption}>
              <span className={styles.heroCaptionLine}>
                Breathe in. Begin again.
              </span>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function LotusMark() {
  return (
    <svg
      className="lotus-mark"
      width="34"
      height="34"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 44c-8 0-15-6-15-13 4 3 9 4 15 4s11-1 15-4c0 7-7 13-15 13Z"
        fill="url(#lotusGrad)"
      />
      <path
        d="M24 30c-3-6-9-9-16-8 2 6 8 10 16 8Z"
        fill="url(#lotusGrad)"
        opacity="0.85"
      />
      <path
        d="M24 30c3-6 9-9 16-8-2 6-8 10-16 8Z"
        fill="url(#lotusGrad)"
        opacity="0.85"
      />
      <path
        d="M24 28c-1-8-5-13-11-16 5 8 7 13 11 16Z"
        fill="url(#lotusGrad)"
        opacity="0.65"
      />
      <path
        d="M24 28c1-8 5-13 11-16-5 8-7 13-11 16Z"
        fill="url(#lotusGrad)"
        opacity="0.65"
      />
      <path d="M24 6c2 7 2 14 0 22-2-8-2-15 0-22Z" fill="url(#lotusGrad)" />
      <defs>
        <linearGradient id="lotusGrad" x1="8" y1="6" x2="40" y2="44">
          <stop offset="0" stopColor="#F2733D" />
          <stop offset="1" stopColor="#C44E1F" />
        </linearGradient>
      </defs>
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