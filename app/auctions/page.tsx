"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { liveAuctions, topBids } from "@/lib/auctions";
import Footer from "@/components/Footer";

const BIDS_PER_PAGE = 4;

export default function AuctionsPage() {
  /* ── Carousel state ── */
  const [carouselPage, setCarouselPage] = useState(0);
  const totalCarouselPages = Math.ceil(liveAuctions.length / 2);

  /* ── Live countdown timers ── */
  const [timers, setTimers] = useState(() =>
    liveAuctions.map((a) => ({
      hours: a.hours,
      minutes: a.minutes,
      seconds: a.seconds,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((t) => {
          let { hours, minutes, seconds } = t;
          seconds -= 1;
          if (seconds < 0) {
            seconds = 59;
            minutes -= 1;
          }
          if (minutes < 0) {
            minutes = 59;
            hours -= 1;
          }
          if (hours < 0) {
            hours = 0;
            minutes = 0;
            seconds = 0;
          }
          return { hours, minutes, seconds };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (idx: number) => {
    const t = timers[idx];
    if (!t) return "0hr : 00mins: 00s";
    return `${t.hours}hr : ${String(t.minutes).padStart(2, "0")}mins: ${String(
      t.seconds
    ).padStart(2, "0")}s`;
  };

  /* ── Bids state ── */
  const [visibleBids, setVisibleBids] = useState(BIDS_PER_PAGE);
  const [likedBids, setLikedBids] = useState<{ [key: number]: boolean }>(() => {
    const initial: { [key: number]: boolean } = {};
    topBids.forEach((b) => {
      initial[b.id] = b.liked;
    });
    return initial;
  });

  const toggleLike = (id: number) => {
    setLikedBids((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const loadMoreBids = () => {
    setVisibleBids((prev) => Math.min(prev + BIDS_PER_PAGE, topBids.length));
  };

  /* Carousel navigation */
  const prevCarousel = useCallback(() => {
    setCarouselPage((p) => (p === 0 ? totalCarouselPages - 1 : p - 1));
  }, [totalCarouselPages]);

  const nextCarousel = useCallback(() => {
    setCarouselPage((p) => (p === totalCarouselPages - 1 ? 0 : p + 1));
  }, [totalCarouselPages]);

  /* Items visible on current carousel page (2 per page) */
  const carouselStart = carouselPage * 2;
  const carouselItems = liveAuctions.slice(carouselStart, carouselStart + 2);

  return (
    <main className="pt-20 bg-white min-h-screen">
      {/* ═══════════════════ HERO TEXT ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-4 lg:mt-8">
        <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-md lg:max-w-lg">
          Here&apos;s an overview of products actively on
          <br />
          auction, explore!
        </p>
      </section>

      {/* ═══════════════════ LIVE AUCTION CAROUSEL ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-5 lg:mt-8">
        <div className="relative">
          {/* Desktop: show all 4 items | Mobile: 2 items carousel */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4">
            {liveAuctions.map((item, idx) => (
              <Link
                href={`/auctions/live/${item.id}`}
                key={item.id}
                className="relative rounded-xl overflow-hidden aspect-[4/5] block cursor-pointer group"
              >
                <Image
                  src={item.image}
                  alt={`Live auction ${item.id}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <span className="text-white text-sm font-medium drop-shadow-lg">
                    {formatTimer(idx)}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-3">
              {carouselItems.map((item, idx) => {
                const globalIdx = carouselStart + idx;
                return (
                  <Link
                    href={`/auctions/live/${item.id}`}
                    key={item.id}
                    className="relative rounded-xl overflow-hidden aspect-[4/5] block cursor-pointer"
                  >
                    <Image
                      src={item.image}
                      alt={`Live auction ${item.id}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <span className="text-white text-[11px] md:text-sm font-medium drop-shadow-lg">
                        {formatTimer(globalIdx)}
                      </span>
                    </div>
                    {idx === 0 && (
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevCarousel(); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white transition-colors shadow-sm"
                        aria-label="Previous"
                      >
                        <svg className="w-3.5 h-3.5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    )}
                    {idx === 1 && (
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextCarousel(); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white transition-colors shadow-sm"
                        aria-label="Next"
                      >
                        <svg className="w-3.5 h-3.5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </Link>
                );
              })}
            </div>
            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {Array.from({ length: totalCarouselPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselPage(i)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                    i === carouselPage ? "bg-gray-800" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TOP BIDS ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-12 lg:mt-16">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-6 lg:mb-8">
          Top bids from popular creators
        </h2>

        {/* Desktop: grid layout | Mobile: stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topBids.slice(0, visibleBids).map((bid) => (
            <div
              key={bid.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Image area */}
              <div className="relative px-4 pt-4">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-50">
                  <Image
                    src={bid.image}
                    alt={bid.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />

                  {/* Heart icon */}
                  <button
                    onClick={() => toggleLike(bid.id)}
                    className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      likedBids[bid.id]
                        ? "bg-red-50 text-red-500"
                        : "bg-white/80 text-gray-400"
                    }`}
                    aria-label="Like"
                  >
                    <svg
                      className="w-4 h-4"
                      fill={likedBids[bid.id] ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Info below image */}
              <div className="px-4 pt-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{bid.name}</h3>
                  <span className="text-sm font-semibold">{bid.ethPrice}</span>
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  Creator :{" "}
                  <span className="text-blue-500 font-medium cursor-pointer hover:underline">
                    {bid.creator}
                  </span>
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Date : &nbsp;&nbsp;{bid.date}
                </p>
              </div>

              {/* Current bid bar */}
              <div className="flex items-stretch mt-3">
                <div className="flex-1 bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-3 rounded-bl-xl">
                  <span className="text-[10px] text-gray-400 block">
                    Current bid
                  </span>
                  <span className="text-xs font-bold mt-0.5 block">
                    {bid.currentBid}
                  </span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-xs font-semibold cursor-pointer transition-colors rounded-br-xl">
                  Place bid
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════ LOAD MORE ═══════════════════ */}
        {visibleBids < topBids.length && (
          <div className="flex justify-center mt-10 mb-6">
            <button
              onClick={loadMoreBids}
              className="px-10 py-3 border border-gray-300 rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
            >
              Load more
            </button>
          </div>
        )}
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <Footer />
    </main>
  );
}
