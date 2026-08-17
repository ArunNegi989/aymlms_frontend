export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    location?: string;
    bio?: string;
    avatarInitials: string;
    role: string;
    memberSince: string;
  }
  
  export interface PurchasedCourse {
    id: string;
    title: string;
    instructor: string;
    progress: number; // 0-100
    status: "not-started" | "in-progress" | "completed";
    purchasedOn: string;
    pricePaid: number;
    certificateAvailable: boolean;
  }
  
  export interface ProfileStats {
    totalCourses: number;
    completedCourses: number;
    certificatesEarned: number;
    totalSpent: number;
  }