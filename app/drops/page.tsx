"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import Footer from "@/components/Footer";
import { drops, Drop } from "@/lib/drops";
import { useAppContext } from "@/context/AppContext";

/* ── Live countdown hook ── */
function useCountdown(initial: { hours: number; minutes: number; seconds: number }, active: boolean) {
  const [time, setTime] = useState(initial);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) return { hours: 0, minutes: 0, seconds: 0 };
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [active]);

  return time;
}

/* ── Individual drop card ── */
function DropCard({ drop }: { drop: Drop }) {
  const isActive = drop.status === "upcoming" || drop.status === "live";
  const time = useCountdown(drop.timeRemaining, isActive);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <article className="flex flex-col gap-3">
      {/* ── Image ── */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
        <Image
          src={drop.image}
          alt={drop.title}
          fill
          className="object-cover"
        />

        {/* Overlay for ended drops */}
        {drop.status === "ended" && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
            <span className="text-white/80 text-xs">Auction ended</span>
            <span className="text-white text-sm font-semibold mt-0.5">
              {drop.endedAgo}
            </span>
          </div>
        )}

        {/* Time remaining bar */}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
            <span className="text-white/70 text-[10px] uppercase tracking-wider">
              Time remaining
            </span>
            <p className="text-white text-sm font-mono font-semibold mt-0.5">
              {pad(time.hours)} hrs : {pad(time.minutes)} min : {pad(time.seconds)} s
            </p>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          {drop.status === "upcoming" && (
            <span className="bg-sky-500 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
              Upcoming
            </span>
          )}
          {drop.status === "live" && (
            <span className="bg-sky-500 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Live now
            </span>
          )}
          {drop.status === "ended" && (
            <span className="bg-gray-500 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
              Ended
            </span>
          )}
        </div>
      </div>

      {/* ── Info ── */}
      <p className="text-xs text-black font-semibold">{drop.date}</p>
      <h3 className="text-lg font-bold leading-snug">{drop.title}</h3>
      <p className="text-sm text-black leading-relaxed font-medium">
        {drop.description}
      </p>
      <p className="text-sm text-gray-700">
        Creator :{" "}
        <span className="font-semibold text-sky-600">{drop.creator}</span>
      </p>

      {/* Action link */}
      <Link
        href={drop.actionHref}
        className="text-sky-600 text-sm font-medium underline underline-offset-4 hover:text-sky-700 transition-colors w-fit"
      >
        {drop.actionLabel}
      </Link>
    </article>
  );
}

/* ── Sort options ── */
const sortOptions = ["Latest", "Oldest", "Upcoming first", "Live first", "Ended first"];

export default function DropsPage() {
  const [sortBy, setSortBy] = useState("Latest");
  const [showSort, setShowSort] = useState(false);
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const { addNotification } = useAppContext();

  const getSortedDrops = useCallback((): Drop[] => {
    const copy = [...drops];
    switch (sortBy) {
      case "Oldest":
        return copy.reverse();
      case "Upcoming first":
        return copy.sort((a, b) =>
          a.status === "upcoming" ? -1 : b.status === "upcoming" ? 1 : 0
        );
      case "Live first":
        return copy.sort((a, b) =>
          a.status === "live" ? -1 : b.status === "live" ? 1 : 0
        );
      case "Ended first":
        return copy.sort((a, b) =>
          a.status === "ended" ? -1 : b.status === "ended" ? 1 : 0
        );
      default:
        return copy;
    }
  }, [sortBy]);

  const sortedDrops = getSortedDrops();

  return (
    <main className="pt-20 bg-white min-h-screen">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-6 md:mt-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Upcoming drops
        </h1>
        <p className="text-sm md:text-base text-black text-center mt-2 leading-relaxed max-w-sm mx-auto font-medium">
          You may turn on notifications so that no drop will miss you.
        </p>

        {/* Notify me button */}
        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              if (!notifyEnabled) addNotification();
              setNotifyEnabled(!notifyEnabled);
            }}
            className={`px-8 py-2.5 rounded-full text-sm font-semibold border-2 cursor-pointer transition-all duration-200 ${
              notifyEnabled
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black hover:bg-gray-50"
            }`}
          >
            {notifyEnabled ? "Notifications on ✓" : "Notify me"}
          </button>
        </div>

        {/* Sort by */}
        <div className="flex justify-end mt-8 relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
          >
            Sort by
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                showSort ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Sort dropdown */}
          {showSort && (
            <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-20 min-w-[160px]">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSortBy(opt);
                    setShowSort(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors ${
                    sortBy === opt
                      ? "bg-gray-50 font-semibold text-black"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ DROP CARDS ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-6 pb-16">
        {/* Desktop: 2-column grid | Mobile: single column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-12 lg:gap-y-14">
          {sortedDrops.map((drop) => (
            <DropCard key={drop.id} drop={drop} />
          ))}
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <Footer />
    </main>
  );
}
