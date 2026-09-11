import type { Metadata } from "next";
import { getNewArrivals } from "@/lib/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "Discover the latest handcrafted Indian clothing from AAVJO.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <div className="section-container py-12 md:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 font-inter text-[11px] tracking-[0.15em] uppercase text-charcoal/40">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-marian-blue transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-charcoal/80">New Arrivals</li>
        </ol>
      </nav>

      <div className="mb-12 md:mb-16">
        <h1 className="font-cormorant text-4xl md:text-5xl text-charcoal tracking-wide mb-4">
          New Arrivals
        </h1>
        <p className="font-inter text-sm md:text-base text-charcoal/60 max-w-xl">
          The latest additions to our collection. Handcrafted block prints, natural fabrics, and minimal silhouettes designed for modern everyday elegance.
        </p>
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-ivory rounded-[50%_50%_0_0_/_10%_10%_0_0] md:rounded-[50%_50%_0_0_/_22%_22%_0_0]">
          <h2 className="font-cormorant text-2xl md:text-3xl text-charcoal mb-4">
            Curating Something Special
          </h2>
          <p className="font-inter text-sm text-charcoal/60 max-w-md mx-auto mb-8">
            Our artisans are currently preparing new pieces. Please check back soon for our latest arrivals.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center justify-center px-8 py-3 bg-charcoal text-soft-white font-inter text-[11px] tracking-[0.2em] uppercase hover:bg-marian-blue transition-colors"
          >
            Explore Collections
          </Link>
        </div>
      )}
    </div>
  );
}
