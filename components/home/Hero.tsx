import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-ivory"
      style={{ minHeight: "75vh" }}
      aria-label="Hero — AAVJO"
    >
      {/* Background fabric texture overlay */}
      <div className="absolute inset-0 bg-ivory" />

      {/* Main content grid */}
      <div className="relative flex flex-col md:flex-row min-h-[75vh]">

        {/* ---- LEFT: Women's Panel ---- */}
        <div className="relative flex-1 min-h-[50vh] md:min-h-[75vh] group overflow-hidden">
          {/* Background — warm ivory gradient simulating photography backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #E8DDD2 0%, #D4C8BA 40%, #C8B8A8 100%)",
            }}
          />
          {/* Fabric pattern overlay — subtle brand texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                #292825 0px,
                #292825 1px,
                transparent 1px,
                transparent 12px
              )`,
            }}
          />

          {/* Women's text panel — Jharokha arch shape */}
          <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-12 lg:pr-20">
            <div className="relative flex flex-col items-center text-center px-6 py-8 md:py-10">
              {/* Arch outline using CSS border-radius */}
              <div
                className="relative border border-marian-blue/60 px-10 py-12 md:px-14 md:py-16"
                style={{
                  borderRadius: "50% 50% 0 0 / 40% 40% 0 0",
                  background: "rgba(41, 40, 37, 0.82)",
                  backdropFilter: "blur(4px)",
                  minWidth: "240px",
                  maxWidth: "320px",
                }}
              >
                {/* Top ornament */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <span className="block w-8 h-px bg-marian-blue/50" />
                  <span className="block w-1.5 h-1.5 rounded-full bg-marian-blue/70" />
                  <span className="block w-8 h-px bg-marian-blue/50" />
                </div>

                <p className="label-caps text-soft-white/50 mb-2">Women</p>
                <h1 className="font-cormorant text-4xl md:text-5xl text-soft-white font-normal leading-tight mb-1">
                  Wear it once,
                </h1>
                <h2 className="font-cormorant text-3xl md:text-4xl text-marian-blue font-light italic leading-tight mb-4">
                  yours forever
                </h2>

                {/* Divider flourish */}
                <div className="flex items-center justify-center gap-2 mb-5">
                  <span className="block w-6 h-px bg-soft-white/30" />
                  <span className="font-cormorant text-soft-white/50 text-sm">✦</span>
                  <span className="block w-6 h-px bg-soft-white/30" />
                </div>

                <p className="font-inter text-xs text-soft-white/60 tracking-wide mb-6 leading-relaxed">
                  Handcrafted block prints.<br />Natural fabrics. Jaipur.
                </p>

                <Link href="/shop/women" className="btn-ghost-white text-sm px-6 py-2.5">
                  Shop Women
                </Link>
              </div>
            </div>
          </div>

          {/* Women label */}
          <div className="absolute bottom-6 left-6 md:hidden">
            <span className="label-caps text-charcoal/60 bg-ivory/80 px-3 py-1">Women</span>
          </div>
        </div>

        {/* ---- DIVIDER (desktop) ---- */}
        <div className="hidden md:block w-px bg-sand/40 self-stretch my-8" />

        {/* ---- RIGHT: Men's Panel ---- */}
        <div className="relative flex-1 min-h-[50vh] md:min-h-[75vh] group overflow-hidden">
          {/* Background — slightly cooler tone for men's */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(225deg, #D8D0C8 0%, #C4BCBA 40%, #B8AFA8 100%)",
            }}
          />
          {/* Block-print dot pattern — subtle */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `radial-gradient(circle, #292825 1px, transparent 1px)`,
              backgroundSize: "18px 18px",
            }}
          />

          {/* Men's text panel */}
          <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-12 lg:pl-20">
            <div className="relative flex flex-col items-center text-center px-6 py-8 md:py-10">
              <div
                className="relative border border-marian-blue/60 px-10 py-12 md:px-14 md:py-16"
                style={{
                  borderRadius: "50% 50% 0 0 / 40% 40% 0 0",
                  background: "rgba(41, 40, 37, 0.82)",
                  backdropFilter: "blur(4px)",
                  minWidth: "240px",
                  maxWidth: "320px",
                }}
              >
                {/* Top ornament */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <span className="block w-8 h-px bg-marian-blue/50" />
                  <span className="block w-1.5 h-1.5 rounded-full bg-marian-blue/70" />
                  <span className="block w-8 h-px bg-marian-blue/50" />
                </div>

                <p className="label-caps text-soft-white/50 mb-2">Men</p>
                <h2 className="font-cormorant text-4xl md:text-5xl text-soft-white font-normal leading-tight mb-1">
                  Effortless
                </h2>
                <h2 className="font-cormorant text-3xl md:text-4xl text-marian-blue font-light italic leading-tight mb-4">
                  Indian style
                </h2>

                {/* Divider flourish */}
                <div className="flex items-center justify-center gap-2 mb-5">
                  <span className="block w-6 h-px bg-soft-white/30" />
                  <span className="font-cormorant text-soft-white/50 text-sm">✦</span>
                  <span className="block w-6 h-px bg-soft-white/30" />
                </div>

                <p className="font-inter text-xs text-soft-white/60 tracking-wide mb-6 leading-relaxed">
                  Block-print shirts.<br />Easy, handcrafted, minimal.
                </p>

                <Link href="/shop/men" className="btn-ghost-white text-sm px-6 py-2.5">
                  Shop Men
                </Link>
              </div>
            </div>
          </div>

          {/* Men label */}
          <div className="absolute bottom-6 left-6 md:hidden">
            <span className="label-caps text-charcoal/60 bg-ivory/80 px-3 py-1">Men</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1">
        <div className="w-px h-8 bg-charcoal/20 animate-pulse" />
      </div>
    </section>
  );
}
