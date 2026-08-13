"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // ya apna auth check
    router.replace(token ? "/courses" : "/admin/login");
  }, [router]);

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span>Loading...</span>
    </div>
  );
}