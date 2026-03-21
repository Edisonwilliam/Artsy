"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useMemo, useCallback } from "react";
import { allProducts, Product } from "@/lib/products";
import Footer from "@/components/Footer";

const PRODUCTS_PER_PAGE = 6;

/* ── Category options ── */
const categories = ["Editorials", "Fashion", "Optics", "Art & Museum", "Nature"];

/* ── Price ranges for "By artist" section (actually price ranges in the design) ── */
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Below $100.00", min: 0, max: 99.99 },
  { label: "$100.00 - $150.00", min: 100, max: 150 },
  { label: "$150.00 - $200.00", min: 150, max: 200 },
  { label: "Above $200.00", min: 200, max: Infinity },
];

/* ── Sort options ── */
const sortOptions = ["Default", "Price: Low to High", "Price: High to Low", "Name: A-Z", "Name: Z-A"];

export default function MarketplacePage() {
  /* ── state ── */
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Editorials", "Fashion"]);
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 150]);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<{ [key: number]: string }>({});

  /* ── desktop sidebar collapsible sections ── */
  const [showCategory, setShowCategory] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showArtist, setShowArtist] = useState(true);
  const [showCollection, setShowCollection] = useState(false);

  /* ── mobile filters drawer ── */
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  /* ── Toggle category ── */
  const toggleCategory = useCallback((cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  /* ── Filter & Sort logic ── */
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.creator.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.collection));
    }

    // Price range filter from artist section
    if (selectedPriceFilter !== "All") {
      const range = priceRanges.find((r) => r.label === selectedPriceFilter);
      if (range) {
        result = result.filter((p) => {
          const price = parseFloat(p.price.replace("$", ""));
          return price >= range.min && price <= range.max;
        });
      }
    }

    // Sort
    switch (sortBy) {
      case "Price: Low to High":
        result.sort((a, b) => parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")));
        break;
      case "Price: High to Low":
        result.sort((a, b) => parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", "")));
        break;
      case "Name: A-Z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name: Z-A":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [searchQuery, selectedCategories, selectedPriceFilter, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PRODUCTS_PER_PAGE, filteredProducts.length));
  };

  const handleImageUpload = (productId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImages((prev) => ({ ...prev, [productId]: url }));
    }
  };

  const triggerUpload = (productId: number) => {
    fileInputRefs.current[productId]?.click();
  };

  const getProductImage = (product: Product): string | null => {
    if (uploadedImages[product.id]) return uploadedImages[product.id];
    return product.image;
  };

  /* ── Chevron component ── */
  const Chevron = ({ open }: { open: boolean }) => (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  /* ── Filter sidebar content (shared between desktop & mobile) ── */
  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      {/* Filter title */}
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
        <span className="text-base font-semibold">Filter</span>
      </div>

      {/* ── By category ── */}
      <div>
        <button
          onClick={() => setShowCategory(!showCategory)}
          className="flex items-center justify-between w-full text-sm font-semibold cursor-pointer py-1"
        >
          By category
          <Chevron open={showCategory} />
        </button>
        {showCategory && (
          <div className="flex flex-col gap-2.5 mt-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                />
                <span className="text-sm text-gray-700">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ── By price ── */}
      <div>
        <button
          onClick={() => setShowPrice(!showPrice)}
          className="flex items-center justify-between w-full text-sm font-semibold cursor-pointer py-1"
        >
          By price
          <Chevron open={showPrice} />
        </button>
        {showPrice && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-3">
              ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
            </p>
            <input
              type="range"
              min={0}
              max={500}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full accent-black cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* ── By artist (price ranges in the design) ── */}
      <div>
        <button
          onClick={() => setShowArtist(!showArtist)}
          className="flex items-center justify-between w-full text-sm font-semibold cursor-pointer py-1"
        >
          By artist
          <Chevron open={showArtist} />
        </button>
        {showArtist && (
          <div className="flex flex-col gap-2 mt-3">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => setSelectedPriceFilter(range.label)}
                className={`text-sm text-left cursor-pointer transition-colors ${
                  selectedPriceFilter === range.label
                    ? "font-semibold text-black underline underline-offset-4"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Collection year ── */}
      <div>
        <button
          onClick={() => setShowCollection(!showCollection)}
          className="flex items-center justify-between w-full text-sm font-semibold cursor-pointer py-1"
        >
          Collection year
          <Chevron open={showCollection} />
        </button>
        {showCollection && (
          <div className="flex flex-col gap-2 mt-3">
            {["2022", "2023", "2024", "2025"].map((yr) => (
              <span key={yr} className="text-sm text-gray-600">
                {yr}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <main className="pt-20 bg-white min-h-screen">
      {/* ═══════════════════ TOP BAR ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-4">
        {/* Mobile: breadcrumb */}
        <div className="flex items-center gap-1 text-sm text-gray-400 lg:hidden">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-gray-700 transition-colors">
            Marketplace
          </Link>
          <span>/</span>
          <span className="text-black font-medium">Editorials</span>
        </div>

        {/* Desktop: search bar + results count + sort */}
        <div className="hidden lg:flex items-center gap-6 mt-2">
          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-full bg-gray-100 text-sm outline-none w-40 focus:w-56 transition-all placeholder-gray-400"
            />
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 flex-1">
            See 1-{Math.min(visibleCount, filteredProducts.length)} of{" "}
            {filteredProducts.length} results
          </p>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors"
            >
              Sort by
              <Chevron open={showSortDropdown} />
            </button>
            {showSortDropdown && (
              <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-20 min-w-[180px]">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSortBy(opt);
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors ${
                      sortBy === opt
                        ? "bg-gray-50 font-semibold text-black"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════ MOBILE: TABS + FILTERS ═══════════════ */}
      <section className="lg:hidden px-5 md:px-12 mt-2">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 overflow-x-auto">
          {categories.slice(0, 4).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setSelectedCategories([tab]);
              }}
              className={`pb-3 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategories.length === 1 && selectedCategories[0] === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results + Filter/Sort */}
        <p className="text-xs text-gray-500 mt-4">
          Showing 1-{Math.min(visibleCount, filteredProducts.length)} of{" "}
          {filteredProducts.length} results
        </p>

        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 text-sm font-medium cursor-pointer"
          >
            Filters
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 text-sm font-medium cursor-pointer relative"
          >
            Sort by
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* ═══════════════ MOBILE FILTERS DRAWER ═══════════════ */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold">Filters</span>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      {/* ═══════════════ MAIN CONTENT (sidebar + grid) ═══════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-6">
        <div className="flex gap-10">
          {/* ── Desktop sidebar ── */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <FilterContent />
          </aside>

          {/* ── Product grid ── */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProducts.map((product) => {
                const imgSrc = getProductImage(product);
                return (
                  <Link
                    key={product.id}
                    href={`/marketplace/${product.id}`}
                    className="block group"
                  >
                    {/* Product image or upload placeholder */}
                    {imgSrc ? (
                      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={imgSrc}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={(el) => {
                            fileInputRefs.current[product.id] = el;
                          }}
                          onChange={(e) => handleImageUpload(product.id, e)}
                        />
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            triggerUpload(product.id);
                          }}
                          className="w-full aspect-[3/4] rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 hover:bg-gray-50 transition-all bg-gray-50"
                        >
                          <svg
                            className="w-10 h-10 text-gray-400 mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-gray-400 font-medium">
                            Click to add image
                          </span>
                          <span className="text-xs text-gray-300 mt-1">
                            {product.name}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Product name + price */}
                    <div className="mt-3">
                      <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-800 group-hover:underline">
                        {product.name}
                      </h3>
                      <p className="text-sm font-bold mt-1">{product.price}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* ═══════════════════ SEE MORE ═══════════════════ */}
            {visibleCount < filteredProducts.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="px-10 py-3 border border-gray-300 rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  See more
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16" />

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <Footer />
    </main>
  );
}
