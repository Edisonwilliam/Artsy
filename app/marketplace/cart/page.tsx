"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SHIPPING_COST } from "@/lib/cart";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";

export default function CartPage() {
  const [activeTab, setActiveTab] = useState<"shop" | "scheduled">("shop");
  const { cartItems, updateQuantity, removeFromCart } = useAppContext();

  /* ── Quantity handlers ── */
  const increment = (id: number) => updateQuantity(id, 1);
  const decrement = (id: number) => updateQuantity(id, -1);
  const removeItem = (id: number) => removeFromCart(id);

  /* ── Calculations ── */
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;
  const grandTotal = total + SHIPPING_COST;

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
          <span className="text-black font-medium">Cart</span>
        </div>
      </section>

      {/* ═══════════════════ TABS ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-6">
        <div className="flex items-center justify-center">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveTab("shop")}
              className={`px-6 py-2 text-sm font-medium rounded-full cursor-pointer transition-all ${
                activeTab === "shop"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => setActiveTab("scheduled")}
              className={`px-6 py-2 text-sm font-medium rounded-full cursor-pointer transition-all ${
                activeTab === "scheduled"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Scheduled
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CART CONTENT ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Your cart is empty</p>
            <Link
              href="/marketplace"
              className="inline-block mt-4 text-sm font-medium underline"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* ── Left: Cart items ── */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 lg:gap-6 py-5"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-[72px] h-[72px] lg:w-[100px] lg:h-[100px] rounded-md overflow-hidden flex-shrink-0 bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="100px"
                      />
                    </div>

                    {/* Info + Quantity */}
                    <div className="flex-1 min-w-0">
                      {/* Category */}
                      <p className="text-xs text-gray-500 italic">
                        {item.category}
                      </p>
                      {/* Name */}
                      <h3 className="text-sm lg:text-base font-semibold mt-0.5">
                        {item.name}
                      </h3>
                      {/* Quantity control */}
                      <div className="flex items-center gap-0 mt-2">
                        <button
                          onClick={() => decrement(item.id)}
                          className="w-7 h-7 border border-gray-300 rounded-l flex items-center justify-center text-sm cursor-pointer hover:bg-gray-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-7 h-7 border-t border-b border-gray-300 flex items-center justify-center text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increment(item.id)}
                          className="w-7 h-7 border border-gray-300 rounded-r flex items-center justify-center text-sm cursor-pointer hover:bg-gray-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      {/* Remove button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg
                          className="w-3 h-3 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      {/* Price */}
                      <span className="text-sm lg:text-base font-semibold mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Order Summary (sticky on desktop) ── */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-24 bg-gray-50 lg:rounded-2xl lg:p-8 p-0">
                <h3 className="hidden lg:block text-lg font-bold mb-6">
                  Order Summary
                </h3>

                {/* Summary rows */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Products in cart :
                    </span>
                    <span className="text-sm font-semibold">
                      {totalItems} item{totalItems !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Shipping :</span>
                    <span className="text-sm font-semibold">
                      ${SHIPPING_COST.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total :</span>
                    <span className="text-sm font-semibold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Dashed divider */}
                <div className="border-t border-dashed border-gray-300 mt-4 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-800">
                      Grand total:
                    </span>
                    <span className="text-lg font-bold">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* ═══════════════════ BUTTONS ═══════════════════ */}
                <div className="mt-8 flex flex-col items-center gap-4 pb-10 lg:pb-0">
                  <Link
                    href="/marketplace/cart/shipping"
                    className="w-full bg-black text-white py-3.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors text-center block"
                  >
                    Proceed to checkout
                  </Link>
                  <Link
                    href="/marketplace"
                    className="text-sm font-medium underline underline-offset-4 hover:text-gray-600 transition-colors"
                  >
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <Footer />
    </main>
  );
}
