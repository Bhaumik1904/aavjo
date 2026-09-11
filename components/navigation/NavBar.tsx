"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "New Arrivals", href: "/new-arrivals" },
  {
    label: "Women",
    href: "/shop/women",
    mega: [
      { label: "All Women's", href: "/shop/women" },
      { label: "Kurta Sets", href: "/shop/women/kurta-sets" },
      { label: "Tops & Tunics", href: "/shop/women/tops-tunics" },
      { label: "Dresses", href: "/shop/women/dresses" },
      { label: "Dupattas & Unstitched", href: "/shop/women/dupattas-unstitched" },
    ],
  },
  {
    label: "Men",
    href: "/shop/men",
    mega: [
      { label: "All Men's", href: "/shop/men" },
      { label: "Shirts", href: "/shop/men/shirts" },
    ],
  },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

export function NavBar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav
      className="hidden md:block bg-soft-white border-b border-sand"
      aria-label="Primary navigation"
    >
      <div className="section-container">
        <ul className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.mega && setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 px-4 py-3",
                  "font-inter text-[11px] tracking-[0.14em] uppercase",
                  "transition-colors duration-150",
                  item.label === "New Arrivals"
                    ? "text-marian-blue font-semibold"
                    : "text-charcoal hover:text-marian-blue"
                )}
              >
                {item.label}
                {item.mega && <ChevronDown size={12} className="mt-0.5 opacity-60" />}
              </Link>

              {/* Mega menu */}
              {item.mega && activeMenu === item.label && (
                <div className="absolute left-0 top-full z-50 min-w-[200px] bg-soft-white border border-sand shadow-sm py-3">
                  {item.mega.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-5 py-2 font-inter text-[11px] tracking-[0.12em] uppercase text-charcoal hover:text-marian-blue hover:bg-ivory transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
