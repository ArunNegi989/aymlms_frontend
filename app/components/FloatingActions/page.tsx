// Floatingactions.tsx - Updated version with Chatbot integration
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Floatingactions.module.css";
import Chatbot from "@/app/components/Chatbot/page"; // Import the Chatbot component

interface FloatingActionsProps {
  whatsappNumber?: string;
  whatsappMessage?: string;
}

export default function FloatingActions({
  whatsappNumber = "919876543210",
  whatsappMessage = "Hi, I have a query!",
}: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const handleChatbotClick = () => {
    setChatOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <>
      {/* Chatbot Component */}
      <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      <div className={styles.container}>
        {/* WhatsApp Icon */}
        <motion.div
          className={styles.floatWrap}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className={styles.pulseRing}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.iconButton} ${styles.whatsapp}`}
            aria-label="Chat on WhatsApp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor">
              <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.697 4.61 1.897 6.478L4 29l7.72-1.855A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.627 28 15S22.629 3 16.001 3zm0 21.818c-1.94 0-3.75-.57-5.27-1.55l-.377-.235-4.58 1.1 1.12-4.463-.246-.394A9.77 9.77 0 0 1 6.182 15c0-5.417 4.402-9.818 9.819-9.818S25.82 9.583 25.82 15 21.418 24.818 16.001 24.818zm5.363-7.35c-.294-.147-1.736-.857-2.005-.955-.269-.098-.465-.147-.66.147-.196.294-.758.955-.93 1.151-.171.196-.343.22-.637.073-.294-.147-1.24-.457-2.362-1.458-.873-.779-1.463-1.741-1.634-2.035-.171-.294-.018-.453.129-.6.132-.132.294-.343.44-.514.147-.171.196-.294.294-.49.098-.196.049-.367-.024-.514-.073-.147-.66-1.591-.905-2.179-.238-.573-.481-.495-.66-.504l-.562-.01c-.196 0-.514.073-.783.367-.269.294-1.026 1.003-1.026 2.446 0 1.443 1.05 2.837 1.196 3.033.147.196 2.067 3.157 5.008 4.428.7.302 1.246.483 1.672.618.702.223 1.341.192 1.846.117.563-.084 1.736-.71 1.981-1.395.245-.686.245-1.273.171-1.395-.073-.123-.269-.196-.563-.343z" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Chatbot Icon */}
        <motion.button
          type="button"
          onClick={handleChatbotClick}
          className={`${styles.iconButton} ${styles.chatbot} ${
            chatOpen ? styles.chatbotActive : ""
          }`}
          aria-label="Open chatbot"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 2a1 1 0 0 1 1 1v1.06A8.004 8.004 0 0 1 20 12v1a2 2 0 0 1-2 2h-.17A7.98 7.98 0 0 1 12 18a7.98 7.98 0 0 1-5.83-3H6a2 2 0 0 1-2-2v-1a8.004 8.004 0 0 1 7-7.94V3a1 1 0 0 1 1-1zm-4 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm8 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
          </svg>
        </motion.button>

        {/* Scroll to Top - Orange Color */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              onClick={scrollToTop}
              className={`${styles.iconButton} ${styles.scrollTop}`}
              aria-label="Scroll to top"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12 4l-8 8h5v8h6v-8h5z" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}