"use client";

import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";

const walletOptions = ["MetaMask", "Coinbase Wallet", "WalletConnect", "Phantom"];
const cityOptions = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Enugu"];
const countryOptions = ["Nigeria", "Ghana", "South Africa", "Kenya", "United States", "United Kingdom", "Canada", "Germany", "France"];

export default function ShippingPage() {
  const [email, setEmail] = useState("aanuoluwateenah@gmail.com");
  const [getUpdates, setGetUpdates] = useState(false);
  const [wallet, setWallet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <main className="pt-20 bg-white min-h-screen">
      {/* ═══════════════════ BREADCRUMB ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-4">
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/marketplace"
            className="hover:text-gray-700 transition-colors"
          >
            Marketplace
          </Link>
          <span>/</span>
          <Link
            href="/marketplace/cart"
            className="hover:text-gray-700 transition-colors"
          >
            Cart
          </Link>
          <span>/</span>
          <span className="text-black font-medium">Shipping</span>
        </div>
      </section>

      {/* ═══════════════════ SHIPPING FORM ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[600px] mx-auto mt-8">
        <form
          className="flex flex-col gap-7"
          onSubmit={(e) => {
            e.preventDefault();
            // Navigate to payment page in the future
          }}
        >
          {/* ── Your email ── */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">
              Your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-full border border-gray-200 text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white"
            />
            {/* Checkbox */}
            <label className="flex items-center gap-2 mt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={getUpdates}
                onChange={(e) => setGetUpdates(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-black accent-black cursor-pointer"
              />
              <span className="text-xs text-gray-500">
                Get updates about new drops & exclusive offers
              </span>
            </label>
          </div>

          {/* ── Choose a wallet ── */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">
              Choose a wallet
            </label>
            <div className="relative">
              <select
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-200 text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>
                  Select wallet
                </option>
                {walletOptions.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
              {/* Chevron */}
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
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
            </div>
          </div>

          {/* ── City ── */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">City</label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-200 text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>
                  Select city
                </option>
                {cityOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
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
            </div>
          </div>

          {/* ── Country ── */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">Country</label>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-200 text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>
                  Select country
                </option>
                {countryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
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
            </div>
          </div>

          {/* ── Postal code ── */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">
              Postal code
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter postal code"
              className="w-full px-4 py-3 rounded-full border border-gray-200 text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white"
            />
          </div>

          {/* ── Phone number ── */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">
              Phone number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-3 rounded-full border border-gray-200 text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white"
            />
          </div>

          {/* ═══════════════════ BUTTONS ═══════════════════ */}
          <div className="flex flex-col items-center gap-4 mt-4 pb-10">
            <Link
              href="/marketplace/cart/shipping/payment"
              className="w-full max-w-xs bg-black text-white py-3.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors text-center block"
            >
              Proceed to payment
            </Link>
            <Link
              href="/marketplace/cart"
              className="text-sm font-medium underline underline-offset-4 hover:text-gray-600 transition-colors"
            >
              Go back to cart
            </Link>
          </div>
        </form>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <Footer />
    </main>
  );
}
