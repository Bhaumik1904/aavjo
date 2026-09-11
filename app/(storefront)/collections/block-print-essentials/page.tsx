import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Collection",
  description: "Explore curated collections of AAVJO's handcrafted Indian clothing.",
};

export default function CollectionPlaceholderPage() {
  return (
    <div className="section-container py-12 md:py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="bg-ivory p-10 md:p-16 rounded-[50%_50%_0_0_/_10%_10%_0_0] md:rounded-[50%_50%_0_0_/_22%_22%_0_0] w-full max-w-2xl">
        <h1 className="font-cormorant text-4xl md:text-5xl text-charcoal tracking-wide mb-4">
          Collection Preview
        </h1>
        <p className="font-inter text-sm md:text-base text-charcoal/60 mb-8 max-w-md mx-auto">
          We are currently curating the pieces for this collection. Please check back soon as our artisans complete their work in Jaipur.
        </p>
        <Link
          href="/collections"
          className="inline-flex items-center justify-center px-8 py-3 border border-charcoal text-charcoal font-inter text-[11px] tracking-[0.2em] uppercase hover:bg-charcoal hover:text-soft-white transition-colors"
        >
          Back to Collections
        </Link>
      </div>
    </div>
  );
}
