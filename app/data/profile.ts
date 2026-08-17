import type { UserProfile, PurchasedCourse, ProfileStats } from "@/app/types/Profile";

export const userProfile: UserProfile = {
  id: "u1",
  firstName: "Priya",
  lastName: "Sharma",
  email: "priya.sharma@example.com",
  phone: "+91 98765 43210",
  location: "Dehradun, Uttarakhand",
  bio: "Yoga practitioner for 6 years, currently training to teach. Loves early morning Ashtanga and slow Sundays.",
  avatarInitials: "PS",
  role: "Student",
  memberSince: "March 2025",
};

export const purchasedCourses: PurchasedCourse[] = [
  {
    id: "1",
    title: "200 Hour Yoga Teacher Training",
    instructor: "Rishikesh Yogacharya",
    progress: 65,
    status: "in-progress",
    purchasedOn: "12 Mar 2025",
    pricePaid: 4999,
    certificateAvailable: false,
  },
  {
    id: "2",
    title: "300 Hour Advanced Yoga Training",
    instructor: "Himalayan Siddha",
    progress: 20,
    status: "in-progress",
    purchasedOn: "28 May 2025",
    pricePaid: 7999,
    certificateAvailable: false,
  },
  {
    id: "3",
    title: "Pranayama for Beginners",
    instructor: "Vivek Sharma",
    progress: 100,
    status: "completed",
    purchasedOn: "04 Jan 2025",
    pricePaid: 1999,
    certificateAvailable: true,
  },
];

export const profileStats: ProfileStats = {
  totalCourses: purchasedCourses.length,
  completedCourses: purchasedCourses.filter((c) => c.status === "completed").length,
  certificatesEarned: purchasedCourses.filter((c) => c.certificateAvailable).length,
  totalSpent: purchasedCourses.reduce((sum, c) => sum + c.pricePaid, 0),
};