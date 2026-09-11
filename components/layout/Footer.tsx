import Link from "next/link";

const FOOTER_LINKS = {
  Shop: [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Women's Kurta Sets", href: "/shop/women/kurta-sets" },
    { label: "Women's Tops & Tunics", href: "/shop/women/tops-tunics" },
    { label: "Women's Dresses", href: "/shop/women/dresses" },
    { label: "Men's Shirts", href: "/shop/men/shirts" },
    { label: "Collections", href: "/collections" },
  ],
  Help: [
    { label: "Size Guide", href: "/size-guide" },
    { label: "Track Your Order", href: "/track-order" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "FAQ", href: "/faq" },
  ],
  "About AAVJO": [
    { label: "Our Story", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-soft-white" aria-label="Site footer">
      {/* Main columns */}
      <div className="section-container py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="block font-cormorant text-3xl tracking-[0.12em] text-soft-white mb-4 hover:text-marian-blue transition-colors"
            >
              AAVJO
            </Link>
            <p className="font-inter text-xs text-soft-white/60 leading-relaxed mb-6 max-w-[200px]">
              Handcrafted Indian clothing for women and men. Block prints, natural fabrics, minimal design — crafted in Jaipur.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/aavjo__" target="_blank" rel="noopener noreferrer" className="text-soft-white/50 hover:text-soft-white transition-colors" aria-label="AAVJO on Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-soft-white/50 hover:text-soft-white transition-colors" aria-label="AAVJO on Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-soft-white/50 hover:text-soft-white transition-colors" aria-label="AAVJO on YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-inter text-[10px] tracking-[0.2em] uppercase text-soft-white/40 font-semibold mb-4">
                {heading}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-inter text-sm text-soft-white/70 hover:text-soft-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-soft-white/10">
        <div className="section-container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-inter text-[11px] text-soft-white/40">
            © {new Date().getFullYear()} AAVJO. All rights reserved.
          </p>
          <p className="font-inter text-[11px] text-soft-white/30">
            Made in Jaipur, India 🧵
          </p>
        </div>
      </div>
    </footer>
  );
}
