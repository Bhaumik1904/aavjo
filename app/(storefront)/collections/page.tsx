import type { Metadata } from "next";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore curated collections of AAVJO's handcrafted Indian clothing.",
};

export default function CollectionsPage() {
  return (
    <div className="pt-8 pb-12 md:pt-12 md:pb-20">
      <div className="section-container mb-8">
        <h1 className="font-cormorant text-4xl md:text-5xl text-charcoal tracking-wide mb-4">
          Collections
        </h1>
        <p className="font-inter text-sm md:text-base text-charcoal/60">
          Discover our curated curations of handcrafted Indian wear.
        </p>
      </div>

      <FeaturedCollections />
    </div>
  );
}
