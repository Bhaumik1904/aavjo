"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, User, ShoppingBag, Menu, Heart } from "lucide-react";
import { MobileDrawer } from "@/components/navigation/MobileDrawer";
import { useCart } from "@/components/cart/CartContext";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 bg-soft-white border-b border-sand">
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-[68px]">
            {/* Left — Mobile: hamburger | Desktop: empty */}
            <div className="flex items-center w-1/4 md:w-auto">
              <button
                className="md:hidden p-2 -ml-2 text-charcoal hover:text-marian-blue transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>

            {/* Centre — Logo (all viewports) */}
            <div className="flex-1 flex justify-center md:flex-none">
              <Link
                href="/"
                className="font-cormorant text-[28px] md:text-[32px] tracking-[0.12em] text-charcoal hover:text-marian-blue transition-colors select-none"
                aria-label="AAVJO — Home"
              >
                AAVJO
              </Link>
            </div>

            {/* Right — Icons */}
            <div className="flex items-center gap-1 md:gap-2 w-1/4 md:w-auto justify-end">
              {/* Search — desktop only */}
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="hidden md:flex p-2 text-charcoal hover:text-marian-blue transition-colors"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="p-2 text-charcoal hover:text-marian-blue transition-colors"
                aria-label="Account"
              >
                <User size={20} strokeWidth={1.5} />
              </Link>

              {/* Wishlist — desktop */}
              <Link
                href="/wishlist"
                className="hidden md:flex p-2 text-charcoal hover:text-marian-blue transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={1.5} />
              </Link>

              {/* Cart — opens drawer */}
              <button
                onClick={openCart}
                className="relative p-2 text-charcoal hover:text-marian-blue transition-colors"
                aria-label={`Cart — ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-marian-blue text-soft-white font-manrope text-[9px] font-semibold">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
