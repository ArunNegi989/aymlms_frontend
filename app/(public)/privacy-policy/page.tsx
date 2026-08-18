'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './privacy-policy.module.css';

const LAST_UPDATED = 'August 18, 2026';

const SECTIONS = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'information-we-collect', title: '2. Information We Collect' },
  { id: 'how-we-use', title: '3. How We Use Your Information' },
  { id: 'live-class-recordings', title: '4. Live Class Recordings & Video Data' },
  { id: 'cookies', title: '5. Cookies & Tracking Technologies' },
  { id: 'sharing', title: '6. How We Share Information' },
  { id: 'payment-data', title: '7. Payment Data' },
  { id: 'security', title: '8. Data Storage & Security' },
  { id: 'retention', title: '9. Data Retention' },
  { id: 'your-rights', title: '10. Your Rights & Choices' },
  { id: 'children', title: "11. Children's Privacy" },
  { id: 'international', title: '12. International Data Transfers' },
  { id: 'changes', title: '13. Changes to This Policy' },
  { id: 'grievance', title: '14. Grievance Officer' },
  { id: 'contact', title: '15. Contact Us' },
];

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleScroll() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleTocClick(id: string) {
    setMobileNavOpen(false);
    const el = sectionRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand}>
            AYM Yoga School
          </Link>
          <div className={styles.headerRight}>
            <span className={styles.badge}>Updated {LAST_UPDATED}</span>
            <button
              type="button"
              className={styles.mobileNavToggle}
              onClick={() => setMobileNavOpen((v) => !v)}
              aria-expanded={mobileNavOpen}
              aria-controls="pp-mobile-toc"
            >
              Contents
              <ChevronIcon open={mobileNavOpen} />
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <nav id="pp-mobile-toc" className={styles.mobileToc}>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`${styles.mobileTocItem} ${activeId === s.id ? styles.tocLinkActive : ''}`}
                onClick={() => handleTocClick(s.id)}
              >
                {s.title}
              </button>
            ))}
          </nav>
        )}
      </header>

      <div className={styles.hero}>
        <span className={styles.brandTag}>Legal</span>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.subtitle}>
          This policy explains what information AYM Yoga School collects when you use our learning
          platform, how we use it, and the choices you have.
        </p>
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <nav className={styles.tocNav} aria-label="Table of contents">
            <p className={styles.tocHeading}>On this page</p>
            <ul className={styles.tocList}>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    className={`${styles.tocLink} ${activeId === s.id ? styles.tocLinkActive : ''}`}
                    onClick={() => handleTocClick(s.id)}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className={styles.content}>
          <Section
            id="introduction"
            num="1"
            title="Introduction"
            refCallback={(el) => (sectionRefs.current['introduction'] = el)}
          >
            <p>
              AYM Yoga School (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy
              and is committed to protecting the personal information you share with us through our
              learning platform (the &quot;Platform&quot;). This Privacy Policy explains what data we
              collect, how we use and protect it, and the rights you have over it.
            </p>
            <p>By using the Platform, you consent to the practices described in this policy.</p>
          </Section>

          <Section
            id="information-we-collect"
            num="2"
            title="Information We Collect"
            refCallback={(el) => (sectionRefs.current['information-we-collect'] = el)}
          >
            <p>We collect the following categories of information:</p>
            <ul className={styles.list}>
              <li><strong>Account information</strong> — name, email address, phone number, and password when you register.</li>
              <li><strong>Profile & enrollment data</strong> — course selections, batch details, progress, assignment submissions, and certificates earned.</li>
              <li><strong>Payment information</strong> — billing name, address, and transaction details processed via our third-party payment gateway (see Section 7).</li>
              <li><strong>Usage data</strong> — pages visited, videos watched, time spent on lessons, device type, browser, and IP address.</li>
              <li><strong>Communications</strong> — messages you send us for support, feedback, or during live classes (chat messages, Q&amp;A submissions).</li>
              <li><strong>Live class data</strong> — audio, video, and chat activity during live sessions, as described in Section 4.</li>
            </ul>
          </Section>

          <Section
            id="how-we-use"
            num="3"
            title="How We Use Your Information"
            refCallback={(el) => (sectionRefs.current['how-we-use'] = el)}
          >
            <ul className={styles.list}>
              <li>To create and manage your account and course enrollments.</li>
              <li>To deliver recorded classes, live sessions, and assignments, and to track your progress.</li>
              <li>To process payments and send enrollment or payment confirmations.</li>
              <li>To communicate with you about schedule changes, course updates, or support requests.</li>
              <li>To improve the Platform, including analyzing which lessons are most useful or where students face difficulty.</li>
              <li>To detect, prevent, and address technical issues, fraud, or violations of our Terms of Service.</li>
              <li>To send you optional marketing communications, which you can opt out of at any time.</li>
            </ul>
          </Section>

          <Section
            id="live-class-recordings"
            num="4"
            title="Live Class Recordings & Video Data"
            refCallback={(el) => (sectionRefs.current['live-class-recordings'] = el)}
          >
            <p>
              Live classes may be recorded for quality assurance and to make sessions available to
              students who could not attend live. Recordings may capture your video, audio, and any
              messages posted in session chat if these features are enabled on your end.
            </p>
            <p>
              Recordings are accessible only to enrolled students of the relevant course and
              authorized staff, and are retained only for as long as reasonably necessary for
              educational and record-keeping purposes as described in Section 9. If you prefer not to
              appear on camera, you may keep your video off during live sessions.
            </p>
          </Section>

          <Section
            id="cookies"
            num="5"
            title="Cookies & Tracking Technologies"
            refCallback={(el) => (sectionRefs.current['cookies'] = el)}
          >
            <p>
              We use cookies and similar technologies to keep you logged in, remember your
              preferences, and understand how you use the Platform. This includes:
            </p>
            <ul className={styles.list}>
              <li><strong>Essential cookies</strong> — required for login sessions and core functionality.</li>
              <li><strong>Analytics cookies</strong> — help us understand usage patterns to improve course content and site performance.</li>
              <li><strong>Preference cookies</strong> — remember settings like video playback quality.</li>
            </ul>
            <p>
              You can control or disable cookies through your browser settings; however, disabling
              essential cookies may affect your ability to use the Platform.
            </p>
          </Section>

          <Section
            id="sharing"
            num="6"
            title="How We Share Information"
            refCallback={(el) => (sectionRefs.current['sharing'] = el)}
          >
            <p>We do not sell your personal information. We may share information with:</p>
            <ul className={styles.list}>
              <li><strong>Service providers</strong> — payment gateways, video hosting and conferencing providers, email/SMS providers, and cloud hosting services, solely to operate the Platform.</li>
              <li><strong>Instructors</strong> — course instructors can view your enrollment, progress, and assignment submissions relevant to their course.</li>
              <li><strong>Legal & compliance</strong> — where required to comply with applicable law, regulation, legal process, or governmental request.</li>
              <li><strong>Business transfers</strong> — in connection with a merger, acquisition, or sale of assets, subject to continued protection under this policy.</li>
            </ul>
          </Section>

          <Section
            id="payment-data"
            num="7"
            title="Payment Data"
            refCallback={(el) => (sectionRefs.current['payment-data'] = el)}
          >
            <p>
              All payments are processed through PCI-DSS compliant third-party payment gateways. We
              do not store your full card number, CVV, or banking credentials on our servers. We
              retain only transaction records (amount, date, and status) necessary for invoicing,
              refunds, and accounting.
            </p>
          </Section>

          <Section
            id="security"
            num="8"
            title="Data Storage & Security"
            refCallback={(el) => (sectionRefs.current['security'] = el)}
          >
            <p>
              We use industry-standard technical and organizational measures — including encryption
              in transit, access controls, and secure hosting — to protect your data against
              unauthorized access, alteration, disclosure, or destruction. However, no method of
              transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section
            id="retention"
            num="9"
            title="Data Retention"
            refCallback={(el) => (sectionRefs.current['retention'] = el)}
          >
            <p>
              We retain your personal information for as long as your account is active or as needed
              to provide you services, comply with legal obligations, resolve disputes, and enforce
              our agreements. Live class recordings are generally retained for the duration of the
              relevant course plus a reasonable review period, after which they may be archived or
              deleted.
            </p>
          </Section>

          <Section
            id="your-rights"
            num="10"
            title="Your Rights & Choices"
            refCallback={(el) => (sectionRefs.current['your-rights'] = el)}
          >
            <p>Depending on your location, you may have the right to:</p>
            <ul className={styles.list}>
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate or incomplete data.</li>
              <li>Request deletion of your personal information, subject to legal and contractual retention requirements.</li>
              <li>Withdraw consent for optional data uses, such as marketing communications.</li>
              <li>Request a copy of your data in a portable format.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us using the details in Section 15. We will
              respond within a reasonable timeframe as required by applicable law.
            </p>
          </Section>

          <Section
            id="children"
            num="11"
            title="Children's Privacy"
            refCallback={(el) => (sectionRefs.current['children'] = el)}
          >
            <p>
              The Platform is not intended for children under 16. We do not knowingly collect
              personal information from children under 16 without verified parental or guardian
              consent. If you believe a child has provided us personal data without appropriate
              consent, please contact us so we can remove it.
            </p>
          </Section>

          <Section
            id="international"
            num="12"
            title="International Data Transfers"
            refCallback={(el) => (sectionRefs.current['international'] = el)}
          >
            <p>
              Your information may be stored or processed on servers located outside your country of
              residence, including in countries where our service providers operate. Where this
              occurs, we take reasonable steps to ensure your data continues to receive an adequate
              level of protection consistent with this policy.
            </p>
          </Section>

          <Section
            id="changes"
            num="13"
            title="Changes to This Policy"
            refCallback={(el) => (sectionRefs.current['changes'] = el)}
          >
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices or for legal, operational, or regulatory reasons. Material changes will be
              communicated via email or an in-Platform notice. The &quot;Updated&quot; date at the
              top of this page reflects the most recent revision.
            </p>
          </Section>

          <Section
            id="grievance"
            num="14"
            title="Grievance Officer"
            refCallback={(el) => (sectionRefs.current['grievance'] = el)}
          >
            <p>
              In accordance with applicable Indian data protection and information technology
              regulations, we have designated a Grievance Officer to address any concerns or
              complaints regarding this Privacy Policy or the handling of your personal data.
            </p>
            <ul className={styles.list}>
              <li>Name: Grievance Officer, AYM Yoga School</li>
              <li>
                Email:{' '}
                <a href="mailto:grievance@aymyogaschool.com" className={styles.inlineLink}>
                  grievance@aymyogaschool.com
                </a>
              </li>
              <li>Location: Dehradun, Uttarakhand, India</li>
            </ul>
            <p>We aim to acknowledge grievances within 24 hours and resolve them within 30 days.</p>
          </Section>

          <Section
            id="contact"
            num="15"
            title="Contact Us"
            refCallback={(el) => (sectionRefs.current['contact'] = el)}
          >
            <p>
              If you have any questions about this Privacy Policy or how we handle your data, please
              contact us at{' '}
              <a href="mailto:support@aymyogaschool.com" className={styles.inlineLink}>
                support@aymyogaschool.com
              </a>
              .
            </p>
          </Section>

          <div className={styles.footerNote}>
            <p>
              This policy should be read alongside our{' '}
              <Link href="/terms-of-service" className={styles.inlineLink}>Terms of Service</Link>.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}

function Section({
  id,
  num,
  title,
  children,
  refCallback,
}: {
  id: string;
  num: string;
  title: string;
  children: React.ReactNode;
  refCallback: (el: HTMLElement | null) => void;
}) {
  return (
    <section id={id} ref={refCallback} className={styles.section}>
      <span className={styles.sectionNumber}>{num}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}