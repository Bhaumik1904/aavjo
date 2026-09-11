export function EditorialMosaic() {
  const tiles = [
    {
      id: "handcrafted",
      title: "Handcrafted",
      subtitle: "BLOCK PRINTS",
      size: "large",
      bg: "linear-gradient(145deg, #C8B8A8 0%, #B8A898 100%)",
      patternColor: "#8A9FBE",
    },
    {
      id: "pastels",
      title: "oh so soft",
      subtitle: "PASTELS",
      size: "small",
      bg: "linear-gradient(145deg, #DCE4EE 0%, #C8D4E0 100%)",
      patternColor: "#292825",
    },
    {
      id: "prints",
      title: "charm of",
      subtitle: "INDIE PRINTS",
      size: "small",
      bg: "linear-gradient(145deg, #D8D0C0 0%, #C8BCA8 100%)",
      patternColor: "#8A9FBE",
    },
    {
      id: "naturals",
      title: "timeless",
      subtitle: "NATURALS",
      size: "small",
      bg: "linear-gradient(145deg, #D0CCC8 0%, #BCB8B0 100%)",
      patternColor: "#292825",
    },
    {
      id: "mens",
      title: "Men's",
      subtitle: "SHIRTS",
      size: "small",
      bg: "linear-gradient(145deg, #C8D0DC 0%, #B8C0CC 100%)",
      patternColor: "#292825",
    },
  ];

  return (
    <section className="bg-ivory overflow-hidden" aria-label="Editorial collection highlights">
      <div className="flex flex-col md:flex-row" style={{ minHeight: "480px" }}>

        {/* Large left tile — 50% width */}
        {tiles
          .filter((t) => t.size === "large")
          .map((tile) => (
            <div
              key={tile.id}
              className="relative md:w-1/2 min-h-[280px] md:min-h-[480px] overflow-hidden group cursor-pointer"
              style={{ background: tile.bg }}
            >
              {/* Texture */}
              <div
                className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.09] transition-opacity duration-500"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    ${tile.patternColor} 0px,
                    ${tile.patternColor} 1px,
                    transparent 1px,
                    transparent 12px
                  )`,
                }}
              />
              {/* Text overlay */}
              <div className="absolute bottom-8 left-8">
                <p className="font-cormorant text-2xl italic text-charcoal/60 leading-none mb-1">
                  {tile.title}
                </p>
                <h3 className="font-inter text-4xl md:text-5xl font-bold tracking-[0.05em] uppercase text-charcoal">
                  {tile.subtitle}
                </h3>
                <p className="font-inter text-xs tracking-[0.15em] uppercase text-charcoal/50 mt-2">
                  Rooted in tradition, styled for today
                </p>
              </div>
            </div>
          ))}

        {/* Right 2×2 grid */}
        <div className="md:w-1/2 grid grid-cols-2">
          {tiles
            .filter((t) => t.size === "small")
            .map((tile) => (
              <div
                key={tile.id}
                className="relative min-h-[140px] md:min-h-[240px] overflow-hidden group cursor-pointer"
                style={{ background: tile.bg }}
              >
                {/* Texture */}
                <div
                  className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${tile.patternColor} 1px, transparent 1px)`,
                    backgroundSize: "12px 12px",
                  }}
                />
                {/* Text overlay */}
                <div className="absolute bottom-4 left-4">
                  <p className="font-cormorant text-sm italic text-charcoal/50 leading-none">
                    {tile.title}
                  </p>
                  <h4 className="font-inter text-lg md:text-xl font-bold tracking-[0.08em] uppercase text-charcoal">
                    {tile.subtitle}
                  </h4>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
