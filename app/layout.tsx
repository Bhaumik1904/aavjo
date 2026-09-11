import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistProvider } from "@/components/wishlist/WishlistContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AAVJO — Handcrafted Indian Clothing",
    template: "%s | AAVJO",
  },
  description:
    "Premium handcrafted Indian clothing for women and men. Block prints, natural fabrics — crafted in Jaipur.",
  keywords: ["Indian clothing", "block print", "kurta set", "handcrafted", "Jaipur fashion", "ethnic wear"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "AAVJO",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable} ${manrope.variable}`}
    >
      <body>
        <WishlistProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
