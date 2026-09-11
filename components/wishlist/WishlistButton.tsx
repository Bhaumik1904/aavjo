"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "./WishlistContext";
import type { ProductListItem } from "@/lib/products";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: ProductListItem;
  className?: string;
}

export function WishlistButton({ product, className }: WishlistButtonProps) {
  const { isInWishlist, addItem, removeItem } = useWishlist();
  const saved = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={cn(
        "p-2 rounded-full transition-colors duration-200",
        saved
          ? "bg-soft-white text-marian-blue shadow-sm"
          : "bg-soft-white/60 text-charcoal hover:bg-soft-white hover:text-marian-blue",
        className
      )}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        size={18}
        strokeWidth={1.5}
        className={cn(saved ? "fill-marian-blue" : "fill-transparent")}
      />
    </button>
  );
}
