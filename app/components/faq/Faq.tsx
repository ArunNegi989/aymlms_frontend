// File location: app/components/faq/Faq.tsx
// Reusable anywhere in the project:
//
//   import FAQ from "@/app/components/faq/Faq";
//   <FAQ items={someFaqs} title="Frequently asked questions" />
//
// Works standalone (own CSS variables, no dependency on a parent page's
// theme tokens) so it can be dropped into the homepage, a course detail
// page, the contact page, or its own /faq page without extra setup.
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
  /** Optional - defaults to the full question set in app/data/Faqs.ts.
   *  Pass a filtered array only if you want a subset (e.g. one category)
   *  on a specific page; most usages can just do <FAQ />. */
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
  /** Allow more than one answer open at once. Default: false (accordion). */
  allowMultipleOpen?: boolean;
  /** id of an item to open by default. */
  defaultOpenId?: string;
  /** Preset the category dropdown - useful for deep-linking from a
   *  "browse by topic" grid elsewhere on the page. Pass a category name
   *  or "All". Re-mount with a new `key` prop if you need to change this
   *  after the initial render. */
  initialCategory?: string;
  /** Show the search box. Default: true. */
  searchable?: boolean;
  /** Show the category dropdown. Auto-hides if items have no categories.
   *  Default: true (shown whenever 2+ distinct categories exist). */
  showCategoryFilter?: boolean;
  /** Optional className to extend/override outer wrapper styling. */
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
    // Reset category filter if the item set changes and no longer includes it.
    if (category !== "All" && !categories.includes(category)) {
      setCategory("All");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

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
    <div className={`${styles.faqWrap} ${className ?? ""}`}>
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