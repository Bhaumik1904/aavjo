"use client";

import { useWishlist } from "@/components/wishlist/WishlistContext";
import { ProductGrid } from "@/components/product/ProductGrid";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="section-container py-12 md:py-20 min-h-[60vh]">
      <div className="mb-10 md:mb-16">
        <h1 className="font-cormorant text-4xl md:text-5xl text-charcoal tracking-wide mb-4">
          Your Wishlist
        </h1>
        <p className="font-inter text-sm md:text-base text-charcoal/60">
          Saved items you love.
        </p>
      </div>

      {items.length > 0 ? (
        <ProductGrid products={items} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-ivory rounded-[50%_50%_0_0_/_10%_10%_0_0] md:rounded-[50%_50%_0_0_/_22%_22%_0_0]">
          <Heart size={48} strokeWidth={1} className="text-marian-blue mb-6" />
          <h2 className="font-cormorant text-2xl md:text-3xl text-charcoal mb-4">
            Your Wishlist is Empty
          </h2>
          <p className="font-inter text-sm text-charcoal/60 max-w-md mx-auto mb-8">
            Explore our collections and tap the heart icon to save your favorite styles for later.
          </p>
          <Link
            href="/new-arrivals"
            className="inline-flex items-center justify-center px-8 py-3 bg-charcoal text-soft-white font-inter text-[11px] tracking-[0.2em] uppercase hover:bg-marian-blue transition-colors"
          >
            Discover New Arrivals
          </Link>
        </div>
      )}
    </div>
  );
}
