import Link from "next/link";
import Image from "next/image";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import type { ProductListItem } from "@/lib/products";
import { WishlistButton } from "@/components/wishlist/WishlistButton";

interface ProductCardProps {
  product: ProductListItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount =
    product.compare_at_price
      ? calculateDiscount(product.price / 100, product.compare_at_price / 100)
      : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      aria-label={`View ${product.name}`}
    >
      {/* Image container — arch-shaped, consistent with AAVJO visual system */}
      <div
        className="relative w-full overflow-hidden bg-ivory mb-3"
        style={{
          aspectRatio: "3/4",
          borderRadius: "50% 50% 0 0 / 22% 22% 0 0",
        }}
      >
        {product.primaryImage?.url ? (
          <Image
            src={product.primaryImage.url}
            alt={product.primaryImage.alt ?? product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          /* Photo-ready placeholder — will be replaced by actual AAVJO imagery */
          <div className="absolute inset-0 bg-ivory flex items-center justify-center">
            <span className="font-cormorant text-5xl text-charcoal/15 select-none">
              {product.name[0]}
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.is_new_arrival && (
            <span className="badge-new">New</span>
          )}
          {discount > 0 && (
            <span className="badge-sale">{discount}% off</span>
          )}
        </div>

        {/* Hover overlay — subtle lift */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-300" />
        
        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton product={product} />
        </div>
      </div>

      {/* Info */}
      <div className="px-0.5">
        <h3 className="font-inter text-sm text-charcoal leading-snug mb-1 group-hover:text-marian-blue transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-manrope text-sm font-semibold text-charcoal">
            {formatPrice(product.price / 100)}
          </span>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="price-compare">
              {formatPrice(product.compare_at_price / 100)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
