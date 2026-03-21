import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-16 md:mt-24 pb-10">
      {/* Top divider */}
      <div className="border-t border-gray-200 pt-10" />

      {/* ── Desktop layout ── */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-4 gap-10">
          {/* Column 1: ARTSY */}
          <div>
            <h3
              className="text-2xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              ARTSY.
            </h3>
          </div>

          {/* Column 2: Links */}
          <div>
            <ul className="flex flex-col gap-3 text-sm text-black">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-gray-900 transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/auctions" className="hover:text-gray-900 transition-colors">
                  Auctions
                </Link>
              </li>
              <li>
                <Link href="/drops" className="hover:text-gray-900 transition-colors">
                  Drops
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: More links */}
          <div>
            <ul className="flex flex-col gap-3 text-sm text-black">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Wallets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Rates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  High bids
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Reach us */}
          <div>
            <ul className="flex flex-col gap-3 text-sm text-black font-medium">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                artsystudio@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="lg:hidden">
        <h3
          className="text-2xl font-bold tracking-tight mb-8"
          style={{ fontFamily: "var(--font-clash)" }}
        >
          ARTSY.
        </h3>

        <h4 className="text-base font-semibold mb-5">Reach us</h4>

        <div className="flex flex-col gap-4 text-sm text-black font-medium">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>artsystudio@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Lagos, Nigeria</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mt-10 mb-6" />

      {/* Footer nav links + copyright */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-6 text-sm text-black font-semibold">
          <Link href="/" className="hover:text-gray-800 transition-colors">Home</Link>
          <Link href="/marketplace" className="hover:text-gray-800 transition-colors">Marketplace</Link>
          <Link href="/auctions" className="hover:text-gray-800 transition-colors">Auctions</Link>
          <Link href="/drops" className="hover:text-gray-800 transition-colors">Drops</Link>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-xs text-black mt-6 font-bold uppercase tracking-widest">
        Artsy copyright © 2022 All Rights Reserved.
      </p>
    </footer>
  );
}
