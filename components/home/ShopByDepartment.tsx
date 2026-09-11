import Link from "next/link";

export function ShopByDepartment() {
  return (
    <section className="bg-soft-white section-py" aria-label="Shop by department">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="section-heading">Explore</p>
          <h2 className="display-sm text-charcoal">Shop by Department</h2>
        </div>

        {/* Two department cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">

          {/* Women's card */}
          <Link
            href="/shop/women"
            className="group relative overflow-hidden block"
            aria-label="Shop Women's collection"
          >
            {/* Background gradient — warm pink-ivory for women's */}
            <div
              className="w-full aspect-[3/4] md:aspect-[4/5]"
              style={{
                background: "linear-gradient(160deg, #EDE0D5 0%, #DDD0C2 50%, #CCB8A8 100%)",
              }}
            >
              {/* Block-print texture */}
              <div
                className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    #8A9FBE 0px,
                    #8A9FBE 1px,
                    transparent 1px,
                    transparent 10px
                  )`,
                }}
              />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6 text-center">
                <div className="bg-charcoal/80 backdrop-blur-sm px-8 py-6 w-full max-w-[260px] border-t-2 border-marian-blue">
                  <p className="label-caps text-soft-white/50 mb-1">Department</p>
                  <h3 className="font-cormorant text-3xl text-soft-white font-normal mb-3">
                    Women
                  </h3>
                  <p className="font-inter text-xs text-soft-white/60 mb-4">
                    Kurta Sets · Tops · Dresses · Dupattas
                  </p>
                  <span className="label-caps text-marian-blue text-[10px] group-hover:tracking-[0.2em] transition-all duration-300">
                    Shop Now →
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Men's card */}
          <Link
            href="/shop/men"
            className="group relative overflow-hidden block"
            aria-label="Shop Men's collection"
          >
            {/* Background gradient — cooler tone for men's */}
            <div
              className="w-full aspect-[3/4] md:aspect-[4/5]"
              style={{
                background: "linear-gradient(160deg, #DCE4EE 0%, #C8D4E0 50%, #B8C8D8 100%)",
              }}
            >
              {/* Dot block-print pattern */}
              <div
                className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                style={{
                  backgroundImage: `radial-gradient(circle, #292825 1px, transparent 1px)`,
                  backgroundSize: "14px 14px",
                }}
              />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6 text-center">
                <div className="bg-charcoal/80 backdrop-blur-sm px-8 py-6 w-full max-w-[260px] border-t-2 border-marian-blue">
                  <p className="label-caps text-soft-white/50 mb-1">Department</p>
                  <h3 className="font-cormorant text-3xl text-soft-white font-normal mb-3">
                    Men
                  </h3>
                  <p className="font-inter text-xs text-soft-white/60 mb-4">
                    Block-Print Shirts · Handcrafted
                  </p>
                  <span className="label-caps text-marian-blue text-[10px] group-hover:tracking-[0.2em] transition-all duration-300">
                    Shop Now →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
