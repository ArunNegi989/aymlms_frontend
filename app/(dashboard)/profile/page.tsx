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
  RefreshCcw,
  Video,
  Receipt,
  TrendingUp,
  CheckCircle2,
  XCircle,
  QrCode,
  CalendarDays,
  PlayCircle,
  BellRing,
  Layers,
  History,
  Inbox,
} from "lucide-react";
import { userProfile, purchasedCourses, profileStats } from "@/app/data/profile";
import styles from "./page.module.css";

type Tab =
  | "personal"
  | "security"
  | "purchased"
  | "subscriptions"
  | "liveClasses"
  | "certificates"
  | "payments"
  | "progress";

/* ------------------------------------------------------------------ */
/*  TODO: move all the mock data below into app/data/profile.ts (or   */
/*  fetch it from your API) once real endpoints are ready.            */
/* ------------------------------------------------------------------ */

type SubscriptionStatus = "active" | "expired" | "cancelled";

interface Subscription {
  id: string;
  planName: string;
  description: string;
  status: SubscriptionStatus;
  startDate: string;
  renewalDate: string;
  price: number;
  billingCycle: "Monthly" | "Yearly";
  autoRenew: boolean;
}

const subscriptions: Subscription[] = [
  {
    id: "sub_1",
    planName: "All-Access Yoga Pass",
    description: "Unlimited access to all recorded classes + weekly live sessions",
    status: "active",
    startDate: "12 Feb 2026",
    renewalDate: "12 Sep 2026",
    price: 1499,
    billingCycle: "Monthly",
    autoRenew: true,
  },
  {
    id: "sub_2",
    planName: "TTC Alumni Circle",
    description: "Continuing education library for certified teachers",
    status: "active",
    startDate: "01 Jan 2026",
    renewalDate: "01 Jan 2027",
    price: 5999,
    billingCycle: "Yearly",
    autoRenew: false,
  },
  {
    id: "sub_3",
    planName: "Meditation Basics Pack",
    description: "Guided meditation series, 30-day access",
    status: "expired",
    startDate: "10 May 2025",
    renewalDate: "09 Jun 2025",
    price: 499,
    billingCycle: "Monthly",
    autoRenew: false,
  },
];

interface LiveClass {
  id: string;
  title: string;
  courseTitle: string;
  instructor: string;
  day: string;
  month: string;
  time: string;
  duration: string;
  platform: string;
  isLive: boolean;
}

const upcomingLiveClasses: LiveClass[] = [
  {
    id: "lc_1",
    title: "Pranayama & Breath Control",
    courseTitle: "200Hr Yoga Teacher Training",
    instructor: "Yogacharya Devendra",
    day: "19",
    month: "Aug",
    time: "7:00 AM – 8:15 AM",
    duration: "75 min",
    platform: "Zoom",
    isLive: true,
  },
  {
    id: "lc_2",
    title: "Adjustments & Alignment Workshop",
    courseTitle: "300Hr Advanced TTC",
    instructor: "Anjali Rawat",
    day: "21",
    month: "Aug",
    time: "6:30 PM – 8:00 PM",
    duration: "90 min",
    platform: "Google Meet",
    isLive: false,
  },
  {
    id: "lc_3",
    title: "Doubt Clearing + Q&A",
    courseTitle: "100Hr Foundation Course",
    instructor: "Yogacharya Devendra",
    day: "24",
    month: "Aug",
    time: "5:00 PM – 5:45 PM",
    duration: "45 min",
    platform: "Zoom",
    isLive: false,
  },
];

interface Certificate {
  id: string;
  courseTitle: string;
  instructor: string;
  issueDate: string;
  certificateId: string;
  grade?: string;
}

const certificates: Certificate[] = [
  {
    id: "cert_1",
    courseTitle: "100Hr Foundation Yoga TTC",
    instructor: "Yogacharya Devendra",
    issueDate: "28 Jun 2025",
    certificateId: "AYM-100-2025-0417",
    grade: "Distinction",
  },
  {
    id: "cert_2",
    courseTitle: "Prenatal Yoga Specialization",
    instructor: "Anjali Rawat",
    issueDate: "14 Mar 2025",
    certificateId: "AYM-PNY-2025-0093",
    grade: "Pass",
  },
];

