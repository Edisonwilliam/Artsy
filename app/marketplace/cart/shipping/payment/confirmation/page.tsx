"use client";

import Image from "next/image";

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center relative overflow-hidden">
      {/* ── Decorative background blobs ── */}
      {/* Top-left blue blob */}
      <div
        className="absolute -top-10 -left-16 w-52 h-52 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #93c5fd 0%, #bfdbfe 40%, transparent 70%)",
        }}
      />
      {/* Top-center purple blob */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #c4b5fd 0%, #ddd6fe 40%, transparent 70%)",
        }}
      />
      {/* Right-side orange blob */}
      <div
        className="absolute top-48 -right-12 w-48 h-48 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #fdba74 0%, #fed7aa 40%, transparent 70%)",
        }}
      />

      {/* ── Hero illustration ── */}
      <div className="relative z-10 mt-24 md:mt-32 flex flex-col items-center px-5">
        <Image
          src="/Woman get online delivery.png"
          alt="Purchase confirmed illustration"
          width={280}
          height={280}
          className="object-contain"
          priority
        />

        {/* ── Thank you message ── */}
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 text-center leading-snug">
          Hey Celestina, thank you for your purchase.
        </h1>

        <p className="text-sm md:text-base text-gray-500 mt-4 text-center">
          You are amazing. Cheers to being{" "}
          <span className="text-black font-semibold underline underline-offset-4 decoration-1">
            ARTSY!
          </span>
        </p>
      </div>
    </main>
  );
}
