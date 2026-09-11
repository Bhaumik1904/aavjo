import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/products";
import { ProductGrid } from "@/components/product/ProductGrid";

const CATEGORY_META: Record<string, { label: string; description: string; bg: string }> = {
  "kurta-sets": {
    label: "Kurta Sets",
    description: "Block-print kurta sets in cotton, mul and voile. Effortlessly complete looks crafted by Jaipur artisans.",
    bg: "linear-gradient(155deg, #EDE0D5 0%, #DDD0C2 60%, #CCB8A8 100%)",
  },
  "tops-tunics": {
    label: "Tops & Tunics",
    description: "Easy, everyday tops and tunics with hand-block prints. Light fabrics for the Indian climate.",
    bg: "linear-gradient(155deg, #DCE4EE 0%, #C8D4E0 60%, #B8C8D8 100%)",
  },
  dresses: {
    label: "Dresses",
    description: "Flowy cotton dresses with hand-block prints. Thoughtfully crafted to wear from morning to evening.",
    bg: "linear-gradient(155deg, #E0D8CE 0%, #D4C8BC 60%, #C4B8AC 100%)",
  },
  "dupattas-unstitched": {
    label: "Dupattas & Unstitched",
    description: "Handblock-printed dupattas and unstitched fabric lengths — the perfect finishing touch to any look.",
    bg: "linear-gradient(155deg, #D8DDE8 0%, #CCD4E0 60%, #BCC4D4 100%)",
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
    title: `Women's ${meta.label}`,
    description: meta.description,
  };
}

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((slug) => ({ category: slug }));
}

export default async function WomenCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const meta = CATEGORY_META[params.category];
  if (!meta) notFound();

  const products = await getProductsByCategory("women", params.category);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "32vh", background: meta.bg }}
        aria-label={`Women's ${meta.label}`}
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
                <Link href="/shop/women" className="hover:text-charcoal transition-colors">
                  Women
                </Link>
              </li>
              <li aria-hidden="true" className="text-charcoal/30">/</li>
              <li className="text-charcoal">{meta.label}</li>
            </ol>
          </nav>
          <div className="max-w-xl">
            <p className="label-caps text-charcoal/50 mb-3">Women&apos;s</p>
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
      <nav className="bg-soft-white border-b border-sand sticky top-[108px] z-30" aria-label="Women's categories">
        <div className="section-container">
          <ul className="flex gap-1 overflow-x-auto scrollbar-hide py-1">
            <li>
              <Link
                href="/shop/women"
                className="block px-4 py-2.5 font-inter text-[11px] tracking-[0.12em] uppercase text-charcoal/50 hover:text-charcoal border-b-2 border-transparent transition-colors whitespace-nowrap"
              >
                All Women&apos;s
              </Link>
            </li>
            {ALL_CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/shop/women/${cat.slug}`}
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
