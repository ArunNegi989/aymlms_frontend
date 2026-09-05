"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeroSlider from "./components/Homepage/HeroSlider/HeroSlider";
import AllCourses from "./components/Homepage/AllCourses/AllCourses";
import TrendingCourses from "./components/Homepage/TrendingCourses/TrendingCourses";
import FeaturedVideo from "./components/Homepage/FeaturedVideo/FeaturedVideo";
import Instructors from "./components/Homepage/Instructors/Instructors";
import Testimonials from "./components/Homepage/Testimonials/Testimonials";
import SubscribePlan from "./components/Homepage/SubscribePlan/SubscribePlan";
import Certifications from "./components/Homepage/Certifications/Certifications";
import Loader from "./components/Homepage/Loader/Loader"; // apna loader component path daal do
import styles from "./HomePage.module.css";

export default function Home() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/courses");
      return; // redirect ho raha hai, homepage flash mat dikhao
    }
    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return <Loader />;
  }

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