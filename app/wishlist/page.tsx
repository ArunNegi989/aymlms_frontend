// File location: app/wishlist/page.tsx
// Public route: /wishlist
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Star, Trash2, X } from "lucide-react";
import { useWishlist, type WishlistItem } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import styles from "./Wishlist.module.css";

function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function WishlistPage() {
  const router = useRouter();
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleAddToCart = (item: WishlistItem) => {
    if (isInCart(item.id)) return;
    addToCart({
      id: item.id,
      title: item.title,
      instructor: item.instructor,
      price: item.price,
      originalPrice: item.originalPrice ?? item.price,
    });
  };

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      if (!isInCart(item.id)) {
        addToCart({
          id: item.id,
          title: item.title,
          instructor: item.instructor,
          price: item.price,
          originalPrice: item.originalPrice ?? item.price,
        });
      }
    });
  };

  return (
    <div className={styles.page}>
      {/* ---------------- Banner ---------------- */}
      <div className={styles.banner}>
        <svg className={styles.bannerPattern} viewBox="0 0 600 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5">
            <path d="M60 90 C 60 60, 100 60, 100 90 C 100 60, 140 60, 140 90 C 140 120, 100 140, 100 140 C 100 140, 60 120, 60 90 Z" />
            <path d="M460 40 C 460 15, 495 15, 495 40 C 495 15, 530 15, 530 40 C 530 65, 495 82, 495 82 C 495 82, 460 65, 460 40 Z" />
          </g>
        </svg>

        <div className={styles.bannerInner}>
          <span className={styles.eyebrow}>Saved for later</span>
          <h1 className={styles.bannerTitle}>Your Wishlist</h1>
          <p className={styles.bannerSubtitle}>
            {items.length > 0
              ? `${items.length} course${items.length === 1 ? "" : "s"} you've saved to come back to.`
              : "Courses you save will show up here, ready whenever you are."}
          </p>
        </div>
      </div>

      {/* ---------------- Body ---------------- */}
      <div className={styles.body}>
        {items.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>
              <Heart size={28} />
            </span>
            <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
            <p className={styles.emptyText}>
              Tap the heart icon on any course to save it here for later.
            </p>
            <button className={styles.browseBtn} onClick={() => router.push("/")}>
              Browse courses
            </button>
          </div>
        ) : (
          <>
            <div className={styles.toolbar}>
              <span className={styles.toolbarCount}>
                {items.length} saved course{items.length === 1 ? "" : "s"}
              </span>
              <div className={styles.toolbarActions}>
                <button className={styles.addAllBtn} onClick={handleAddAllToCart}>
                  <ShoppingCart size={14} />
                  Add all to cart
                </button>
                <button className={styles.clearBtn} onClick={() => setConfirmClear(true)}>
                  <Trash2 size={14} />
                  Clear wishlist
                </button>
              </div>
            </div>

            {confirmClear && (
              <div className={styles.confirmBar}>
                <span>Remove all {items.length} courses from your wishlist?</span>
                <div className={styles.confirmActions}>
                  <button
                    className={styles.confirmYes}
                    onClick={() => {
                      clearWishlist();
                      setConfirmClear(false);
                    }}
                  >
                    Yes, clear it
                  </button>
                  <button className={styles.confirmNo} onClick={() => setConfirmClear(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className={styles.grid}>
              {items.map((item) => {
                const inCart = isInCart(item.id);
                const discount = item.originalPrice
                  ? Math.round((1 - item.price / item.originalPrice) * 100)
                  : null;

                return (
                  <article key={item.id} className={styles.card}>
                    <div
                      className={styles.thumbWrap}
                      onClick={() => router.push(`/course/${item.id}`)}
                    >
                      <img src={item.image} alt={item.title} className={styles.thumb} />
                      {discount ? (
                        <span className={styles.discountTag}>{discount}% off</span>
                      ) : null}
                      <button
                        className={styles.removeBtn}
                        aria-label="Remove from wishlist"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromWishlist(item.id);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className={styles.cardBody}>
                      <h3
                        className={styles.cardTitle}
                        onClick={() => router.push(`/course/${item.id}`)}
                      >
                        {item.title}
                      </h3>
                      <p className={styles.instructor}>{item.instructor}</p>

                      <div className={styles.ratingRow}>
                        <Star size={13} fill="#ff7a00" color="#ff7a00" />
                        <span>{item.rating}</span>
                        <span className={styles.dotSep}>·</span>
                        <span>{item.students} students</span>
                      </div>

                      <div className={styles.cardFooter}>
                        <div className={styles.priceLine}>
                          <span className={styles.price}>{formatPrice(item.price)}</span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className={styles.originalPrice}>
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>

                        <button
                          className={`${styles.cartBtn} ${inCart ? styles.cartBtnAdded : ""}`}
                          onClick={() => handleAddToCart(item)}
                          disabled={inCart}
                        >
                          <ShoppingCart size={14} />
                          {inCart ? "In cart" : "Add to cart"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}