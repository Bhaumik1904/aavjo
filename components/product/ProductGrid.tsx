import { ProductCard } from "./ProductCard";
import type { ProductListItem } from "@/lib/products";

interface ProductGridProps {
  products: ProductListItem[];
  emptyMessage?: string;
}

export function ProductGrid({ products, emptyMessage }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block w-10 h-px bg-sand" />
          <span className="font-cormorant text-marian-blue text-base">✦</span>
          <span className="block w-10 h-px bg-sand" />
        </div>
        <p className="label-caps text-charcoal/40 mb-3">Catalog</p>
        <h3 className="font-cormorant text-3xl text-charcoal font-normal mb-4">
          Arriving soon
        </h3>
        <p className="font-inter text-sm text-charcoal/55 leading-relaxed max-w-sm mx-auto">
          {emptyMessage ??
            "Our catalog is currently being curated. New products will be available shortly."}
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8"
      role="list"
      aria-label="Products"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
