"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSlider from "./components/Homepage/HeroSlider/HeroSlider";
import AllCourses from "./components/Homepage/AllCourses/AllCourses";
import TrendingCourses from "./components/Homepage/TrendingCourses/TrendingCourses";
import FeaturedVideo from "./components/Homepage/FeaturedVideo/FeaturedVideo";
import Instructors from "./components/Homepage/Instructors/Instructors";
import Testimonials from "./components/Homepage/Testimonials/Testimonials";
import SubscribePlan from "./components/Homepage/SubscribePlan/SubscribePlan";
import Certifications from "./components/Homepage/Certifications/Certifications";
import styles from "./HomePage.module.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/courses");
    }
  }, [router]);

  // Directly render homepage, no loader
  return (
    <main className={styles.fadeIn}>
      <HeroSlider />
      <AllCourses />
      <TrendingCourses />
      <FeaturedVideo />
      <Instructors />
      <SubscribePlan />
      <Testimonials />
      <Certifications />
    </main>
  );
}