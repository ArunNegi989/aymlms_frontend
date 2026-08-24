// AllCourses.tsx
"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaSearch, FaFilter, FaTimes, FaStar, FaStarHalfAlt, 
  FaRegStar, FaClock, FaBook, FaUser, FaUsers, FaCertificate,
  FaGlobe, FaPlay, FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart
} from "react-icons/fa";
import { useWishlist } from "@/app/context/WishlistContext";
import styles from "./AllCourses.module.css";

// ===== TYPES & INTERFACES =====
interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  durationDays?: number;
  durationHours?: number;
  type: "live" | "recorded" | "live-recorded";
  level: "beginner" | "intermediate" | "advanced" | "all";
  instructor: {
    name: string;
    image: string;
  };
  rating: number;
  students: number;
  lessons: number;
  language: string;
  certificate: boolean;
  lifetimeAccess: boolean;
  price: number;
  originalPrice?: number;
  discount?: number;
  trending?: boolean;
  featured?: boolean;
  popular?: boolean;
  startDate?: string;
  classTime?: string;
  sessions?: number;
}

// ===== COURSE DATA =====
const courseData: Course[] = [
  {
    id: "1",
    slug: "200-hour-yoga-teacher-training",
    title: "200 Hour Yoga Teacher Training",
    description: "Complete teacher training program covering asanas, philosophy, anatomy, and teaching methodology.",
    image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Teacher Training",
    durationDays: 30,
    durationHours: 200,
    type: "live-recorded",
    level: "intermediate",
    instructor: {
      name: "Swami AYM",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    rating: 4.9,
    students: 1240,
    lessons: 120,
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    price: 29999,
    originalPrice: 39999,
    discount: 25,
    trending: true,
    featured: true,
    popular: true,
  },
  {
    id: "2",
    slug: "hatha-yoga-foundations",
    title: "Hatha Yoga Foundations",
    description: "Learn the fundamentals of Hatha Yoga including asanas, pranayama, and meditation.",
    image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Yoga",
    durationDays: 14,
    durationHours: 40,
    type: "recorded",
    level: "beginner",
    instructor: {
      name: "Priya Sharma",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    rating: 4.8,
    students: 3400,
    lessons: 35,
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    price: 4999,
    originalPrice: 7999,
    discount: 37,
    trending: true,
  },
  {
    id: "3",
    slug: "vinyasa-flow-mastery",
    title: "Vinyasa Flow Mastery",
    description: "Master dynamic Vinyasa sequences with proper alignment and breathing techniques.",
    image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Yoga",
    durationDays: 21,
    durationHours: 60,
    type: "live",
    level: "intermediate",
    instructor: {
      name: "Rajesh Kumar",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    rating: 4.7,
    students: 1850,
    lessons: 45,
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    price: 7999,
    originalPrice: 11999,
    discount: 33,
    startDate: "2026-09-15",
    classTime: "08:00 AM - 10:00 AM",
    sessions: 21,
  },
  {
    id: "4",
    slug: "meditation-mindfulness",
    title: "Meditation & Mindfulness",
    description: "Discover the art of meditation and mindfulness for inner peace and mental clarity.",
    image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Meditation",
    durationDays: 7,
    durationHours: 15,
    type: "recorded",
    level: "all",
    instructor: {
      name: "Ananya Reddy",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    rating: 4.9,
    students: 5600,
    lessons: 21,
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    trending: true,
    popular: true,
  },
  {
    id: "5",
    slug: "pranayama-breath-control",
    title: "Pranayama & Breath Control",
    description: "Master the ancient science of pranayama for physical and mental well-being.",
    image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Pranayama",
    durationDays: 14,
    durationHours: 25,
    type: "live",
    level: "beginner",
    instructor: {
      name: "Swami AYM",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    rating: 4.8,
    students: 2700,
    lessons: 28,
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    startDate: "2026-10-01",
    classTime: "06:00 AM - 07:30 AM",
    sessions: 14,
  },
  {
    id: "6",
    slug: "yoga-philosophy-deep-dive",
    title: "Yoga Philosophy Deep Dive",
    description: "Explore the philosophical foundations of yoga including Patanjali's Yoga Sutras.",
    image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Yoga Philosophy",
    durationDays: 21,
    durationHours: 50,
    type: "recorded",
    level: "intermediate",
    instructor: {
      name: "Dr. Vikram Singh",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    rating: 4.6,
    students: 890,
    lessons: 42,
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    price: 6999,
    originalPrice: 9999,
    discount: 30,
  },
  {
    id: "7",
    slug: "yoga-anatomy-physiology",
    title: "Yoga Anatomy & Physiology",
    description: "Understand the human body's anatomy and physiology for safe and effective yoga practice.",
    image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Anatomy",
    durationDays: 30,
    durationHours: 80,
    type: "recorded",
    level: "intermediate",
    instructor: {
      name: "Dr. Meera Sharma",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    rating: 4.7,
    students: 1200,
    lessons: 55,
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    price: 8999,
    originalPrice: 12999,
    discount: 30,
  },
  {
    id: "8",
    slug: "100-hour-yoga-teacher-training",
    title: "100 Hour Yoga Teacher Training",
    description: "Foundation teacher training program for aspiring yoga teachers.",
    image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Teacher Training",
    durationDays: 15,
    durationHours: 100,
    type: "live-recorded",
    level: "beginner",
    instructor: {
      name: "Swami AYM",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    rating: 4.8,
    students: 950,
    lessons: 65,
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    price: 19999,
    originalPrice: 24999,
    discount: 20,
    startDate: "2026-11-01",
    classTime: "07:00 AM - 09:00 AM",
    sessions: 15,
  },
  {
    id: "9",
    slug: "beginners-yoga-journey",
    title: "Beginner's Yoga Journey",
    description: "Start your yoga journey with this comprehensive beginner-friendly course.",
    image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Yoga",
    durationDays: 7,
    durationHours: 20,
    type: "recorded",
    level: "beginner",
    instructor: {
      name: "Priya Sharma",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    rating: 4.9,
    students: 7800,
    lessons: 18,
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    popular: true,
  },
  {
    id: "10",
    slug: "advanced-asana-practice",
    title: "Advanced Asana Practice",
    description: "Master advanced yoga poses with proper alignment and technique.",
    image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Yoga",
    durationDays: 14,
    durationHours: 35,
    type: "live",
    level: "advanced",
    instructor: {
      name: "Rajesh Kumar",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    rating: 4.6,
    students: 650,
    lessons: 28,
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    startDate: "2026-10-15",
    classTime: "05:00 PM - 07:00 PM",
    sessions: 14,
  },
  {
    id: "11",
    slug: "yoga-for-wellness",
    title: "Yoga for Wellness & Stress Relief",
    description: "Discover yoga practices for mental health, stress relief, and overall wellness.",
    image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Wellness",
    durationDays: 21,
    durationHours: 45,
    type: "recorded",
    level: "all",
    instructor: {
      name: "Ananya Reddy",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    rating: 4.7,
    students: 4200,
    lessons: 32,
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    price: 5999,
    originalPrice: 7999,
    discount: 25,
  },
  {
    id: "12",
    slug: "300-hour-advanced-teacher-training",
    title: "300 Hour Advanced Teacher Training",
    description: "Advanced teacher training program for experienced yoga teachers.",
    image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    category: "Teacher Training",
    durationDays: 45,
    durationHours: 300,
    type: "live-recorded",
    level: "advanced",
    instructor: {
      name: "Swami AYM",
      image: "https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg",
    },
    rating: 4.9,
    students: 520,
    lessons: 180,
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    price: 49999,
    originalPrice: 59999,
    discount: 17,
    trending: true,
    featured: true,
  },
];

// ===== MAIN COMPONENT =====
const AllCourses: React.FC = () => {
  const router = useRouter();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCourses, setVisibleCourses] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [trendingIndex, setTrendingIndex] = useState(0);
  const trendingRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Yoga", "Meditation", "Pranayama", "Yoga Philosophy", "Anatomy", "Teacher Training", "Wellness"];
  const types = ["All", "live", "recorded", "live-recorded"];
  const levels = ["All", "beginner", "intermediate", "advanced", "all"];
  const durations = ["All", "7 Days", "14 Days", "21 Days", "30 Days", "45 Days", "100 Hours", "200 Hours", "300 Hours"];
  const prices = ["All", "Free", "Under ₹5,000", "₹5,000–₹10,000", "₹10,000–₹20,000", "₹20,000+"];
  const ratings = ["All", "4+ Stars", "4.5+ Stars", "5 Stars"];
  const sortOptions = ["Most Popular", "Trending", "Newest", "Highest Rated", "Price: Low to High", "Price: High to Low"];

  // Navigate to the course description page.
  const goToCourse = (course: Course) => {
    router.push(`/course/${course.slug}`);
  };

  // Add/remove a course from the shared wishlist (used by the wishlist page too).
  const handleToggleWishlist = (course: Course) => {
    toggleWishlist({
      id: course.id,
      title: course.title,
      instructor: course.instructor.name,
      image: course.image,
      price: course.price,
      originalPrice: course.originalPrice,
      rating: course.rating,
      students: course.students.toLocaleString(),
    });
  };

  // Get trending courses
  const trendingCourses = useMemo(() => courseData.filter(c => c.trending), []);
  
  // Get featured courses
  const featuredCourses = useMemo(() => courseData.filter(c => c.featured), []);
  
  // Get live courses
  const liveCourses = useMemo(() => courseData.filter(c => c.type === "live"), []);
  
  // Get recorded courses
  const recordedCourses = useMemo(() => courseData.filter(c => c.type === "recorded"), []);
  
  // Get short courses (7-30 days)
  const shortCourses = useMemo(() => courseData.filter(c => c.durationDays && c.durationDays <= 30), []);
  
  // Get long courses (100+ hours)
  const longCourses = useMemo(() => courseData.filter(c => c.durationHours && c.durationHours >= 100), []);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = [...courseData];

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (selectedType !== "All") {
      filtered = filtered.filter(course => course.type === selectedType);
    }

    if (selectedLevel !== "All") {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    if (selectedDuration !== "All") {
      const durationMatch = selectedDuration.match(/(\d+)/);
      if (durationMatch) {
        const value = parseInt(durationMatch[0]);
        if (selectedDuration.includes("Hours")) {
          filtered = filtered.filter(course => 
            course.durationHours && course.durationHours === value
          );
        } else {
          filtered = filtered.filter(course => 
            course.durationDays && course.durationDays === value
          );
        }
      }
    }

    if (selectedPrice !== "All") {
      switch (selectedPrice) {
        case "Free":
          filtered = filtered.filter(course => course.price === 0);
          break;
        case "Under ₹5,000":
          filtered = filtered.filter(course => course.price > 0 && course.price < 5000);
          break;
        case "₹5,000–₹10,000":
          filtered = filtered.filter(course => course.price >= 5000 && course.price <= 10000);
          break;
        case "₹10,000–₹20,000":
          filtered = filtered.filter(course => course.price > 10000 && course.price <= 20000);
          break;
        case "₹20,000+":
          filtered = filtered.filter(course => course.price > 20000);
          break;
      }
    }

    if (selectedRating !== "All") {
      const minRating = parseFloat(selectedRating);
      if (!isNaN(minRating)) {
        filtered = filtered.filter(course => course.rating >= minRating);
      }
    }

    switch (sortBy) {
      case "Most Popular":
        filtered.sort((a, b) => b.students - a.students);
        break;
      case "Trending":
        filtered.sort((a, b) => (a.trending ? 1 : 0) - (b.trending ? 1 : 0));
        break;
      case "Newest":
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "Highest Rated":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedType, selectedLevel, selectedDuration, selectedPrice, selectedRating, sortBy]);

  const visibleFilteredCourses = useMemo(() => {
    return filteredCourses.slice(0, visibleCourses);
  }, [filteredCourses, visibleCourses]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCourses(prev => prev + 8);
      setIsLoading(false);
    }, 500);
  };

  const handleTrendingScroll = (direction: 'left' | 'right') => {
    const container = trendingRef.current;
    if (container) {
      const scrollAmount = 300;
      const newScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newScroll, behavior: 'smooth' });
    }
  };

  // Course Card Component
  const CourseCard = ({ course, index }: { course: Course; index: number }) => {
    const saved = isWishlisted(course.id);

    return (
      <motion.div
        className={styles.courseCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        onClick={() => goToCourse(course)}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") goToCourse(course);
        }}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.cardImage}>
          <img src={course.image} alt={course.title} loading="lazy" />

          <button
            className={styles.wishlistBtn}
            aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleWishlist(course);
            }}
          >
            {saved ? <FaHeart color="#ff7a00" /> : <FaRegHeart />}
          </button>

          <div className={styles.cardBadges}>
            {course.trending && <span className={styles.badgeTrending}>🔥 Trending</span>}
            {course.popular && <span className={styles.badgePopular}>⭐ Popular</span>}
            {course.featured && <span className={styles.badgeFeatured}>✨ Featured</span>}
            {course.type === "live" && <span className={styles.badgeLive}>🔴 Live</span>}
            {course.type === "recorded" && <span className={styles.badgeRecorded}>📹 Recorded</span>}
          </div>
          <div className={styles.cardOverlay}>
            <button
              className={styles.previewBtn}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCourse(course);
              }}
            >
              <FaPlay /> Preview
            </button>
          </div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardCategory}>{course.category}</div>
          <h3 className={styles.cardTitle}>{course.title}</h3>
          <p className={styles.cardDescription}>{course.description}</p>
          <div className={styles.cardInstructor}>
            <img src={course.instructor.image} alt={course.instructor.name} />
            <span>{course.instructor.name}</span>
          </div>
          <div className={styles.cardRating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => {
                if (i < Math.floor(course.rating)) return <FaStar key={i} />;
                if (i < Math.ceil(course.rating) && course.rating % 1 !== 0) return <FaStarHalfAlt key={i} />;
                return <FaRegStar key={i} />;
              })}
            </div>
            <span className={styles.ratingValue}>{course.rating}</span>
            <span className={styles.studentCount}>({course.students.toLocaleString()})</span>
          </div>
          <div className={styles.cardDetails}>
            <span><FaClock /> {course.durationDays}d</span>
            <span><FaBook /> {course.lessons}L</span>
            <span><FaUser /> {course.level}</span>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.cardPrice}>
              <span className={styles.currentPrice}>₹{course.price.toLocaleString()}</span>
              {course.originalPrice && (
                <>
                  <span className={styles.originalPrice}>₹{course.originalPrice.toLocaleString()}</span>
                  <span className={styles.discount}>-{course.discount}%</span>
                </>
              )}
            </div>
            <motion.button 
              className={styles.viewCourseBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                goToCourse(course);
              }}
            >
              View Course
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Section Slider Component
  const SectionSlider = ({ title, subtitle, courses, badge }: { title: string; subtitle?: string; courses: Course[]; badge?: string }) => {
    if (courses.length === 0) return null;

    return (
      <section className={styles.sliderSection}>
        <div className={styles.sliderHeader}>
          <div>
            <h2 className={styles.sliderTitle}>{title}</h2>
            {subtitle && <p className={styles.sliderSubtitle}>{subtitle}</p>}
          </div>
          {badge && <span className={styles.sliderBadge}>{badge}</span>}
        </div>
        <div className={styles.sliderContainer}>
          <button className={styles.sliderArrowLeft} onClick={() => handleTrendingScroll('left')}>
            <FaChevronLeft />
          </button>
          <div className={styles.sliderTrack} ref={trendingRef}>
            {courses.map((course, index) => (
              <div key={course.id} className={styles.sliderItem}>
                <CourseCard course={course} index={index} />
              </div>
            ))}
          </div>
          <button className={styles.sliderArrowRight} onClick={() => handleTrendingScroll('right')}>
            <FaChevronRight />
          </button>
        </div>
      </section>
    );
  };

  // Desktop Filter Section
  const FilterSection = () => (
    <div className={styles.filterSection}>
      <h4>Filters</h4>
      
      <div className={styles.filterGroup}>
        <h5>Category</h5>
        {categories.map(cat => (
          <label key={cat} className={styles.filterOption}>
            <input
              type="radio"
              name="category"
              checked={selectedCategory === cat}
              onChange={() => setSelectedCategory(cat)}
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <h5>Course Type</h5>
        {types.map(type => (
          <label key={type} className={styles.filterOption}>
            <input
              type="radio"
              name="type"
              checked={selectedType === type}
              onChange={() => setSelectedType(type)}
            />
            <span>{type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <h5>Level</h5>
        {levels.map(level => (
          <label key={level} className={styles.filterOption}>
            <input
              type="radio"
              name="level"
              checked={selectedLevel === level}
              onChange={() => setSelectedLevel(level)}
            />
            <span>{level === "all" ? "All Levels" : level.charAt(0).toUpperCase() + level.slice(1)}</span>
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <h5>Duration</h5>
        {durations.map(dur => (
          <label key={dur} className={styles.filterOption}>
            <input
              type="radio"
              name="duration"
              checked={selectedDuration === dur}
              onChange={() => setSelectedDuration(dur)}
            />
            <span>{dur}</span>
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <h5>Price</h5>
        {prices.map(price => (
          <label key={price} className={styles.filterOption}>
            <input
              type="radio"
              name="price"
              checked={selectedPrice === price}
              onChange={() => setSelectedPrice(price)}
            />
            <span>{price}</span>
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <h5>Rating</h5>
        {ratings.map(rating => (
          <label key={rating} className={styles.filterOption}>
            <input
              type="radio"
              name="rating"
              checked={selectedRating === rating}
              onChange={() => setSelectedRating(rating)}
            />
            <span>{rating}</span>
          </label>
        ))}
      </div>
    </div>
  );

  // Mobile Filter Drawer
  const MobileFilterDrawer = () => (
    <AnimatePresence>
      {isFilterOpen && (
        <>
          <motion.div
            className={styles.drawerBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFilterOpen(false)}
          />
          <motion.div
            className={styles.drawer}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className={styles.drawerHeader}>
              <h3>Filter & Sort</h3>
              <button onClick={() => setIsFilterOpen(false)}><FaTimes /></button>
            </div>
            <div className={styles.drawerContent}>
              <div className={styles.filterGroup}>
                <h5>Sort By</h5>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  {sortOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <h5>Category</h5>
                <div className={styles.filterOptionsGrid}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className={`${styles.filterChip} ${selectedCategory === cat ? styles.active : ""}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h5>Course Type</h5>
                <div className={styles.filterOptionsGrid}>
                  {types.map(type => (
                    <button
                      key={type}
                      className={`${styles.filterChip} ${selectedType === type ? styles.active : ""}`}
                      onClick={() => setSelectedType(type)}
                    >
                      {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h5>Level</h5>
                <div className={styles.filterOptionsGrid}>
                  {levels.map(level => (
                    <button
                      key={level}
                      className={`${styles.filterChip} ${selectedLevel === level ? styles.active : ""}`}
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level === "all" ? "All Levels" : level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h5>Duration</h5>
                <div className={styles.filterOptionsGrid}>
                  {durations.map(dur => (
                    <button
                      key={dur}
                      className={`${styles.filterChip} ${selectedDuration === dur ? styles.active : ""}`}
                      onClick={() => setSelectedDuration(dur)}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h5>Price</h5>
                <div className={styles.filterOptionsGrid}>
                  {prices.map(price => (
                    <button
                      key={price}
                      className={`${styles.filterChip} ${selectedPrice === price ? styles.active : ""}`}
                      onClick={() => setSelectedPrice(price)}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h5>Rating</h5>
                <div className={styles.filterOptionsGrid}>
                  {ratings.map(rating => (
                    <button
                      key={rating}
                      className={`${styles.filterChip} ${selectedRating === rating ? styles.active : ""}`}
                      onClick={() => setSelectedRating(rating)}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>

              <button className={styles.applyFiltersBtn} onClick={() => setIsFilterOpen(false)}>
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Course Preview Modal
  const CoursePreviewModal = () => (
    <AnimatePresence>
      {selectedCourse && (
        <>
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCourse(null)}
          />
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button className={styles.modalClose} onClick={() => setSelectedCourse(null)}>
              <FaTimes />
            </button>
            <div className={styles.modalContent}>
              <div className={styles.modalVideo}>
                <img src={selectedCourse.image} alt={selectedCourse.title} />
                <div className={styles.modalPlayBtn}>
                  <FaPlay />
                </div>
              </div>
              <div className={styles.modalInfo}>
                <h2>{selectedCourse.title}</h2>
                <p>{selectedCourse.description}</p>
                <div className={styles.modalDetails}>
                  <div><FaUser /> Instructor: {selectedCourse.instructor.name}</div>
                  <div><FaClock /> Duration: {selectedCourse.durationDays} days</div>
                  <div><FaBook /> {selectedCourse.lessons} lessons</div>
                  <div><FaUsers /> {selectedCourse.students.toLocaleString()} students</div>
                  <div><FaCertificate /> {selectedCourse.certificate ? "Certificate Included" : "No Certificate"}</div>
                  <div><FaGlobe /> {selectedCourse.language}</div>
                </div>
                <div className={styles.modalPrice}>
                  <span className={styles.currentPrice}>₹{selectedCourse.price.toLocaleString()}</span>
                  {selectedCourse.originalPrice && (
                    <>
                      <span className={styles.originalPrice}>₹{selectedCourse.originalPrice.toLocaleString()}</span>
                      <span className={styles.discount}>-{selectedCourse.discount}%</span>
                    </>
                  )}
                </div>
                <div className={styles.modalActions}>
                  <button className={styles.enrollBtn}>Enroll Now</button>
                  <button
                    className={styles.viewCourseBtn}
                    onClick={() => {
                      goToCourse(selectedCourse);
                      setSelectedCourse(null);
                    }}
                  >
                    View Full Course
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className={styles.pageContainer}>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.heroSection}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className={styles.heroTitle}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore Our <span className={styles.highlight}>Yoga Courses</span>
          </motion.h1>
          <motion.p
            className={styles.heroDescription}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Learn from experienced yoga teachers through structured online courses, live classes 
            and recorded learning programs designed for every level.
          </motion.p>
          <motion.div
            className={styles.heroButtons}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button className={styles.btnPrimary}>Explore Courses</button>
            <button className={styles.btnSecondary}>Start Learning</button>
          </motion.div>
          <motion.div
            className={styles.scrollIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Scroll to Explore ↓
          </motion.div>
        </motion.div>
        <div className={styles.heroBackground}>
          <div className={styles.heroImageWrapper}>
            <img 
              src="https://images.pexels.com/photos/3822724/pexels-photo-3822724.jpeg" 
              alt="Yoga hero"
              className={styles.heroImage}
            />
            <div className={styles.floatingCard1}>🧘 200+ Courses</div>
            <div className={styles.floatingCard2}>⭐ 4.9 Rating</div>
            <div className={styles.floatingCard3}>🌍 Global Community</div>
          </div>
        </div>
      </section>

      {/* ===== SEARCH SECTION ===== */}
      <section className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <h2 className={styles.searchTitle}>Find the Right Yoga Course for You</h2>
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search courses, yoga, meditation, teacher training..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </section>

      {/* ===== CATEGORY TABS ===== */}
      <section className={styles.tabsSection}>
        <div className={styles.tabsContainer}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.tab} ${selectedCategory === cat ? styles.activeTab : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
              {selectedCategory === cat && (
                <motion.div
                  className={styles.tabIndicator}
                  layoutId="tabIndicator"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ===== SLIDERS ===== */}
      {trendingCourses.length > 0 && (
        <SectionSlider 
          title="Trending Courses" 
          subtitle="Popular right now"
          courses={trendingCourses}
          badge="🔥 Popular"
        />
      )}

      {featuredCourses.length > 0 && (
        <SectionSlider 
          title="Featured Yoga Programs" 
          subtitle="Our most comprehensive programs"
          courses={featuredCourses}
          badge="✨ Featured"
        />
      )}

      {shortCourses.length > 0 && (
        <SectionSlider 
          title="Short Yoga Programs" 
          subtitle="7-30 day programs to get started"
          courses={shortCourses}
        />
      )}

      {longCourses.length > 0 && (
        <SectionSlider 
          title="Advanced & Long-Term Programs" 
          subtitle="100-300 hour professional programs"
          courses={longCourses}
          badge="🎓 Professional"
        />
      )}

      {liveCourses.length > 0 && (
        <SectionSlider 
          title="Learn Live With Our Teachers" 
          subtitle="Interactive live sessions with instructors"
          courses={liveCourses}
          badge="🔴 Live"
        />
      )}

      {recordedCourses.length > 0 && (
        <SectionSlider 
          title="Learn Anytime With Recorded Courses" 
          subtitle="On-demand learning at your own pace"
          courses={recordedCourses}
          badge="📹 Recorded"
        />
      )}

      {/* ===== MAIN CONTENT ===== */}
      <section className={styles.mainContent}>
        {/* Desktop Filter Sidebar */}
        <aside className={styles.desktopFilters}>
          <FilterSection />
        </aside>

        {/* Course Grid */}
        <div className={styles.courseGridContainer}>
          <div className={styles.topBar}>
            <div className={styles.resultsCount}>
              <h3>All Courses</h3>
              <span>{filteredCourses.length} Courses Available</span>
            </div>
            <div className={styles.topBarControls}>
              <select 
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <button 
                className={styles.mobileFilterBtn}
                onClick={() => setIsFilterOpen(true)}
              >
                <FaFilter /> Filter
              </button>
            </div>
          </div>

          <AnimatePresence>
            <motion.div 
              className={styles.courseGrid}
              layout
            >
              {visibleFilteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {visibleFilteredCourses.length < filteredCourses.length && (
            <div className={styles.loadMoreContainer}>
              <button 
                className={styles.loadMoreBtn}
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More Courses"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== LMS FEATURES ===== */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <motion.h2
            className={styles.featuresTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Everything You Need to <span className={styles.highlight}>Learn Yoga</span>
          </motion.h2>
          <motion.div
            className={styles.featuresGrid}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              { icon: "🎥", title: "Video Lessons", desc: "High-quality video content" },
              { icon: "🔴", title: "Live Classes", desc: "Interactive live sessions" },
              { icon: "📹", title: "Recorded Classes", desc: "Learn at your own pace" },
              { icon: "📊", title: "Progress Tracking", desc: "Monitor your journey" },
              { icon: "📝", title: "Course Materials", desc: "Downloadable resources" },
              { icon: "✅", title: "Quizzes", desc: "Test your knowledge" },
              { icon: "📋", title: "Assignments", desc: "Practice and apply" },
              { icon: "🎓", title: "Certificates", desc: "Earn recognition" },
              { icon: "👨‍🏫", title: "Instructor Support", desc: "Guidance when needed" },
              { icon: "🌍", title: "Community", desc: "Learn with others" },
              { icon: "📱", title: "Mobile Learning", desc: "Learn anywhere" },
              { icon: "♾️", title: "Lifetime Access", desc: "Access forever" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== LEARNING OUTCOMES ===== */}
      <section className={styles.outcomesSection}>
        <div className={styles.outcomesContainer}>
          <motion.h2
            className={styles.outcomesTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Will <span className={styles.highlight}>You Learn</span>?
          </motion.h2>
          <motion.div
            className={styles.outcomesGrid}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              "Yoga Asanas", "Pranayama", "Meditation", "Yoga Philosophy",
              "Anatomy", "Teaching Methodology", "Alignment", "Breathing Techniques",
              "Sequencing", "Practice Techniques"
            ].map((outcome, index) => (
              <motion.div
                key={index}
                className={styles.outcomeItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
              >
                <span className={styles.outcomeCheck}>✓</span>
                <span>{outcome}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== WHY AYM ===== */}
      <section className={styles.whySection}>
        <div className={styles.whyContainer}>
          <motion.h2
            className={styles.whyTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Learn With <span className={styles.highlight}>AYM Yoga School</span>?
          </motion.h2>
          <motion.div
            className={styles.whyGrid}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>🧘</div>
              <h4>Experienced Instructors</h4>
              <p>Learn from certified yoga teachers with years of experience.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>📚</div>
              <h4>Authentic Education</h4>
              <p>Rooted in traditional yoga practices and philosophies.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>🌍</div>
              <h4>Global Community</h4>
              <p>Connect with students from 60+ countries worldwide.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>🎓</div>
              <h4>Certification</h4>
              <p>Earn recognized certificates upon course completion.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.ctaSection}>
        <motion.div
          className={styles.ctaContainer}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.ctaTitle}>
            Start Your <span className={styles.highlight}>Yoga Learning Journey</span>
          </h2>
          <p className={styles.ctaDescription}>
            Choose a course that fits your goals, experience and schedule.
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.btnPrimary}>Explore Courses</button>
            <button className={styles.btnSecondary}>Join AYM Yoga School</button>
          </div>
        </motion.div>
      </section>

      {/* ===== MOBILE FILTER DRAWER ===== */}
      <MobileFilterDrawer />

      {/* ===== COURSE PREVIEW MODAL ===== */}
      <CoursePreviewModal />
    </div>
  );
};

export default AllCourses;