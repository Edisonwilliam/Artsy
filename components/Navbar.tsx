"use client";
import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartCount, notificationCount, isSearchOpen, setIsSearchOpen } = useAppContext();
    const [searchValue, setSearchValue] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black-100">
                <div className="flex items-center justify-between px-5 md:px-12 lg:px-20 py-4 max-w-350 mx-auto">
                    {/* Hamburger - mobile only */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex flex-col justify-center items-center w-8 h-8 gap-1.25 cursor-pointer md:hidden"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.75" : ""
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.75" : ""
                                }`}
                        />
                    </button>

                    {/* Logo - centered on mobile */}
                    <Link
                        href="/"
                        className={`text-2xl font-bold tracking-tight absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 ${isSearchOpen ? 'hidden lg:block' : ''}`}
                        style={{ fontFamily: "var(--font-clash)" }}
                    >
                        ARTSY.
                    </Link>

                    {/* Desktop nav links - centered */}
                    <div className={`hidden md:flex items-center gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-300'}`}>
                        <Link href="/" className="hover:font-bold transition-all">
                            Home
                        </Link>
                        <Link
                            href="/marketplace"
                            className="hover:font-bold transition-all"
                        >
                            Marketplace
                        </Link>
                        <Link
                            href="/auctions"
                            className="hover:font-bold transition-all"
                        >
                            Auctions
                        </Link>
                        <Link href="/drops" className="hover:font-bold transition-all">
                            Drops
                        </Link>
                    </div>

                    {/* Search Bar (conditional) */}
                    {isSearchOpen && (
                        <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 w-full max-w-md animate-[fadeIn_0.3s_ease-out]">
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search products, artists, exhibitions..."
                                autoFocus
                                className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm outline-none border border-transparent focus:border-gray-200"
                            />
                            <button onClick={() => setIsSearchOpen(false)} className="ml-3 text-xs font-bold text-black hover:underline transition-colors uppercase cursor-pointer">
                                Close
                            </button>
                        </div>
                    )}

                    {/* Right side: search + cart + notification */}
                    <div className="flex items-center gap-3 relative z-10">
                        {/* Search icon */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="cursor-pointer p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Search"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>

                        {/* Cart icon */}
                        <Link href="/marketplace/cart" className="cursor-pointer p-1.5 hover:bg-gray-100 rounded-full transition-colors relative" aria-label="Cart">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-[scaleIn_0.2s_ease-out]">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Notification bell - desktop only */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="cursor-pointer p-1.5 hover:bg-gray-100 rounded-full transition-colors relative"
                                aria-label="Notifications"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                    />
                                </svg>
                                {notificationCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-white border">
                                        {notificationCount}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute top-12 right-0 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl py-4 z-50 animate-[scaleIn_0.2s_ease-out] origin-top-right">
                                    <div className="px-5 pb-3 border-b border-gray-100 flex items-center justify-between">
                                        <h3 className="font-bold text-sm">Notifications</h3>
                                        <button
                                            onClick={() => setShowNotifications(false)}
                                            className="text-[10px] font-bold text-blue-500 uppercase tracking-wider hover:underline cursor-pointer"
                                        >
                                            Mark all as read
                                        </button>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-xs font-semibold text-gray-800">New Bid on "Editorials"</p>
                                                        <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Someone just placed a higher bid on your watched item.</p>
                                                        <p className="text-[10px] text-gray-400 mt-1 uppercase">2 hours ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="px-5 pt-3 border-t border-gray-100 mt-1">
                                        <button className="w-full text-center text-xs font-semibold text-gray-500 hover:text-black py-1 cursor-pointer transition-colors">View all updates</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 z-40 bg-white transition-transform duration-300 pt-20 px-6 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col gap-6 text-2xl font-medium">
                    <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="py-2 border-b border-gray-100"
                    >
                        Home
                    </Link>
                    <Link
                        href="/marketplace"
                        onClick={() => setMenuOpen(false)}
                        className="py-2 border-b border-gray-100"
                    >
                        Marketplace
                    </Link>
                    <Link
                        href="/auctions"
                        onClick={() => setMenuOpen(false)}
                        className="py-2 border-b border-gray-100"
                    >
                        Auctions
                    </Link>
                    <Link
                        href="/drops"
                        onClick={() => setMenuOpen(false)}
                        className="py-2 border-b border-gray-100"
                    >
                        Drops
                    </Link>
                </div>
            </div>
        </>
    );
}
