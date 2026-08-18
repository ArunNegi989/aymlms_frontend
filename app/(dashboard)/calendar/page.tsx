"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Video,
  PlayCircle,
  Clock,
  User,
  ExternalLink,
  Sunrise,
  BookOpen,
} from "lucide-react";
import { CLASS_SCHEDULE, groupClassesByDate, ClassEvent } from "@/app/data/classSchedule";
import styles from "./ClassCalendar.module.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toDateKey(year: number, month: number, day: number): string {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function isSameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

interface CalendarCell {
  day: number;
  dateKey: string;
  inCurrentMonth: boolean;
  date: Date;
}

export default function ClassCalendar() {
  // Static demo data starts in August 2026 — open the calendar there by default.
  const [viewDate, setViewDate] = useState(new Date(2026, 7, 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = new Date();
  const eventsByDate = useMemo(() => groupClassesByDate(CLASS_SCHEDULE), []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const cells: CalendarCell[] = useMemo(() => {
    const firstOfMonth = new Date(year, month, 1);
    const startOffset = firstOfMonth.getDay(); // 0 = Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const result: CalendarCell[] = [];

    // leading days from previous month
    for (let i = startOffset - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevMonthDate = new Date(year, month - 1, day);
      result.push({
        day,
        dateKey: toDateKey(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), day),
        inCurrentMonth: false,
        date: prevMonthDate,
      });
    }

    // current month days
    for (let day = 1; day <= daysInMonth; day++) {
      result.push({
        day,
        dateKey: toDateKey(year, month, day),
        inCurrentMonth: true,
        date: new Date(year, month, day),
      });
    }

    // trailing days from next month to complete the last week row
    const remainder = result.length % 7;
    if (remainder !== 0) {
      const toAdd = 7 - remainder;
      for (let day = 1; day <= toAdd; day++) {
        const nextMonthDate = new Date(year, month + 1, day);
        result.push({
          day,
          dateKey: toDateKey(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), day),
          inCurrentMonth: false,
          date: nextMonthDate,
        });
      }
    }

    return result;
  }, [year, month]);

  const goToPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToToday = () => setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));

  const selectedEvents: ClassEvent[] = selectedDate ? eventsByDate[selectedDate] ?? [] : [];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>AYM Yoga School</p>
          <h2 className={styles.title}>
            <Sunrise size={22} className={styles.titleIcon} />
            Class Schedule
          </h2>
          <p className={styles.subtitle}>Every live session and recording, in one calm view</p>
        </div>

        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.dotLive}`} /> Live class
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.dotRecorded}`} /> Recorded
          </span>
        </div>
      </div>

      {/* Month navigation */}
      <div className={styles.monthNav}>
        <button
          className={styles.navBtn}
          onClick={goToPrevMonth}
          aria-label="Previous month"
          type="button"
        >
          <ChevronLeft size={18} />
        </button>

        <div className={styles.monthLabel}>
          {MONTH_NAMES[month]} {year}
        </div>

        <button
          className={styles.navBtn}
          onClick={goToNextMonth}
          aria-label="Next month"
          type="button"
        >
          <ChevronRight size={18} />
        </button>

        <button className={styles.todayBtn} onClick={goToToday} type="button">
          Today
        </button>
      </div>

      {/* Weekday row */}
      <div className={styles.weekdayRow}>
        {WEEKDAYS.map((wd) => (
          <div key={wd} className={styles.weekdayCell}>
            {wd}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className={styles.grid}>
        {cells.map((cell) => {
          const dayEvents = eventsByDate[cell.dateKey] ?? [];
          const hasEvents = dayEvents.length > 0;
          const isToday = isSameDate(cell.date, today);
          const visibleEvents = dayEvents.slice(0, 2);
          const overflowCount = dayEvents.length - visibleEvents.length;

          return (
            <button
              key={cell.dateKey + cell.inCurrentMonth}
              type="button"
              className={[
                styles.dayCell,
                cell.inCurrentMonth ? "" : styles.dayCellMuted,
                isToday ? styles.dayCellToday : "",
                hasEvents ? styles.dayCellClickable : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => hasEvents && setSelectedDate(cell.dateKey)}
              disabled={!hasEvents}
              aria-label={
                hasEvents
                  ? `${dayEvents.length} class${dayEvents.length > 1 ? "es" : ""} on ${cell.dateKey}`
                  : undefined
              }
            >
              <span className={styles.dayNumber}>
                {cell.day}
                {isToday && <span className={styles.todayPill}>Today</span>}
              </span>

              {hasEvents && (
                <>
                  <div className={styles.eventList}>
                    {visibleEvents.map((ev) => (
                      <span
                        key={ev.id}
                        className={[
                          styles.eventChip,
                          ev.type === "live" ? styles.eventChipLive : styles.eventChipRecorded,
                        ].join(" ")}
                      >
                        {ev.type === "live" ? (
                          <Video size={10} className={styles.chipIcon} />
                        ) : (
                          <PlayCircle size={10} className={styles.chipIcon} />
                        )}
                        {ev.startTime} · {ev.title}
                      </span>
                    ))}
                    {overflowCount > 0 && (
                      <span className={styles.eventMore}>+{overflowCount} more</span>
                    )}
                  </div>

                  {/* Compact indicator shown only on small screens (see CSS) */}
                  <div className={styles.dayDots}>
                    {dayEvents.slice(0, 4).map((ev) => (
                      <span
                        key={ev.id}
                        className={[
                          styles.miniDot,
                          ev.type === "live" ? styles.dotLive : styles.dotRecorded,
                        ].join(" ")}
                      />
                    ))}
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Day details drawer */}
      {selectedDate && (
        <div className={styles.overlay} onClick={() => setSelectedDate(null)}>
          <div
            className={styles.drawer}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.drawerHeader}>
              <div>
                <p className={styles.drawerEyebrow}>Class details</p>
                <h3 className={styles.drawerDate}>
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setSelectedDate(null)}
                aria-label="Close"
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.drawerBody}>
              {selectedEvents.map((ev) => (
                <div key={ev.id} className={styles.eventCard}>
                  <div className={styles.eventCardTop}>
                    <span
                      className={[
                        styles.typeBadge,
                        ev.type === "live" ? styles.typeBadgeLive : styles.typeBadgeRecorded,
                      ].join(" ")}
                    >
                      {ev.type === "live" ? <Video size={12} /> : <PlayCircle size={12} />}
                      {ev.type === "live" ? "Live class" : "Recorded"}
                    </span>
                    <span className={styles.levelTag}>{ev.level}</span>
                  </div>

                  <h4 className={styles.eventTitle}>{ev.title}</h4>
                  <p className={styles.eventCourse}>
                    <BookOpen size={13} /> {ev.courseName}
                  </p>

                  <div className={styles.eventMetaRow}>
                    <span className={styles.metaItem}>
                      <Clock size={13} />
                      {ev.startTime} – {ev.endTime} IST
                    </span>
                    <span className={styles.metaItem}>
                      <User size={13} />
                      {ev.instructor}
                    </span>
                  </div>

                  <p className={styles.eventDescription}>{ev.description}</p>

                  <div className={styles.eventFooter}>
                    <span className={styles.platformTag}>{ev.platform}</span>

                    {ev.type === "live" && ev.meetingLink && (
                      <a
                        href={ev.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.joinBtn}
                      >
                        Join class <ExternalLink size={13} />
                      </a>
                    )}

                    {ev.type === "recorded" && ev.recordingUrl && (
                      <a
                        href={ev.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.joinBtnOutline}
                      >
                        Watch recording <PlayCircle size={13} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}