/**
 * AAVJO — Product Seed Script
 * ============================================================
 * This is a developer-only Node.js script.
 * It is NOT part of the Next.js application.
 * It is NEVER bundled, imported, or exposed to the browser.
 *
 * HOW TO RUN:
 *   node scripts/seed-products.mjs
 *
 * REQUIREMENTS:
 *   - .env.local must have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 *   - The migration (001_schema.sql) must already have been applied
 *   - The product-images bucket must already exist in Supabase Storage
 *
 * IMPORTANT:
 *   - This script uses the SERVICE ROLE KEY (bypasses RLS) to insert products.
 *   - NEVER run this script in a browser or expose it to the client.
 *   - Add your real product data to the PRODUCTS array below before running.
 *   - Images must already be uploaded to Supabase Storage before running.
 *   - Set is_published: false to add products without showing them to customers.
 *
 * PRICE FORMAT:
 *   Prices are stored in PAISE (₹1 = 100 paise).
 *   ₹1,499 → price: 149900
 *
 * IMAGE PATH CONVENTION (in product-images bucket):
 *   women/kurta-sets/{product-slug}/front.jpg
 *   women/kurta-sets/{product-slug}/back.jpg
 *   men/shirts/{product-slug}/front.jpg
 *
 * ============================================================
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

// ── Load .env.local manually (Node doesn't auto-load it) ──────────────────────
const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dir, "../.env.local");

function loadEnv(path) {
  const raw = readFileSync(path, "utf8");
  raw.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eq = trimmed.indexOf("=");
    if (eq === -1) return;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  });
}

loadEnv(envPath);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public/product-images`;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || SERVICE_ROLE_KEY.startsWith("your_")) {
  console.error(
    "\n❌ ERROR: SUPABASE_SERVICE_ROLE_KEY is not set in .env.local.\n" +
      "Get it from: Supabase Dashboard → Settings → API → Service Role Secret.\n" +
      "Add it to .env.local as: SUPABASE_SERVICE_ROLE_KEY=...\n"
  );
  process.exit(1);
}

// ── Supabase admin client (service role — bypasses RLS) ──────────────────────
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Build a public Supabase Storage URL for a product image */
function storageUrl(path) {
  return `${STORAGE_URL}/${path}`;
}

/** Convert INR (rupees) to paise for database storage */
function inr(rupees) {
  return Math.round(rupees * 100);
}

// ── Product Definitions ──────────────────────────────────────────────────────
/**
 * Add your real AAVJO products here.
 *
 * Each product object supports:
 *   name         — Display name shown on site
 *   slug         — URL slug, must be unique, lowercase-hyphenated
 *   description  — Full product description
 *   department   — "women" or "men" (must match departments.slug in DB)
 *   category     — category slug (see below for valid values)
 *   price        — Price in INR (₹). Converted to paise automatically.
 *   compare_at_price — MRP/original price in INR. null if no discount.
 *   fabric       — Fabric description e.g. "100% Cotton Mul"
 *   care_instructions — e.g. "Hand wash cold, dry in shade"
 *   is_featured  — true = show in featured sections
 *   is_new_arrival — true = show "New" badge
 *   is_published — true = visible to customers. Use false to stage quietly.
 *   variants     — Array of size × colour combinations with stock
 *   images       — Array of image objects. First with is_primary: true is used as card image.
 *
 * VALID CATEGORY SLUGS:
 *   Women: "kurta-sets" | "tops-tunics" | "dresses" | "dupattas-unstitched"
 *   Men:   "shirts"
 *
 * IMAGE PATHS:
 *   After uploading to the product-images bucket, use relative paths.
 *   e.g. storageUrl("women/kurta-sets/my-product-slug/front.jpg")
 *
 * SKU FORMAT (suggestion): DEPT-CAT-COLOUR-SIZE
 *   e.g. "W-KS-IB-M" = Women, Kurta Set, Indigo Blue, Medium
 */

