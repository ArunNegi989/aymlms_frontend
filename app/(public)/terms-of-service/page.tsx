'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './terms-of-service.module.css';

const LAST_UPDATED = 'August 18, 2026';

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'eligibility', title: '2. Eligibility' },
  { id: 'account', title: '3. Account Registration & Security' },
  { id: 'services', title: '4. Description of Services' },
  { id: 'enrollment', title: '5. Course Enrollment & Fees' },
  { id: 'live-classes', title: '6. Live Classes' },
  { id: 'assignments', title: '7. Assignments & Certificates' },
  { id: 'conduct', title: '8. User Conduct' },
  { id: 'ip', title: '9. Intellectual Property' },
  { id: 'health', title: '10. Health & Safety Disclaimer' },
  { id: 'third-party', title: '11. Third-Party Services' },
  { id: 'warranties', title: '12. Disclaimer of Warranties' },
  { id: 'liability', title: '13. Limitation of Liability' },
  { id: 'termination', title: '14. Suspension & Termination' },
  { id: 'governing-law', title: '15. Governing Law' },
  { id: 'changes', title: '16. Changes to These Terms' },
  { id: 'contact', title: '17. Contact Us' },
];

export default function TermsOfServicePage() {
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
              aria-controls="tos-mobile-toc"
            >
              Contents
              <ChevronIcon open={mobileNavOpen} />
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <nav id="tos-mobile-toc" className={styles.mobileToc}>
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
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.subtitle}>
          These terms govern your use of the AYM Yoga School learning platform, including recorded
          classes, live sessions, and assignments. Please read them carefully before enrolling.
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
            id="acceptance"
            num="1"
            title="Acceptance of Terms"
            refCallback={(el) => (sectionRefs.current['acceptance'] = el)}
          >
            <p>
              By creating an account, enrolling in a course, or otherwise accessing the AYM Yoga
              School learning platform (the &quot;Platform&quot;), you agree to be bound by these
              Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do
              not use the Platform.
            </p>
            <p>
              These Terms form a legally binding agreement between you and AYM Yoga School. We may
              update these Terms from time to time as described in Section 16, and your continued
              use of the Platform constitutes acceptance of the updated Terms.
            </p>
          </Section>

          <Section
            id="eligibility"
            num="2"
            title="Eligibility"
            refCallback={(el) => (sectionRefs.current['eligibility'] = el)}
          >
            <p>
              You must be at least 16 years old to create an account. If you are between 16 and 18
              years of age, you may only use the Platform under the supervision of a parent or legal
              guardian who agrees to these Terms on your behalf.
            </p>
            <p>
              By registering, you confirm that all information you provide is accurate, current, and
              complete, and that you have the legal capacity to enter into this agreement.
            </p>
          </Section>

          <Section
            id="account"
            num="3"
            title="Account Registration & Security"
            refCallback={(el) => (sectionRefs.current['account'] = el)}
          >
            <ul className={styles.list}>
              <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li>You are responsible for all activity that occurs under your account.</li>
              <li>Notify us immediately at the contact details in Section 17 if you suspect unauthorized use of your account.</li>
              <li>One account may not be shared across multiple individuals; course access is personal and non-transferable.</li>
              <li>We reserve the right to suspend accounts that show signs of credential sharing or fraudulent activity.</li>
            </ul>
          </Section>

          <Section
            id="services"
            num="4"
            title="Description of Services"
            refCallback={(el) => (sectionRefs.current['services'] = el)}
          >
            <p>The Platform provides access to yoga teacher training and wellness education, including:</p>
            <ul className={styles.list}>
              <li><strong>Recorded Classes</strong> — pre-recorded video lessons available on-demand within your enrollment period.</li>
              <li><strong>Live Classes</strong> — scheduled, instructor-led sessions conducted via video conferencing.</li>
              <li><strong>Assignments</strong> — practice tasks, reflections, or assessments submitted through the Platform for instructor review.</li>
              <li><strong>Certificates</strong> — issued upon successful completion of applicable course requirements.</li>
            </ul>
            <p>
              We may add, modify, or discontinue features of the Platform at any time. We will make
              reasonable efforts to notify enrolled students of material changes affecting active
              courses.
            </p>
          </Section>

          <Section
            id="enrollment"
            num="5"
            title="Course Enrollment & Fees"
            refCallback={(el) => (sectionRefs.current['enrollment'] = el)}
          >
            <ul className={styles.list}>
              <li>Course fees are displayed at the time of enrollment and must be paid in full (or per an agreed installment plan) to access course content.</li>
              <li>Prices are subject to change, but changes will not affect fees already paid for an active enrollment.</li>
              <li>Payments are processed through third-party payment gateways; we do not store your full card or banking details.</li>
              <li>
                <strong>Refunds:</strong> Refund eligibility, timelines, and applicable deductions are set out in our separate Refund Policy, which forms part of these Terms. Where no such policy is published, refund requests are evaluated on a case-by-case basis and must be raised within 7 days of enrollment and before accessing more than 20% of course content.
              </li>
              <li>Seat availability for batch-based courses is limited and confirmed strictly on a first-come, first-served basis upon successful payment.</li>
            </ul>
          </Section>

          <Section
            id="live-classes"
            num="6"
            title="Live Classes"
            refCallback={(el) => (sectionRefs.current['live-classes'] = el)}
          >
            <ul className={styles.list}>
              <li>Live class schedules are published in advance and are subject to change due to instructor availability or unforeseen circumstances; we will notify you of any rescheduling.</li>
              <li>Live sessions may be recorded for quality assurance and for the benefit of enrolled students who could not attend live. By joining a live class, you consent to being recorded, including your audio and video if enabled.</li>
              <li>You are responsible for having a stable internet connection and compatible device to join live sessions; we are not liable for missed content due to connectivity issues on your end.</li>
              <li>Disruptive, abusive, or unsafe behavior during live sessions may result in removal from the session and suspension of your account.</li>
            </ul>
          </Section>

          <Section
            id="assignments"
            num="7"
            title="Assignments & Certificates"
            refCallback={(el) => (sectionRefs.current['assignments'] = el)}
          >
            <p>
              Assignments submitted through the Platform are reviewed by course instructors and must
              reflect your own original work. Certificates of completion are issued only when all
              course requirements, including minimum attendance and assignment submission criteria,
              have been met.
            </p>
            <p>
              Certificates are provided for educational purposes and do not, by themselves, guarantee
              employment, certification with any external federation or body, or any specific
              professional outcome.
            </p>
          </Section>

          <Section
            id="conduct"
            num="8"
            title="User Conduct"
            refCallback={(el) => (sectionRefs.current['conduct'] = el)}
          >
            <p>You agree not to:</p>
            <ul className={styles.list}>
              <li>Share, resell, record, download, or redistribute course content without written permission.</li>
              <li>Attempt to bypass access controls, security features, or enrollment restrictions on the Platform.</li>
              <li>Upload harmful code, spam, or content that infringes on the rights of others.</li>
              <li>Harass, threaten, or discriminate against instructors or fellow students.</li>
              <li>Use the Platform for any unlawful purpose or in violation of applicable regulations.</li>
            </ul>
            <p>Violation of this section may result in immediate suspension or termination of your account without refund.</p>
          </Section>

          <Section
            id="ip"
            num="9"
            title="Intellectual Property"
            refCallback={(el) => (sectionRefs.current['ip'] = el)}
          >
            <p>
              All course materials, including recorded videos, live session content, presentations,
              written materials, logos, and branding, are the property of AYM Yoga School or its
              licensors and are protected by applicable intellectual property laws.
            </p>
            <p>
              Enrollment grants you a limited, non-exclusive, non-transferable license to access
              course content for personal, non-commercial learning purposes during your enrollment
              period. No other rights are granted.
            </p>
          </Section>

          <Section
            id="health"
            num="10"
            title="Health & Safety Disclaimer"
            refCallback={(el) => (sectionRefs.current['health'] = el)}
          >
            <p>
              Yoga and physical practice carry inherent risks. By enrolling, you confirm that you are
              physically fit to participate, or that you have consulted a qualified medical
              professional before beginning any new physical practice, especially if you are
              pregnant, recovering from injury, or have a pre-existing medical condition.
            </p>
            <p>
              Content on the Platform is for educational purposes only and is not a substitute for
              professional medical advice, diagnosis, or treatment. Always practice within your own
              limits and stop immediately if you experience pain or discomfort. AYM Yoga School is
              not liable for any injury sustained while following instruction provided through the
              Platform.
            </p>
          </Section>

          <Section
            id="third-party"
            num="11"
            title="Third-Party Services"
            refCallback={(el) => (sectionRefs.current['third-party'] = el)}
          >
            <p>
              The Platform may rely on third-party services for payments, video hosting, and
              communication (for example, payment gateways and video conferencing providers). Your
              use of such services is also subject to their respective terms and privacy policies. We
              are not responsible for the availability or performance of third-party services.
            </p>
          </Section>

          <Section
            id="warranties"
            num="12"
            title="Disclaimer of Warranties"
            refCallback={(el) => (sectionRefs.current['warranties'] = el)}
          >
            <p>
              The Platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis
              without warranties of any kind, whether express or implied, including but not limited
              to warranties of merchantability, fitness for a particular purpose, or
              non-infringement. We do not guarantee that the Platform will be uninterrupted, secure,
              or error-free.
            </p>
          </Section>

          <Section
            id="liability"
            num="13"
            title="Limitation of Liability"
            refCallback={(el) => (sectionRefs.current['liability'] = el)}
          >
            <p>
              To the maximum extent permitted by law, AYM Yoga School and its instructors, employees,
              and affiliates shall not be liable for any indirect, incidental, special, or
              consequential damages arising from your use of the Platform. Our total liability for
              any claim arising out of these Terms shall not exceed the amount you paid for the
              relevant course in the twelve months preceding the claim.
            </p>
          </Section>

          <Section
            id="termination"
            num="14"
            title="Suspension & Termination"
            refCallback={(el) => (sectionRefs.current['termination'] = el)}
          >
            <p>
              We may suspend or terminate your access to the Platform, with or without notice, if you
              violate these Terms, engage in fraudulent activity, or misuse the Platform in a manner
              that harms other users or AYM Yoga School. You may stop using the Platform at any time;
              however, this does not entitle you to a refund except as described in Section 5.
            </p>
          </Section>

          <Section
            id="governing-law"
            num="15"
            title="Governing Law"
            refCallback={(el) => (sectionRefs.current['governing-law'] = el)}
          >
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India,
              without regard to conflict of law principles. Any disputes arising under these Terms
              shall be subject to the exclusive jurisdiction of the courts of Dehradun, Uttarakhand.
            </p>
          </Section>

          <Section
            id="changes"
            num="16"
            title="Changes to These Terms"
            refCallback={(el) => (sectionRefs.current['changes'] = el)}
          >
            <p>
              We may revise these Terms from time to time. Material changes will be notified to
              enrolled students via email or an in-Platform notice. The &quot;Updated&quot; date at
              the top of this page reflects the most recent revision. Continued use of the Platform
              after changes take effect constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <Section
            id="contact"
            num="17"
            title="Contact Us"
            refCallback={(el) => (sectionRefs.current['contact'] = el)}
          >
            <p>
              If you have questions about these Terms, please reach out to us through the contact
              details listed on our website, or write to us at{' '}
              <a href="mailto:support@aymyogaschool.com" className={styles.inlineLink}>
                support@aymyogaschool.com
              </a>
              .
            </p>
          </Section>

          <div className={styles.footerNote}>
            <p>
              See also our <Link href="/privacy-policy" className={styles.inlineLink}>Privacy Policy</Link> to
              understand how we collect and use your data.
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