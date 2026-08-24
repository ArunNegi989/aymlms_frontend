// AYMAboutUs.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./AboutUs.module.css";

// Icons using Font Awesome (or any icon library)
const Icon = ({ name }: { name: string }) => (
  <i className={`fas fa-${name}`} style={{ marginRight: "8px" }}></i>
);

const AYMAboutUs: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Mock stats data (will be dynamic from API)
  const statsData = [
    { label: "Years of Experience", value: 15, suffix: "+" },
    { label: "Students Trained", value: 5000, suffix: "+" },
    { label: "Courses Available", value: 45, suffix: "+" },
    { label: "Countries Reached", value: 60, suffix: "+" },
  ];

  // Sample teacher data (dynamic from API)
  const teachers = [
    {
      id: 1,
      name: "Swami AYM",
      role: "Founder & Lead Instructor",
      experience: "25+ years",
      specialization: "Hatha Yoga, Meditation",
      bio: "Dedicated to preserving authentic yoga traditions.",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Senior Yoga Teacher",
      experience: "15+ years",
      specialization: "Vinyasa, Pranayama",
      bio: "Passionate about making yoga accessible globally.",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      role: "Meditation & Philosophy",
      experience: "20+ years",
      specialization: "Meditation, Yoga Philosophy",
      bio: "Teaching the deeper aspects of yoga practice.",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
  ];

  // Sample testimonials (dynamic from API)
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "USA",
      course: "200-Hour Teacher Training",
      text: "AYM transformed my understanding of yoga. The teachers are authentic and the platform is amazing!",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Singapore",
      course: "Advanced Asana Practice",
      text: "Being able to learn from such experienced teachers online is a blessing. Highly recommended.",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    {
      id: 3,
      name: "Emma Williams",
      location: "UK",
      course: "Meditation & Mindfulness",
      text: "The live classes feel personal and the recorded content is perfect for my schedule.",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
  ];

  // FAQ data (dynamic from API)
  const faqs = [
    {
      q: "What is AYM Yoga School?",
      a: "AYM Yoga School is a premium online Learning Management System (LMS) offering authentic yoga education through live classes, recorded sessions, structured courses, and teacher training programs.",
    },
    {
      q: "Is AYM Yoga School an online LMS?",
      a: "Yes, AYM is a full-featured online LMS designed for yoga education. Students can enroll, learn, track progress, and earn certifications.",
    },
    {
      q: "Are live yoga classes available?",
      a: "Yes, we offer interactive live classes with experienced teachers. Students can ask questions and receive real-time guidance.",
    },
    {
      q: "Are recorded classes available?",
      a: "Absolutely. All live classes are recorded and available on-demand, so you can learn at your own pace.",
    },
    {
      q: "Can beginners join?",
      a: "Definitely! We have programs for all levels, from complete beginners to advanced practitioners.",
    },
    {
      q: "Can I learn yoga from anywhere?",
      a: "Yes, AYM is fully online. You can learn from anywhere in the world with an internet connection.",
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(`.${styles.animateOnScroll}`).forEach((el) => {
      observer.observe(el);
    });

    // Stats counter animation
    if (statsRef.current) {
      const statsObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setStatsVisible(true);
          }
        },
        { threshold: 0.3 }
      );
      statsObserver.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation effect
  useEffect(() => {
    if (statsVisible) {
      // Animate counters
      const counters = document.querySelectorAll(`.${styles.statNumber}`);
      counters.forEach((counter, index) => {
        const target = parseInt(counter.textContent || "0");
        let current = 0;
        const increment = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = current + (statsData[index]?.suffix || "");
        }, 30);
      });
    }
  }, [statsVisible, statsData]);

  return (
    <div className={styles.aymAboutPage}>
      {/* ===== HERO SECTION ===== */}
      <section className={`${styles.heroSection} ${styles.animateOnScroll}`}>
        <div className={styles.heroBackground}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <div className={styles.heroBadge}>AYM Yoga School</div>
              <h1 className={styles.heroTitle}>
                Discover the <span className={styles.highlight}>AYM Yoga School</span> Experience
              </h1>
              <p className={styles.heroDescription}>
                Transform your yoga practice with our comprehensive online platform. Access live classes,
                recorded sessions, structured courses, teacher training, meditation, and pranayama — all
                guided by experienced teachers from the heart of Himalayan tradition.
              </p>
              <div className={styles.heroButtons}>
                <button className={styles.btnPrimary}>Explore Our Courses</button>
                <button className={styles.btnSecondary}>Start Learning</button>
              </div>
              <div className={styles.heroStats}>
                <span>🌍 60+ Countries</span>
                <span>🧘 5000+ Students</span>
                <span>📚 45+ Courses</span>
              </div>
            </div>
            <div className={styles.heroImage}>
              <div className={styles.floatingImage}>
                <img
                  src="https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg"
                  alt="Yoga practice"
                  loading="lazy"
                />
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT AYM YOGA SCHOOL ===== */}
      <section className={`${styles.aboutSection} ${styles.animateOnScroll}`}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImage}>
            <img
              src="https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg"
              alt="Yoga school"
              loading="lazy"
            />
          </div>
          <div className={styles.aboutContent}>
            <span className={styles.sectionTag}>About AYM</span>
            <h2 className={styles.sectionTitle}>About AYM Yoga School</h2>
            <p className={styles.aboutText}>
              AYM Yoga School is a premier online yoga education platform dedicated to preserving and
              sharing authentic yoga traditions. Our mission is to make traditional yoga education
              accessible to students worldwide through modern online learning technology.
            </p>
            <p className={styles.aboutText}>
              Combining ancient wisdom with contemporary teaching methods, AYM offers a comprehensive
              learning experience that includes live classes, recorded sessions, structured courses,
              and teacher training programs.
            </p>
            <div ref={statsRef} className={styles.statsGrid}>
              {statsData.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statNumber}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT IS AYM LMS ===== */}
      <section className={`${styles.lmsSection} ${styles.animateOnScroll}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Our Platform</span>
          <h2 className={styles.sectionTitle}>Learn Yoga. Anytime. Anywhere.</h2>
          <p className={styles.sectionSubtitle}>
            AYM is a complete Learning Management System designed for yoga education.
          </p>
        </div>
        <div className={styles.lmsFeatures}>
          {[
            {
              icon: "video",
              title: "Live Classes",
              desc: "Attend interactive live sessions with instructors in real-time.",
            },
            {
              icon: "play-circle",
              title: "Recorded Classes",
              desc: "Access on-demand content and learn at your own pace.",
            },
            {
              icon: "book",
              title: "Structured Courses",
              desc: "Follow professionally designed learning paths.",
            },
            {
              icon: "users",
              title: "Expert Teachers",
              desc: "Learn from experienced and authentic yoga practitioners.",
            },
            {
              icon: "globe",
              title: "Learn Anywhere",
              desc: "Access your learning from anywhere in the world.",
            },
            {
              icon: "clock",
              title: "Flexible Learning",
              desc: "Combine live and recorded learning to suit your schedule.",
            },
          ].map((feature, index) => (
            <div key={index} className={styles.lmsCard}>
              <div className={styles.lmsIcon}>
                <i className={`fas fa-${feature.icon}`}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHAT AYM PROVIDES ===== */}
      <section className={`${styles.providesSection} ${styles.animateOnScroll}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Our Offerings</span>
          <h2 className={styles.sectionTitle}>What We Provide</h2>
        </div>
        <div className={styles.providesGrid}>
          {[
            "Online Yoga Classes",
            "Live Yoga Classes",
            "Recorded Yoga Classes",
            "Yoga Teacher Training",
            "Meditation",
            "Pranayama",
            "Asana Practice",
            "Yoga Philosophy",
            "Anatomy & Physiology",
            "Traditional Yoga",
            "Guided Practice",
            "Workshops",
            "Specialized Programs",
            "Learning Resources",
          ].map((item, index) => (
            <div key={index} className={styles.provideCard}>
              <div className={styles.provideIcon}>🧘</div>
              <h4>{item}</h4>
              <p>Deepen your practice with our comprehensive programs.</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== LIVE + RECORDED LEARNING ===== */}
      <section className={`${styles.learningSection} ${styles.animateOnScroll}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Flexible Learning</span>
          <h2 className={styles.sectionTitle}>Learn Your Way</h2>
        </div>
        <div className={styles.learningGrid}>
          <div className={styles.learningCard}>
            <div className={styles.learningImage}>
              <img
                src="https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg"
                alt="Live class"
                loading="lazy"
              />
              <span className={styles.liveBadge}>Live</span>
            </div>
            <h3>Live Learning</h3>
            <ul>
              <li>Real-time instructor interaction</li>
              <li>Guided practice sessions</li>
              <li>Questions & answers</li>
              <li>Interactive sessions</li>
              <li>Community learning</li>
              <li>Direct instructor guidance</li>
            </ul>
          </div>
          <div className={styles.learningCard}>
            <div className={styles.learningImage}>
              <img
                src="https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg"
                alt="Recorded class"
                loading="lazy"
              />
              <span className={styles.recordedBadge}>On-Demand</span>
            </div>
            <h3>Recorded Learning</h3>
            <ul>
              <li>Learn anytime</li>
              <li>Replay classes</li>
              <li>Flexible schedule</li>
              <li>Practice at your own pace</li>
              <li>Revisit difficult concepts</li>
              <li>On-demand access</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== VIDEO SECTION ===== */}
      <section className={`${styles.videoSection} ${styles.animateOnScroll}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Visual Experience</span>
          <h2 className={styles.sectionTitle}>Experience AYM Yoga School</h2>
        </div>
        <div className={styles.videoWrapper}>
          <div className={styles.videoContainer}>
            <img
              src="https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg"
              alt="Video thumbnail"
              className={styles.videoThumbnail}
            />
            <div className={styles.playButton}>
              <i className="fas fa-play"></i>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE AYM ===== */}
      <section className={`${styles.whySection} ${styles.animateOnScroll}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Why AYM</span>
          <h2 className={styles.sectionTitle}>Why Learn With AYM Yoga School?</h2>
        </div>
        <div className={styles.whyGrid}>
          {[
            "Authentic Yoga Education",
            "Experienced Teachers",
            "Flexible Online Learning",
            "Live & Recorded Classes",
            "Structured Learning",
            "Global Community",
            "Practical Learning",
            "Continuous Access",
          ].map((reason, index) => (
            <div key={index} className={styles.whyCard}>
              <div className={styles.whyIcon}>✓</div>
              <h4>{reason}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ===== LEARNING JOURNEY ===== */}
      <section className={`${styles.journeySection} ${styles.animateOnScroll}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Your Path</span>
          <h2 className={styles.sectionTitle}>Your Yoga Learning Journey</h2>
        </div>
        <div className={styles.journeyTimeline}>
          {[
            "Create Your Account",
            "Explore Courses",
            "Choose Your Program",
            "Enroll",
            "Attend Live / Recorded Classes",
            "Practice & Learn",
            "Track Your Progress",
            "Complete Your Course",
            "Continue Your Journey",
          ].map((step, index) => (
            <div key={index} className={styles.journeyStep}>
              <div className={styles.stepNumber}>{(index + 1).toString().padStart(2, "0")}</div>
              <div className={styles.stepContent}>
                <h4>{step}</h4>
                <p>Progress through your yoga education journey.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TEACHING APPROACH ===== */}
      <section className={`${styles.approachSection} ${styles.animateOnScroll}`}>
        <div className={styles.approachGrid}>
          <div className={styles.approachContent}>
            <span className={styles.sectionTag}>Philosophy</span>
            <h2 className={styles.sectionTitle}>Our Approach to Yoga Education</h2>
            <p>
              Our teaching philosophy integrates theory, practice, understanding, discipline, meditation,
              breathing, philosophy, and practical application. We believe in holistic education that
              transforms both body and mind.
            </p>
            <div className={styles.approachValues}>
              {["Theory", "Practice", "Understanding", "Discipline", "Meditation", "Breathing"].map(
                (value, index) => (
                  <span key={index} className={styles.valueTag}>
                    {value}
                  </span>
                )
              )}
            </div>
          </div>
          <div className={styles.approachImage}>
            <img
              src="https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg"
              alt="Teaching approach"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ===== COURSE CATEGORIES ===== */}
      <section className={`${styles.categoriesSection} ${styles.animateOnScroll}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Explore</span>
          <h2 className={styles.sectionTitle}>Courses & Learning Categories</h2>
        </div>
        <div className={styles.categoriesGrid}>
          {[
            "Yoga",
            "Meditation",
            "Pranayama",
            "Philosophy",
            "Anatomy",
            "Teacher Training",
            "Beginners",
            "Advanced",
            "Specialized",
          ].map((category, index) => (
            <div key={index} className={styles.categoryCard}>
              <div className={styles.categoryImage}>
                <img
                  src="https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg"
                  alt={category}
                  loading="lazy"
                />
              </div>
              <h4>{category}</h4>
              <p>Explore our {category.toLowerCase()} programs.</p>
              <button className={styles.categoryBtn}>Explore →</button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TEACHERS SECTION ===== */}
      <section className={`${styles.teachersSection} ${styles.animateOnScroll}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Instructors</span>
          <h2 className={styles.sectionTitle}>Learn From Experienced Yoga Teachers</h2>
        </div>
        <div className={styles.teachersGrid}>
          {teachers.map((teacher) => (
            <div key={teacher.id} className={styles.teacherCard}>
              <div className={styles.teacherImage}>
                <img src={teacher.image} alt={teacher.name} loading="lazy" />
              </div>
              <h3>{teacher.name}</h3>
              <p className={styles.teacherRole}>{teacher.role}</p>
              <p className={styles.teacherExp}>Experience: {teacher.experience}</p>
              <p className={styles.teacherSpecialization}>{teacher.specialization}</p>
              <p className={styles.teacherBio}>{teacher.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STUDENT EXPERIENCE ===== */}
      <section className={`${styles.studentSection} ${styles.animateOnScroll}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Experience</span>
          <h2 className={styles.sectionTitle}>A Learning Experience Designed Around You</h2>
        </div>
        <div className={styles.studentGrid}>
          {[
            "Watching a Class",
            "Practicing Yoga",
            "Attending Live Sessions",
            "Learning from Teachers",
            "Completing Courses",
          ].map((experience, index) => (
            <div key={index} className={styles.studentCard}>
              <img
                src="https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg"
                alt={experience}
                loading="lazy"
              />
              <p>{experience}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className={`${styles.testimonialsSection} ${styles.animateOnScroll}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Testimonials</span>
          <h2 className={styles.sectionTitle}>What Our Students Say</h2>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.testimonialImage}>
                <img src={testimonial.image} alt={testimonial.name} loading="lazy" />
              </div>
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>"{testimonial.text}"</p>
                <h4>{testimonial.name}</h4>
                <p className={styles.testimonialLocation}>{testimonial.location}</p>
                <p className={styles.testimonialCourse}>{testimonial.course}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GLOBAL COMMUNITY ===== */}
      <section className={`${styles.communitySection} ${styles.animateOnScroll}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Community</span>
          <h2 className={styles.sectionTitle}>A Global Community of Yoga Learners</h2>
        </div>
        <div className={styles.communityContent}>
          <div className={styles.communityImage}>
            <img
              src="https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg"
              alt="Global community"
              loading="lazy"
            />
          </div>
          <div className={styles.communityText}>
            <p>
              Join thousands of students from 60+ countries learning authentic yoga online.
              Connect with a global community of practitioners and teachers.
            </p>
            <div className={styles.communityStats}>
              <span>🌍 60+ Countries</span>
              <span>🧘 5000+ Students</span>
              <span>🌿 45+ Courses</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMAGE GALLERY ===== */}
      <section className={`${styles.gallerySection} ${styles.animateOnScroll}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Gallery</span>
          <h2 className={styles.sectionTitle}>AYM Yoga Gallery</h2>
        </div>
        <div className={styles.galleryGrid}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className={styles.galleryItem}>
              <img
                src="https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg"
                alt={`Gallery ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className={`${styles.faqSection} ${styles.animateOnScroll}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Questions</span>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div
                className={styles.faqQuestion}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <h4>{faq.q}</h4>
                <span className={styles.faqToggle}>
                  {activeFaq === index ? "−" : "+"}
                </span>
              </div>
              {activeFaq === index && (
                <div className={styles.faqAnswer}>
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className={`${styles.ctaSection} ${styles.animateOnScroll}`}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>
            Start Your Yoga Journey With AYM Yoga School
          </h2>
          <p className={styles.ctaDescription}>
            Discover authentic yoga education, learn from experienced teachers, join live classes,
            explore recorded sessions and build your yoga practice from anywhere in the world.
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.btnPrimary}>Explore Courses</button>
            <button className={styles.btnSecondary}>Join AYM Yoga School</button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AYMAboutUs;