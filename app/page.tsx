"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

/* ── Hero grid images ── */
const heroImages = [
  { src: "/Rectangle 62 (2).png", alt: "Portrait 1" },
  { src: "/Rectangle 232.png", alt: "Portrait 2" },
  { src: "/Featured product.png", alt: "Egyptian" },
  { src: "/Featured product (1).png", alt: "Portrait 3" },
  { src: "/Rectangle 62 (3).png", alt: "Landscape" },
];

/* ── Featured products data ── */
const featured = [
  {
    title: "The Boolean Egyptian",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    image: "/Featured product.png",
    imageAlt: "Boolean Egyptian artwork",
    creators: ["/Ellipse 19.png", "/Ellipse 19.png", "/Ellipse 19.png"],
    creatorCount: 64,
  },
  {
    title: "Are We There Yet?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    image: "/Featured product (1).png",
    imageAlt: "Are We There Yet artwork",
    creators: ["/Ellipse 19.png", "/Ellipse 19.png", "/Ellipse 19.png"],
    creatorCount: 64,
  },
  {
    title: "Oloibiri 1897",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    image: "/Featured product 2.png",
    imageAlt: "Oloibiri 1897 artwork",
    creators: ["/Ellipse 19.png", "/Ellipse 19.png", "/Ellipse 19.png"],
    creatorCount: 64,
  },
];

/* ── Auction banner images ── */
const auctionImages = [
  { src: "/Rectangle 239 (1).png", timer: "06 hrs : 45 min : 22 s" },
  { src: "/Rectangle 236 (1).png", timer: "06 hrs : 45 min : 22 s" },
  { src: "/Rectangle 62.png", timer: "06 hrs : 45 min : 22 s" },
  { src: "/Rectangle 62 (1).png", timer: "06 hrs : 45 min : 22 s" },
];

