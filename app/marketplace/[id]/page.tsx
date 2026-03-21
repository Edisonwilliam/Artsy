"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, use } from "react";
import { allProducts, getMoreFromCollection } from "@/lib/products";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { addToCart } = useAppContext();
  const { id } = use(params);
  const productId = parseInt(id, 10);
  const product = allProducts.find((p) => p.id === productId);
  const moreItems = getMoreFromCollection(productId);

  /* ── State ── */
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  /* upload state for product image if it's null */
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* upload state for collection items without images */
  const [collectionImages, setCollectionImages] = useState<{
    [key: number]: string;
  }>({});
  const collectionInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>(
    {}
  );

  if (!product) {
    return (
      <main className="pt-20 px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <div className="mt-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-500 mb-6">
            The product you are looking for does not exist.
          </p>
          <Link
            href="/marketplace"
            className="text-blue-500 hover:underline font-medium"
          >
            ← Back to Marketplace
          </Link>
        </div>
      </main>
    );
  }

  const heroImage = uploadedImage || product.image;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedImage(URL.createObjectURL(file));
  };

  const handleCollectionUpload = (
    itemId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setCollectionImages((prev) => ({
        ...prev,
        [itemId]: URL.createObjectURL(file),
      }));
    }
  };

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => q + 1);

  const prevSlide = () =>
    setCarouselIndex((i) => (i === 0 ? moreItems.length - 1 : i - 1));
  const nextSlide = () =>
    setCarouselIndex((i) => (i === moreItems.length - 1 ? 0 : i + 1));

  const currentCollectionItem = moreItems[carouselIndex];
  const collectionItemImage =
    collectionImages[currentCollectionItem?.id] ||
    currentCollectionItem?.image ||
    null;

  /* Chevron helper */
  const Chevron = ({ open }: { open: boolean }) => (
    <svg
      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <main className="pt-20">
      {/* ═══════════════════ BREADCRUMB ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-4">
        <div className="flex items-center gap-1 text-sm text-gray-400 flex-wrap">
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
          <span className="hover:text-gray-700 transition-colors">
            Editorials
          </span>
          <span>/</span>
          <span className="text-black font-semibold">{product.name}</span>
        </div>
      </section>

      {/* ═══════════════════ PRODUCT HERO (image + info side by side on desktop) ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
          {/* ── Left: Image ── */}
          <div className="w-full lg:w-1/2">
            {heroImage ? (
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src={heroImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleUpload}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-[3/4] rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 hover:bg-gray-50 transition-all group"
                >
                  <svg
                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600 transition-colors mb-3"
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
                  <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors font-medium">
                    Click to add product image
                  </span>
                </div>
              </>
            )}
          </div>

          {/* ── Right: Product Info ── */}
          <div className="w-full lg:w-1/2 lg:py-4">
            {/* Name + Price */}
            <div className="flex items-center justify-between">
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold tracking-wide">
                {product.name}
              </h1>
              <span className="text-lg md:text-2xl lg:text-3xl font-bold">
                {product.price}
              </span>
            </div>

            {/* Creator */}
            <p className="mt-4 text-sm lg:text-base text-gray-700">
              Creator :{" "}
              <span className="text-blue-500 font-medium cursor-pointer hover:underline">
                {product.creator}
              </span>
            </p>

            {/* Origin */}
            <p className="mt-2 text-sm lg:text-base text-gray-600">
              {product.origin}
            </p>

            {/* Total views */}
            <p className="mt-2 text-sm lg:text-base text-gray-600">
              Total views : {product.totalViews}
            </p>

            {/* ── Quantity selector ── */}
            <div className="flex items-center gap-6 mt-8">
              <button
                onClick={decrement}
                className="w-10 h-10 flex items-center justify-center text-xl font-medium cursor-pointer hover:bg-gray-100 rounded transition-colors border border-gray-200"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="text-lg font-semibold w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={increment}
                className="w-10 h-10 flex items-center justify-center text-xl font-medium cursor-pointer hover:bg-gray-100 rounded transition-colors border border-gray-200"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* ── Add to cart + Wishlist ── */}
            <div className="flex items-center gap-3 mt-8">
              <button 
                onClick={() => {
                  addToCart();
                  router.push("/marketplace/cart");
                }}
                className="px-10 py-3.5 border border-black text-sm font-medium hover:bg-black hover:text-white transition-colors cursor-pointer rounded-sm text-center"
              >
                Add to cart
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`w-12 h-12 border flex items-center justify-center cursor-pointer rounded-sm transition-colors ${
                  liked
                    ? "border-red-400 bg-red-50 text-red-500"
                    : "border-gray-300 text-gray-400 hover:border-gray-500"
                }`}
                aria-label="Add to wishlist"
              >
                <svg
                  className="w-5 h-5"
                  fill={liked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            {/* ── Description (always visible on desktop inside the right col) ── */}
            <div className="hidden lg:block mt-10">
              <h3 className="text-sm font-semibold mb-3">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ACCORDION SECTIONS (mobile / tablet) ═══════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-10 lg:mt-6">
        {/* Description (mobile only) */}
        <div className="border-b border-gray-200 lg:hidden">
          <button
            onClick={() => toggleSection("description")}
            className="w-full flex items-center justify-between py-5 cursor-pointer"
          >
            <span className="text-sm font-semibold">Description</span>
            <Chevron open={openSection === "description"} />
          </button>
          {openSection === "description" && (
            <div className="pb-5 text-sm text-gray-600 leading-relaxed animate-[fadeIn_0.2s_ease-in]">
              {product.description}
            </div>
          )}
        </div>

        {/* Listings */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("listings")}
            className="w-full flex items-center justify-between py-5 cursor-pointer"
          >
            <span className="text-sm font-semibold">Listings</span>
            <Chevron open={openSection === "listings"} />
          </button>
          {openSection === "listings" && (
            <div className="pb-5 text-sm text-gray-600 leading-relaxed animate-[fadeIn_0.2s_ease-in]">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span>Price</span>
                <span className="font-medium">{product.price}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span>Collection</span>
                <span className="font-medium">{product.collection}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Creator</span>
                <span className="font-medium text-blue-500">
                  {product.creator}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("status")}
            className="w-full flex items-center justify-between py-5 cursor-pointer"
          >
            <span className="text-sm font-semibold">Status</span>
            <Chevron open={openSection === "status"} />
          </button>
          {openSection === "status" && (
            <div className="pb-5 text-sm text-gray-600 leading-relaxed animate-[fadeIn_0.2s_ease-in]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>Available for purchase</span>
              </div>
              <p className="mt-2">Total views: {product.totalViews}</p>
              <p className="mt-1">Origin: {product.origin}</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ MORE FROM COLLECTION ═══════════════════ */}
      {moreItems.length > 0 && (
        <section className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto mt-14">
          <h2 className="text-lg md:text-xl font-bold mb-6">
            More from this collection
          </h2>

          {/* Desktop: horizontal grid | Mobile: carousel */}
          {/* Desktop grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-5">
            {moreItems.slice(0, 4).map((item) => {
              const img = collectionImages[item.id] || item.image || null;
              return (
                <Link key={item.id} href={`/marketplace/${item.id}`} className="group">
                  <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                    {img ? (
                      <Image
                        src={img}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No image
                      </div>
                    )}
                    {/* Heart */}
                    <button
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center"
                      aria-label="Wishlist"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold group-hover:underline">{item.name}</span>
                    <span className="text-sm font-semibold">{item.price}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile carousel */}
          <div className="lg:hidden relative">
            <div className="relative w-full aspect-[3/4] max-h-[450px] rounded-xl overflow-hidden bg-gray-100">
              {collectionItemImage ? (
                <Image
                  src={collectionItemImage}
                  alt={currentCollectionItem.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={(el) => {
                      collectionInputRefs.current[currentCollectionItem.id] = el;
                    }}
                    onChange={(e) =>
                      handleCollectionUpload(currentCollectionItem.id, e)
                    }
                  />
                  <div
                    onClick={() =>
                      collectionInputRefs.current[currentCollectionItem.id]?.click()
                    }
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors group"
                  >
                    <svg className="w-10 h-10 text-gray-400 group-hover:text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-xs text-gray-400 group-hover:text-gray-600">Add image</span>
                  </div>
                </>
              )}

              {/* Wishlist heart */}
              <button className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center" aria-label="Wishlist">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Carousel nav arrows */}
              <button onClick={prevSlide} className="absolute left-3 bottom-4 z-10 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center cursor-pointer hover:bg-white transition-colors" aria-label="Previous">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={nextSlide} className="absolute right-3 bottom-4 z-10 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center cursor-pointer hover:bg-white transition-colors" aria-label="Next">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Item info below carousel */}
            <Link href={`/marketplace/${currentCollectionItem.id}`} className="flex items-center justify-between mt-3 group">
              <span className="text-sm font-semibold group-hover:underline">{currentCollectionItem.name}</span>
              <span className="text-sm font-semibold flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                {currentCollectionItem.price.replace("$", "")}
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════════ NEWSLETTER ═══════════════════ */}
      <Newsletter />

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <Footer />
    </main>
  );
}
