import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, type ProductWithDetails } from "@/lib/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToCartForm } from "@/components/product/AddToCartForm";
import { formatPrice, calculateDiscount } from "@/lib/utils";

type VariantForForm = ProductWithDetails["product_variants"][number];

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.seo_title ?? product.name,
    description:
      product.seo_description ?? product.description ?? undefined,
  };
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const images = product.product_images ?? [];
  const variants = product.product_variants ?? [];
  const primaryImage = images.find((i) => i.is_primary) ?? images[0] ?? null;

  const discount =
    product.compare_at_price
      ? calculateDiscount(product.price / 100, product.compare_at_price / 100)
      : 0;

  const departmentSlug = product.departments?.slug ?? "women";
  const categorySlug = product.categories?.slug ?? "";
  const departmentLabel = product.departments?.name ?? "Shop";
  const categoryLabel = product.categories?.name ?? "";

  return (
    <div className="bg-soft-white">
      <div className="section-container py-8 md:py-12">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 flex-wrap font-inter text-[11px] tracking-[0.12em] uppercase text-charcoal/50">
            <li>
              <Link href="/" className="hover:text-charcoal transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-charcoal/30">/</li>
            <li>
              <Link
                href={`/shop/${departmentSlug}`}
                className="hover:text-charcoal transition-colors"
              >
                {departmentLabel}
              </Link>
            </li>
            {categorySlug && (
              <>
                <li aria-hidden="true" className="text-charcoal/30">/</li>
                <li>
                  <Link
                    href={`/shop/${departmentSlug}/${categorySlug}`}
                    className="hover:text-charcoal transition-colors"
                  >
                    {categoryLabel}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true" className="text-charcoal/30">/</li>
            <li className="text-charcoal line-clamp-1">{product.name}</li>
          </ol>
        </nav>

        {/* Main product layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">

          {/* Gallery */}
          <div className="md:sticky md:top-[120px]">
            <ProductGallery images={images} productName={product.name} />
          </div>

          {/* Product information */}
          <div className="flex flex-col gap-6">

            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              {product.is_new_arrival && (
                <span className="badge-new">New Arrival</span>
              )}
              {product.is_featured && (
                <span className="badge-sale">Featured</span>
              )}
              {discount > 0 && (
                <span className="badge-sale">{discount}% Off</span>
              )}
            </div>

            {/* Name */}
            <div>
              <h1 className="font-cormorant text-4xl md:text-5xl text-charcoal font-normal leading-tight mb-2">
                {product.name}
              </h1>
              {product.compare_at_price && product.compare_at_price > product.price && (
                <p className="font-inter text-xs text-charcoal/40 tracking-wide">
                  MRP{" "}
                  <span className="line-through">
                    {formatPrice(product.compare_at_price / 100)}
                  </span>
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <span className="block w-8 h-px bg-marian-blue/30" />
              <span className="font-cormorant text-marian-blue">✦</span>
              <span className="block w-8 h-px bg-marian-blue/30" />
            </div>

            {/* Add to cart (client component — price + sizes + qty) */}
            <AddToCartForm
              productId={product.id}
              productName={product.name}
              slug={product.slug}
              price={product.price}
              variants={variants as VariantForForm[]}
              primaryImage={primaryImage}
            />

            {/* Divider */}
            <div className="h-px bg-sand" />

            {/* Description */}
            {product.description && (
              <div>
                <h2 className="font-inter text-xs tracking-[0.15em] uppercase text-charcoal font-semibold mb-3">
                  About this piece
                </h2>
                <p className="font-inter text-sm text-charcoal/70 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Fabric */}
            {product.fabric && (
              <div>
                <h2 className="font-inter text-xs tracking-[0.15em] uppercase text-charcoal font-semibold mb-1">
                  Fabric
                </h2>
                <p className="font-inter text-sm text-charcoal/70">
                  {product.fabric}
                </p>
              </div>
            )}

            {/* Care instructions */}
            {product.care_instructions && (
              <div>
                <h2 className="font-inter text-xs tracking-[0.15em] uppercase text-charcoal font-semibold mb-1">
                  Care
                </h2>
                <p className="font-inter text-sm text-charcoal/70">
                  {product.care_instructions}
                </p>
              </div>
            )}

            {/* Shipping & Returns */}
            <div className="bg-ivory border border-sand p-4 flex flex-col gap-3">
              {product.shipping_info && (
                <div className="flex gap-3">
                  <span className="font-inter text-[10px] tracking-[0.1em] uppercase text-charcoal/50 w-20 flex-shrink-0 pt-0.5">
                    Shipping
                  </span>
                  <p className="font-inter text-xs text-charcoal/70 leading-relaxed">
                    {product.shipping_info}
                  </p>
                </div>
              )}
              {product.return_info && (
                <div className="flex gap-3">
                  <span className="font-inter text-[10px] tracking-[0.1em] uppercase text-charcoal/50 w-20 flex-shrink-0 pt-0.5">
                    Returns
                  </span>
                  <p className="font-inter text-xs text-charcoal/70 leading-relaxed">
                    {product.return_info}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
