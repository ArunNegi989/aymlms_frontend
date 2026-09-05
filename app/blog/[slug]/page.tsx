// File: app/blog/[slug]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { Clock, Calendar, ArrowLeft, Tag, User, ArrowRight, Share2, Bookmark, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { getBlogBySlug, getRelatedBlogs, getRecentBlogs, headingId } from "@/app/data/blogs";
import styles from "./BlogDetail.module.css";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const post = getBlogBySlug(params.slug);

  if (!post) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.notFoundIcon}>📖</span>
            <h1>Article not found</h1>
            <p>This post may have been moved or removed.</p>
            <button className={styles.backBtn} onClick={() => router.push("/blog")}>
              <ArrowLeft size={15} /> Back to blog
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const related = getRelatedBlogs(post, 4);
  const recent = getRecentBlogs(post.id, 5);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className={styles.page}>
      {/* ===== HEADER / HERO ===== */}
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.headerPattern}>
          <svg viewBox="0 0 600 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none">
              <path d="M40 80 Q 90 40 140 80 Q 90 120 40 80 Z" />
              <path d="M460 40 Q 510 10 545 45 Q 510 75 460 40 Z" />
              <circle cx="300" cy="30" r="20" />
              <circle cx="300" cy="30" r="10" />
              <path d="M180 130 Q 200 110 220 130 Q 200 150 180 130 Z" />
              <path d="M380 130 Q 400 110 420 130 Q 400 150 380 130 Z" />
            </g>
          </svg>
        </div>

        <div className={styles.headerInner}>
          <motion.button 
            className={styles.backLink} 
            onClick={() => router.push("/blog")}
            whileHover={{ x: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowLeft size={14} /> All articles
          </motion.button>

          <motion.span 
            className={styles.categoryTag}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {post.category}
          </motion.span>

          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {post.title}
          </motion.h1>

          <motion.p 
            className={styles.excerpt}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {post.excerpt}
          </motion.p>

          <motion.div 
            className={styles.metaRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className={styles.authorInfo}>
              <img src={post.authorImage} alt={post.author} className={styles.authorAvatar} />
              <span>{post.author}</span>
            </div>
            <span className={styles.metaItem}>
              <Calendar size={14} /> {formatDate(post.date)}
            </span>
            <span className={styles.metaItem}>
              <Clock size={14} /> {post.readTime} min read
            </span>
          </motion.div>

          <motion.div 
            className={styles.headerActions}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button className={styles.actionBtn}><Heart size={18} /></button>
            <button className={styles.actionBtn}><Bookmark size={18} /></button>
            <button className={styles.actionBtn}><Share2 size={18} /></button>
          </motion.div>
        </div>
      </motion.div>

      {/* ===== LAYOUT: MAIN + SIDEBAR ===== */}
      <div className={styles.layout}>
        <main className={styles.main}>
          {/* Cover Image */}
          <motion.div 
            className={styles.coverWrap}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img src={post.coverImage} alt={post.title} className={styles.cover} />
          </motion.div>

          {/* Content */}
          <motion.article 
            className={styles.content}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {post.content.map((section) => (
              <motion.section 
                key={section.heading} 
                id={headingId(section.heading)} 
                className={styles.section}
                variants={fadeUp}
              >
                <h2 className={styles.sectionHeading}>{section.heading}</h2>
                {section.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </motion.section>
            ))}
          </motion.article>

          {/* Tags */}
          {post.tags.length > 0 && (
            <motion.div 
              className={styles.tagsRow}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tagPill}>
                  <Tag size={11} /> {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Author Card */}
          <motion.div 
            className={styles.authorCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -4 }}
          >
            <img src={post.authorImage} alt={post.author} className={styles.authorCardAvatar} />
            <div>
              <p className={styles.authorCardName}>{post.author}</p>
              <p className={styles.authorCardRole}>{post.authorBio}</p>
            </div>
          </motion.div>

          {/* Related Posts */}
          {related.length > 0 && (
            <motion.div 
              className={styles.relatedSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className={styles.relatedTitle}>More in {post.category}</h2>
              <div className={styles.relatedGrid}>
                {related.map((r, idx) => (
                  <motion.article
                    key={r.id}
                    className={styles.relatedCard}
                    onClick={() => router.push(`/blog/${r.slug}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className={styles.relatedThumbWrap}>
                      <img src={r.coverImage} alt={r.title} className={styles.relatedThumb} />
                    </div>
                    <div className={styles.relatedBody}>
                      <h3 className={styles.relatedCardTitle}>{r.title}</h3>
                      <p className={styles.relatedMeta}>
                        {formatDate(r.date)} · {r.readTime} min read
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}
        </main>

        {/* ===== SIDEBAR ===== */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            {/* Recent Posts */}
            <motion.div 
              className={styles.sideCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className={styles.sideCardTitle}>
                <Clock size={16} /> Recent articles
              </h3>
              <ul className={styles.recentList}>
                {recent.map((r) => (
                  <motion.li 
                    key={r.id} 
                    onClick={() => router.push(`/blog/${r.slug}`)}
                    whileHover={{ x: 4 }}
                  >
                    <img src={r.coverImage} alt={r.title} />
                    <div>
                      <p className={styles.recentTitle}>{r.title}</p>
                      <p className={styles.recentDate}>{formatDate(r.date)}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Card */}
            <motion.div 
              className={styles.ctaCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className={styles.ctaTitle}>Ready to go deeper?</h3>
              <p className={styles.ctaText}>
                Explore our teacher trainings and find the program that fits where you are.
              </p>
              <motion.button 
                className={styles.ctaBtn} 
                onClick={() => router.push("/")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Browse courses <ArrowRight size={14} />
              </motion.button>
            </motion.div>

            {/* Newsletter */}
            <motion.div 
              className={styles.newsletterCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3>Get Weekly Yoga Insights</h3>
              <p>Subscribe to our newsletter for the latest articles and practices.</p>
              <div className={styles.newsletterForm}>
                <input type="email" placeholder="Your email" />
                <button>Subscribe</button>
              </div>
            </motion.div>
          </div>
        </aside>
      </div>
    </div>
  );
}