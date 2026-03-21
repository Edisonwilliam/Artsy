"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { liveAuctions } from "@/lib/auctions";
import type { ChatMessage } from "@/lib/auctions";

export default function LiveStreamPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const auction = liveAuctions.find((a) => a.id === id);

  /* ── Chat state ── */
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  /* ── Floating hearts ── */
  const [hearts, setHearts] = useState<
    { id: number; x: number; delay: number; size: number; color: string }[]
  >([]);
  const heartIdRef = useRef(0);

  /* ── Timer ── */
  const [timer, setTimer] = useState(() => {
    if (!auction) return { hours: 0, minutes: 0, seconds: 0 };
    return {
      hours: auction.hours,
      minutes: auction.minutes,
      seconds: auction.seconds,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => {
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
        if (hours < 0) return { hours: 0, minutes: 0, seconds: 0 };
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /* Load initial chat messages with staggered animation */
  useEffect(() => {
    if (!auction) return;
    auction.chatMessages.forEach((msg, i) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, msg]);
      }, (i + 1) * 600);
    });
  }, [auction]);

  /* Auto-scroll chat */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Send message */
  const sendMessage = () => {
    if (!inputValue.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      avatar: "/Ellipse 19.png",
      name: "You",
      message: inputValue.trim(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
  };

  /* Spawn floating heart */
  const spawnHeart = useCallback(() => {
    const colors = [
      "#ef4444",
      "#f97316",
      "#ec4899",
      "#a855f7",
      "#3b82f6",
      "#10b981",
      "#f59e0b",
    ];
    const newHeart = {
      id: heartIdRef.current++,
      x: Math.random() * 40,
      delay: Math.random() * 0.3,
      size: 18 + Math.random() * 14,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setHearts((prev) => [...prev, newHeart]);
    // Remove after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2000);
  }, []);

  if (!auction) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center text-white text-lg">
        Auction not found
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Background image */}
      <Image
        src={auction.image}
        alt={auction.tag}
        fill
        style={{ objectFit: "cover" }}
        priority
      />

      {/* Dark overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      {/* ═══════════════════ TOP BAR ═══════════════════ */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-[env(safe-area-inset-top,12px)] pb-3 pt-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">
            Tag: {auction.tag}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* LIVE badge */}
          <span className="bg-blue-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            LIVE
          </span>

          {/* Viewers */}
          <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full">
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            {auction.viewers}
          </span>

          {/* Close button */}
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
            aria-label="Close livestream"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ═══════════════════ CURRENT BID ═══════════════════ */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl text-center">
          Current bid : {auction.currentBidUSD}
        </h1>
      </div>

      {/* ═══════════════════ CHAT MESSAGES ═══════════════════ */}
      <div className="absolute bottom-20 left-0 right-16 lg:left-auto lg:right-4 lg:w-[400px] z-20 px-4 lg:px-0 max-h-[40vh] overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div
              key={`${msg.id}-${i}`}
              className="flex items-start gap-2.5 animate-fadeInUp"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/30">
                <Image
                  src={msg.avatar}
                  alt={msg.name}
                  width={32}
                  height={32}
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <span className="text-white text-[13px] font-semibold drop-shadow-md">
                  {msg.name}
                </span>
                <span className="text-white/90 text-[12px] drop-shadow-md">
                  {msg.message}
                </span>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* ═══════════════════ FLOATING HEARTS ═══════════════════ */}
      <div className="absolute bottom-20 right-4 z-20 w-12 h-48 pointer-events-none">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-0 animate-floatUp"
            style={{
              right: `${heart.x}%`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            <svg
              width={heart.size}
              height={heart.size}
              viewBox="0 0 24 24"
              fill={heart.color}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))}
      </div>

      {/* ═══════════════════ BOTTOM INPUT BAR ═══════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-4 lg:px-8 pb-[env(safe-area-inset-bottom,12px)] pb-4">
        <div className="flex items-center gap-3 lg:max-w-[500px] lg:ml-auto">
          {/* Input field */}
          <div className="flex-1 flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2.5 border border-white/20">
            <input
              type="text"
              placeholder="Join conversation..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-transparent text-white text-sm placeholder:text-white/60 outline-none"
            />

            {/* Send button */}
            <button
              onClick={sendMessage}
              className="ml-2 w-8 h-8 flex items-center justify-center cursor-pointer"
              aria-label="Send message"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          {/* Heart button */}
          <button
            onClick={spawnHeart}
            className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/25 transition-colors active:scale-90"
            aria-label="Send love"
          >
            <svg
              className="w-6 h-6 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ═══════════════════ ANIMATIONS ═══════════════════ */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }

        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-80px) scale(1.1);
          }
          100% {
            opacity: 0;
            transform: translateY(-160px) scale(0.6);
          }
        }
        .animate-floatUp {
          animation: floatUp 2s ease-out forwards;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
