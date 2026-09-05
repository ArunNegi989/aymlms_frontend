// Chatbot.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Chatbot.module.css";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const BOT_RESPONSES = {
  greeting: [
    "Hello! 👋 How can I help you today?",
    "Hi there! 😊 What brings you here?",
    "Hey! Welcome to our chat. How can I assist you?",
  ],
  support: [
    "I'd be happy to help with that! Could you please provide more details?",
    "Our support team is here for you. Let me understand your issue better.",
    "Great question! Let me guide you through this.",
  ],
  pricing: [
    "We have flexible pricing plans starting from $29/month. Would you like to see our plans?",
    "Our pricing is designed to suit businesses of all sizes. Let me share our plans with you.",
    "We offer competitive pricing with a free trial. Would you like to explore our options?",
  ],
  demo: [
    "I'd love to show you a demo! When would be a good time for you?",
    "We can schedule a demo at your convenience. What time works best for you?",
    "Our demo covers all key features. Would you like to book one now?",
  ],
  fallback: [
    "That's interesting! Could you tell me more?",
    "I understand. Let me think about how to best help you.",
    "Thanks for sharing that. Let me provide the best assistance I can.",
    "I appreciate your question. Let me help you with that.",
  ],
  goodbye: [
    "Thanks for chatting! Have a great day! 🌟",
    "Goodbye! Feel free to come back anytime. 👋",
    "It was nice talking to you! Take care! 💫",
  ],
};

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 👋 I'm your virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes("hi") || lowerMsg.includes("hello") || lowerMsg.includes("hey")) {
      return BOT_RESPONSES.greeting[Math.floor(Math.random() * BOT_RESPONSES.greeting.length)];
    }
    
    if (lowerMsg.includes("support") || lowerMsg.includes("help") || lowerMsg.includes("issue") || lowerMsg.includes("problem")) {
      return BOT_RESPONSES.support[Math.floor(Math.random() * BOT_RESPONSES.support.length)];
    }
    
    if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("pricing") || lowerMsg.includes("plan")) {
      return BOT_RESPONSES.pricing[Math.floor(Math.random() * BOT_RESPONSES.pricing.length)];
    }
    
    if (lowerMsg.includes("demo") || lowerMsg.includes("show") || lowerMsg.includes("see")) {
      return BOT_RESPONSES.demo[Math.floor(Math.random() * BOT_RESPONSES.demo.length)];
    }
    
    if (lowerMsg.includes("bye") || lowerMsg.includes("goodbye") || lowerMsg.includes("thanks") || lowerMsg.includes("thank")) {
      return BOT_RESPONSES.goodbye[Math.floor(Math.random() * BOT_RESPONSES.goodbye.length)];
    }
    
    return BOT_RESPONSES.fallback[Math.floor(Math.random() * BOT_RESPONSES.fallback.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage.text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (text: string) => {
    setInputText(text);
    setTimeout(() => handleSendMessage(), 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.chatbotContainer}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          {/* Header */}
          <div className={styles.chatbotHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.botAvatar}>🤖</div>
              <div>
                <div className={styles.headerTitle}>Aym Chat Assistant</div>
                <div className={styles.headerStatus}>
                  <span className={styles.statusDot}></span>
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.messageWrapper} ${
                  message.sender === "user" ? styles.userWrapper : styles.botWrapper
                }`}
              >
                {message.sender === "bot" && (
                  <div className={styles.messageAvatar}>🤖</div>
                )}
                <div
                  className={`${styles.messageBubble} ${
                    message.sender === "user" ? styles.userBubble : styles.botBubble
                  }`}
                >
                  <div className={styles.messageText}>{message.text}</div>
                  <div className={styles.messageTime}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
                {message.sender === "user" && (
                  <div className={styles.messageAvatar}>👤</div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className={`${styles.messageWrapper} ${styles.botWrapper}`}>
                <div className={styles.messageAvatar}>🤖</div>
                <div className={`${styles.messageBubble} ${styles.botBubble}`}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className={styles.quickReplies}>
            <button
              className={styles.quickReplyBtn}
              onClick={() => handleQuickReply("I need support")}
            >
              🆘 Support
            </button>
            <button
              className={styles.quickReplyBtn}
              onClick={() => handleQuickReply("Tell me about pricing")}
            >
              💰 Pricing
            </button>
            <button
              className={styles.quickReplyBtn}
              onClick={() => handleQuickReply("Book a demo")}
            >
              🎯 Demo
            </button>
          </div>

          {/* Input */}
          <div className={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className={styles.inputField}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className={styles.sendButton}
              aria-label="Send message"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}