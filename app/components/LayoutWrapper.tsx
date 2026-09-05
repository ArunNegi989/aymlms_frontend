"use client";

import { usePathname } from "next/navigation";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Pages where header/footer should NOT appear
  const hideHeaderFooter = ['/login', '/signup', '/dashboard' , '/my-courses', '/live-classes', '/recorded-classes', '/notes', '/assignments', '/quizzes', '/community', '/calendar', '/my-certificates', '/profile', '/settings'];
  const shouldHide = hideHeaderFooter.includes(pathname);

  return (
    <>
      {!shouldHide && <Header />}
      {children}
      {!shouldHide && <Footer />}
    </>
  );
}