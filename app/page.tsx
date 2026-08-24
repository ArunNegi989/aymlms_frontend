"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./components/Homepage/Loader/Loader";
import HeroSlider from "./components/Homepage/HeroSlider/HeroSlider";
import AllCourses from "./components/Homepage/AllCourses/AllCourses";
import TrendingCourses from "./components/Homepage/TrendingCourses/TrendingCourses";
import FeaturedVideo from "./components/Homepage/FeaturedVideo/FeaturedVideo";
import Instructors from "./components/Homepage/Instructors/Instructors";
import Testimonials from "./components/Homepage/Testimonials/Testimonials";
import SubscribePlan from "./components/Homepage/SubscribePlan/SubscribePlan";
import Certifications from "./components/Homepage/Certifications/Certifications";
import styles from "./HomePage.module.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // ya apna auth check

    if (token) {
      // logged-in user seedha courses dashboard pe
      router.replace("/courses");
      return;
    }

    // guest -> yahi homepage dikhana hai, bas loader thoda dikha ke
    const timer = setTimeout(() => setChecking(false), 900);
    return () => clearTimeout(timer);
  }, [router]);

  if (checking) {
    return <Loader label="Preparing your practice..." />;
  }

  return (
    <main className={styles.fadeIn}>
        <Header/>
      <HeroSlider />
      <AllCourses />
      <TrendingCourses />
      <FeaturedVideo />
      <Instructors />
      
      <SubscribePlan />
      <Testimonials />
      <Certifications />
      <Footer/>
    </main>
  );
}