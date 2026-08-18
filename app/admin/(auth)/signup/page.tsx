"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Phone,
  Calendar,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import styles from "./signup.module.css";

interface FormState {
  name: string;
  email: string;
  phone: string;
  dob: string; // optional
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  captcha?: string;
  otp?: string;
}

export default function SignupPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notRobot, setNotRobot] = useState(false);

  // ---- Email verification (static / mock for now) ----
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined });
    }
    // If email changes after being verified, reset verification
    if (field === "email" && emailVerified) {
      setEmailVerified(false);
      setOtpSent(false);
      setOtpValue("");
    }
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendOtp = async () => {
    if (!isValidEmail(form.email)) {
      setErrors({ ...errors, email: "Enter a valid email first" });
      return;
    }
    setSendingOtp(true);
    // TODO: replace with real API call -> POST /api/auth/send-otp
    await new Promise((r) => setTimeout(r, 800));
    setSendingOtp(false);
    setOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    if (otpValue.trim().length !== 6) {
      setErrors({ ...errors, otp: "Enter the 6-digit code" });
      return;
    }
    setVerifyingOtp(true);
    // TODO: replace with real API call -> POST /api/auth/verify-otp
    await new Promise((r) => setTimeout(r, 800));
    setVerifyingOtp(false);
    setEmailVerified(true);
    setErrors({ ...errors, otp: undefined });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(form.email)) newErrors.email = "Enter a valid email";
    else if (!emailVerified) newErrors.email = "Please verify your email";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(form.phone.trim()))
      newErrors.phone = "Enter a valid 10-digit phone number";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!notRobot) newErrors.captcha = "Please confirm you are not a robot";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // TODO: replace with real API call -> POST /api/auth/signup
    const payload = { ...form, emailVerified };
    console.log("Signup payload:", payload);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitSuccess(true);
  };

  const handleSocialLogin = (provider: "google" | "facebook") => {
    // TODO: hook up real OAuth flow, e.g. signIn(provider) from next-auth
    console.log(`Continue with ${provider}`);
  };

  return (
    <div className={styles.page}>
      {/* Left - image / branding panel */}
      <div className={styles.leftPanel}>
        <div className={styles.leftOverlay} />
        <div className={styles.leftContent}>
          <Link href="/">
            <span className={styles.brandTag}>AYM Yoga School</span>
          </Link>
          <h2 className={styles.leftTitle}>Begin your yoga teacher journey</h2>
          <p className={styles.leftSubtitle}>
            Join thousands of students learning yoga, philosophy, and
            teaching methodology from certified instructors.
          </p>
        </div>
      </div>

      {/* Right - form panel */}
      <div className={styles.rightPanel}>
        <div className={styles.formWrap}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>Create your account</h1>
            <p className={styles.subtitle}>
              Already have an account?{" "}
              <Link href="/admin/login" className={styles.link}>
                Log in
              </Link>
            </p>
          </div>

          {submitSuccess ? (
            <div className={styles.successBox}>
              <CheckCircle2 size={40} className={styles.successIcon} />
              <h3>Account created!</h3>
              <p>Welcome aboard. You can now log in to your dashboard.</p>
            </div>
          ) : (
            <>
              {/* Social login */}
              <div className={styles.socialRow}>
                <button
                  type="button"
                  className={styles.socialBtn}
                  onClick={() => handleSocialLogin("google")}
                >
                  <FcGoogle size={18} />
                  Continue with Google
                </button>
                <button
                  type="button"
                  className={`${styles.socialBtn} ${styles.facebookBtn}`}
                  onClick={() => handleSocialLogin("facebook")}
                >
                  <FaFacebook size={18} />
                  Continue with Facebook
                </button>
              </div>

              <div className={styles.divider}>
                <span>or sign up with email</span>
              </div>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className={styles.field}>
                  <label className={styles.label}>Full Name</label>
                  <div className={styles.inputWrap}>
                    <User size={16} className={styles.inputIcon} />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className={styles.input}
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                  {errors.name && (
                    <span className={styles.errorText}>{errors.name}</span>
                  )}
                </div>

                {/* Email + verify */}
                <div className={styles.field}>
                  <label className={styles.label}>Email Address</label>
                  <div className={styles.emailRow}>
                    <div className={styles.inputWrap}>
                      <Mail size={16} className={styles.inputIcon} />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className={styles.input}
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        disabled={emailVerified}
                      />
                      {emailVerified && (
                        <CheckCircle2
                          size={16}
                          className={styles.verifiedIcon}
                        />
                      )}
                    </div>
                    {!emailVerified && (
                      <button
                        type="button"
                        className={styles.verifyBtn}
                        onClick={handleSendOtp}
                        disabled={sendingOtp || !form.email}
                      >
                        {sendingOtp ? (
                          <Loader2 size={14} className={styles.spin} />
                        ) : otpSent ? (
                          "Resend"
                        ) : (
                          "Verify"
                        )}
                      </button>
                    )}
                  </div>
                  {errors.email && (
                    <span className={styles.errorText}>{errors.email}</span>
                  )}

                  {otpSent && !emailVerified && (
                    <div className={styles.otpRow}>
                      <div className={styles.inputWrap}>
                        <ShieldCheck size={16} className={styles.inputIcon} />
                        <input
                          type="text"
                          placeholder="Enter 6-digit code"
                          className={styles.input}
                          maxLength={6}
                          value={otpValue}
                          onChange={(e) =>
                            setOtpValue(e.target.value.replace(/\D/g, ""))
                          }
                        />
                      </div>
                      <button
                        type="button"
                        className={styles.verifyBtn}
                        onClick={handleVerifyOtp}
                        disabled={verifyingOtp}
                      >
                        {verifyingOtp ? (
                          <Loader2 size={14} className={styles.spin} />
                        ) : (
                          "Confirm"
                        )}
                      </button>
                    </div>
                  )}
                  {errors.otp && (
                    <span className={styles.errorText}>{errors.otp}</span>
                  )}
                  {otpSent && !emailVerified && !errors.otp && (
                    <span className={styles.hintText}>
                      A verification code was sent to your email (demo: any 6 digits work).
                    </span>
                  )}
                </div>

                {/* Phone + DOB */}
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Phone Number</label>
                    <div className={styles.inputWrap}>
                      <Phone size={16} className={styles.inputIcon} />
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        className={styles.input}
                        maxLength={10}
                        value={form.phone}
                        onChange={(e) =>
                          handleChange("phone", e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </div>
                    {errors.phone && (
                      <span className={styles.errorText}>{errors.phone}</span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Date of Birth{" "}
                      <span className={styles.optionalTag}>(optional)</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <Calendar size={16} className={styles.inputIcon} />
                      <input
                        type="date"
                        className={styles.input}
                        value={form.dob}
                        onChange={(e) => handleChange("dob", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Password + Confirm */}
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Password</label>
                    <div className={styles.inputWrap}>
                      <Lock size={16} className={styles.inputIcon} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        className={styles.input}
                        value={form.password}
                        onChange={(e) =>
                          handleChange("password", e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className={styles.eyeBtn}
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className={styles.errorText}>{errors.password}</span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Confirm Password</label>
                    <div className={styles.inputWrap}>
                      <Lock size={16} className={styles.inputIcon} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        className={styles.input}
                        value={form.confirmPassword}
                        onChange={(e) =>
                          handleChange("confirmPassword", e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className={styles.eyeBtn}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <span className={styles.errorText}>
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>

                {/* Not a robot */}
                <div className={styles.captchaBox}>
                  <label className={styles.captchaLabel}>
                    <input
                      type="checkbox"
                      checked={notRobot}
                      onChange={(e) => {
                        setNotRobot(e.target.checked);
                        if (errors.captcha)
                          setErrors({ ...errors, captcha: undefined });
                      }}
                    />
                    <span className={styles.checkboxCustom}>
                      {notRobot && <CheckCircle2 size={14} />}
                    </span>
                    I&apos;m not a robot
                  </label>
                  <ShieldCheck size={22} className={styles.captchaLogo} />
                </div>
                {errors.captcha && (
                  <span className={styles.errorText}>{errors.captcha}</span>
                )}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className={styles.spin} />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <p className={styles.terms}>
                  By signing up, you agree to our{" "}
                  <Link href="/terms-of-service" className={styles.link}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className={styles.link}>
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}