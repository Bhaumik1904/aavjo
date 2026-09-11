import type { Metadata } from "next";
import Link from "next/link";
import { getProductsByDepartment } from "@/lib/products";
import { ProductGrid } from "@/components/product/ProductGrid";

export const metadata: Metadata = {
  title: "Men's Collection — AAVJO",
  description:
    "Shop Men's handcrafted Indian clothing at AAVJO. Block-printed shirts in natural cotton, crafted in Jaipur.",
};

const MEN_CATEGORIES = [
  {
    slug: "shirts",
    label: "Shirts",
    bg: "linear-gradient(155deg, #D8DDE8 0%, #C8D0DC 60%, #B8C0CC 100%)",
  },
];

export default async function MenPage() {
  const products = await getProductsByDepartment("men");

  return (
    <>
      {/* Department Hero */}
      <section
        className="relative bg-ivory overflow-hidden"
        style={{ minHeight: "36vh" }}
        aria-label="Men's department"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #D8DDE8 0%, #CDD5E0 50%, #C4CDD8 100%)",
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
              <li className="text-charcoal">Men</li>
            </ol>
          </nav>
          <div className="max-w-xl">
            <p className="label-caps text-charcoal/50 mb-3">Department</p>
            <h1 className="font-cormorant text-5xl md:text-6xl text-charcoal font-normal leading-tight mb-4">
              Men&apos;s
            </h1>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-10 h-px bg-marian-blue/40" />
              <span className="font-cormorant text-marian-blue text-base">✦</span>
              <span className="block w-10 h-px bg-marian-blue/40" />
            </div>
            <p className="font-inter text-sm text-charcoal/60 leading-relaxed max-w-sm">
              Effortless Indian style for the modern man. Hand-block-printed shirts
              in breathable natural fabrics — crafted with intention in Jaipur.
            </p>
          </div>
        </div>
      </section>

      {/* Category nav */}
      <nav className="bg-soft-white border-b border-sand" aria-label="Men's categories">
        <div className="section-container">
          <ul className="flex gap-1 overflow-x-auto scrollbar-hide py-1">
            <li>
              <span className="block px-4 py-2.5 font-inter text-[11px] tracking-[0.12em] uppercase text-charcoal border-b-2 border-charcoal whitespace-nowrap">
                All Men&apos;s
              </span>
            </li>
            {MEN_CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/shop/men/${cat.slug}`}
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
      <section className="bg-soft-white section-py" aria-label="Men's products">
        <div className="section-container">
          <ProductGrid
            products={products}
            emptyMessage="Our Men's collection is being curated and will be available shortly. Join the AAVJO circle to be the first to know."
          />
        </div>
      </section>

      {/* Category cards */}
      <section className="bg-ivory section-py" aria-label="Shop by category">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="section-heading">Browse</p>
            <h2 className="display-sm text-charcoal">Shop by Category</h2>
          </div>
          <div className="max-w-sm mx-auto">
            {MEN_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/men/${cat.slug}`}
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
          <p className="text-center font-inter text-xs text-charcoal/35 mt-10 tracking-wide">
            More categories coming soon
          </p>
        </div>
      </section>
    </>
  );
}
