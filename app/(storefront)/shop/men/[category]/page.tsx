import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/products";
import { ProductGrid } from "@/components/product/ProductGrid";

const CATEGORY_META: Record<string, { label: string; description: string; bg: string }> = {
  shirts: {
    label: "Shirts",
    description:
      "Hand-block-printed shirts in breathable cotton. Effortlessly minimal, rooted in Jaipur's artisan tradition.",
    bg: "linear-gradient(155deg, #D8DDE8 0%, #C8D0DC 60%, #B8C0CC 100%)",
  },
};

const ALL_CATEGORIES = Object.entries(CATEGORY_META).map(([slug, m]) => ({
  slug,
  label: m.label,
}));

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const meta = CATEGORY_META[params.category];
  if (!meta) return { title: "Not Found" };
  return {
    title: `Men's ${meta.label}`,
    description: meta.description,
  };
}

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((slug) => ({ category: slug }));
}

export default async function MenCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const meta = CATEGORY_META[params.category];
  if (!meta) notFound();

  const products = await getProductsByCategory("men", params.category);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "32vh", background: meta.bg }}
        aria-label={`Men's ${meta.label}`}
      >
        <div className="relative section-container flex flex-col justify-center py-14">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 flex-wrap font-inter text-[11px] tracking-[0.12em] uppercase text-charcoal/50">
              <li>
                <Link href="/" className="hover:text-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-charcoal/30">/</li>
              <li>
                <Link href="/shop/men" className="hover:text-charcoal transition-colors">
                  Men
                </Link>
              </li>
              <li aria-hidden="true" className="text-charcoal/30">/</li>
              <li className="text-charcoal">{meta.label}</li>
            </ol>
          </nav>
          <div className="max-w-xl">
            <p className="label-caps text-charcoal/50 mb-3">Men&apos;s</p>
            <h1 className="font-cormorant text-5xl md:text-6xl text-charcoal font-normal leading-tight mb-4">
              {meta.label}
            </h1>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-10 h-px bg-marian-blue/40" />
              <span className="font-cormorant text-marian-blue text-base">✦</span>
              <span className="block w-10 h-px bg-marian-blue/40" />
            </div>
            <p className="font-inter text-sm text-charcoal/60 leading-relaxed max-w-sm">
              {meta.description}
            </p>
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <nav className="bg-soft-white border-b border-sand sticky top-[108px] z-30" aria-label="Men's categories">
        <div className="section-container">
          <ul className="flex gap-1 overflow-x-auto scrollbar-hide py-1">
            <li>
              <Link
                href="/shop/men"
                className="block px-4 py-2.5 font-inter text-[11px] tracking-[0.12em] uppercase text-charcoal/50 hover:text-charcoal border-b-2 border-transparent transition-colors whitespace-nowrap"
              >
                All Men&apos;s
              </Link>
            </li>
            {ALL_CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/shop/men/${cat.slug}`}
                  className={`block px-4 py-2.5 font-inter text-[11px] tracking-[0.12em] uppercase transition-colors whitespace-nowrap border-b-2 ${
                    cat.slug === params.category
                      ? "text-charcoal border-marian-blue"
                      : "text-charcoal/50 hover:text-charcoal border-transparent"
                  }`}
                  aria-current={cat.slug === params.category ? "page" : undefined}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Product grid */}
      <section className="bg-soft-white section-py" aria-label={`${meta.label} products`}>
        <div className="section-container">
          <ProductGrid
            products={products}
            emptyMessage={`Our ${meta.label} collection is being curated and photographed. Join the AAVJO circle to be notified first.`}
          />
        </div>
      </section>
    </>
  );
}
