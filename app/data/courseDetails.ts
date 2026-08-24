import type { CourseDetail } from "@/app/types/CourseDetail";

// Keyed by the same ids used in dummyCourses (my-courses page).
// Swap getCourseDetailById for a real API/DB call when ready -
// the shape (CourseDetail) is all CourseDescription needs.
export const courseDetails: Record<string, CourseDetail> = {
  "1": {
    id: "1",
    breadcrumb: ["Yoga & Wellness", "Teacher Training", "Ashtanga Yoga"],
    title: "200 Hour Yoga Teacher Training",
    subtitle:
      "A complete, hands-on training covering asana, pranayama, philosophy and teaching methodology - everything you need to teach with confidence.",
    badges: ["Bestseller", "Live Sessions"],
    instructor: "Rishikesh Yogacharya",
    lastUpdated: "7/2026",
    languages: ["English", "Hindi (Auto)"],
    rating: 4.8,
    ratingCount: 2143,
    students: 18426,
    thumbnail: "/images/course1.jpg",
    price: 4999,
    originalPrice: 14999,
    discountPercent: 67,
    subscriptionPrice: 999,
    whatYoullLearn: [
      "Master the fundamentals of Hatha and Ashtanga asana practice",
      "Build a safe, structured 60-minute class from warm-up to savasana",
      "Understand classical yoga philosophy and the eight limbs of yoga",
      "Practice and teach pranayama and meditation techniques",
      "Learn anatomy and alignment principles for safe adjustments",
      "Develop your own authentic voice and teaching style",
    ],
    relatedTopics: ["Ashtanga Yoga", "Pranayama", "Yoga Philosophy", "Meditation"],
    includes: [
      { label: "12 Live Role Play Sessions", icon: "roleplay" },
      { label: "48 hours on-demand video", icon: "video" },
      { label: "16 articles", icon: "article" },
      { label: "22 downloadable resources", icon: "download" },
      { label: "Access on mobile and TV", icon: "mobile" },
      { label: "Closed captions", icon: "captions" },
      { label: "Certificate of completion", icon: "certificate" },
    ],
    curriculum: [
      {
        id: "s1",
        title: "Module 1 - Yoga Concepts",
        lectureCount: 5,
        duration: "1h 20min",
        lectures: [
          { id: "l1", title: "Welcome and course orientation", duration: "4:12", preview: true },
          { id: "l2", title: "The history and roots of yoga", duration: "18:30" },
          { id: "l3", title: "Yoga Philosophy - Introduction", duration: "22:45" },
          { id: "l4", title: "The eight limbs of yoga", duration: "16:20" },
          { id: "l5", title: "Setting your intentions for the training", duration: "9:03" },
        ],
      },
      {
        id: "s2",
        title: "Module 2 - Asanas",
        lectureCount: 6,
        duration: "3h 05min",
        lectures: [
          { id: "l6", title: "Surya Namaskar - step by step", duration: "28:10", preview: true },
          { id: "l7", title: "Standing asanas", duration: "35:20" },
          { id: "l8", title: "Seated and forward-bending asanas", duration: "31:00" },
          { id: "l9", title: "Backbends and their benefits", duration: "27:40" },
          { id: "l10", title: "Inversions for beginners", duration: "24:15" },
          { id: "l11", title: "Ashtanga Yoga - Primary Series overview", duration: "38:50" },
        ],
      },
      {
        id: "s3",
        title: "Module 3 - Pranayama",
        lectureCount: 4,
        duration: "1h 32min",
        lectures: [
          { id: "l12", title: "Pranayama for beginners", duration: "22:30" },
          { id: "l13", title: "Nadi Shodhana - alternate nostril breathing", duration: "18:12" },
          { id: "l14", title: "Kapalabhati and Bhastrika", duration: "20:44" },
          { id: "l15", title: "Building a daily pranayama practice", duration: "16:35" },
        ],
      },
      {
        id: "s4",
        title: "Module 4 - Meditation",
        lectureCount: 3,
        duration: "1h 12min",
        lectures: [
          { id: "l16", title: "Meditation techniques", duration: "26:15" },
          { id: "l17", title: "Guided body-scan meditation", duration: "24:00" },
          { id: "l18", title: "Integrating meditation into teaching", duration: "22:10" },
        ],
      },
    ],
    requirements: [
      "No prior yoga teaching experience required",
      "A yoga mat and a quiet space to practice at home",
      "Willingness to complete guided practice hours between modules",
    ],
    description:
      "Welcome to the 200 Hour Yoga Teacher Training! This program is designed to take you from a dedicated practitioner to a confident, certified teacher. Across four structured modules you'll build a strong foundation in asana, pranayama, philosophy and meditation, then learn how to translate that knowledge into safe, well-sequenced classes.\n\nEach module combines recorded lessons with live role-play sessions, so you get real feedback on your teaching before you ever step in front of a class. By the end of the training you'll have a personal practice, a teaching toolkit and a certificate recognized by our partner studios.",
    related: [
      {
        id: "2",
        title: "300 Hour Advanced Yoga Training",
        thumbnail: "/images/course2.jpg",
        rating: 4.7,
        students: 6210,
        hours: 52,
        updated: "6/2026",
        price: 7999,
        originalPrice: 19999,
        badge: "Premium",
      },
      {
        id: "3",
        title: "Prenatal Yoga Teacher Training",
        thumbnail: "/images/course3.jpg",
        rating: 4.9,
        students: 3120,
        hours: 24,
        updated: "5/2026",
        price: 3999,
        originalPrice: 9999,
        badge: "Bestseller",
      },
    ],
  },

  "2": {
    id: "2",
    breadcrumb: ["Yoga & Wellness", "Teacher Training", "Advanced"],
    title: "300 Hour Advanced Yoga Training",
    subtitle:
      "Deepen your practice and teaching with advanced asana, adjustments, and Himalayan meditation traditions - for certified teachers ready to go further.",
    badges: ["Premium"],
    instructor: "Himalayan Siddha",
    lastUpdated: "6/2026",
    languages: ["English"],
    rating: 4.7,
    ratingCount: 980,
    students: 6210,
    thumbnail: "/images/course2.jpg",
    price: 7999,
    originalPrice: 19999,
    discountPercent: 60,
    subscriptionPrice: 1299,
    whatYoullLearn: [
      "Refine advanced asana with a focus on alignment and injury prevention",
      "Learn hands-on and verbal adjustment techniques",
      "Explore Himalayan meditation and breathwork traditions",
      "Design multi-week teaching curricula for varied student levels",
      "Deepen your understanding of subtle-body anatomy",
    ],
    relatedTopics: ["Advanced Asana", "Adjustments", "Himalayan Tradition", "Curriculum Design"],
    includes: [
      { label: "8 Live Role Play Sessions", icon: "roleplay" },
      { label: "52 hours on-demand video", icon: "video" },
      { label: "10 articles", icon: "article" },
      { label: "14 downloadable resources", icon: "download" },
      { label: "Access on mobile and TV", icon: "mobile" },
      { label: "Closed captions", icon: "captions" },
      { label: "Certificate of completion", icon: "certificate" },
    ],
    curriculum: [
      {
        id: "s1",
        title: "Module 1 - Advanced Asana",
        lectureCount: 5,
        duration: "2h 10min",
        lectures: [
          { id: "l1", title: "Where advanced practice begins", duration: "10:20", preview: true },
          { id: "l2", title: "Arm balances in depth", duration: "28:40" },
          { id: "l3", title: "Deep backbends safely", duration: "31:15" },
          { id: "l4", title: "Advanced inversions", duration: "26:50" },
          { id: "l5", title: "Sequencing an advanced class", duration: "23:00" },
        ],
      },
      {
        id: "s2",
        title: "Module 2 - Adjustments",
        lectureCount: 4,
        duration: "1h 45min",
        lectures: [
          { id: "l6", title: "Principles of hands-on adjustment", duration: "22:10", preview: true },
          { id: "l7", title: "Verbal cueing that works", duration: "18:30" },
          { id: "l8", title: "Adjustment do's and don'ts", duration: "27:00" },
          { id: "l9", title: "Practicing with partners", duration: "17:45" },
        ],
      },
      {
        id: "s3",
        title: "Module 3 - Himalayan Meditation",
        lectureCount: 4,
        duration: "1h 30min",
        lectures: [
          { id: "l10", title: "Origins of Himalayan meditation", duration: "20:00" },
          { id: "l11", title: "Breath and mantra practices", duration: "24:10" },
          { id: "l12", title: "Sustaining a daily sit", duration: "19:40" },
          { id: "l13", title: "Guiding others in meditation", duration: "26:15" },
        ],
      },
    ],
    requirements: [
      "Completion of a 200 hour yoga teacher training (or equivalent experience)",
      "An active personal practice",
      "A yoga mat and space for hands-on practice sessions",
    ],
    description:
      "The 300 Hour Advanced Yoga Training is built for certified teachers who want to deepen both their practice and their teaching. You'll refine advanced postures, learn safe and effective hands-on adjustments, and explore meditation traditions passed down through Himalayan lineages.\n\nBy the end of the course you'll be equipped to design and lead advanced-level classes and workshops with confidence.",
    related: [
      {
        id: "1",
        title: "200 Hour Yoga Teacher Training",
        thumbnail: "/images/course1.jpg",
        rating: 4.8,
        students: 18426,
        hours: 48,
        updated: "7/2026",
        price: 4999,
        originalPrice: 14999,
        badge: "Bestseller",
      },
      {
        id: "3",
        title: "Prenatal Yoga Teacher Training",
        thumbnail: "/images/course3.jpg",
        rating: 4.9,
        students: 3120,
        hours: 24,
        updated: "5/2026",
        price: 3999,
        originalPrice: 9999,
      },
    ],
  },

  "3": {
    id: "3",
    breadcrumb: ["Yoga & Wellness", "Teacher Training", "Prenatal"],
    title: "Prenatal Yoga Teacher Training",
    subtitle:
      "Learn to safely guide expecting mothers through every trimester with modified asana, breathwork, and trauma-informed teaching practices.",
    badges: ["Bestseller"],
    instructor: "Shalini Devi",
    lastUpdated: "5/2026",
    languages: ["English", "Hindi (Auto)"],
    rating: 4.9,
    ratingCount: 1540,
    students: 3120,
    thumbnail: "/images/course3.jpg",
    price: 3999,
    originalPrice: 9999,
    discountPercent: 60,
    subscriptionPrice: 799,
    whatYoullLearn: [
      "Modify core asana safely for each trimester",
      "Understand prenatal anatomy and contraindications",
      "Teach breathwork for labor preparation",
      "Create a trauma-informed, inclusive classroom",
      "Build postnatal recovery sequences",
    ],
    relatedTopics: ["Prenatal Yoga", "Postnatal Recovery", "Trauma-Informed Teaching"],
    includes: [
      { label: "6 Live Role Play Sessions", icon: "roleplay" },
      { label: "24 hours on-demand video", icon: "video" },
      { label: "9 articles", icon: "article" },
      { label: "12 downloadable resources", icon: "download" },
      { label: "Access on mobile and TV", icon: "mobile" },
      { label: "Closed captions", icon: "captions" },
      { label: "Certificate of completion", icon: "certificate" },
    ],
    curriculum: [
      {
        id: "s1",
        title: "Module 1 - Prenatal Foundations",
        lectureCount: 4,
        duration: "1h 05min",
        lectures: [
          { id: "l1", title: "Why prenatal yoga is different", duration: "12:00", preview: true },
          { id: "l2", title: "Anatomy of pregnancy", duration: "20:15" },
          { id: "l3", title: "Contraindications by trimester", duration: "18:30" },
          { id: "l4", title: "Building trust with expecting students", duration: "14:20" },
        ],
      },
      {
        id: "s2",
        title: "Module 2 - Trimester-Safe Asana",
        lectureCount: 5,
        duration: "1h 50min",
        lectures: [
          { id: "l5", title: "First trimester modifications", duration: "22:00", preview: true },
          { id: "l6", title: "Second trimester modifications", duration: "24:10" },
          { id: "l7", title: "Third trimester modifications", duration: "26:30" },
          { id: "l8", title: "Props and support", duration: "18:00" },
          { id: "l9", title: "Sequencing a full prenatal class", duration: "19:20" },
        ],
      },
      {
        id: "s3",
        title: "Module 3 - Breath, Birth and Beyond",
        lectureCount: 3,
        duration: "1h 00min",
        lectures: [
          { id: "l10", title: "Breathwork for labor", duration: "21:00" },
          { id: "l11", title: "Postnatal recovery sequences", duration: "22:30" },
          { id: "l12", title: "Supporting new mothers as a teacher", duration: "16:30" },
        ],
      },
    ],
    requirements: [
      "A base yoga teaching certification is recommended but not required",
      "A yoga mat, bolster or firm cushion, and a blanket",
      "An open, compassionate approach to working with expecting students",
    ],
    description:
      "This training prepares you to safely and confidently teach yoga to expecting mothers through every stage of pregnancy. You'll learn trimester-specific modifications, contraindications, and how to hold space for the physical and emotional shifts of pregnancy.\n\nThe course closes with postnatal recovery sequences, so you can support students well beyond delivery day.",
    related: [
      {
        id: "1",
        title: "200 Hour Yoga Teacher Training",
        thumbnail: "/images/course1.jpg",
        rating: 4.8,
        students: 18426,
        hours: 48,
        updated: "7/2026",
        price: 4999,
        originalPrice: 14999,
        badge: "Bestseller",
      },
      {
        id: "2",
        title: "300 Hour Advanced Yoga Training",
        thumbnail: "/images/course2.jpg",
        rating: 4.7,
        students: 6210,
        hours: 52,
        updated: "6/2026",
        price: 7999,
        originalPrice: 19999,
        badge: "Premium",
      },
    ],
  },
};

