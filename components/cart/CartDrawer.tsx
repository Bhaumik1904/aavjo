"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, itemCount, subtotalPaise, isOpen, closeCart, removeItem, updateQty } =
    useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-charcoal/30 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-[400px]",
          "bg-soft-white flex flex-col",
          "transition-transform duration-300 ease-in-out"
        )}
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
        aria-label="Shopping cart"
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} strokeWidth={1.5} className="text-charcoal" />
            <h2 className="font-inter text-sm tracking-[0.12em] uppercase text-charcoal font-semibold">
              Your Cart
            </h2>
            {itemCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-marian-blue text-soft-white font-manrope text-[10px] font-semibold">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1 text-charcoal hover:text-marian-blue transition-colors"
            aria-label="Close cart"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart body */}
        {items.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div
              className="w-20 h-24 mb-6 border border-sand flex items-center justify-center"
              style={{ borderRadius: "50% 50% 0 0 / 40% 40% 0 0", background: "#F1ECE4" }}
              aria-hidden="true"
            >
              <ShoppingBag size={24} strokeWidth={1} className="text-charcoal/30" />
            </div>
            <p className="font-cormorant text-2xl text-charcoal font-normal mb-2">
              Your cart is empty
            </p>
            <p className="font-inter text-xs text-charcoal/50 mb-8 leading-relaxed">
              Discover our handcrafted collection and find something you love.
            </p>
            <Link
              href="/shop/women"
              onClick={closeCart}
              className="btn-primary text-xs px-6 py-2.5"
            >
              Shop Women&apos;s
            </Link>
          </div>
        ) : (
          /* Items list */
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="divide-y divide-sand">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 px-6 py-4">
                  {/* Image */}
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="flex-shrink-0"
                  >
                    <div className="w-16 h-20 bg-ivory overflow-hidden relative flex-shrink-0">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full bg-ivory flex items-center justify-center">
                          <span className="font-cormorant text-2xl text-charcoal/20">
                            {item.name[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="font-inter text-sm text-charcoal hover:text-marian-blue transition-colors leading-snug line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="font-inter text-[11px] text-charcoal/50 mt-1 tracking-wide">
                      Size: {item.size}
                    </p>
                    <p className="font-manrope text-sm font-semibold text-charcoal mt-1">
                      {formatPrice(item.price / 100)}
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQty(item.key, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-sand text-charcoal hover:border-marian-blue hover:text-marian-blue transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="font-inter text-xs w-4 text-center text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.key, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-sand text-charcoal hover:border-marian-blue hover:text-marian-blue transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={10} />
                      </button>

                      <button
                        onClick={() => removeItem(item.key)}
                        className="ml-auto font-inter text-[10px] tracking-wide uppercase text-charcoal/40 hover:text-charcoal transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer — subtotal + CTA */}
        {items.length > 0 && (
          <div className="border-t border-sand px-6 py-5 flex-shrink-0 bg-soft-white">
            <div className="flex items-center justify-between mb-1">
              <p className="font-inter text-xs tracking-[0.1em] uppercase text-charcoal/60">
                Subtotal
              </p>
              <p className="font-manrope text-base font-semibold text-charcoal">
                {formatPrice(subtotalPaise / 100)}
              </p>
            </div>
            <p className="font-inter text-[10px] text-charcoal/40 mb-5">
              Shipping calculated at checkout
            </p>
            {/* Checkout button — Phase 3 */}
            <button
              disabled
              className="w-full btn-primary opacity-60 cursor-not-allowed"
              title="Checkout coming soon"
            >
              Checkout — Coming Soon
            </button>
            <button
              onClick={closeCart}
              className="w-full mt-2 font-inter text-[11px] tracking-[0.1em] uppercase text-charcoal/50 hover:text-charcoal transition-colors py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
