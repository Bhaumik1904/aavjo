"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { SizeSelector } from "./SizeSelector";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import type { ProductImage } from "@/types";

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

interface AddToCartFormProps {
  productId: string;
  productName: string;
  slug: string;
  /** Base price in paise */
  price: number;
  variants: VariantWithStock[];
  primaryImage: ProductImage | null;
}

export function AddToCartForm({
  productId,
  productName,
  slug,
  price,
  variants,
  primaryImage,
}: AddToCartFormProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Effective price — check if selected variant has a price override
  const selectedVariant = variants.find((v) => v.size === selectedSize);
  const effectivePrice = selectedVariant?.price_override ?? price;

  const selectedStock = selectedVariant?.inventory?.quantity ?? 0;
  const isInStock = selectedVariant ? selectedStock > 0 : false;
  const maxQty = Math.min(selectedStock, 10); // cap displayed qty at 10

  function handleAddToCart() {
    if (!selectedSize || !isInStock) return;
    addItem({
      productId,
      name: productName,
      slug,
      price: effectivePrice,
      imageUrl: primaryImage?.url ?? null,
      size: selectedSize,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Price */}
      <p className="font-manrope text-2xl font-semibold text-charcoal">
        {formatPrice(effectivePrice / 100)}
      </p>

      {/* Size selector */}
      <SizeSelector
        variants={variants}
        selectedSize={selectedSize}
        onSelect={(size) => {
          setSelectedSize(size);
          setQuantity(1);
        }}
      />

      {/* Quantity selector — only shown once size is selected */}
      {selectedSize && isInStock && (
        <div>
          <p className="font-inter text-xs tracking-[0.12em] uppercase text-charcoal font-semibold mb-3">
            Quantity
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 flex items-center justify-center border border-sand text-charcoal hover:border-charcoal transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="font-inter text-sm w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
              disabled={quantity >= maxQty}
              className="w-9 h-9 flex items-center justify-center border border-sand text-charcoal hover:border-charcoal transition-colors disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
            {selectedStock <= 5 && (
              <span className="font-inter text-[10px] text-charcoal/50 tracking-wide">
                Only {selectedStock} left
              </span>
            )}
          </div>
        </div>
      )}

      {/* Out-of-stock message */}
      {selectedSize && !isInStock && (
        <p className="font-inter text-xs text-charcoal/50">
          This size is currently out of stock.
        </p>
      )}

      {/* Add to cart button */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedSize || !isInStock || added}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {added
          ? "Added ✓"
          : !selectedSize
          ? "Select a Size"
          : !isInStock
          ? "Out of Stock"
          : "Add to Cart"}
      </button>
    </div>
  );
}
