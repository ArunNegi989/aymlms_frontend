// File: data/freeCourses.ts
// Shared types + mock data for the Free Courses module.
// Both FreeCourses.tsx (listing) and FreeCourseDetails.tsx (detail page)
// import from this single source so the data stays in sync.
// Replace this file's contents with an API call later — the shape stays the same.

export interface YogaLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  isFree: boolean;
}

export interface YogaModule {
  id: string;
  title: string;
  description?: string;
  lessons: YogaLesson[];
}

export interface FreeYogaCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  instructorImage?: string;
  category: string;
  yogaStyle: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  rating?: number;
  students?: number;
  price?: number;
  originalPrice?: number;
  learningOutcomes?: string[];
  benefits?: string[];
  targetAudience?: string;
  modules: YogaModule[];
}

export const freeCourses: FreeYogaCourse[] = [
  {
    id: "hatha-yoga-foundations",
    title: "Foundations of Hatha Yoga",
    description:
      "Build a strong foundation in traditional Hatha Yoga through mindful movement, breath awareness and foundational asanas.",
    thumbnail: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    instructor: "Swami AYM",
    instructorImage: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Yoga Practice",
    yogaStyle: "Hatha",
    level: "Beginner",
    duration: "14 Days",
    rating: 4.9,
    students: 12500,
    price: 1499,
    originalPrice: 3499,
    learningOutcomes: [
      "Build a consistent yoga practice",
      "Understand foundational yoga postures",
      "Improve body awareness",
      "Develop breath awareness",
      "Practice basic pranayama",
      "Cultivate mindfulness",
    ],
    benefits: [
      "Access to all yoga modules",
      "Complete guided practices",
      "Full course curriculum",
      "Lifetime learning access",
      "Structured practice journey",
      "Guided meditation and breathwork sessions",
    ],
    targetAudience: "Complete beginners and those returning to yoga practice",
    modules: [
      {
        id: "m1",
        title: "Introduction to Hatha Yoga",
        description: "Understanding the foundations of Hatha Yoga practice",
        lessons: [
          { id: "l1", title: "Welcome & Introduction", duration: "10:00", videoUrl: "https://youtu.be/ua6GpI8ugxY?si=aNa9fA1MzMHAkQF2", isFree: true },
          { id: "l2", title: "Understanding Asana Practice", duration: "15:30", videoUrl: "https://youtu.be/ua6GpI8ugxY?si=aNa9fA1MzMHAkQF2", isFree: true },
          { id: "l3", title: "Breath Awareness Foundation", duration: "12:45", videoUrl: "https://youtu.be/ua6GpI8ugxY?si=aNa9fA1MzMHAkQF2", isFree: true },
        ],
      },
      {
        id: "m2",
        title: "Foundational Asanas",
        description: "Learn the essential postures of Hatha Yoga",
        lessons: [
          { id: "l4", title: "Mountain Pose & Standing Postures", duration: "20:15", videoUrl: "https://youtu.be/ua6GpI8ugxY?si=aNa9fA1MzMHAkQF2", isFree: true },
          { id: "l5", title: "Seated Postures & Forward Bends", duration: "18:20", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
          { id: "l6", title: "Supine Postures & Relaxation", duration: "22:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
        ],
      },
      {
        id: "m3",
        title: "Breath & Relaxation",
        description: "Integrating breath and relaxation into practice",
        lessons: [
          { id: "l7", title: "Basic Pranayama Techniques", duration: "25:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
          { id: "l8", title: "Yoga Nidra for Deep Relaxation", duration: "30:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
        ],
      },
    ],
  },
  {
    id: "pranayama-basics",
    title: "Introduction to Pranayama",
    description: "Discover the ancient science of breath control and unlock the power of your breath.",
    thumbnail: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    instructor: "Priya Sharma",
    instructorImage: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Breathwork",
    yogaStyle: "Pranayama",
    level: "Beginner",
    duration: "10 Days",
    rating: 4.8,
    students: 8900,
    price: 1299,
    originalPrice: 2999,
    learningOutcomes: [
      "Master foundational breathing techniques",
      "Understand the science of breath",
      "Practice Nadi Shodhana",
      "Develop a daily pranayama practice",
      "Improve lung capacity",
      "Reduce stress through breath",
    ],
    benefits: [
      "Breathwork for daily life",
      "Stress reduction techniques",
      "Improved concentration",
      "Better sleep quality",
      "Lifetime learning access",
    ],
    targetAudience: "Anyone wanting to explore the power of breath work",
    modules: [
      {
        id: "m1",
        title: "Understanding the Breath",
        description: "The foundation of all pranayama practice",
        lessons: [
          { id: "l1", title: "Introduction to Pranayama", duration: "12:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: true },
          { id: "l2", title: "Diaphragmatic Breathing", duration: "15:45", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: true },
        ],
      },
      {
        id: "m2",
        title: "Foundational Pranayama",
        description: "Essential breathing techniques for beginners",
        lessons: [
          { id: "l3", title: "Three-Part Breath (Dirga Pranayama)", duration: "18:20", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: true },
          { id: "l4", title: "Alternate Nostril Breathing", duration: "22:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
        ],
      },
      {
        id: "m3",
        title: "Advanced Breath Techniques",
        lessons: [
          { id: "l5", title: "Bhastrika (Bellows Breath)", duration: "25:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
          { id: "l6", title: "Kapalabhati (Skull Shining Breath)", duration: "28:45", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
        ],
      },
      {
        id: "m4",
        title: "Building a Daily Practice",
        lessons: [
          { id: "l7", title: "Creating Your Morning Ritual", duration: "20:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
        ],
      },
    ],
  },
  {
    id: "meditation-inner-calm",
    title: "Meditation for Inner Calm",
    description: "Discover the art of meditation and mindfulness for inner peace and mental clarity.",
    thumbnail: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    instructor: "Ananya Reddy",
    instructorImage: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Meditation",
    yogaStyle: "Meditation",
    level: "Beginner",
    duration: "7 Days",
    rating: 4.9,
    students: 15600,
    price: 999,
    originalPrice: 2499,
    learningOutcomes: [
      "Develop a regular meditation practice",
      "Cultivate mindfulness in daily life",
      "Learn guided meditation techniques",
      "Reduce stress and anxiety",
      "Improve focus and concentration",
      "Experience inner peace",
    ],
    benefits: ["Stress reduction", "Emotional balance", "Improved sleep", "Greater clarity", "Mindfulness skills"],
    targetAudience: "Anyone seeking inner peace and mental clarity",
    modules: [
      {
        id: "m1",
        title: "Understanding Meditation",
        lessons: [
          { id: "l1", title: "What is Meditation?", duration: "10:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: true },
          { id: "l2", title: "Breath Awareness Meditation", duration: "15:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: true },
        ],
      },
      {
        id: "m2",
        title: "Guided Meditation Practice",
        lessons: [
          { id: "l3", title: "Body Scan Meditation", duration: "20:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: true },
          { id: "l4", title: "Loving-Kindness Meditation", duration: "25:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
          { id: "l5", title: "Mantra Meditation", duration: "22:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
        ],
      },
    ],
  },
  {
    id: "morning-yoga-beginners",
    title: "Morning Yoga for Beginners",
    description: "Start each day with gentle yoga, mindful movement and breath awareness.",
    thumbnail: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    instructor: "Rajesh Kumar",
    instructorImage: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Yoga Practice",
    yogaStyle: "Vinyasa",
    level: "Beginner",
    duration: "14 Days",
    rating: 4.7,
    students: 10200,
    price: 1399,
    originalPrice: 2999,
    learningOutcomes: [
      "Build a morning yoga routine",
      "Master Surya Namaskar",
      "Improve morning mobility",
      "Practice morning pranayama",
      "Develop discipline and consistency",
    ],
    benefits: ["Better morning energy", "Improved flexibility", "Stress-free start to the day", "Consistent practice habit"],
    targetAudience: "Beginners looking for a morning practice routine",
    modules: [
      {
        id: "m1",
        title: "Morning Practice Foundations",
        lessons: [
          { id: "l1", title: "Gentle Morning Stretches", duration: "12:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: true },
          { id: "l2", title: "Introduction to Surya Namaskar", duration: "18:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: true },
        ],
      },
      {
        id: "m2",
        title: "Building Your Practice",
        lessons: [
          { id: "l3", title: "Morning Energy Flow", duration: "22:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
          { id: "l4", title: "Morning Pranayama Practice", duration: "20:45", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
        ],
      },
    ],
  },
  {
    id: "yoga-philosophy-intro",
    title: "Introduction to Yoga Philosophy",
    description: "Explore the wisdom of Patanjali's Yoga Sutras and the Eight Limbs of Yoga.",
    thumbnail: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    instructor: "Dr. Vikram Singh",
    instructorImage: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Philosophy",
    yogaStyle: "Philosophy",
    level: "Intermediate",
    duration: "21 Days",
    rating: 4.8,
    students: 7200,
    price: 1799,
    originalPrice: 3999,
    learningOutcomes: [
      "Understand the Eight Limbs of Yoga",
      "Explore the Yamas and Niyamas",
      "Learn about the Yoga Sutras",
      "Apply yogic wisdom to daily life",
      "Deepen your understanding of yoga",
    ],
    benefits: ["Deeper yoga understanding", "Philosophical grounding", "Mindful living skills", "Spiritual development"],
    targetAudience: "Yoga practitioners wanting to understand the philosophy",
    modules: [
      {
        id: "m1",
        title: "Foundations of Yoga Philosophy",
        lessons: [
          { id: "l1", title: "Introduction to Patanjali", duration: "15:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: true },
          { id: "l2", title: "What are the Yoga Sutras?", duration: "20:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
        ],
      },
      {
        id: "m2",
        title: "The Eight Limbs of Yoga",
        lessons: [
          { id: "l3", title: "Yamas and Niyamas", duration: "25:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
          { id: "l4", title: "Asana and Pranayama", duration: "22:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
          { id: "l5", title: "Pratyahara and Dharana", duration: "28:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
        ],
      },
    ],
  },
  {
    id: "yoga-stress-relief",
    title: "Yoga for Stress Relief",
    description: "Gentle yoga practices, breathwork and meditation to release tension and find inner peace.",
    thumbnail: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    instructor: "Swami AYM",
    instructorImage: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Wellness",
    yogaStyle: "Yin Yoga",
    level: "All Levels",
    duration: "14 Days",
    rating: 4.9,
    students: 18300,
    price: 1499,
    originalPrice: 3299,
    learningOutcomes: [
      "Release physical tension",
      "Calm the nervous system",
      "Practice restorative yoga",
      "Reduce anxiety through breathing",
      "Cultivate inner peace",
    ],
    benefits: ["Stress reduction", "Better sleep", "Nervous system regulation", "Emotional balance", "Improved well-being"],
    targetAudience: "Anyone experiencing stress or anxiety",
    modules: [
      {
        id: "m1",
        title: "Gentle Stress Relief Practices",
        lessons: [
          { id: "l1", title: "Restorative Yoga for Relaxation", duration: "25:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: true },
          { id: "l2", title: "Breathwork for Stress Relief", duration: "18:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: true },
          { id: "l3", title: "Guided Relaxation Practice", duration: "30:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
        ],
      },
      {
        id: "m2",
        title: "Mind-Body Connection",
        lessons: [
          { id: "l4", title: "Body Scan Meditation", duration: "22:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
          { id: "l5", title: "Yoga Nidra for Deep Rest", duration: "35:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isFree: false },
        ],
      },
    ],
  },
];

export const getCourseById = (id: string): FreeYogaCourse | undefined =>
  freeCourses.find((c) => c.id === id);