"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-16 md:mt-24">
      {/* Mobile layout */}
      <div className="lg:hidden">
        <h2 className="text-lg md:text-xl font-bold uppercase tracking-[0.15em] mb-2">
          Newsletter
        </h2>
        <p className="text-xs text-black font-semibold mb-5 max-w-sm uppercase tracking-wide">
          Subscribe to our daily updates and newsletters
        </p>

        {subscribed ? (
          <div className="text-sm font-semibold text-green-600 animate-[fadeIn_0.3s_ease-out]">Thank you for subscribing!</div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex items-center border-b border-gray-300 pb-3 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
              className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
              required
            />
            <button
              type="submit"
              className="w-8 h-8 flex items-center justify-center cursor-pointer"
              aria-label="Subscribe"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>
        )}
      </div>

      {/* Desktop layout — centered */}
      <div className="hidden lg:flex flex-col items-center text-center">
        <p className="text-xs text-black font-bold uppercase tracking-widest mb-1">
          Newsletter
        </p>
        <h2 className="text-xl font-bold mb-6">
          Subscribe to get daily updates on new drops &amp; exciting deals
        </h2>

        {subscribed ? (
          <div className="text-sm font-semibold text-green-600 animate-[fadeIn_0.3s_ease-out]">Thank you for subscribing! Our latest updates are on their way to you.</div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex items-center border-b border-gray-300 pb-3 w-full max-w-lg">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
              className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400 text-center"
              required
            />
            <button
              type="submit"
              className="w-8 h-8 flex items-center justify-center cursor-pointer"
              aria-label="Subscribe"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
