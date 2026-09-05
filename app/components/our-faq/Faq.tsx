// File: app/components/faq/Faq.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { faqItems as defaultFaqItems } from "@/app/data/Faqs";
import styles from "./Faq.module.css";

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};

type FAQProps = {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
  allowMultipleOpen?: boolean;
  defaultOpenId?: string;
  initialCategory?: string;
  searchable?: boolean;
  showCategoryFilter?: boolean;
  className?: string;
};

export default function FAQ({
  items = defaultFaqItems,
  title = "Frequently Asked Questions",
  subtitle,
  allowMultipleOpen = false,
  defaultOpenId,
  initialCategory = "All",
  searchable = true,
  showCategoryFilter = true,
  className,
}: FAQProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(defaultOpenId ? [defaultOpenId] : [])
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(initialCategory);

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.category && set.add(i.category));
    return Array.from(set);
  }, [items]);

  const hasCategories = showCategoryFilter && categories.length > 1;

  useEffect(() => {
    if (category !== "All" && !categories.includes(category)) {
      setCategory("All");
    }
  }, [items, category, categories]);

  const filtered = useMemo(() => {
    let list = items;

    if (hasCategories && category !== "All") {
      list = list.filter((i) => i.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (i) =>
          i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q)
      );
    }

    return list;
  }, [items, category, query, hasCategories]);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = allowMultipleOpen ? new Set(prev) : new Set<string>();
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`${styles.faqWrap} ${className || ""}`}>
      {(title || subtitle) && (
        <div className={styles.faqHeader}>
          {title && <h2 className={styles.faqTitle}>{title}</h2>}
          {subtitle && <p className={styles.faqSubtitle}>{subtitle}</p>}
        </div>
      )}

      {(searchable || hasCategories) && (
        <div className={styles.controlsRow}>
          {searchable && (
            <div className={styles.searchBox}>
              <Search size={15} />
              <input
                type="text"
                placeholder="Search questions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  className={styles.clearSearch}
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          )}

          {hasCategories && (
            <select
              className={styles.categorySelect}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="All">All topics</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No questions match your search</p>
          <p className={styles.emptyText}>Try a different term or topic.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {filtered.map((item) => {
            const isOpen = openIds.has(item.id);
            return (
              <div key={item.id} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
                <button
                  type="button"
                  className={styles.question}
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown size={17} className={styles.chevron} />
                </button>
                <div
                  className={styles.answerWrap}
                  style={{ maxHeight: isOpen ? "600px" : "0px" }}
                >
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}