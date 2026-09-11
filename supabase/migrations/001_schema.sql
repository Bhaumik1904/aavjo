-- ============================================================
-- AAVJO — Full Database Schema
-- Run this migration in your Supabase SQL editor
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- DEPARTMENTS
-- Top-level: Women, Men
-- ============================================================
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO departments (name, slug, sort_order) VALUES
  ('Women', 'women', 1),
  ('Men', 'men', 2);

-- ============================================================
-- CATEGORIES
-- Linked to a department
-- Only confirmed categories seeded as active
-- ============================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(department_id, slug)
);

-- Women's confirmed categories
INSERT INTO categories (department_id, name, slug, sort_order, is_active)
SELECT d.id, 'Kurta Sets', 'kurta-sets', 1, true FROM departments d WHERE d.slug = 'women';

INSERT INTO categories (department_id, name, slug, sort_order, is_active)
SELECT d.id, 'Tops & Tunics', 'tops-tunics', 2, true FROM departments d WHERE d.slug = 'women';

INSERT INTO categories (department_id, name, slug, sort_order, is_active)
SELECT d.id, 'Dresses', 'dresses', 3, true FROM departments d WHERE d.slug = 'women';

INSERT INTO categories (department_id, name, slug, sort_order, is_active)
SELECT d.id, 'Dupattas & Unstitched', 'dupattas-unstitched', 4, true FROM departments d WHERE d.slug = 'women';

-- Women's categories pending client confirmation (seeded as inactive)
INSERT INTO categories (department_id, name, slug, sort_order, is_active)
SELECT d.id, 'Bottoms', 'bottoms', 5, false FROM departments d WHERE d.slug = 'women';

INSERT INTO categories (department_id, name, slug, sort_order, is_active)
SELECT d.id, 'Co-ords', 'co-ords', 6, false FROM departments d WHERE d.slug = 'women';

-- Men's confirmed categories
INSERT INTO categories (department_id, name, slug, sort_order, is_active)
SELECT d.id, 'Shirts', 'shirts', 1, true FROM departments d WHERE d.slug = 'men';

-- Men's categories pending client confirmation (seeded as inactive)
INSERT INTO categories (department_id, name, slug, sort_order, is_active)
SELECT d.id, 'Kurtas', 'kurtas', 2, false FROM departments d WHERE d.slug = 'men';

INSERT INTO categories (department_id, name, slug, sort_order, is_active)
SELECT d.id, 'Bottoms', 'bottoms', 3, false FROM departments d WHERE d.slug = 'men';

-- ============================================================
-- COLLECTIONS
-- Curated groups: New Arrivals, Festive, Block Prints, etc.
-- A product can belong to Department + Category + Collection
-- ============================================================
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO collections (name, slug, is_featured, sort_order) VALUES
  ('New Arrivals', 'new-arrivals', true, 1),
  ('Festive Edit', 'festive-edit', true, 2),
  ('Block Print Essentials', 'block-print-essentials', true, 3),
  ('Pastels', 'pastels', false, 4);

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id UUID NOT NULL REFERENCES departments(id),
  category_id UUID NOT NULL REFERENCES categories(id),
  collection_id UUID REFERENCES collections(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- stored in paise (₹1 = 100)
  compare_at_price INTEGER, -- strike-through price in paise
  fabric TEXT,
  care_instructions TEXT,
  shipping_info TEXT DEFAULT 'Ships within 3-5 business days. Free shipping on orders above ₹999.',
  return_info TEXT DEFAULT 'Easy 7-day returns. Item must be unworn and in original condition.',
  is_featured BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT false,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRODUCT IMAGES
-- ============================================================
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRODUCT VARIANTS
-- Size × Colour combinations
-- ============================================================
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,           -- XS, S, M, L, XL, XXL, Free Size
  colour TEXT NOT NULL,         -- colour name
  colour_hex TEXT,              -- optional hex for swatch
  sku TEXT UNIQUE NOT NULL,
  price_override INTEGER,       -- null = use product.price
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INVENTORY
-- Per-variant stock tracking
-- ============================================================
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  variant_id UUID NOT NULL UNIQUE REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROFILES
-- Extends auth.users
-- ============================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ADDRESSES
-- ============================================================
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT DEFAULT 'Home',    -- Home, Office, Other
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  line1 TEXT NOT NULL,
  line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'India',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CARTS
-- Support both guest (session_id) and authenticated (user_id)
-- ============================================================
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,              -- for guest carts
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT cart_owner CHECK (user_id IS NOT NULL OR session_id IS NOT NULL)
);

CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  variant_id UUID NOT NULL REFERENCES product_variants(id),
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(cart_id, variant_id)
);

-- ============================================================
-- ORDERS
-- ============================================================
CREATE TYPE order_status AS ENUM (
  'pending', 'confirmed', 'processing', 'packed',
  'shipped', 'delivered', 'cancelled', 'refunded'
);

CREATE TYPE payment_status AS ENUM (
  'pending', 'paid', 'failed', 'refunded'
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  order_number TEXT UNIQUE NOT NULL,    -- human-readable: AAVJO-001234
  status order_status NOT NULL DEFAULT 'pending',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  shipping_address JSONB NOT NULL,      -- snapshot at purchase time
  subtotal INTEGER NOT NULL,            -- paise
  shipping_amount INTEGER NOT NULL DEFAULT 0,
  discount_amount INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL,               -- paise
  coupon_code TEXT,
  notes TEXT,
  razorpay_order_id TEXT UNIQUE,
  tracking_number TEXT,
  tracking_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  -- Snapshot at purchase time — never changes
  product_name TEXT NOT NULL,
  variant_size TEXT NOT NULL,
  variant_colour TEXT NOT NULL,
  variant_sku TEXT NOT NULL,
  product_image_url TEXT,
  price_paid INTEGER NOT NULL,          -- paise, locked at purchase
  quantity INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PAYMENTS
-- Razorpay records with idempotency key
-- ============================================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT UNIQUE,
  razorpay_signature TEXT,
  idempotency_key TEXT UNIQUE NOT NULL, -- prevents duplicate processing
  status payment_status NOT NULL DEFAULT 'pending',
  amount INTEGER NOT NULL,              -- paise
  captured_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  body TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

-- ============================================================
-- COUPONS
-- ============================================================
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('percentage', 'fixed')),
  value INTEGER NOT NULL,               -- % or paise
  min_order_amount INTEGER DEFAULT 0,
  max_uses INTEGER,
  uses_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- STORE SETTINGS
-- Key-value config managed from admin
-- ============================================================
CREATE TABLE store_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO store_settings (key, value) VALUES
  ('announcement_text', 'FREE SHIPPING ON ORDERS ABOVE ₹999 · HANDCRAFTED IN INDIA · EASY 7-DAY RETURNS'),
  ('free_shipping_threshold', '99900'),
  ('instagram_handle', '@aavjo__');

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_products_department ON products(department_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_published ON products(is_published) WHERE is_published = true;
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_product_variants_product ON product_variants(product_id);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_cart_items_cart ON cart_items(cart_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_addresses_user ON addresses(user_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Profiles: users see/update only their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Addresses: users see/manage only their own
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "addresses_select_own" ON addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "addresses_insert_own" ON addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "addresses_update_own" ON addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "addresses_delete_own" ON addresses FOR DELETE USING (auth.uid() = user_id);

-- Carts: users see only their own cart
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "carts_select_own" ON carts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "carts_insert_own" ON carts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "carts_update_own" ON carts FOR UPDATE USING (auth.uid() = user_id);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cart_items_own" ON cart_items FOR ALL USING (
  cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid())
);

-- Orders: users see only their own orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_select_own" ON orders FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order_items_select_own" ON order_items FOR SELECT USING (
  order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
);

-- Products/Categories/Departments/Collections: public read for published items
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_select" ON products FOR SELECT USING (is_published = true);

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "departments_public_select" ON departments FOR SELECT USING (is_active = true);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_public_select" ON categories FOR SELECT USING (is_active = true);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "collections_public_select" ON collections FOR SELECT USING (is_active = true);

ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "product_images_public_select" ON product_images FOR SELECT USING (true);

ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "variants_public_select" ON product_variants FOR SELECT USING (true);

ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "inventory_public_select" ON inventory FOR SELECT USING (true);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_public_select" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "reviews_insert_own" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "store_settings_public_select" ON store_settings FOR SELECT USING (true);

-- ============================================================
-- TRIGGER: auto-create profile on new user
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- TRIGGER: update updated_at timestamps
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
