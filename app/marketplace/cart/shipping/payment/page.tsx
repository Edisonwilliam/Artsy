"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

const wallets = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "/MetaMask - jpeg.png",
  },
  {
    id: "coinbase",
    name: "Coinbase",
    icon: "/Coinbase - png.png",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "/WalletConnect - jpeg.png",
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "/Phantom - jpeg.png",
  },
];

/* Mapping from wallet ID to a display label for the "Wallet type" field */
const walletLabels: Record<string, string> = {
  metamask: "MetaMask",
  coinbase: "Coinbase Wallet",
  walletconnect: "WalletConnect",
  phantom: "Phantom",
};

export default function PaymentPage() {
  const router = useRouter();
  const [selectedWallet, setSelectedWallet] = useState("metamask");
  const [key, setKey] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [safeCode, setSafeCode] = useState("");
  const [saveWallet, setSaveWallet] = useState(false);

  /* ── helpers ── */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!key.trim()) next.key = "Please enter your wallet key";
    if (!expiryDate.trim()) next.expiryDate = "Please enter expiry date";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate))
      next.expiryDate = "Use MM/YY format";
    if (!safeCode.trim()) next.safeCode = "Please enter safe code";
    else if (!/^\d{3,4}$/.test(safeCode))
      next.safeCode = "Enter a valid 3 or 4 digit code";
    return next;
  };

  const handleConfirm = async () => {
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setIsSubmitting(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1800));
    setIsSubmitting(false);
    router.push("/marketplace/cart/shipping/payment/confirmation");
  };

  /* ── Format expiry as user types ── */
  const handleExpiryChange = (val: string) => {
    // Strip non-digits
    let digits = val.replace(/\D/g, "");
    if (digits.length > 4) digits = digits.slice(0, 4);
    if (digits.length >= 3) {
      setExpiryDate(`${digits.slice(0, 2)}/${digits.slice(2)}`);
    } else {
      setExpiryDate(digits);
    }
  };

  /* ── Safe code - digits only ── */
  const handleSafeCodeChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    setSafeCode(digits);
  };

  return (
    <main className="pt-20 bg-white min-h-screen">
      {/* ═══════════════════ BREADCRUMB ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-4">
        <div className="flex items-center gap-1 text-sm text-gray-400 flex-wrap">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-gray-700 transition-colors">
            Marketplace
          </Link>
          <span>/</span>
          <Link href="/marketplace/cart" className="hover:text-gray-700 transition-colors">
            Cart
          </Link>
          <span>/</span>
          <Link href="/marketplace/cart/shipping" className="hover:text-gray-700 transition-colors">
            Shipping
          </Link>
          <span>/</span>
          <span className="text-black font-medium">Payment</span>
        </div>
      </section>

      {/* ═══════════════════ PAYMENT FORM ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[600px] mx-auto mt-6">
        {/* Secure server badge */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <span>Secure server</span>
        </div>

        {/* ── Select your wallet ── */}
        <div className="mt-6">
          <div className="flex items-center gap-2.5">
            {/* Green radio dot */}
            <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <h2 className="text-base font-semibold">Select your wallet</h2>
          </div>

          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            Connect with one of our available wallet providers or add and connect
            a new wallet.
          </p>
        </div>

        {/* ── Wallet icons ── */}
        <div className="flex items-center gap-4 mt-5">
          {wallets.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelectedWallet(w.id)}
              className={`rounded-full cursor-pointer transition-all duration-200 ${
                selectedWallet === w.id
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : "hover:opacity-80"
              }`}
              aria-label={w.name}
            >
              <Image
                src={w.icon}
                alt={w.name}
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
            </button>
          ))}

          {/* Add wallet button */}
          <button
            className="w-9 h-9 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
            aria-label="Add wallet"
          >
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* ── Form fields ── */}
        <form
          className="flex flex-col gap-6 mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
        >
          {/* Wallet type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Wallet type
            </label>
            <input
              type="text"
              value={walletLabels[selectedWallet] || ""}
              readOnly
              className="w-full px-4 py-3 rounded-full border border-gray-200 text-sm text-gray-700 outline-none bg-gray-50 cursor-default"
            />
          </div>

          {/* Key */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Key</label>
            <div className="relative">
              <input
                type="text"
                value={key}
                onChange={(e) => {
                  setKey(e.target.value);
                  if (errors.key) setErrors((p) => ({ ...p, key: "" }));
                }}
                placeholder="Please enter your key"
                className={`w-full px-4 py-3 pr-12 rounded-full border text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white ${
                  errors.key ? "border-red-400" : "border-gray-200"
                }`}
              />
              {/* Wallet icon inside input – shows selected wallet */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Image
                  src={wallets.find((w) => w.id === selectedWallet)?.icon || wallets[0].icon}
                  alt="Wallet"
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            {errors.key && (
              <span className="text-xs text-red-500 pl-4">{errors.key}</span>
            )}
          </div>

          {/* Expiry date */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Expiry date
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => {
                handleExpiryChange(e.target.value);
                if (errors.expiryDate)
                  setErrors((p) => ({ ...p, expiryDate: "" }));
              }}
              placeholder="MM/YY"
              maxLength={5}
              className={`w-full px-4 py-3 rounded-full border text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white ${
                errors.expiryDate ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.expiryDate && (
              <span className="text-xs text-red-500 pl-4">
                {errors.expiryDate}
              </span>
            )}
          </div>

          {/* Safe code */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Safe code
            </label>
            <input
              type="password"
              value={safeCode}
              onChange={(e) => {
                handleSafeCodeChange(e.target.value);
                if (errors.safeCode)
                  setErrors((p) => ({ ...p, safeCode: "" }));
              }}
              placeholder="CVV"
              maxLength={4}
              className={`w-full px-4 py-3 rounded-full border text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white ${
                errors.safeCode ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.safeCode && (
              <span className="text-xs text-red-500 pl-4">
                {errors.safeCode}
              </span>
            )}
          </div>

          {/* Save checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={saveWallet}
              onChange={(e) => setSaveWallet(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer mt-0.5"
            />
            <span className="text-sm text-gray-600 leading-relaxed">
              Save my wallet details & information for future transactions
            </span>
          </label>

          {/* ═══════════════════ CONFIRM BUTTON ═══════════════════ */}
          <div className="flex flex-col items-center gap-4 mt-2 pb-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full max-w-xs py-3.5 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 ${
                isSubmitting
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing…
                </span>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </form>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <Footer />
    </main>
  );
}
