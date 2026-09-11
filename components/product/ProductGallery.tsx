"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // If no images, show elegant placeholder
  if (images.length === 0) {
    return (
      <div
        className="w-full bg-ivory flex items-center justify-center"
        style={{
          aspectRatio: "3/4",
          borderRadius: "50% 50% 0 0 / 16% 16% 0 0",
        }}
        aria-label={`${productName} — image coming soon`}
      >
        <span className="font-cormorant text-7xl text-charcoal/15 select-none">
          {productName[0]}
        </span>
      </div>
    );
  }

  const activeImage = images[activeIndex];
  const canPrev = activeIndex > 0;
  const canNext = activeIndex < images.length - 1;

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className="relative w-full overflow-hidden bg-ivory"
        style={{
          aspectRatio: "3/4",
          borderRadius: "50% 50% 0 0 / 16% 16% 0 0",
        }}
      >
        <Image
          key={activeImage.id}
          src={activeImage.url}
          alt={activeImage.alt ?? productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={activeIndex === 0}
        />

        {/* Prev/Next arrows — only when multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => canPrev && setActiveIndex(activeIndex - 1)}
              disabled={!canPrev}
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-soft-white/80 backdrop-blur-sm transition-opacity",
                canPrev ? "opacity-80 hover:opacity-100" : "opacity-0"
              )}
              aria-label="Previous image"
            >
              <ChevronLeft size={16} strokeWidth={1.5} className="text-charcoal" />
            </button>
            <button
              onClick={() => canNext && setActiveIndex(activeIndex + 1)}
              disabled={!canNext}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-soft-white/80 backdrop-blur-sm transition-opacity",
                canNext ? "opacity-80 hover:opacity-100" : "opacity-0"
              )}
              aria-label="Next image"
            >
              <ChevronRight size={16} strokeWidth={1.5} className="text-charcoal" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails — only when 2+ images */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative flex-shrink-0 w-16 h-20 overflow-hidden border-2 transition-colors duration-150",
                idx === activeIndex
                  ? "border-charcoal"
                  : "border-transparent hover:border-sand"
              )}
              aria-label={`View image ${idx + 1}`}
              aria-current={idx === activeIndex}
            >
              <Image
                src={img.url}
                alt={img.alt ?? `${productName} view ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