// ---- Auto-generated details for homepage cards (AllCourses + TrendingCourses) ----
// These give every card on the homepage a real, unique id that resolves to a
// full CourseDetail, so clicking through from AllCourses / TrendingCourses
// always lands on a populated description page.

type SummaryInput = {
  id: string;
  title: string;
  instructor: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  students: string; // e.g. "3.2k" or "12,400"
  tagline: string;
  category?: string;
  level?: string;
  duration?: string;
};

function parseStudentCount(v: string): number {
  const clean = v.replace(/,/g, "").trim();
  if (clean.toLowerCase().endsWith("k")) {
    return Math.round(parseFloat(clean) * 1000);
  }
  const n = parseInt(clean, 10);
  return Number.isFinite(n) ? n : 0;
}

function makeDetail(input: SummaryInput): CourseDetail {
  const discountPercent = input.originalPrice
    ? Math.round((1 - input.price / input.originalPrice) * 100)
    : 0;

  return {
    id: input.id,
    breadcrumb: ["Yoga & Wellness", input.category ?? "Courses", input.level ?? "All Levels"],
    title: input.title,
    subtitle: input.tagline,
    badges: discountPercent > 0 ? ["Bestseller"] : [],
    instructor: input.instructor,
    lastUpdated: "8/2026",
    languages: ["English", "Hindi (Auto)"],
    rating: input.rating,
    ratingCount: input.reviews,
    students: parseStudentCount(input.students),
    thumbnail: input.image,
    price: input.price,
    originalPrice: input.originalPrice ?? input.price,
    discountPercent,
    subscriptionPrice: Math.round(input.price / 5),
    whatYoullLearn: [
      `Understand the core principles of ${input.category ?? "this practice"}`,
      "Build a safe, consistent personal practice",
      "Learn proper alignment and breath control",
      "Apply techniques in a real, guided routine",
    ],
    relatedTopics: [input.category ?? "Yoga", input.level ?? "All Levels"],
    includes: [
      { label: "Live sessions", icon: "roleplay" },
      { label: "On-demand video", icon: "video" },
      { label: "Downloadable resources", icon: "download" },
      { label: "Access on mobile and TV", icon: "mobile" },
      { label: "Certificate of completion", icon: "certificate" },
    ],
    curriculum: [
      {
        id: "s1",
        title: "Module 1 - Getting Started",
        lectureCount: 3,
        duration: input.duration ?? "Self-paced",
        lectures: [
          { id: "l1", title: `Welcome to ${input.title}`, duration: "5:00", preview: true },
          { id: "l2", title: "Foundational technique", duration: "20:00" },
          { id: "l3", title: "Putting it into practice", duration: "18:00" },
        ],
      },
    ],
    requirements: [
      "A mat and a quiet space to practice",
      "No prior experience required unless noted",
    ],
    description: `${input.tagline}\n\nThis course is taught by ${input.instructor} and designed for ${input.level ?? "all levels"} practitioners.`,
    related: [],
  };
}

