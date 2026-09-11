import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Discover the story behind AAVJO, our craft, and our commitment to handcrafted Indian clothing.",
};

export default function AboutPage() {
  return (
    <div className="pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Hero Section */}
      <div className="section-container mb-20 md:mb-32 text-center max-w-3xl mx-auto">
        <h1 className="font-cormorant text-5xl md:text-6xl text-charcoal tracking-wide mb-6">
          Our Story
        </h1>
        <p className="font-inter text-base md:text-lg text-charcoal/80 leading-relaxed">
          AAVJO is a celebration of traditional Indian craftsmanship interpreted for modern everyday wear. 
          Born from a deep appreciation for the artistry of Jaipur, we create clothing that feels 
          as beautiful as it looks.
        </p>
      </div>

      {/* Alternating Content Sections */}
      <div className="section-container space-y-24 md:space-y-32">
        {/* Craft & Block Printing */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-cormorant text-3xl md:text-4xl text-charcoal mb-4">
              Craft & Block Printing
            </h2>
            <p className="font-inter text-sm md:text-base text-charcoal/70 leading-relaxed mb-6">
              Our designs are rooted in the centuries-old tradition of hand-block printing. 
              Each motif is meticulously carved into wooden blocks and stamped by hand onto the fabric, 
              creating subtle variations that make every single garment unique. This human touch is 
              what gives AAVJO clothing its soul.
            </p>
          </div>
          <div className="order-1 md:order-2 bg-ivory rounded-[50%_50%_0_0_/_10%_10%_0_0] md:rounded-[50%_50%_0_0_/_22%_22%_0_0] aspect-[3/4] flex items-center justify-center relative overflow-hidden">
             {/* Decorative pattern placeholder to represent craft */}
             <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  #8A9FBE 0px,
                  #8A9FBE 1px,
                  transparent 1px,
                  transparent 15px
                )`,
              }}
            />
          </div>
        </section>

        {/* Natural Fabrics */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="bg-soft-white border border-sand aspect-[3/4] flex items-center justify-center relative overflow-hidden">
             {/* Minimal placeholder for fabric */}
             <div className="absolute inset-4 border border-marian-blue/20 rounded-sm" />
             <span className="font-cormorant text-3xl text-charcoal/20">Pure Cotton</span>
          </div>
          <div>
            <h2 className="font-cormorant text-3xl md:text-4xl text-charcoal mb-4">
              Natural Fabrics
            </h2>
            <p className="font-inter text-sm md:text-base text-charcoal/70 leading-relaxed mb-6">
              Comfort is non-negotiable. We work exclusively with breathable, natural fabrics 
              that feel gentle against the skin and move beautifully with you. Our cottons and 
              linens are carefully selected to ensure that our garments are not just elegant, 
              but truly effortless to wear in any climate.
            </p>
          </div>
        </section>

        {/* The AAVJO Approach */}
        <section className="text-center max-w-3xl mx-auto pt-10">
          <h2 className="font-cormorant text-3xl md:text-4xl text-charcoal mb-4">
            The AAVJO Approach
          </h2>
          <p className="font-inter text-sm md:text-base text-charcoal/70 leading-relaxed mb-10">
            We believe in creating pieces that outlast trends. Our aesthetic is intentionally minimal 
            and refined, allowing the beauty of the craft and the fabric to take center stage. 
            We design for individuals who value quality, subtle elegance, and the timeless appeal 
            of Indian heritage.
          </p>
          <Link
            href="/new-arrivals"
            className="inline-flex items-center justify-center px-8 py-3 bg-charcoal text-soft-white font-inter text-[11px] tracking-[0.2em] uppercase hover:bg-marian-blue transition-colors"
          >
            Explore the Collection
          </Link>
        </section>
      </div>
    </div>
  );
}
