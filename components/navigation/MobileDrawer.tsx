"use client";

import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS = [
  {
    heading: "Women",
    links: [
      { label: "All Women's", href: "/shop/women" },
      { label: "Kurta Sets", href: "/shop/women/kurta-sets" },
      { label: "Tops & Tunics", href: "/shop/women/tops-tunics" },
      { label: "Dresses", href: "/shop/women/dresses" },
      { label: "Dupattas & Unstitched", href: "/shop/women/dupattas-unstitched" },
    ],
  },
  {
    heading: "Men",
    links: [
      { label: "All Men's", href: "/shop/men" },
      { label: "Shirts", href: "/shop/men/shirts" },
    ],
  },
  {
    heading: "Discover",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Collections", href: "/collections" },
      { label: "About AAVJO", href: "/about" },
    ],
  },
];

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[80vw] max-w-[320px]",
          "bg-soft-white flex flex-col",
          "transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand">
          <Link
            href="/"
            onClick={onClose}
            className="font-cormorant text-2xl tracking-[0.12em] text-charcoal"
          >
            AAVJO
          </Link>
          <button
            onClick={onClose}
            className="p-1 text-charcoal hover:text-marian-blue transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {SECTIONS.map((section) => (
            <div key={section.heading} className="mb-6">
              <p className="px-6 mb-2 font-inter text-[10px] tracking-[0.2em] uppercase text-charcoal/40 font-semibold">
                {section.heading}
              </p>
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-6 py-3 font-inter text-sm text-charcoal hover:text-marian-blue hover:bg-ivory transition-colors"
                >
                  {link.label}
                  <ChevronRight size={14} className="opacity-30" />
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="px-6 py-5 border-t border-sand">
          <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-charcoal/40">
            Wear it once, and you&apos;re ours forever ✨
          </p>
        </div>
      </aside>
    </>
  );
}
