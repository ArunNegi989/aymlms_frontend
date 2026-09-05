// File: app/blog/page.tsx
"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock, ArrowRight, X, Filter, ChevronDown, Calendar } from "lucide-react";
import { blogPosts, BLOG_CATEGORIES, type BlogCategory } from "@/app/data/blogs";
import styles from "./blog.module.css";

const PAGE_SIZE = 6;
const SORT_OPTIONS = ["Newest first", "Oldest first"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | BlogCategory>("All");
  const [sort, setSort] = useState<SortOption>("Newest first");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category, query, sort]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    let list = [...blogPosts];

    if (category !== "All") {
      list = list.filter((b) => b.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sort === "Newest first" ? -diff : diff;
    });

    return list;
  }, [category, query, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className={styles.page}>
      {/* ===== BANNER / HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroPattern}>
          <svg viewBox="0 0 600 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.2">
              <path d="M40 80 Q 90 40 140 80 Q 90 120 40 80 Z" />
              <path d="M460 40 Q 510 10 545 45 Q 510 75 460 40 Z" />
              <circle cx="300" cy="30" r="20" />
              <circle cx="300" cy="30" r="10" />
              <path d="M180 130 Q 200 110 220 130 Q 200 150 180 130 Z" />
              <path d="M380 130 Q 400 110 420 130 Q 400 150 380 130 Z" />
            </g>
          </svg>
        </div>

        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>🧘 AYM Yoga School</span>
          <h1 className={styles.heroTitle}>
            Yoga &amp; <span className={styles.highlight}>Wellness Blog</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Notes on teacher training, practice, and everything in between — written by
            our instructors and faculty.
          </p>
        </div>
      </section>

      {/* ===== BODY ===== */}
      <div className={styles.body}>
        {/* Controls Row */}
        <div className={styles.controlsRow}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className={styles.clearSearch}
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className={styles.filterGroup}>
            {/* Category */}
            <div className={styles.selectWrap} ref={categoryRef}>
              <Filter size={16} className={styles.selectIcon} />
              <div 
                className={styles.selectDisplay}
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                {category === "All" ? "All Categories" : category}
              </div>
              <ChevronDown 
                size={16} 
                className={`${styles.selectChevron} ${isCategoryOpen ? styles.chevronOpen : ''}`}
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              />
              {isCategoryOpen && (
                <div className={styles.dropdownList}>
                  <div 
                    className={`${styles.dropdownItem} ${category === "All" ? styles.dropdownItemActive : ''}`}
                    onClick={() => {
                      setCategory("All");
                      setIsCategoryOpen(false);
                    }}
                  >
                    All Categories
                  </div>
                  {BLOG_CATEGORIES.map((cat) => (
                    <div 
                      key={cat}
                      className={`${styles.dropdownItem} ${category === cat ? styles.dropdownItemActive : ''}`}
                      onClick={() => {
                        setCategory(cat);
                        setIsCategoryOpen(false);
                      }}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sort */}
            <div className={styles.selectWrap} ref={sortRef}>
              <div 
                className={styles.selectDisplay}
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                {sort}
              </div>
              <ChevronDown 
                size={16} 
                className={`${styles.selectChevron} ${isSortOpen ? styles.chevronOpen : ''}`}
                onClick={() => setIsSortOpen(!isSortOpen)}
              />
              {isSortOpen && (
                <div className={styles.dropdownList}>
                  {SORT_OPTIONS.map((opt) => (
                    <div 
                      key={opt}
                      className={`${styles.dropdownItem} ${sort === opt ? styles.dropdownItemActive : ''}`}
                      onClick={() => {
                        setSort(opt);
                        setIsSortOpen(false);
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {category !== "All" && (
              <button className={styles.clearCategory} onClick={() => setCategory("All")}>
                <X size={14} /> {category}
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <p className={styles.resultsCount}>
          <span className={styles.countNumber}>{filtered.length}</span> 
          article{filtered.length === 1 ? "" : "s"}
          {category !== "All" ? ` in ${category}` : ""}
        </p>

        {/* Grid */}
        {visible.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📖</div>
            <p className={styles.emptyTitle}>No articles match your filters</p>
            <p className={styles.emptyText}>Try a different category or search term.</p>
            <button
              className={styles.resetBtn}
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {visible.map((post) => (
              <article
                key={post.id}
                className={styles.card}
                onClick={() => router.push(`/blog/${post.slug}`)}
              >
                <div className={styles.thumbWrap}>
                  <img src={post.coverImage} alt={post.title} className={styles.thumb} />
                  <span className={styles.categoryTag}>{post.category}</span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaItem}>
                      <Calendar size={12} />
                      {formatDate(post.date)}
                    </span>
                    <span className={styles.dotSep}>·</span>
                    <span className={styles.metaItem}>
                      <Clock size={12} /> {post.readTime} min read
                    </span>
                  </div>

                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>

                  <div className={styles.cardFooter}>
                    <div className={styles.authorRow}>
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className={styles.authorAvatar}
                      />
                      <span>{post.author}</span>
                    </div>
                    <span className={styles.readMore}>
                      Read <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {hasMore && (
          <div className={styles.loadMoreWrap}>
            <button
              className={styles.loadMoreBtn}
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
            >
              Load more articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}