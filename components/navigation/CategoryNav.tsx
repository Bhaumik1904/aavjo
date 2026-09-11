"use client";

import Link from "next/link";

// Confirmed categories only — Women's + Men's confirmed
const CATEGORIES = [
  { label: "Kurta Sets", href: "/shop/women/kurta-sets", dept: "Women", bg: "#E8DDD2", pattern: "#8A9FBE" },
  { label: "Tops & Tunics", href: "/shop/women/tops-tunics", dept: "Women", bg: "#DCE4EE", pattern: "#292825" },
  { label: "Dresses", href: "/shop/women/dresses", dept: "Women", bg: "#DDD5C8", pattern: "#8A9FBE" },
  { label: "Dupattas", href: "/shop/women/dupattas-unstitched", dept: "Women", bg: "#E0D8D0", pattern: "#8A9FBE" },
  { label: "Shirts", href: "/shop/men/shirts", dept: "Men", bg: "#D8DDE8", pattern: "#292825" },
];

export function CategoryNav() {
  return (
    <section className="bg-soft-white py-6 border-b border-sand" aria-label="Shop by category">
      <div className="section-container">
        <div className="flex gap-5 md:gap-8 overflow-x-auto scrollbar-hide items-start justify-start md:justify-center pb-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
              aria-label={`${cat.dept} — ${cat.label}`}
            >
              {/* Circle */}
              <div
                className="relative w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden border-2 border-transparent group-hover:border-marian-blue transition-all duration-200 flex-shrink-0"
                style={{ background: cat.bg }}
              >
                {/* Mini block-print pattern */}
                <div
                  className="absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${cat.pattern} 1px, transparent 1px)`,
                    backgroundSize: "10px 10px",
                  }}
                />
                {/* Category initial overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-cormorant text-2xl text-charcoal/40">
                    {cat.label[0]}
                  </span>
                </div>
              </div>

              {/* Label */}
              <div className="text-center">
                <p className="font-inter text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-charcoal font-medium leading-tight">
                  {cat.label}
                </p>
                <p className="font-inter text-[9px] text-charcoal/40 tracking-wide uppercase mt-0.5">
                  {cat.dept}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
