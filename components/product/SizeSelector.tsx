"use client";

import { cn } from "@/lib/utils";

interface VariantWithStock {
  id: string;
  product_id: string;
  size: string;
  colour: string;
  colour_hex: string | null;
  sku: string;
  price_override: number | null;
  inventory: { quantity: number } | null;
}

interface SizeSelectorProps {
  variants: VariantWithStock[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
}

export function SizeSelector({ variants, selectedSize, onSelect }: SizeSelectorProps) {
  if (variants.length === 0) {
    return (
      <p className="font-inter text-xs text-charcoal/50">
        Size information will be available shortly.
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="font-inter text-xs tracking-[0.12em] uppercase text-charcoal font-semibold">
          Size
          {selectedSize && (
            <span className="ml-2 font-normal text-marian-blue normal-case tracking-normal">
              — {selectedSize}
            </span>
          )}
        </p>
        {/* Size guide link — Phase 3 */}
        <span className="font-inter text-[10px] tracking-wide uppercase text-charcoal/40">
          Size guide
        </span>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Select size">
        {variants.map((variant) => {
          const inStock = (variant.inventory?.quantity ?? 0) > 0;
          const isSelected = selectedSize === variant.size;

          return (
            <button
              key={variant.id}
              onClick={() => inStock && onSelect(variant.size)}
              disabled={!inStock}
              aria-pressed={isSelected}
              aria-label={`Size ${variant.size}${!inStock ? " — out of stock" : ""}`}
              className={cn(
                "relative min-w-[44px] px-3 py-2",
                "font-inter text-xs tracking-[0.08em] uppercase",
                "border transition-all duration-150",
                isSelected
                  ? "bg-charcoal text-soft-white border-charcoal"
                  : inStock
                  ? "bg-transparent text-charcoal border-sand hover:border-charcoal"
                  : "bg-transparent text-charcoal/30 border-sand cursor-not-allowed"
              )}
            >
              {variant.size}
              {/* Out-of-stock diagonal line */}
              {!inStock && (
                <span
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  aria-hidden="true"
                >
                  <span
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      background:
                        "linear-gradient(to bottom right, transparent calc(50% - 0.5px), #D8CEC0, transparent calc(50% + 0.5px))",
                    }}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedSize === null && (
        <p className="font-inter text-[10px] text-charcoal/40 mt-2">
          Please select a size to add to cart.
        </p>
      )}
    </div>
  );
}
