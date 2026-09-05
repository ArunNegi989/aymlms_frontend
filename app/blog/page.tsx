"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock, ArrowRight, X, Filter, ChevronDown } from "lucide-react";
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
      {/* ---------------- Banner ---------------- */}
      <div className={styles.banner}>
        <svg
          className={styles.bannerPattern}
          viewBox="0 0 600 160"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5">
            <path d="M40 80 Q 90 40 140 80 Q 90 120 40 80 Z" />
            <path d="M460 40 Q 510 10 545 45 Q 510 75 460 40 Z" />
            <circle cx="300" cy="30" r="16" />
            <circle cx="300" cy="30" r="8" />
          </g>
        </svg>

        <div className={styles.bannerInner}>
          <h1 className={styles.bannerTitle}>AYM Yoga Blogs</h1>
          <p className={styles.bannerSubtitle}>
            Notes on teacher training, practice, and everything in between — written by
            our instructors and faculty.
          </p>
        </div>
      </div>

      {/* ---------------- Body ---------------- */}
      <div className={styles.body}>
        {/* Search + filters */}
        <div className={styles.controlsRow}>
          <div className={styles.searchBox}>
            <Search size={16} />
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
                <X size={14} />
              </button>
            )}
          </div>

          <div className={styles.filterGroup}>
            {/* Category dropdown */}
            <div className={styles.selectWrap} ref={categoryRef}>
              <Filter size={14} className={styles.selectIcon} />
              <div 
                className={styles.selectDisplay}
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                {category}
              </div>
              <ChevronDown 
                size={14} 
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
                    All categories
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

            {/* Sort dropdown */}
            <div className={styles.selectWrap} ref={sortRef}>
              <div 
                className={styles.selectDisplay}
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                {sort}
              </div>
              <ChevronDown 
                size={14} 
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
                <X size={12} /> {category}
              </button>
            )}
          </div>
        </div>

        <p className={styles.resultsCount}>
          {filtered.length} article{filtered.length === 1 ? "" : "s"}
          {category !== "All" ? ` in ${category}` : ""}
        </p>

        {/* Grid */}
        {visible.length === 0 ? (
          <div className={styles.empty}>
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
                    <span>{formatDate(post.date)}</span>
                    <span className={styles.dotSep}>·</span>
                    <span className={styles.readTime}>
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
                      Read <ArrowRight size={14} />
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