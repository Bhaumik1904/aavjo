import Link from "next/link";

const COLLECTIONS = [
  {
    title: "New Arrivals",
    subtitle: "Fresh from Jaipur",
    href: "/new-arrivals",
    accent: "bg-[#E8DDD2]",
    patternColor: "#8A9FBE",
  },
  {
    title: "Block Print Essentials",
    subtitle: "Rooted in tradition",
    href: "/collections/block-print-essentials",
    accent: "bg-[#DCE4EE]",
    patternColor: "#292825",
  },
  {
    title: "Festive Edit",
    subtitle: "Celebrate in style",
    href: "/collections/festive-edit",
    accent: "bg-[#E0D8CE]",
    patternColor: "#8A9FBE",
  },
  {
    title: "Pastels",
    subtitle: "Soft, everyday elegance",
    href: "/collections/pastels",
    accent: "bg-[#D8D4D0]",
    patternColor: "#8A9FBE",
  },
];

export function FeaturedCollections() {
  return (
    <section className="bg-ivory section-py" aria-label="Featured collections">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="section-heading">Curated for you</p>
          <h2 className="display-sm text-charcoal">Featured Collections</h2>
        </div>

        {/* 4 arch-shaped cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              className="group relative block overflow-hidden"
              aria-label={col.title}
            >
              {/* Arch card — pointed top via border-radius */}
              <div
                className={`relative w-full ${col.accent} overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]`}
                style={{
                  aspectRatio: "3/4",
                  borderRadius: "50% 50% 0 0 / 22% 22% 0 0",
                }}
              >
                {/* Block-print texture inside the arch */}
                <div
                  className="absolute inset-0 opacity-[0.035] group-hover:opacity-[0.07] transition-opacity duration-500"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      45deg,
                      ${col.patternColor} 0px,
                      ${col.patternColor} 1px,
                      transparent 1px,
                      transparent 10px
                    )`,
                  }}
                />

                {/* Arch frame border */}
                <div
                  className="absolute inset-2 border border-marian-blue/30 pointer-events-none"
                  style={{
                    borderRadius: "50% 50% 0 0 / 22% 22% 0 0",
                  }}
                />

                {/* Text overlay at bottom */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal/80 to-transparent pt-12 pb-6 px-5">
                  <h3 className="font-cormorant text-xl md:text-2xl text-soft-white font-normal leading-snug mb-1">
                    {col.title}
                  </h3>
                  <p className="font-inter text-[10px] text-soft-white/60 tracking-wide">
                    {col.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
