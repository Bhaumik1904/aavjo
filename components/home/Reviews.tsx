const REVIEWS = [
  {
    id: 1,
    name: "Priya S.",
    rating: 5,
    text: "The block-print kurta set is absolutely stunning. The fabric quality is exceptional and the colours are exactly as shown. Will definitely order again!",
    product: "Block Print Kurta Set",
  },
  {
    id: 2,
    name: "Arjun M.",
    rating: 5,
    text: "Bought the block-print shirt for a family function — received so many compliments. The craftsmanship is evident. Packaging was beautiful too.",
    product: "Men's Block Print Shirt",
  },
  {
    id: 3,
    name: "Deepika R.",
    rating: 5,
    text: "AAVJO has such a unique aesthetic — minimal, handcrafted and very wearable. The dupatta arrived beautifully folded. Absolutely in love!",
    product: "Handblock Dupatta",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill={i < rating ? "#8A9FBE" : "none"}
          stroke="#8A9FBE"
          strokeWidth="1"
        >
          <path d="M6 1l1.236 2.636L10 4.073l-2 1.952.472 2.748L6 7.5l-2.472 1.273L4 6.025 2 4.073l2.764-.437L6 1z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="bg-ivory section-py" aria-label="Customer reviews">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="section-heading">Our Customers</p>
          <h2 className="display-sm text-charcoal">What They Say</h2>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-soft-white border border-sand px-6 py-6"
            >
              <StarRating rating={review.rating} />
              <blockquote className="font-inter text-sm text-charcoal/75 leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <div>
                <p className="font-inter text-[11px] font-semibold uppercase tracking-wider text-charcoal">
                  {review.name}
                </p>
                <p className="font-inter text-[10px] text-marian-blue tracking-wide mt-0.5">
                  {review.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
