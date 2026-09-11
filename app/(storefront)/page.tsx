import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { PromoStrip } from "@/components/home/PromoStrip";
import { ShopByDepartment } from "@/components/home/ShopByDepartment";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { CategoryNav } from "@/components/navigation/CategoryNav";
import { EditorialMosaic } from "@/components/home/EditorialMosaic";
import { Reviews } from "@/components/home/Reviews";
import { WhyAavjo } from "@/components/home/WhyAavjo";
import { Newsletter } from "@/components/home/Newsletter";
import { InstagramGrid } from "@/components/home/InstagramGrid";

export const metadata: Metadata = {
  title: "AAVJO — Handcrafted Indian Clothing",
  description:
    "Premium handcrafted Indian clothing for women and men. Block prints, natural fabrics, minimal design — crafted with love in Jaipur. Shop kurta sets, tops, dresses and shirts.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — dual Men/Women split screen */}
      <Hero />

      {/* 2. Promo strip */}
      <PromoStrip />

      {/* 3. Shop by Department — Women | Men entry cards */}
      <ShopByDepartment />

      {/* 4. Featured Collections — 4 arch-shaped cards */}
      <FeaturedCollections />

      {/* 5. Category Navigation — circular chips */}
      <CategoryNav />

      {/* 6. Editorial Mosaic — large + 2×2 grid */}
      <EditorialMosaic />

      {/* 7. Customer Reviews */}
      <Reviews />

      {/* 8. Why AAVJO — 4-col value pillars */}
      <WhyAavjo />

      {/* 9. Newsletter */}
      <Newsletter />

      {/* 10. Instagram Grid */}
      <InstagramGrid />
    </>
  );
}