const allCoursesSummaries: SummaryInput[] = [
  {
    id: "all-c1",
    title: "Foundations of Hatha Yoga",
    instructor: "Anjali Rawat",
    image:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1200&auto=format&fit=crop",
    price: 2999,
    originalPrice: 4499,
    rating: 4.8,
    reviews: 412,
    students: "3.2k",
    tagline: "Build your practice from the ground up — breath, alignment, stillness.",
    category: "Hatha",
    level: "Beginner",
    duration: "4 weeks",
  },
  {
    id: "all-c2",
    title: "Vinyasa Flow Intensive",
    instructor: "Rohan Bisht",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    price: 3499,
    rating: 4.7,
    reviews: 268,
    students: "1.8k",
    tagline: "Dynamic sequencing that builds strength and breath-led movement.",
    category: "Vinyasa",
    level: "Intermediate",
    duration: "6 weeks",
  },
  {
    id: "all-c3",
    title: "Ashtanga Primary Series",
    instructor: "Meera Nair",
    image:
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop",
    price: 4999,
    rating: 4.9,
    reviews: 190,
    students: "980",
    tagline: "The traditional set sequence, taught with discipline and depth.",
    category: "Ashtanga",
    level: "Advanced",
    duration: "8 weeks",
  },
  {
    id: "all-c4",
    title: "Prenatal Yoga Essentials",
    instructor: "Sunita Joshi",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    price: 2499,
    rating: 4.9,
    reviews: 356,
    students: "2.1k",
    tagline: "Doctor-reviewed, trimester-specific sequences for a safe practice.",
    category: "Prenatal",
    level: "Beginner",
    duration: "3 weeks",
  },
  {
    id: "all-c5",
    title: "Guided Meditation & Breathwork",
    instructor: "Kabir Singh",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    price: 1999,
    rating: 4.6,
    reviews: 224,
    students: "4.5k",
    tagline: "A daily reset for the mind — breath, stillness, and presence.",
    category: "Meditation",
    level: "Beginner",
    duration: "2 weeks",
  },
  {
    id: "all-c6",
    title: "Vinyasa for Athletes",
    instructor: "Rohan Bisht",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop",
    price: 3999,
    rating: 4.8,
    reviews: 145,
    students: "760",
    tagline: "Mobility and recovery-focused flow built for high-output bodies.",
    category: "Vinyasa",
    level: "Advanced",
    duration: "5 weeks",
  },
];

