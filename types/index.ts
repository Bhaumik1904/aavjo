export interface Department {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  department_id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  department?: Department;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
  is_primary: boolean;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size: string;
  colour: string;
  colour_hex: string | null;
  sku: string;
  price_override: number | null;
  inventory?: { quantity: number };
}

export interface Product {
  id: string;
  department_id: string;
  category_id: string;
  collection_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  price: number; // paise
  compare_at_price: number | null; // paise
  fabric: string | null;
  care_instructions: string | null;
  shipping_info: string | null;
  return_info: string | null;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new_arrival: boolean;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
  department?: Department;
  category?: Category;
  collection?: Collection;
  product_images?: ProductImage[];
  product_variants?: ProductVariant[];
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface ShippingAddress {
  full_name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  order_number: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  shipping_address: ShippingAddress;
  subtotal: number;
  shipping_amount: number;
  discount_amount: number;
  total: number;
  coupon_code: string | null;
  razorpay_order_id: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  variant_id: string | null;
  product_name: string;
  variant_size: string;
  variant_colour: string;
  variant_sku: string;
  product_image_url: string | null;
  price_paid: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  cart_id: string;
  variant_id: string;
  quantity: number;
  variant?: ProductVariant & { product?: Product };
}

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: "customer" | "admin";
  created_at: string;
  updated_at: string;
}
