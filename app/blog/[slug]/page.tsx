"use client";

import { useParams, useRouter } from "next/navigation";
import { Clock, Calendar, ArrowLeft, Tag } from "lucide-react";
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
          <h1>Article not found</h1>
          <p>This post may have been moved or removed.</p>
          <button className={styles.backBtn} onClick={() => router.push("/blog")}>
            <ArrowLeft size={15} /> Back to blog
          </button>
        </div>
      </div>
    );
  }

  const related = getRelatedBlogs(post, 4);
  const recent = getRecentBlogs(post.id, 5);

  return (
    <div className={styles.page}>
      {/* ---------------- Header ---------------- */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <button className={styles.backLink} onClick={() => router.push("/blog")}>
            <ArrowLeft size={14} /> All articles
          </button>

          <span className={styles.categoryTag}>{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.metaRow}>
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
          </div>
        </div>
      </div>

      {/* ---------------- Body: main + sidebar ---------------- */}
      <div className={styles.layout}>
        <main className={styles.main}>
          <div className={styles.coverWrap}>
            <img src={post.coverImage} alt={post.title} className={styles.cover} />
          </div>

          <article className={styles.content}>
            {post.content.map((section) => (
              <section key={section.heading} id={headingId(section.heading)} className={styles.section}>
                <h2 className={styles.sectionHeading}>{section.heading}</h2>
                {section.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </section>
            ))}
          </article>

          {post.tags.length > 0 && (
            <div className={styles.tagsRow}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tagPill}>
                  <Tag size={11} /> {tag}
                </span>
              ))}
            </div>
          )}

          {/* Author card */}
          <div className={styles.authorCard}>
            <img src={post.authorImage} alt={post.author} className={styles.authorCardAvatar} />
            <div>
              <p className={styles.authorCardName}>{post.author}</p>
              <p className={styles.authorCardRole}>{post.authorBio}</p>
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className={styles.relatedSection}>
              <h2 className={styles.relatedTitle}>More in {post.category}</h2>
              <div className={styles.relatedGrid}>
                {related.map((r) => (
                  <article
                    key={r.id}
                    className={styles.relatedCard}
                    onClick={() => router.push(`/blog/${r.slug}`)}
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
                  </article>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* ---------------- Sidebar ---------------- */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            {/* Recent posts */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>Recent articles</h3>
              <ul className={styles.recentList}>
                {recent.map((r) => (
                  <li key={r.id} onClick={() => router.push(`/blog/${r.slug}`)}>
                    <img src={r.coverImage} alt={r.title} />
                    <div>
                      <p className={styles.recentTitle}>{r.title}</p>
                      <p className={styles.recentDate}>{formatDate(r.date)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA back to courses */}
            <div className={styles.ctaCard}>
              <h3 className={styles.ctaTitle}>Ready to go deeper?</h3>
              <p className={styles.ctaText}>
                Explore our teacher trainings and find the program that fits where you are.
              </p>
              <button className={styles.ctaBtn} onClick={() => router.push("/")}>
                Browse courses
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}