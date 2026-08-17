"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  BookOpen,
  Award,
  IndianRupee,
  Eye,
  EyeOff,
  Check,
  Camera,
  ShieldCheck,
  Clock3,
  Download,
} from "lucide-react";
import { userProfile, purchasedCourses, profileStats } from "@/app/data/profile";
import styles from "./page.module.css";

type Tab = "personal" | "security" | "courses";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  // Personal info form state
  const [firstName, setFirstName] = useState(userProfile.firstName);
  const [lastName, setLastName] = useState(userProfile.lastName);
  const [phone, setPhone] = useState(userProfile.phone ?? "");
  const [location, setLocation] = useState(userProfile.location ?? "");
  const [bio, setBio] = useState(userProfile.bio ?? "");
  const [personalSaved, setPersonalSaved] = useState(false);

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  // Auto-clear success banners
  useEffect(() => {
    if (!personalSaved) return;
    const t = setTimeout(() => setPersonalSaved(false), 2500);
    return () => clearTimeout(t);
  }, [personalSaved]);

  useEffect(() => {
    if (!passwordSaved) return;
    const t = setTimeout(() => setPasswordSaved(false), 2500);
    return () => clearTimeout(t);
  }, [passwordSaved]);

  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with real API call
    setPersonalSaved(true);
  };

  const passwordRules = [
    { label: "At least 8 characters", valid: newPassword.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(newPassword) },
    { label: "One number", valid: /\d/.test(newPassword) },
  ];

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (!currentPassword) {
      setPasswordError("Enter your current password.");
      return;
    }
    if (!passwordRules.every((r) => r.valid)) {
      setPasswordError("New password doesn't meet the requirements below.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation don't match.");
      return;
    }

    // TODO: replace with real API call
    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={styles.page}>
      {/* Profile header */}
      <div className={styles.headerCard}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>{userProfile.avatarInitials}</div>
          <button className={styles.avatarEditBtn} aria-label="Change photo">
            <Camera size={13} />
          </button>
        </div>

        <div className={styles.headerInfo}>
          <h1 className={styles.name}>
            {userProfile.firstName} {userProfile.lastName}
          </h1>
          <p className={styles.role}>
            {userProfile.role} • Member since {userProfile.memberSince}
          </p>
          <p className={styles.email}>
            <Mail size={13} /> {userProfile.email}
          </p>
        </div>

        <div className={styles.headerStats}>
          <div className={styles.statBadge}>
            <span className={styles.statValue}>{profileStats.totalCourses}</span>
            <span className={styles.statLabel}>Courses</span>
          </div>
          <div className={styles.statBadge}>
            <span className={styles.statValue}>{profileStats.completedCourses}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
          <div className={styles.statBadge}>
            <span className={styles.statValue}>{profileStats.certificatesEarned}</span>
            <span className={styles.statLabel}>Certificates</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "personal" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("personal")}
        >
          <User size={16} />
          Personal Info
        </button>
        <button
          className={`${styles.tab} ${activeTab === "security" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("security")}
        >
          <Lock size={16} />
          Security
        </button>
        <button
          className={`${styles.tab} ${activeTab === "courses" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("courses")}
        >
          <BookOpen size={16} />
          My Courses ({purchasedCourses.length})
        </button>
      </div>

      {/* Personal Info */}
      {activeTab === "personal" && (
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Personal information</h3>
          <p className={styles.panelSubtitle}>
            Update your name and contact details. Your email is used to sign in and can&apos;t
            be changed here.
          </p>

          <form className={styles.form} onSubmit={handleSavePersonal}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label className={styles.label}>First name</label>
                <input
                  className={styles.input}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Last name</label>
                <input
                  className={styles.input}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email address</label>
              <div className={styles.disabledInputWrap}>
                <Mail size={15} className={styles.disabledInputIcon} />
                <input className={styles.disabledInput} value={userProfile.email} disabled />
                <span className={styles.lockedTag}>
                  <Lock size={11} /> Locked
                </span>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label className={styles.label}>Phone number</label>
                <div className={styles.inputWithIcon}>
                  <Phone size={15} className={styles.inputIcon} />
                  <input
                    className={styles.input}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Location</label>
                <div className={styles.inputWithIcon}>
                  <MapPin size={15} className={styles.inputIcon} />
                  <input
                    className={styles.input}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Bio</label>
              <textarea
                className={styles.textarea}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Tell other learners a little about yourself"
                maxLength={220}
              />
              <span className={styles.charCount}>{bio.length}/220</span>
            </div>

            <div className={styles.formFooter}>
              {personalSaved && (
                <span className={styles.savedMsg}>
                  <Check size={14} /> Changes saved
                </span>
              )}
              <button type="submit" className={styles.primaryBtn}>
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Change password</h3>
          <p className={styles.panelSubtitle}>
            Choose a strong password you&apos;re not using anywhere else.
          </p>

          <form className={styles.form} onSubmit={handleSavePassword}>
            <div className={styles.field}>
              <label className={styles.label}>Current password</label>
              <div className={styles.passwordInputWrap}>
                <input
                  className={styles.input}
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowCurrent((v) => !v)}
                  aria-label={showCurrent ? "Hide password" : "Show password"}
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label className={styles.label}>New password</label>
                <div className={styles.passwordInputWrap}>
                  <input
                    className={styles.input}
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowNew((v) => !v)}
                    aria-label={showNew ? "Hide password" : "Show password"}
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Confirm new password</label>
                <input
                  className={styles.input}
                  type={showNew ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                />
              </div>
            </div>

            <ul className={styles.rulesList}>
              {passwordRules.map((rule) => (
                <li
                  key={rule.label}
                  className={`${styles.ruleItem} ${rule.valid ? styles.ruleValid : ""}`}
                >
                  <Check size={13} />
                  {rule.label}
                </li>
              ))}
            </ul>

            {passwordError && <p className={styles.errorMsg}>{passwordError}</p>}

            <div className={styles.formFooter}>
              {passwordSaved && (
                <span className={styles.savedMsg}>
                  <ShieldCheck size={14} /> Password updated
                </span>
              )}
              <button type="submit" className={styles.primaryBtn}>
                Update password
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Purchased courses */}
      {activeTab === "courses" && (
        <div className={styles.panel}>
          <div className={styles.coursesHeaderRow}>
            <div>
              <h3 className={styles.panelTitle}>My courses</h3>
              <p className={styles.panelSubtitle}>Everything you&apos;ve purchased so far.</p>
            </div>
            <div className={styles.totalSpent}>
              <IndianRupee size={14} />
              <span>{profileStats.totalSpent.toLocaleString()} total spent</span>
            </div>
          </div>

          <div className={styles.courseList}>
            {purchasedCourses.map((course) => (
              <div key={course.id} className={styles.courseRow}>
                <div className={styles.courseRowThumb} />
                <div className={styles.courseRowInfo}>
                  <h4 className={styles.courseRowTitle}>{course.title}</h4>
                  <p className={styles.courseRowInstructor}>By {course.instructor}</p>
                  <div className={styles.courseRowMeta}>
                    <span>
                      <Clock3 size={12} /> Purchased {course.purchasedOn}
                    </span>
                    <span>₹{course.pricePaid.toLocaleString()}</span>
                    <span
                      className={`${styles.statusTag} ${
                        course.status === "completed"
                          ? styles.statusCompleted
                          : styles.statusInProgress
                      }`}
                    >
                      {course.status === "completed" ? "Completed" : "In progress"}
                    </span>
                  </div>
                  {course.status !== "completed" && (
                    <div className={styles.miniProgressBar}>
                      <div
                        className={styles.miniProgressFill}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.courseRowActions}>
                  {course.certificateAvailable && (
                    <button className={styles.certBtn}>
                      <Award size={14} /> Certificate
                    </button>
                  )}
                  <Link href={`/learn/${course.id}`} className={styles.continueBtn}>
                    {course.status === "completed" ? "Review" : "Continue"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}