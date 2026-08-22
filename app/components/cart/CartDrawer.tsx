"use client";

import Link from "next/link";
import { X, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, totalPrice, totalOriginalPrice } =
    useCart();

  const savings = totalOriginalPrice - totalPrice;

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={closeCart} aria-hidden="true" />}

      <aside
        className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.header}>
          <h3 className={styles.headerTitle}>
            <ShoppingCart size={18} />
            Your Cart {items.length > 0 && `(${items.length})`}
          </h3>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.emptyState}>
            <ShoppingCart size={40} className={styles.emptyIcon} />
            <p className={styles.emptyTitle}>Your cart is empty</p>
            <p className={styles.emptyText}>
              Browse courses and tap &quot;Add to Cart&quot; to save them here.
            </p>
            <button className={styles.browseBtn} onClick={closeCart}>
              Browse courses
            </button>
          </div>
        ) : (
          <>
            <div className={styles.itemList}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemThumb} />
                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemTitle}>{item.title}</h4>
                    <p className={styles.itemInstructor}>{item.instructor}</p>
                    <div className={styles.itemPriceRow}>
                      <span className={styles.itemPrice}>
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className={styles.itemOldPrice}>
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              {savings > 0 && (
                <div className={styles.savingsRow}>
                  <span>You save</span>
                  <span className={styles.savingsValue}>₹{savings.toLocaleString()}</span>
                </div>
              )}
              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={styles.totalValue}>₹{totalPrice.toLocaleString()}</span>
              </div>

              <Link href="/checkout" className={styles.checkoutBtn} onClick={closeCart}>
                Proceed to Checkout
                <ArrowRight size={16} />
              </Link>
              <button className={styles.continueBtn} onClick={closeCart}>
                Continue browsing
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}