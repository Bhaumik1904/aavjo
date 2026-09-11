// Instagram grid — placeholder tiles until real feed is connected
// In Phase 2 this can be wired to Instagram Basic Display API or manual upload

const PLACEHOLDER_TILES = [
  { id: 1, bg: "#E8DDD2", label: "Women's Kurta Set" },
  { id: 2, bg: "#DCE4EE", label: "Men's Block Print Shirt" },
  { id: 3, bg: "#DDD5C8", label: "Dupatta Detail" },
  { id: 4, bg: "#D8DDE8", label: "Block Print Fabric" },
  { id: 5, bg: "#E0D8D0", label: "Festive Look" },
  { id: 6, bg: "#D0D8E4", label: "Everyday Essentials" },
];

export function InstagramGrid() {
  return (
    <section className="bg-soft-white section-py" aria-label="AAVJO on Instagram">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-8">
          <a
            href="https://instagram.com/aavjo__"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-inter text-sm tracking-[0.2em] uppercase text-charcoal hover:text-marian-blue transition-colors"
          >
            @aavjo__
          </a>
          <p className="font-inter text-xs text-charcoal/40 mt-1 tracking-wide">
            Follow us on Instagram
          </p>
        </div>

        {/* 6-image grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
          {PLACEHOLDER_TILES.map((tile) => (
            <a
              key={tile.id}
              href="https://instagram.com/aavjo__"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group block overflow-hidden aspect-square"
              aria-label={tile.label}
            >
              {/* Placeholder background — will be replaced by actual images */}
              <div
                className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: tile.bg,
                  backgroundImage: `radial-gradient(circle, #292825 1px, transparent 1px)`,
                  backgroundSize: "8px 8px",
                  backgroundBlendMode: "multiply",
                }}
              />
              {/* Instagram overlay on hover */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-all duration-300 flex items-center justify-center">
                <svg
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-soft-white"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
