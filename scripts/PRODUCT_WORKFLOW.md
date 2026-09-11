# AAVJO — Product Data Workflow

This document explains exactly how to add real AAVJO products to the live catalog.

---

## Prerequisites (already done)

- [x] Supabase project connected (`.env.local` has real credentials)
- [x] Migration `001_schema.sql` applied (tables exist)
- [x] `product-images` Storage bucket created and set to **Public**

---

## Step-by-step: Adding a real AAVJO product

### Step 1 — Get your Supabase Service Role Key

This is required **only** for the seed script (not the website).

1. Open [Supabase Dashboard](https://app.supabase.com)
2. Select your AAVJO project
3. Go to **Settings → API**
4. Copy the **Service Role Secret** (not the anon key)
5. In `.env.local`, replace the placeholder:
   ```
   SUPABASE_SERVICE_ROLE_KEY=eyJ...your_real_service_role_key
   ```

> **Security note:** The service role key bypasses all RLS policies.  
> Never commit it to git. Never expose it client-side.  
> `.env.local` is already in `.gitignore`.

---

### Step 2 — Upload product images to Supabase Storage

For each product, upload images via the Supabase Dashboard:

1. Go to **Storage → product-images**
2. Create folders following this convention:
   ```
   women/kurta-sets/{product-slug}/
   women/tops-tunics/{product-slug}/
   women/dresses/{product-slug}/
   women/dupattas-unstitched/{product-slug}/
   men/shirts/{product-slug}/
   ```
3. Upload your images into the folder:
   - `front.jpg` — primary/hero shot
   - `back.jpg` — back view
   - `detail.jpg` — fabric/print closeup (optional)
4. After uploading, right-click any file → **Get URL**. It will look like:
   ```
   https://zjsgnqormogoznvdjrgv.supabase.co/storage/v1/object/public/product-images/women/kurta-sets/my-product-slug/front.jpg
   ```
   Or use the helper in the seed script: `storageUrl("women/kurta-sets/my-product-slug/front.jpg")`

---

### Step 3 — Define your product in the seed script

Open [`scripts/seed-products.mjs`](./seed-products.mjs) and edit the `PRODUCTS` array:

```js
{
  name: "Dabu Print Kurta Set",
  slug: "dabu-print-kurta-set",           // URL will be /product/dabu-print-kurta-set
  description: "...",
  department: "women",
  category: "kurta-sets",                  // must match a valid category slug
  price: 2999,                             // in INR (₹), NOT paise
  compare_at_price: 3800,                  // MRP, null if no strike-through price
  fabric: "100% Cotton Dabu",
  care_instructions: "Hand wash cold, dry in shade.",
  is_featured: true,
  is_new_arrival: true,
  is_published: true,                      // true = visible to customers
  variants: [
    { size: "XS", colour: "Natural White", colour_hex: "#F5F0E8", sku: "W-KS-NW-XS", stock: 5 },
    { size: "S",  colour: "Natural White", colour_hex: "#F5F0E8", sku: "W-KS-NW-S",  stock: 10 },
    { size: "M",  colour: "Natural White", colour_hex: "#F5F0E8", sku: "W-KS-NW-M",  stock: 8 },
    { size: "L",  colour: "Natural White", colour_hex: "#F5F0E8", sku: "W-KS-NW-L",  stock: 3 },
    { size: "XL", colour: "Natural White", colour_hex: "#F5F0E8", sku: "W-KS-NW-XL", stock: 0 },
  ],
  images: [
    {
      url: storageUrl("women/kurta-sets/dabu-print-kurta-set/front.jpg"),
      alt: "Dabu Print Kurta Set — front",
      sort_order: 0,
      is_primary: true,
    },
    {
      url: storageUrl("women/kurta-sets/dabu-print-kurta-set/back.jpg"),
      alt: "Dabu Print Kurta Set — back",
      sort_order: 1,
      is_primary: false,
    },
  ],
},
```

---

### Step 4 — Run the seed script

```bash
node scripts/seed-products.mjs
```

Expected output:
```
🌱 AAVJO Product Seed — 2026-08-23T09:00:00.000Z
   Supabase: https://zjsgnqormogoznvdjrgv.supabase.co

  → Dabu Print Kurta Set (dabu-print-kurta-set) ... ✅ inserted

✅ Done: 1 inserted, 0 skipped, 0 errors.
```

The script is **idempotent** — running it twice will skip already-inserted slugs, never create duplicates.

---

### Step 5 — Verify on the website

Restart dev server (if running):
```bash
npm run dev
```

Visit:
- `/shop/women/kurta-sets` — product card should appear
- `/product/dabu-print-kurta-set` — PDP should show full product

---

## Valid category slugs

| Department | Category slug |
|-----------|--------------|
| `women` | `kurta-sets` |
| `women` | `tops-tunics` |
| `women` | `dresses` |
| `women` | `dupattas-unstitched` |
| `men` | `shirts` |

---

## Publishing control

| `is_published` | Effect |
|---------------|--------|
| `false` | Product exists in DB but is hidden from all public pages (RLS blocks it) |
| `true` | Product is live and visible to all customers |

You can toggle this in Supabase Studio: **Table Editor → products → Edit row**.

---

## Updating a product (without re-running seed)

Use Supabase Studio directly:
- **Table Editor → products** to edit name, price, description, status
- **Table Editor → inventory** to update stock quantities
- **Table Editor → product_images** to add/remove images
- **Storage → product-images** to replace image files (keep same filename for automatic URL continuity)

---

## SKU format (suggestion)

```
{DEPT}-{CAT}-{COLOUR_CODE}-{SIZE}
W-KS-IB-M   = Women, Kurta Set, Indigo Blue, Medium
W-TT-NW-S   = Women, Tops & Tunics, Natural White, Small
W-DR-RS-L   = Women, Dresses, Rose Sand, Large
W-DU-MG-FS  = Women, Dupattas, Midnight Grey, Free Size
M-SH-NV-XL  = Men, Shirts, Navy, X-Large
```