const PRODUCTS = [
  // ── EXAMPLE PRODUCT (staged, is_published: false) ────────────────────────
  // Remove this example and add your real AAVJO products.
  // This product will NOT be visible to customers until you set is_published: true.
  {
    name: "Indigo Block Print Kurta Set",
    slug: "indigo-block-print-kurta-set",
    description:
      "A timeless hand-block-printed kurta set in breathable cotton mul. " +
      "Featuring deep indigo geometric prints crafted by artisans in Jaipur, " +
      "this set pairs a flowy A-line kurta with matching palazzo pants. " +
      "Perfect for festive occasions and everyday elegance.",
    department: "women",
    category: "kurta-sets",
    price: 2499, // ₹2,499
    compare_at_price: 3200, // ₹3,200 (MRP, optional — null to remove discount badge)
    fabric: "100% Cotton Mul",
    care_instructions: "Gentle hand wash in cold water. Dry flat in shade. Do not wring.",
    is_featured: true,
    is_new_arrival: true,
    is_published: false, // ← KEEP FALSE until real photos are uploaded
    variants: [
      { size: "XS", colour: "Indigo Blue", colour_hex: "#3B4F7A", sku: "W-KS-IB-XS", stock: 5 },
      { size: "S",  colour: "Indigo Blue", colour_hex: "#3B4F7A", sku: "W-KS-IB-S",  stock: 10 },
      { size: "M",  colour: "Indigo Blue", colour_hex: "#3B4F7A", sku: "W-KS-IB-M",  stock: 8 },
      { size: "L",  colour: "Indigo Blue", colour_hex: "#3B4F7A", sku: "W-KS-IB-L",  stock: 6 },
      { size: "XL", colour: "Indigo Blue", colour_hex: "#3B4F7A", sku: "W-KS-IB-XL", stock: 0 }, // out of stock
    ],
    images: [
      {
        // Upload front.jpg to Supabase Storage first, then uncomment the real URL:
        // url: storageUrl("women/kurta-sets/indigo-block-print-kurta-set/front.jpg"),
        url: "REPLACE_WITH_REAL_IMAGE_URL",
        alt: "Indigo Block Print Kurta Set — front view",
        sort_order: 0,
        is_primary: true,
      },
      {
        // url: storageUrl("women/kurta-sets/indigo-block-print-kurta-set/back.jpg"),
        url: "REPLACE_WITH_REAL_IMAGE_URL",
        alt: "Indigo Block Print Kurta Set — back view",
        sort_order: 1,
        is_primary: false,
      },
    ],
  },
];

// ── Insert logic ──────────────────────────────────────────────────────────────

async function seedProducts() {
  console.log(`\n🌱 AAVJO Product Seed — ${new Date().toISOString()}`);
  console.log(`   Supabase: ${SUPABASE_URL}\n`);

  // Fetch department and category lookup tables
  const { data: departments, error: deptErr } = await supabase
    .from("departments")
    .select("id, slug");
  if (deptErr) {
    console.error("❌ Could not fetch departments:", deptErr.message);
    process.exit(1);
  }

  const { data: categories, error: catErr } = await supabase
    .from("categories")
    .select("id, slug, department_id");
  if (catErr) {
    console.error("❌ Could not fetch categories:", catErr.message);
    process.exit(1);
  }

  const deptBySlug = Object.fromEntries(departments.map((d) => [d.slug, d]));
  const catBySlug = Object.fromEntries(categories.map((c) => [`${c.department_id}:${c.slug}`, c]));

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (const p of PRODUCTS) {
    process.stdout.write(`  → ${p.name} (${p.slug}) ... `);

    // Validate department and category
    const dept = deptBySlug[p.department];
    if (!dept) {
      console.error(`❌ Unknown department "${p.department}"`);
      errors++;
      continue;
    }

    const cat = catBySlug[`${dept.id}:${p.category}`];
    if (!cat) {
      console.error(`❌ Unknown category "${p.category}" in "${p.department}"`);
      errors++;
      continue;
    }

    // Skip if slug already exists (idempotent)
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("slug", p.slug)
      .single();

    if (existing) {
      console.log("⏭  already exists — skipping");
      skipped++;
      continue;
    }

    // Insert product
    const { data: product, error: prodErr } = await supabase
      .from("products")
      .insert({
        department_id: dept.id,
        category_id: cat.id,
        name: p.name,
        slug: p.slug,
        description: p.description ?? null,
        price: inr(p.price),
        compare_at_price: p.compare_at_price ? inr(p.compare_at_price) : null,
        fabric: p.fabric ?? null,
        care_instructions: p.care_instructions ?? null,
        is_featured: p.is_featured ?? false,
        is_new_arrival: p.is_new_arrival ?? true,
        is_published: p.is_published ?? false,
      })
      .select("id")
      .single();

    if (prodErr || !product) {
      console.error(`❌ Insert failed: ${prodErr?.message}`);
      errors++;
      continue;
    }

    // Insert variants + inventory
    for (const v of p.variants ?? []) {
      const { data: variant, error: varErr } = await supabase
        .from("product_variants")
        .insert({
          product_id: product.id,
          size: v.size,
          colour: v.colour,
          colour_hex: v.colour_hex ?? null,
          sku: v.sku,
          price_override: null,
        })
        .select("id")
        .single();

      if (varErr || !variant) {
        console.error(`   ⚠️  Variant ${v.sku} failed: ${varErr?.message}`);
        continue;
      }

      await supabase
        .from("inventory")
        .insert({ variant_id: variant.id, quantity: v.stock ?? 0 });
    }

    // Insert images
    for (const img of p.images ?? []) {
      await supabase.from("product_images").insert({
        product_id: product.id,
        url: img.url,
        alt: img.alt ?? null,
        sort_order: img.sort_order ?? 0,
        is_primary: img.is_primary ?? false,
      });
    }

    console.log("✅ inserted");
    inserted++;
  }

  console.log(
    `\n✅ Done: ${inserted} inserted, ${skipped} skipped, ${errors} errors.\n`
  );

  if (errors > 0) process.exit(1);
}

seedProducts().catch((err) => {
  console.error("\n❌ Unexpected error:", err);
  process.exit(1);
});