type PaymentStatus = "success" | "failed" | "pending";

interface PaymentRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  invoiceAvailable: boolean;
}

const paymentHistory: PaymentRecord[] = [
  {
    id: "pay_1",
    date: "12 Aug 2026",
    description: "All-Access Yoga Pass — Monthly renewal",
    amount: 1499,
    method: "UPI",
    status: "success",
    invoiceAvailable: true,
  },
  {
    id: "pay_2",
    date: "01 Jan 2026",
    description: "TTC Alumni Circle — Yearly plan",
    amount: 5999,
    method: "Credit Card",
    status: "success",
    invoiceAvailable: true,
  },
  {
    id: "pay_3",
    date: "18 Nov 2025",
    description: "300Hr Advanced TTC — Course purchase",
    amount: 24999,
    method: "Netbanking",
    status: "success",
    invoiceAvailable: true,
  },
  {
    id: "pay_4",
    date: "05 Jul 2025",
    description: "Meditation Basics Pack — Renewal attempt",
    amount: 499,
    method: "UPI",
    status: "failed",
    invoiceAvailable: false,
  },
  {
    id: "pay_5",
    date: "28 Jun 2025",
    description: "100Hr Foundation Yoga TTC — Course purchase",
    amount: 14999,
    method: "Debit Card",
    status: "success",
    invoiceAvailable: true,
  },
];

interface CourseProgressItem {
  id: string;
  title: string;
  instructor: string;
  totalModules: number;
  completedModules: number;
  progress: number;
  lastAccessed: string;
}

