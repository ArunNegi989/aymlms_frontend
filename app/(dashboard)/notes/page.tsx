"use client";

import { useState } from "react";
import { FileText, Download } from "lucide-react";
import type { NoteItem } from "@/app/types/classItem";
import styles from "./page.module.css";

const dummyNotes: NoteItem[] = [
  { id: "1", title: "Yoga Philosophy - Introduction", module: "Module 1 - Yoga Concepts", sizeMb: 2.4, fileUrl: "#", downloaded: true },
  { id: "2", title: "Ashtanga Yoga Notes", module: "Module 2 - Asanas", sizeMb: 3.1, fileUrl: "#", downloaded: false },
  { id: "3", title: "Pranayama Guide", module: "Module 3 - Pranayama", sizeMb: 1.8, fileUrl: "#", downloaded: true },
  { id: "4", title: "Meditation Notes", module: "Module 4 - Meditation", sizeMb: 2.2, fileUrl: "#", downloaded: false },
];

export default function NotesPage() {
  const [tab, setTab] = useState<"all" | "downloaded">("all");

  const filtered =
    tab === "all" ? dummyNotes : dummyNotes.filter((n) => n.downloaded);

  return (
    <div>
      <h1 className={styles.title}>Course Notes</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === "all" ? styles.activeTab : ""}`}
          onClick={() => setTab("all")}
        >
          All Notes
        </button>
        <button
          className={`${styles.tab} ${tab === "downloaded" ? styles.activeTab : ""}`}
          onClick={() => setTab("downloaded")}
        >
          Downloaded
        </button>
      </div>

      <div className={styles.list}>
        {filtered.map((note) => (
          <div key={note.id} className={styles.row}>
            <div className={styles.iconWrap}>
              <FileText size={18} />
            </div>
            <div className={styles.info}>
              <h4 className={styles.noteTitle}>{note.title}</h4>
              <p className={styles.noteModule}>{note.module}</p>
            </div>
            <span className={styles.size}>{note.sizeMb} MB</span>
            <a href={note.fileUrl} className={styles.downloadBtn}>
              <Download size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}