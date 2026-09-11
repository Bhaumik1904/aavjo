"use client";

import { Truck, RefreshCcw, Scissors, Leaf } from "lucide-react";

const PILLARS = [
  {
    icon: Scissors,
    title: "Handcrafted Quality",
    body: "Every piece is crafted by skilled artisans in Jaipur using traditional block-printing techniques.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    body: "Complimentary shipping on all orders above ₹999. Pan India delivery.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    body: "Changed your mind? We offer hassle-free 7-day returns on all unworn items.",
  },
  {
    icon: Leaf,
    title: "Natural Fabrics",
    body: "We use natural cotton, mul and voile — breathable, sustainable and kind to your skin.",
  },
];

export function WhyAavjo() {
  return (
    <section className="bg-soft-white section-py" aria-label="Why choose AAVJO">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="section-heading">The AAVJO Promise</p>
          <h2 className="display-sm text-charcoal">Why AAVJO ?</h2>
        </div>

        {/* 4 pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 max-w-4xl mx-auto">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="flex flex-col items-center text-center">
                <div className="mb-4 text-marian-blue">
                  <Icon size={28} strokeWidth={1.25} />
                </div>
                <h3 className="font-inter text-xs font-semibold uppercase tracking-[0.12em] text-charcoal mb-2">
                  {pillar.title}
                </h3>
                <p className="font-inter text-xs text-charcoal/60 leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