/* ── Top creators categories ── */
const creatorCategories = ["Editorials", "Fashion", "Lifestyle", "Blueprint"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Editorials");
  const { addNotification } = useAppContext();
  const [isHomeNotified, setIsHomeNotified] = useState(false);

  /* Image stack for mobile (reuse old behavior) */
  const [mobileStack, setMobileStack] = useState(heroImages.map((h) => h.src));
  const bringToFront = (index: number) => {
    const newStack = [...mobileStack];
    const clicked = newStack.splice(index, 1)[0];
    newStack.unshift(clicked);
    setMobileStack(newStack);
  };

  return (
    <main className="pt-20 bg-white text-black">
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        {/* Heading */}
        <div className="mt-10 md:mt-14 lg:mt-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight italic" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Photography is poetry &amp; beautiful
            <br />
            untold stories
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mt-5 md:mt-6">
          <p className="text-center text-sm md:text-base text-black leading-relaxed max-w-xl mx-auto">
            Flip through more than 10,000 vintage shots, old photographs, historic images and captures seamlessly in one place. Register to get top access.
          </p>
        </div>

        {/* ── Desktop: 5 image grid ── */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4 mt-10">
          {heroImages.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] rounded-xl overflow-hidden group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="20vw"
              />
            </div>
          ))}
        </div>

        {/* ── Mobile: Image stack ── */}
        <div className="lg:hidden mt-10 flex justify-center items-center">
          <div className="relative w-[280px] h-[320px]">
            {mobileStack.map((img, index) => (
              <div
                key={img}
                onClick={() => bringToFront(index)}
                className="absolute cursor-pointer transition-all duration-500"
                style={{
                  zIndex: mobileStack.length - index,
                  transform: `translateX(${index * 20}px) rotate(${index * 3}deg)`,
                }}
              >
                <Image
                  src={img}
                  alt="stack image"
                  width={260}
                  height={300}
                  className="rounded-xl shadow-lg object-cover"
                  style={{ width: 260, height: 300 }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURED PRODUCTS ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-20 md:mt-28">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          Featured products
        </h2>

        {/* Desktop: alternating side-by-side layout */}
        <div className="hidden lg:flex flex-col gap-16">
          {featured.map((item, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <div
                key={i}
                className={`flex items-stretch gap-10 ${isReversed ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Image */}
                <div className="relative w-1/2 aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>

                {/* Info */}
                <div className="w-1/2 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-sm text-black leading-relaxed mb-6 font-medium">
                    {item.description}
                  </p>

                  {/* Creators */}
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {item.creators.map((avatar, j) => (
                        <div
                          key={j}
                          className="w-9 h-9 rounded-full border-2 border-white overflow-hidden"
                        >
                          <Image
                            src={avatar}
                            alt="Creator"
                            width={36}
                            height={36}
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-black">
                      {item.creatorCount} major creators
                    </span>
                  </div>

                  {/* Arrow link */}
                  <div className="mt-6">
                    <Link
                      href="/marketplace"
                      className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg"
                    >
                      →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: stacked cards */}
        <div className="lg:hidden flex flex-col gap-8">
          {featured.map((item, i) => (
            <div key={i} className="w-full">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/30" />
                <h3 className="absolute bottom-4 left-4 z-10 text-white text-xl font-bold">
                  {item.title}
                </h3>
                <Link
                  href="/marketplace"
                  className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center text-white"
                >
                  →
                </Link>
              </div>
              <p className="text-sm text-black leading-relaxed mt-3 font-medium">
                {item.description}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex -space-x-2">
                  {item.creators.map((avatar, j) => (
                    <div
                      key={j}
                      className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                    >
                      <Image src={avatar} alt="Creator" width={32} height={32} className="object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium">{item.creatorCount} major creators</span>
              </div>
              <hr className="border-gray-200 mt-4" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ AUCTION BANNER ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-16 md:mt-24">
        {/* Desktop: 4-image banner with dark overlay */}
        <div className="hidden lg:block relative rounded-2xl overflow-hidden shadow-2xl group">
          <div className="grid grid-cols-4 h-[420px]">
            {auctionImages.map((img, i) => (
              <div key={i} className="relative border-r border-white/10 last:border-0 overflow-hidden">
                <Image
                  src={img.src}
                  alt="Auction"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Individual column timer (aligned) */}
                <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
                   <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                      <span className="text-white text-xs font-mono tracking-wider">
                         {img.timer}
                      </span>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dark gradient overlay for bottom text area */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent z-10" />
          
          {/* Main Heading (on top of columns) */}
          <div className="absolute top-1/2 left-12 -translate-y-1/2 z-20 pointer-events-none">
            <div className="flex items-center gap-4 mb-2">
               <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
               <span className="text-white text-xs uppercase tracking-[0.3em] font-bold">Upcoming Auctions</span>
            </div>
            <h2 className="text-white text-3xl font-bold max-w-md leading-tight">
              See Upcoming Auctions and Exhibitions
            </h2>
            <div className="mt-6 flex items-center gap-6 group/link pointer-events-auto">
               <Link href="/auctions" className="text-white text-sm font-medium border-b border-white pb-1 hover:text-orange-400 hover:border-orange-400 transition-all">
                  View all auctions
               </Link>
               <button 
                  onClick={() => {
                    if (!isHomeNotified) addNotification();
                    setIsHomeNotified(!isHomeNotified);
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isHomeNotified 
                      ? "bg-white text-black" 
                      : "bg-transparent text-white border border-white/40 hover:bg-white hover:text-black"
                  }`}
               >
                  {isHomeNotified ? "Notified ✓" : "Get Notified"}
               </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer shadow-lg opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer shadow-lg opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile: single banner */}
        <div className="lg:hidden relative w-full h-[280px] rounded-2xl overflow-hidden">
          <Image
            src="/Rectangle 308.png"
            alt="Mona Lisa Redefined in Style"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <h2 className="text-white text-xl font-bold uppercase tracking-wide">
              Mona Lisa Redefined
              <br />
              in Style
            </h2>
          </div>
        </div>
      </section>

      {/* ═══════════════════ EXPLORE MARKETPLACES ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-12 md:mt-20">
        <div className="flex items-center justify-between py-5 border-b border-gray-200">
          <h2 className="text-base md:text-lg font-medium">
            Explore marketplace
          </h2>
          <Link
            href="/marketplace"
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            →
          </Link>
        </div>
      </section>

      {/* ═══════════════════ SEE AUCTIONS ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between py-5 border-b border-gray-200">
          <h2 className="text-base md:text-lg font-medium">See auctions</h2>
          <Link
            href="/auctions"
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            →
          </Link>
        </div>
      </section>

      {/* ═══════════════════ TOP CREATORS OF THE WEEK ═══════════════════ */}
      <section className="mt-16 md:mt-24">
        {/* Desktop: full-width dark section */}
        <div className="hidden lg:block bg-[#292929] text-white">
          <div className="max-w-[1400px] mx-auto px-20 py-16">
            <div className="flex items-start justify-between">
              {/* Left: title */}
              <div className="max-w-xs">
                <h2 className="text-3xl font-bold uppercase leading-tight tracking-wide">
                  Top Creators of the Week
                </h2>
              </div>

              {/* Right: categories + number */}
              <div className="flex items-start gap-16">
                {/* Categories */}
                <div className="flex flex-col gap-3">
                  {creatorCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left text-sm cursor-pointer transition-colors ${activeCategory === cat
                          ? "text-white font-semibold underline underline-offset-4"
                          : "text-gray-400 hover:text-gray-200"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Large number */}
                <div className="relative">
                  <span className="text-[120px] font-bold leading-none text-white/10">
                    85
                  </span>
                </div>
              </div>
            </div>

            {/* Creator image row */}
            <div className="flex items-end gap-6 mt-10">
              <div className="relative w-48 h-64 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/Top Creators Animation (1).png"
                  alt="Top Creator"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <div className="relative w-48 h-52 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/Featured product (1).png"
                  alt="Top Creator"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <div className="relative w-48 h-60 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/Rectangle 62.png"
                  alt="Top Creator"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <div className="relative w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/Rectangle 50 (1).png"
                  alt="Top Creator"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: image only */}
        <div className="lg:hidden px-5 md:px-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8">
            Top Creators of the Week
          </h2>
          <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden">
            <Image
              src="/Top Creators Animation (1).png"
              alt="Top Creators - CIRCA"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════ NEWSLETTER ═══════════════════ */}
      <Newsletter />

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <Footer />
    </main>
  );
}
