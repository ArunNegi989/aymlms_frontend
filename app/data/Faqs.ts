// File location: app/data/faqs.ts
import type { FAQItem } from "@/app/components/faq/faq";

export const faqItems: FAQItem[] = [
  // Courses & Enrollment
  {
    id: "f1",
    category: "Courses & Enrollment",
    question: "How do I enroll in a course?",
    answer:
      "Open any course page and click 'Enroll Now'. You'll be taken through a short checkout, and access to live sessions or recordings begins immediately after payment is confirmed.",
  },
  {
    id: "f2",
    category: "Courses & Enrollment",
    question: "Can I switch batches after enrolling?",
    answer:
      "Yes. Email or message your program coordinator at least 3 days before your current batch starts and we'll move you to the next available batch at no extra cost.",
  },
  {
    id: "f3",
    category: "Courses & Enrollment",
    question: "Do I need prior yoga experience to join a teacher training?",
    answer:
      "100-hour and 200-hour trainings are open to dedicated practitioners of any level. 300-hour and 500-hour programs assume you already hold a 200-hour certification or equivalent teaching experience.",
  },

  // Certification
  {
    id: "f4",
    category: "Certification",
    question: "Are AYM certifications Yoga Alliance recognised?",
    answer:
      "Yes, our 100, 200 and 300-hour teacher trainings are Yoga Alliance recognised. Your certificate is issued within 2 weeks of completing all required hours and assessments.",
  },
  {
    id: "f5",
    category: "Certification",
    question: "What happens if I miss a live session?",
    answer:
      "Every live session is recorded and added to your course dashboard within 24 hours. Missing a live class doesn't affect your certification as long as you complete the recorded session and any linked assignment.",
  },

  // Payments & Refunds
  {
    id: "f6",
    category: "Payments & Refunds",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, UPI, net banking, and PayPal for international students. Payment plans are available for courses over ₹15,000 — contact us to set one up.",
  },
  {
    id: "f7",
    category: "Payments & Refunds",
    question: "What is your refund policy?",
    answer:
      "Full refunds are available up to 7 days before a course's start date. After that, we offer a batch transfer instead of a cash refund. Once a course has started, fees are non-refundable but transferable to a future batch.",
  },

  // Live Classes
  {
    id: "f8",
    category: "Live Classes",
    question: "What time zone are live classes held in?",
    answer:
      "All live class times are listed in IST (India Standard Time) on the course page. We recommend checking the converted time for your location before your first session.",
  },
  {
    id: "f9",
    category: "Live Classes",
    question: "What do I need for a live class?",
    answer:
      "A yoga mat, a quiet space with a stable internet connection, and a device with a camera. Most students find a laptop or tablet propped at hip height works best for teachers to see full-body alignment.",
  },

  // Technical
  {
    id: "f10",
    category: "Technical",
    question: "I can't access my course dashboard. What should I do?",
    answer:
      "First, confirm you're logged in with the same email used at checkout. If the issue persists, clear your browser cache or try a different browser, then reach out via the Contact Us page and we'll resolve it within one business day.",
  },
  {
    id: "f11",
    category: "Technical",
    question: "Can I watch recorded classes on my phone?",
    answer:
      "Yes, the full course dashboard is mobile-friendly and works in any modern mobile browser. A dedicated app is on our roadmap.",
  },
  {
    id: "f12",
    category: "Technical",
    question: "How long do I have access to recorded content?",
    answer:
      "Lifetime access, for as long as AYM Yoga School operates. Recordings don't expire after your course ends.",
  },
];