const trendingSummaries: SummaryInput[] = [
  {
    id: "trend-c1",
    title: "200-Hour Yoga Teacher Training (Yoga Alliance Certified)",
    instructor: "Rishikesh Yogacharya, AYM Faculty",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=700&auto=format&fit=crop",
    price: 24999,
    originalPrice: 39999,
    rating: 4.8,
    reviews: 413,
    students: "12,400",
    tagline:
      "Live-taught 200-hour YTT covering asana, anatomy, philosophy and teaching methodology.",
    duration: "200 total hours",
  },
  {
    id: "trend-c2",
    title: "Ayurveda Foundations: Diet, Doshas & Daily Practice",
    instructor: "Dr. Meera Kulkarni, Ayurveda Physician",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=700&auto=format&fit=crop",
    price: 5999,
    originalPrice: 9999,
    rating: 4.7,
    reviews: 204,
    students: "6,120",
    tagline: "Understand your dosha and build a daily Ayurvedic routine backed by classical texts.",
    duration: "24 total hours",
  },
  {
    id: "trend-c3",
    title: "Ashtanga Primary Series: Foundations to Flow",
    instructor: "Anjali Rawat, Senior Instructor",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=700&auto=format&fit=crop",
    price: 7999,
    originalPrice: 12999,
    rating: 4.8,
    reviews: 328,
    students: "9,850",
    tagline: "Build strength and breath control through the traditional Ashtanga primary sequence.",
    duration: "30 total hours",
  },
  {
    id: "trend-c4",
    title: "Prenatal Yoga: Safe Practice Through Every Trimester",
    instructor: "Kavita Sharma, Prenatal Specialist",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=700&auto=format&fit=crop",
    price: 4999,
    originalPrice: 7999,
    rating: 4.9,
    reviews: 144,
    students: "4,310",
    tagline: "Trimester-specific sequences designed with obstetric guidance for a safe practice.",
    duration: "18 total hours",
  },
  {
    id: "trend-c5",
    title: "Meditation & Pranayama: A 21-Day Reset",
    instructor: "Suresh Bhatt, Meditation Teacher",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=700&auto=format&fit=crop&sat=-100",
    price: 3999,
    originalPrice: 6499,
    rating: 4.8,
    reviews: 251,
    students: "7,540",
    tagline: "A guided 21-day breathwork and meditation sequence to build a lasting daily practice.",
    duration: "14 total hours",
  },
  {
    id: "trend-c6",
    title: "Yin Yoga: Deep Stretch & Restorative Flow",
    instructor: "Priya Menon, Senior Instructor",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=700&auto=format&fit=crop&sat=-40",
    price: 4499,
    originalPrice: 7499,
    rating: 4.7,
    reviews: 176,
    students: "5,290",
    tagline: "Long-held, restorative postures designed to release deep tension and calm the mind.",
    duration: "16 total hours",
  },
  {
    id: "trend-c7",
    title: "300-Hour Advanced Yoga Teacher Training",
    instructor: "Rishikesh Yogacharya, AYM Faculty",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=700&auto=format&fit=crop&sat=-30",
    price: 34999,
    originalPrice: 54999,
    rating: 4.9,
    reviews: 106,
    students: "3,180",
    tagline:
      "For 200-hour graduates ready to deepen practice and teaching across advanced sequences.",
    duration: "300 total hours",
  },
  {
    id: "trend-c8",
    title: "Kids Yoga Instructor Certification",
    instructor: "Neha Kapoor, Child Yoga Specialist",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=700&auto=format&fit=crop&sat=-20",
    price: 6999,
    originalPrice: 10999,
    rating: 4.6,
    reviews: 82,
    students: "2,470",
    tagline: "Learn to design playful, age-appropriate yoga sessions for children aged 4 to 12.",
    duration: "20 total hours",
  },
];

[...allCoursesSummaries, ...trendingSummaries].forEach((s) => {
  courseDetails[s.id] = makeDetail(s);
});

export function getCourseDetailById(id: string): CourseDetail | undefined {
  return courseDetails[id];
}