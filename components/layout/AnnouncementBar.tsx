"use client";

const messages = [
  "FREE SHIPPING ON ORDERS ABOVE ₹999",
  "HANDCRAFTED IN JAIPUR, INDIA",
  "EASY 7-DAY RETURNS",
  "BLOCK PRINT · NATURAL FABRICS · MINIMAL DESIGN",
  "CUSTOMISATION AVAILABLE — ORDER VIA DM",
  "PAN INDIA SHIPPING",
];

export function AnnouncementBar() {
  const repeated = [...messages, ...messages]; // doubled for seamless loop

  return (
    <div
      className="bg-charcoal text-soft-white overflow-hidden"
      style={{ height: "34px" }}
      aria-label="Store announcements"
    >
      <div className="flex items-center h-full">
        <div className="animate-marquee flex gap-0">
          {repeated.map((msg, i) => (
            <span
              key={i}
              className="font-inter text-[11px] tracking-[0.18em] uppercase whitespace-nowrap px-8"
            >
              {msg}
              <span className="mx-4 opacity-40">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
