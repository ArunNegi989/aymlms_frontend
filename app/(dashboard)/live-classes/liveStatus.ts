"use client";

import { useEffect, useState } from "react";
import type { LiveClassStatus } from "@/app/types/LiveClass";

export function computeLiveStatus(
  startDateTime: string,
  durationMinutes: number,
  now: Date
): LiveClassStatus {
  const start = new Date(startDateTime);
  const end = new Date(start.getTime() + durationMinutes * 60000);
  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "live";
  return "ended";
}

// IMPORTANT: "now" differs between server render time and client render time,
// so status must only be computed AFTER mount on the client - never during
// the initial render - otherwise React throws a hydration mismatch error.
// This hook returns `null` until mounted, then updates every 30s.
export function useNow(intervalMs = 30000) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return now;
}