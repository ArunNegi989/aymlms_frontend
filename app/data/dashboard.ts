import {
    PlayCircle,
    FileText,
    ClipboardList,
    HelpCircle,
    Award,
    type LucideIcon,
  } from "lucide-react";
  import type { Course } from "@/app/types/course";
  
  const THUMBNAIL =
    "https://aymyogaschool.com/uploads/1779687962348-446743738.jpg";
  
  export const FALLBACK_THUMBNAIL =
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop";
  
  export interface QuickAccessItem {
    label: string;
    icon: LucideIcon;
    href: string;
  }
  
  export const quickAccess: QuickAccessItem[] = [
    { label: "Recorded Classes", icon: PlayCircle, href: "/recorded-classes" },
    { label: "Notes", icon: FileText, href: "/notes" },
    { label: "Assignments", icon: ClipboardList, href: "/assignments" },
    { label: "Quizzes", icon: HelpCircle, href: "/quizzes" },
    { label: "My Certificates", icon: Award, href: "/certificates" },
  ];
  
  // Enrolled courses (these show progress and are clickable to continue)
  export const enrolledCourses: Course[] = [
    {
      id: "1",
      title: "200 Hour Yoga Teacher Training",
      instructor: "Rishikesh Yogacharya",
      thumbnail: THUMBNAIL,
      progress: 65,
      status: "enrolled",
      isEnrolled: true,
    },
    {
      id: "2",
      title: "300 Hour Advanced Yoga Training",
      instructor: "Himalayan Siddha",
      thumbnail: THUMBNAIL,
      progress: 20,
      status: "enrolled",
      isEnrolled: true,
    },
  ];
  
  // Recommended courses (not enrolled - locked)
  export const recommendedCourses: Course[] = [
    {
      id: "4",
      title: "Yin Yoga & Restorative Practice",
      instructor: "Maya Devi",
      thumbnail: THUMBNAIL,
      progress: 0,
      status: "enrolled",
      isEnrolled: false,
    },
    {
      id: "5",
      title: "Meditation for Stress Relief",
      instructor: "Ananda Giri",
      thumbnail: THUMBNAIL,
      progress: 0,
      status: "enrolled",
      isEnrolled: false,
    },
    {
      id: "6",
      title: "Vinyasa Flow Teacher Training",
      instructor: "Kiran Patel",
      thumbnail: THUMBNAIL,
      progress: 0,
      status: "enrolled",
      isEnrolled: false,
    },
  ];
  
  export interface TrendingCourse {
    id: string;
    title: string;
    instructor: string;
    thumbnail: string;
    rating: number;
    students: number;
    level: "beginner" | "intermediate" | "advanced";
    isEnrolled: boolean;
  }
  
  // Trending courses (not enrolled - locked)
  export const trendingCourses: TrendingCourse[] = [
    {
      id: "7",
      title: "Breathwork & Mindfulness",
      instructor: "Sita Raman",
      thumbnail: THUMBNAIL,
      rating: 4.9,
      students: 12543,
      level: "beginner",
      isEnrolled: false,
    },
    {
      id: "8",
      title: "Advanced Pranayama Techniques",
      instructor: "Vivek Sharma",
      thumbnail: THUMBNAIL,
      rating: 4.8,
      students: 8765,
      level: "advanced",
      isEnrolled: false,
    },
    {
      id: "9",
      title: "Yoga for Back Pain Relief",
      instructor: "Priya Mehta",
      thumbnail: THUMBNAIL,
      rating: 4.7,
      students: 6543,
      level: "intermediate",
      isEnrolled: false,
    },
  ];
  
  export interface ActivityItem {
    id: string;
    text: string;
    time: string;
    color: string;
  }
  
  export const recentActivity: ActivityItem[] = [
    {
      id: "a1",
      text: 'You completed the class "Pranayama for Beginners"',
      time: "2 days ago",
      color: "#4caf50",
    },
    {
      id: "a2",
      text: 'You started "200 Hour Yoga Teacher Training"',
      time: "3 days ago",
      color: "#ff7a00",
    },
    {
      id: "a3",
      text: 'You completed the quiz "Module 1 Quiz"',
      time: "5 days ago",
      color: "#2196f3",
    },
  ];