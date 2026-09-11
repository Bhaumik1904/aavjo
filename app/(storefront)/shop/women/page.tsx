import type { Metadata } from "next";
import Link from "next/link";
import { getProductsByDepartment } from "@/lib/products";
import { ProductGrid } from "@/components/product/ProductGrid";

export const metadata: Metadata = {
  title: "Women's Collection — AAVJO",
  description:
    "Shop Women's handcrafted Indian clothing at AAVJO. Explore Kurta Sets, Tops & Tunics, Dresses and Dupattas — block-printed, natural fabrics, crafted in Jaipur.",
};

const WOMEN_CATEGORIES = [
  {
    slug: "kurta-sets",
    label: "Kurta Sets",
    bg: "linear-gradient(155deg, #EDE0D5 0%, #DDD0C2 60%, #CCB8A8 100%)",
  },
  {
    slug: "tops-tunics",
    label: "Tops & Tunics",
    bg: "linear-gradient(155deg, #DCE4EE 0%, #C8D4E0 60%, #B8C8D8 100%)",
  },
  {
    slug: "dresses",
    label: "Dresses",
    bg: "linear-gradient(155deg, #E0D8CE 0%, #D4C8BC 60%, #C4B8AC 100%)",
  },
  {
    slug: "dupattas-unstitched",
    label: "Dupattas & Unstitched",
    bg: "linear-gradient(155deg, #D8DDE8 0%, #CCD4E0 60%, #BCC4D4 100%)",
  },
];

export default async function WomenPage() {
  const products = await getProductsByDepartment("women");

  return (
    <>
      {/* Department Hero */}
      <section
        className="relative bg-ivory overflow-hidden"
        style={{ minHeight: "36vh" }}
        aria-label="Women's department"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #EDE0D5 0%, #E4D8CC 50%, #DDD0C4 100%)",
          }}
        />
        <div className="relative section-container flex flex-col justify-center py-16 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-inter text-[11px] tracking-[0.12em] uppercase text-charcoal/50">
              <li>
                <Link href="/" className="hover:text-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-charcoal/30">/</li>
              <li className="text-charcoal">Women</li>
            </ol>
          </nav>
          <div className="max-w-xl">
            <p className="label-caps text-charcoal/50 mb-3">Department</p>
            <h1 className="font-cormorant text-5xl md:text-6xl text-charcoal font-normal leading-tight mb-4">
              Women&apos;s
            </h1>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-10 h-px bg-marian-blue/40" />
              <span className="font-cormorant text-marian-blue text-base">✦</span>
              <span className="block w-10 h-px bg-marian-blue/40" />
            </div>
            <p className="font-inter text-sm text-charcoal/60 leading-relaxed max-w-sm">
              Handcrafted block prints, natural fabrics and minimal design —
              made for the woman who wears her story.
            </p>
          </div>
        </div>
      </section>

      {/* Category quick-nav */}
      <nav className="bg-soft-white border-b border-sand" aria-label="Women's categories">
        <div className="section-container">
          <ul className="flex gap-1 overflow-x-auto scrollbar-hide py-1">
            <li>
              <span className="block px-4 py-2.5 font-inter text-[11px] tracking-[0.12em] uppercase text-charcoal border-b-2 border-charcoal whitespace-nowrap">
                All Women&apos;s
              </span>
            </li>
            {WOMEN_CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/shop/women/${cat.slug}`}
                  className="block px-4 py-2.5 font-inter text-[11px] tracking-[0.12em] uppercase text-charcoal/50 hover:text-charcoal border-b-2 border-transparent transition-colors whitespace-nowrap"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Product grid */}
      <section className="bg-soft-white section-py" aria-label="Women's products">
        <div className="section-container">
          <ProductGrid
            products={products}
            emptyMessage="Our Women's collection is being curated and will be available shortly. Join the AAVJO circle to be the first to know."
          />
        </div>
      </section>

      {/* Category browse — shown when products exist OR always for navigation */}
      <section className="bg-ivory section-py" aria-label="Shop by category">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="section-heading">Browse</p>
            <h2 className="display-sm text-charcoal">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 max-w-5xl mx-auto">
            {WOMEN_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/women/${cat.slug}`}
                className="group relative block overflow-hidden"
                aria-label={`Shop ${cat.label}`}
              >
                <div
                  className="relative w-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    aspectRatio: "3/4",
                    borderRadius: "50% 50% 0 0 / 22% 22% 0 0",
                    background: cat.bg,
                  }}
                >
                  <div
                    className="absolute inset-2 border border-marian-blue/20 pointer-events-none transition-opacity duration-300 group-hover:border-marian-blue/40"
                    style={{ borderRadius: "50% 50% 0 0 / 22% 22% 0 0" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-cormorant text-3xl text-charcoal/20 select-none">
                      {cat.label[0]}
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal/75 to-transparent pt-10 pb-5 px-4">
                    <h3 className="font-cormorant text-xl text-soft-white font-normal leading-snug mb-0.5">
                      {cat.label}
                    </h3>
                    <span className="label-caps text-marian-blue/80 text-[10px] group-hover:tracking-[0.2em] transition-all duration-300">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