const courseProgress: CourseProgressItem[] = [
  {
    id: "cp_1",
    title: "200Hr Yoga Teacher Training",
    instructor: "Yogacharya Devendra",
    totalModules: 24,
    completedModules: 16,
    progress: 67,
    lastAccessed: "Today",
  },
  {
    id: "cp_2",
    title: "300Hr Advanced TTC",
    instructor: "Anjali Rawat",
    totalModules: 30,
    completedModules: 9,
    progress: 30,
    lastAccessed: "2 days ago",
  },
  {
    id: "cp_3",
    title: "100Hr Foundation Yoga TTC",
    instructor: "Yogacharya Devendra",
    totalModules: 18,
    completedModules: 18,
    progress: 100,
    lastAccessed: "28 Jun 2025",
  },
];

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "purchased", label: "Purchased Courses", icon: BookOpen },
  { id: "subscriptions", label: "Active Subscriptions", icon: RefreshCcw },
  { id: "liveClasses", label: "Upcoming Live Classes", icon: Video },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "payments", label: "Payment History", icon: Receipt },
  { id: "progress", label: "Course Progress", icon: TrendingUp },
];

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Inbox;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <Icon size={22} />
      </div>
      <p className={styles.emptyTitle}>{title}</p>
      <p className={styles.emptyDesc}>{description}</p>
    </div>
  );
}

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

  const totalPaid = paymentHistory
    .filter((p) => p.status === "success")
    .reduce((sum, p) => sum + p.amount, 0);

  const successfulPayments = paymentHistory.filter((p) => p.status === "success").length;

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
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`${styles.tab} ${activeTab === id ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(id)}
          >
            <Icon size={16} />
            {label}
            {id === "purchased" && ` (${purchasedCourses.length})`}
          </button>
        ))}
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
      {activeTab === "purchased" && (
        <div className={styles.panel}>
          <div className={styles.coursesHeaderRow}>
            <div>
              <h3 className={styles.panelTitle}>Purchased courses</h3>
              <p className={styles.panelSubtitle}>Everything you&apos;ve purchased so far.</p>
            </div>
            <div className={styles.totalSpent}>
              <IndianRupee size={14} />
              <span>{profileStats.totalSpent.toLocaleString()} total spent</span>
            </div>
          </div>

          {purchasedCourses.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="No courses yet"
              description="Courses you purchase will show up here with their purchase history."
            />
          ) : (
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
          )}
        </div>
      )}

      {/* Active subscriptions */}
      {activeTab === "subscriptions" && (
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Active subscriptions</h3>
          <p className={styles.panelSubtitle}>
            Manage your recurring plans, renewal dates, and auto-renew settings.
          </p>

          {subscriptions.length === 0 ? (
            <EmptyState
              icon={RefreshCcw}
              title="No subscriptions"
              description="Your active plans and their renewal dates will appear here."
            />
          ) : (
            <div className={styles.subscriptionGrid}>
              {subscriptions.map((sub) => (
                <div key={sub.id} className={styles.subscriptionCard}>
                  <div className={styles.subscriptionTop}>
                    <span className={styles.planName}>{sub.planName}</span>
                    <span
                      className={`${styles.statusPill} ${
                        sub.status === "active"
                          ? styles.statusActive
                          : sub.status === "expired"
                          ? styles.statusExpired
                          : styles.statusCancelled
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <p className={styles.planDesc}>{sub.description}</p>

                  <div className={styles.subscriptionMeta}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Started</span>
                      <span className={styles.metaValue}>{sub.startDate}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>
                        {sub.status === "expired" ? "Expired on" : "Renews on"}
                      </span>
                      <span className={styles.metaValue}>{sub.renewalDate}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Billing</span>
                      <span className={styles.metaValue}>{sub.billingCycle}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Price</span>
                      <span className={styles.metaValue}>₹{sub.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className={styles.subscriptionFooter}>
                    <span className={styles.autoRenewTag}>
                      {sub.autoRenew ? (
                        <CheckCircle2 size={14} color="#4caf50" />
                      ) : (
                        <XCircle size={14} color="#c62828" />
                      )}
                      Auto-renew {sub.autoRenew ? "on" : "off"}
                    </span>
                    <button className={styles.manageBtn}>Manage plan</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upcoming live classes */}
      {activeTab === "liveClasses" && (
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Upcoming live classes</h3>
          <p className={styles.panelSubtitle}>
            Sessions scheduled across your enrolled courses.
          </p>

          {upcomingLiveClasses.length === 0 ? (
            <EmptyState
              icon={Video}
              title="No live classes scheduled"
              description="Once an instructor schedules a live session for your course, it'll show up here."
            />
          ) : (
            <div className={styles.liveClassList}>
              {upcomingLiveClasses.map((lc) => (
                <div key={lc.id} className={styles.liveClassRow}>
                  <div className={styles.dateBox}>
                    <span className={styles.dateDay}>{lc.day}</span>
                    <span className={styles.dateMonth}>{lc.month}</span>
                  </div>
                  <div className={styles.liveClassInfo}>
                    <h4 className={styles.liveClassTitle}>{lc.title}</h4>
                    <p className={styles.liveClassCourse}>{lc.courseTitle} • {lc.instructor}</p>
                    <div className={styles.liveClassMeta}>
                      <span>
                        <Clock3 size={12} /> {lc.time}
                      </span>
                      <span>
                        <CalendarDays size={12} /> {lc.duration}
                      </span>
                      <span>
                        <Video size={12} /> {lc.platform}
                      </span>
                      {lc.isLive && (
                        <span>
                          <i className={styles.liveDot} /> Live now
                        </span>
                      )}
                    </div>
                  </div>
                  {lc.isLive ? (
                    <button className={`${styles.joinBtn} ${styles.joinBtnLive}`}>
                      <PlayCircle size={14} /> Join now
                    </button>
                  ) : (
                    <button className={styles.reminderBtn}>
                      <BellRing size={14} /> Set reminder
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Certificates */}
      {activeTab === "certificates" && (
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Certificates</h3>
          <p className={styles.panelSubtitle}>
            Download or verify certificates for courses you&apos;ve completed.
          </p>

          {certificates.length === 0 ? (
            <EmptyState
              icon={Award}
              title="No certificates yet"
              description="Complete a course to earn your first certificate."
            />
          ) : (
            <div className={styles.certGrid}>
              {certificates.map((cert) => (
                <div key={cert.id} className={styles.certCard}>
                  <div className={styles.certIconWrap}>
                    <Award size={20} />
                  </div>
                  <h4 className={styles.certCourseTitle}>{cert.courseTitle}</h4>
                  <p className={styles.certInstructor}>By {cert.instructor}</p>

                  <div className={styles.certMetaRow}>
                    <span>Issued {cert.issueDate}</span>
                    {cert.grade && <span>{cert.grade}</span>}
                  </div>
                  <div className={styles.certMetaRow} style={{ borderTop: "none", paddingTop: 0 }}>
                    <span className={styles.certId}>{cert.certificateId}</span>
                  </div>

                  <div className={styles.certActions}>
                    <button className={styles.certDownloadBtn}>
                      <Download size={13} /> Download
                    </button>
                    <button className={styles.certVerifyBtn}>
                      <QrCode size={13} /> Verify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Payment history */}
      {activeTab === "payments" && (
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Payment history</h3>
          <p className={styles.panelSubtitle}>
            All transactions across course purchases and subscriptions.
          </p>

          <div className={styles.paymentSummary}>
            <div className={styles.paymentSummaryCard}>
              <span className={styles.paymentSummaryLabel}>Total paid</span>
              <span className={styles.paymentSummaryValue}>₹{totalPaid.toLocaleString()}</span>
            </div>
            <div className={styles.paymentSummaryCard}>
              <span className={styles.paymentSummaryLabel}>Successful payments</span>
              <span className={styles.paymentSummaryValue}>{successfulPayments}</span>
            </div>
            <div className={styles.paymentSummaryCard}>
              <span className={styles.paymentSummaryLabel}>Total transactions</span>
              <span className={styles.paymentSummaryValue}>{paymentHistory.length}</span>
            </div>
          </div>

          {paymentHistory.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="No payments yet"
              description="Your transaction history will appear here."
            />
          ) : (
            <div className={styles.paymentList}>
              {paymentHistory.map((p) => (
                <div key={p.id} className={styles.paymentRow}>
                  <div className={styles.paymentIconWrap}>
                    <IndianRupee size={16} />
                  </div>
                  <div className={styles.paymentInfo}>
                    <p className={styles.paymentDesc}>{p.description}</p>
                    <span className={styles.paymentMeta}>
                      {p.date} • {p.method}
                    </span>
                  </div>
                  <span
                    className={`${styles.paymentStatusPill} ${
                      p.status === "success"
                        ? styles.paymentSuccess
                        : p.status === "failed"
                        ? styles.paymentFailed
                        : styles.paymentPending
                    }`}
                  >
                    {p.status}
                  </span>
                  <span className={styles.paymentAmount}>₹{p.amount.toLocaleString()}</span>
                  {p.invoiceAvailable && (
                    <button className={styles.invoiceBtn}>
                      <Download size={12} /> Invoice
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Course progress */}
      {activeTab === "progress" && (
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Course progress</h3>
          <p className={styles.panelSubtitle}>
            Track how far along you are in each of your enrolled courses.
          </p>

          {courseProgress.length === 0 ? (
            <EmptyState
              icon={TrendingUp}
              title="No progress to show"
              description="Start a course and your progress will be tracked here."
            />
          ) : (
            <div className={styles.progressList}>
              {courseProgress.map((cp) => (
                <div key={cp.id} className={styles.progressCard}>
                  <div className={styles.progressTop}>
                    <div>
                      <h4 className={styles.progressTitle}>{cp.title}</h4>
                      <p className={styles.progressInstructor}>By {cp.instructor}</p>
                    </div>
                    <span className={styles.progressPercent}>{cp.progress}%</span>
                  </div>

                  <div className={styles.progressBarLarge}>
                    <div
                      className={styles.progressBarLargeFill}
                      style={{ width: `${cp.progress}%` }}
                    />
                  </div>

                  <div className={styles.progressFooter}>
                    <div className={styles.progressStats}>
                      <span>
                        <Layers size={12} /> {cp.completedModules}/{cp.totalModules} modules
                      </span>
                      <span>
                        <History size={12} /> Last accessed {cp.lastAccessed}
                      </span>
                    </div>
                    <Link href={`/learn/${cp.id}`} className={styles.continueBtnSmall}>
                      {cp.progress === 100 ? "Review course" : "Continue learning"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}