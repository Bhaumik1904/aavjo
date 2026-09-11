"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <section className="bg-ivory section-py" aria-label="Newsletter signup">
      <div className="section-container">
        <div className="max-w-xl mx-auto text-center">
          {/* Ornament */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="block w-12 h-px bg-sand" />
            <span className="font-cormorant text-marian-blue text-lg">✦</span>
            <span className="block w-12 h-px bg-sand" />
          </div>

          <p className="section-heading mb-2">Stay in the loop</p>
          <h2 className="display-sm text-charcoal mb-3">
            Join the AAVJO Circle
          </h2>
          <p className="font-inter text-sm text-charcoal/60 leading-relaxed mb-8">
            New arrivals, exclusive collections and the occasional block-print obsession —
            delivered to your inbox.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0"
              aria-label="Newsletter subscription form"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Your email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="input-base flex-1 sm:rounded-none"
                aria-required="true"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          ) : (
            <div className="py-4 text-center">
              <p className="font-cormorant text-2xl text-charcoal mb-1">
                Thank you for joining us ✦
              </p>
              <p className="font-inter text-sm text-charcoal/60">
                You&apos;ll hear from us soon with something beautiful.
              </p>
            </div>
          )}

          <p className="font-inter text-[10px] text-charcoal/40 mt-4 tracking-wide">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
