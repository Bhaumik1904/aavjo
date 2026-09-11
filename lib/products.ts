/**
 * AAVJO — server-side product data access functions.
 * All functions use the server Supabase client (anon key + RLS).
 * Prices are stored in paise (₹1 = 100 paise).
 *
 * NOTE: When NEXT_PUBLIC_SUPABASE_URL is not yet configured, all
 * functions return empty arrays gracefully rather than crashing.
 * Pages will show their editorial empty states until Supabase is live.
 */

import type { ProductImage } from "@/types";

/* ------------------------------------------------------------------ */
/* Types for joined product queries                                    */
/* ------------------------------------------------------------------ */

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  is_featured: boolean;
  is_new_arrival: boolean;
  primaryImage: ProductImage | null;
}

export interface ProductWithDetails {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  fabric: string | null;
  care_instructions: string | null;
  shipping_info: string | null;
  return_info: string | null;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  // Joined
  departments: { id: string; name: string; slug: string } | null;
  categories: { id: string; name: string; slug: string } | null;
  product_images: ProductImage[];
  product_variants: {
    id: string;
    product_id: string;
    size: string;
    colour: string;
    colour_hex: string | null;
    sku: string;
    price_override: number | null;
    inventory: { quantity: number } | null;
  }[];
}

/* ------------------------------------------------------------------ */
/* Guard: returns true only when Supabase is properly configured       */
/* ------------------------------------------------------------------ */

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  return (
    url.startsWith("https://") &&
    url.includes(".supabase.co") &&
    key.length > 20
  );
}

/* ------------------------------------------------------------------ */
/* Raw row type returned by product list queries                        */
/* ------------------------------------------------------------------ */

interface RawProductRow {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  is_featured: boolean;
  is_new_arrival: boolean;
  product_images: ProductImage[];
  departments: { slug: string } | null;
  categories: { slug: string } | null;
}

/* ------------------------------------------------------------------ */
/* Get products by department slug                                     */
/* ------------------------------------------------------------------ */

export async function getProductsByDepartment(
  departmentSlug: string
): Promise<ProductListItem[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select(
        `
        id, name, slug, price, compare_at_price, is_featured, is_new_arrival,
        product_images ( id, url, alt, is_primary, sort_order ),
        departments!inner ( slug )
      `
      )
      .eq("is_published", true)
      .eq("departments.slug", departmentSlug)
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return (data as unknown as RawProductRow[]).map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      compare_at_price: p.compare_at_price,
      is_featured: p.is_featured,
      is_new_arrival: p.is_new_arrival,
      primaryImage:
        (p.product_images as ProductImage[])?.find((img) => img.is_primary) ??
        (p.product_images as ProductImage[])?.[0] ??
        null,
    }));
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Get products by category slug                                       */
/* ------------------------------------------------------------------ */

export async function getProductsByCategory(
  departmentSlug: string,
  categorySlug: string
): Promise<ProductListItem[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select(
        `
        id, name, slug, price, compare_at_price, is_featured, is_new_arrival,
        product_images ( id, url, alt, is_primary, sort_order ),
        departments!inner ( slug ),
        categories!inner ( slug )
      `
      )
      .eq("is_published", true)
      .eq("departments.slug", departmentSlug)
      .eq("categories.slug", categorySlug)
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return (data as unknown as RawProductRow[]).map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      compare_at_price: p.compare_at_price,
      is_featured: p.is_featured,
      is_new_arrival: p.is_new_arrival,
      primaryImage:
        (p.product_images as ProductImage[])?.find((img) => img.is_primary) ??
        (p.product_images as ProductImage[])?.[0] ??
        null,
    }));
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Get full product by slug (for PDP)                                  */
/* ------------------------------------------------------------------ */

export async function getProductBySlug(
  slug: string
): Promise<ProductWithDetails | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        departments ( id, name, slug ),
        categories ( id, name, slug ),
        product_images ( id, url, alt, sort_order, is_primary ),
        product_variants (
          id, product_id, size, colour, colour_hex, sku, price_override,
          inventory ( quantity )
        )
      `
      )
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error || !data) return null;

    // Sort images by sort_order
    if (Array.isArray(data.product_images)) {
      data.product_images.sort(
        (a: ProductImage, b: ProductImage) => a.sort_order - b.sort_order
      );
    }

    return data as unknown as ProductWithDetails;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Get new arrivals                                                    */
/* ------------------------------------------------------------------ */

export async function getNewArrivals(): Promise<ProductListItem[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select(
        `
        id, name, slug, price, compare_at_price, is_featured, is_new_arrival,
        product_images ( id, url, alt, is_primary, sort_order ),
        departments ( slug ),
        categories ( slug )
      `
      )
      .eq("is_published", true)
      .eq("is_new_arrival", true)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error || !data) return [];

    return (data as unknown as RawProductRow[]).map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      compare_at_price: p.compare_at_price,
      is_featured: p.is_featured,
      is_new_arrival: p.is_new_arrival,
      primaryImage:
        (p.product_images as ProductImage[])?.find((img) => img.is_primary) ??
        (p.product_images as ProductImage[])?.[0] ??
        null,
    }));
  } catch {
    return [];
  }
}
