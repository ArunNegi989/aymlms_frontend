'use client';

import { useState, useRef, type FormEvent, type KeyboardEvent, type ClipboardEvent } from 'react';
import Link from 'next/link';
import styles from './forgot-password.module.css';

type Step = 'email' | 'otp' | 'reset' | 'success';

const OTP_LENGTH = 6;

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  // ---------- Step 1: Email ----------
  async function handleEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Enter your registered email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Wire this up to your API, e.g.:
      // const res = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // if (!res.ok) throw new Error('No account found with this email.');
      await new Promise((resolve) => setTimeout(resolve, 700));

      setStep('otp');
      startResendTimer();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // ---------- Step 2: OTP ----------
  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return; // digits only

    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);

    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;

    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((digit, i) => (next[i] = digit));
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
  }

  function startResendTimer() {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  async function handleResendOtp() {
    if (resendTimer > 0) return;
    setError(null);
    try {
      // await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      startResendTimer();
    } catch {
      setError('Could not resend OTP. Try again.');
    }
  }

  async function handleOtpSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const code = otp.join('');
    if (code.length !== OTP_LENGTH) {
      setError('Enter the complete 6-digit code.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Wire this up to your API, e.g.:
      // const res = await fetch('/api/auth/verify-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, otp: code }),
      // });
      // if (!res.ok) throw new Error('Invalid or expired OTP.');
      await new Promise((resolve) => setTimeout(resolve, 700));

      setStep('reset');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid or expired OTP.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // ---------- Step 3: Reset password ----------
  async function handleResetSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!newPassword || !confirmPassword) {
      setError('Fill in both password fields.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Wire this up to your API, e.g.:
      // const res = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, otp: otp.join(''), newPassword }),
      // });
      // if (!res.ok) throw new Error('Could not reset password. Try again.');
      await new Promise((resolve) => setTimeout(resolve, 700));

      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      {/* Left — image / branding panel */}
      <section className={styles.leftPanel}>
        <div className={styles.leftOverlay} />
        <div className={styles.leftContent}>
          <Link href="/">
          <span className={styles.brandTag}>AYM Yoga School</span>
          </Link>
          <h1 className={styles.leftTitle}>Let&apos;s get you back in</h1>
          <p className={styles.leftSubtitle}>
            Reset your password in a few quick steps and get back to your practice.
          </p>
        </div>
      </section>

      {/* Right — form panel */}
      <section className={styles.rightPanel}>
        <div className={styles.formWrap}>
          {step === 'email' && (
            <>
              <div className={styles.formHeader}>
                <h2 className={styles.title}>Forgot password?</h2>
                <p className={styles.subtitle}>
                  Enter your email and we&apos;ll send you a verification code
                </p>
              </div>

              <form className={styles.form} onSubmit={handleEmailSubmit} noValidate>
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

                {error && <p className={styles.errorText}>{error}</p>}

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting && <LoaderIcon className={styles.spin} />}
                  {isSubmitting ? 'Sending code…' : 'Send verification code'}
                </button>

                <p className={styles.terms}>
                  Remembered your password?{' '}
                  <Link href="/admin/login" className={styles.link}>
                    Back to login
                  </Link>
                </p>
              </form>
            </>
          )}

          {step === 'otp' && (
            <>
              <div className={styles.formHeader}>
                <h2 className={styles.title}>Check your inbox</h2>
                <p className={styles.subtitle}>
                  We&apos;ve sent a 6-digit code to <strong>{email}</strong>
                </p>
              </div>

              <form className={styles.form} onSubmit={handleOtpSubmit} noValidate>
                <div className={styles.field}>
                  <label className={styles.label}>Verification code</label>
                  <div className={styles.otpRow} onPaste={handleOtpPaste}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          otpRefs.current[i] = el;
                        }}
                        inputMode="numeric"
                        maxLength={1}
                        className={styles.otpBox}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      />
                    ))}
                  </div>
                  <p className={styles.hintText}>
                    Didn&apos;t get it?{' '}
                    <button
                      type="button"
                      className={styles.link}
                      onClick={handleResendOtp}
                      disabled={resendTimer > 0}
                      style={resendTimer > 0 ? { color: '#aaa', cursor: 'not-allowed' } : undefined}
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend code'}
                    </button>
                  </p>
                </div>

                {error && <p className={styles.errorText}>{error}</p>}

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting && <LoaderIcon className={styles.spin} />}
                  {isSubmitting ? 'Verifying…' : 'Verify code'}
                </button>

                <p className={styles.terms}>
                  Wrong email?{' '}
                  <button
                    type="button"
                    className={styles.link}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onClick={() => {
                      setStep('email');
                      setOtp(Array(OTP_LENGTH).fill(''));
                      setError(null);
                    }}
                  >
                    Change it
                  </button>
                </p>
              </form>
            </>
          )}

          {step === 'reset' && (
            <>
              <div className={styles.formHeader}>
                <h2 className={styles.title}>Set a new password</h2>
                <p className={styles.subtitle}>Make sure it&apos;s at least 8 characters long</p>
              </div>

              <form className={styles.form} onSubmit={handleResetSubmit} noValidate>
                <div className={styles.field}>
                  <label htmlFor="newPassword" className={styles.label}>
                    New password
                  </label>
                  <div className={styles.inputWrap}>
                    <LockIcon className={styles.inputIcon} />
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Enter new password"
                      className={styles.input}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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

                <div className={styles.field}>
                  <label htmlFor="confirmPassword" className={styles.label}>
                    Confirm password
                  </label>
                  <div className={styles.inputWrap}>
                    <LockIcon className={styles.inputIcon} />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Re-enter new password"
                      className={styles.input}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.eyeBtn}
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showConfirmPassword}
                    >
                      {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                {error && <p className={styles.errorText}>{error}</p>}

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting && <LoaderIcon className={styles.spin} />}
                  {isSubmitting ? 'Updating…' : 'Reset password'}
                </button>
              </form>
            </>
          )}

          {step === 'success' && (
            <div className={styles.successBox}>
              <CheckCircleIcon className={styles.successIcon} />
              <h3>Password updated</h3>
              <p>Your password has been changed successfully.</p>
              <Link href="/admin/login" className={styles.submitBtn} style={{ marginTop: 12, textDecoration: 'none' }}>
                Back to login
              </Link>
            </div>
          )}
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

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}