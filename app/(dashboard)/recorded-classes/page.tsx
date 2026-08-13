"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, PlayCircle } from "lucide-react";
import type { ClassItem } from "@/app/types/classItem";
import styles from "./page.module.css";

const dummyClasses: ClassItem[] = [
  {
    id: "1",
    title: "Introduction to Yoga",
    module: "Module 1 - Basic Concepts",
    duration: "20:45",
    thumbnail: "/images/class1.jpg",
    videoUrl: "/videos/class1.mp4",
    description: "",
    attachments: [],
  },
  {
    id: "2",
    title: "Surya Namaskar - Step by Step",
    module: "Module 2 - Asanas",
    duration: "28:10",
    thumbnail: "/images/class2.jpg",
    videoUrl: "/videos/class2.mp4",
    description:
      "Learn the benefits and detailed steps of Surya Namaskar. This sequence is perfect to energize your body and calm your mind.",
    attachments: [
      { label: "Class Notes (PDF)", url: "#" },
      { label: "Step Guide (PDF)", url: "#" },
    ],
  },
  {
    id: "3",
    title: "Standing Asanas",
    module: "Module 2 - Asanas",
    duration: "35:20",
    thumbnail: "/images/class3.jpg",
    videoUrl: "/videos/class3.mp4",
    description: "",
    attachments: [],
  },
  {
    id: "4",
    title: "Pranayama for Beginners",
    module: "Module 3 - Pranayama",
    duration: "22:30",
    thumbnail: "/images/class4.jpg",
    videoUrl: "/videos/class4.mp4",
    description: "",
    attachments: [],
  },
  {
    id: "5",
    title: "Meditation Techniques",
    module: "Module 4 - Meditation",
    duration: "26:15",
    thumbnail: "/images/class5.jpg",
    videoUrl: "/videos/class5.mp4",
    description: "",
    attachments: [],
  },
];

export default function RecordedClassesPage() {
  const [search, setSearch] = useState("");

  const filtered = dummyClasses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className={styles.title}>Recorded Classes</h1>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search for classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className={styles.moduleFilter}>
          <option>All Modules</option>
          <option>Module 1 - Basic Concepts</option>
          <option>Module 2 - Asanas</option>
          <option>Module 3 - Pranayama</option>
          <option>Module 4 - Meditation</option>
        </select>
      </div>

      <div className={styles.list}>
        {filtered.map((item) => (
          <div key={item.id} className={styles.row}>
            <div className={styles.thumb}>
              <PlayCircle size={22} />
            </div>
            <div className={styles.info}>
              <h4 className={styles.classTitle}>{item.title}</h4>
              <p className={styles.classModule}>{item.module}</p>
            </div>
            <span className={styles.duration}>{item.duration}</span>
            <Link href={`/recorded-classes/${item.id}`} className={styles.watchBtn}>
              Watch Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}