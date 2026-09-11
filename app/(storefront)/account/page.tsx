import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your AAVJO account and orders.",
};

export default function AccountPage() {
  return (
    <div className="section-container py-12 md:py-20 min-h-[70vh]">
      <div className="mb-12 md:mb-16">
        <h1 className="font-cormorant text-4xl md:text-5xl text-charcoal tracking-wide mb-4">
          Your Account
        </h1>
        <p className="font-inter text-sm md:text-base text-charcoal/60">
          Manage your orders and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Auth Placeholders */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-ivory p-8 border border-sand">
            <h2 className="font-cormorant text-2xl text-charcoal mb-4">Sign In</h2>
            <p className="font-inter text-sm text-charcoal/60 mb-6">
              Welcome back. Authentication will be available soon.
            </p>
            <div className="space-y-4">
              <input
                disabled
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 bg-soft-white border border-sand font-inter text-sm focus:outline-none focus:border-marian-blue transition-colors disabled:opacity-50"
              />
              <input
                disabled
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-soft-white border border-sand font-inter text-sm focus:outline-none focus:border-marian-blue transition-colors disabled:opacity-50"
              />
              <button
                disabled
                className="w-full py-3 bg-charcoal text-soft-white font-inter text-[11px] tracking-[0.2em] uppercase hover:bg-marian-blue transition-colors disabled:opacity-50"
              >
                Sign In
              </button>
            </div>
          </div>

          <div className="bg-soft-white p-8 border border-sand">
            <h2 className="font-cormorant text-2xl text-charcoal mb-4">Create Account</h2>
            <p className="font-inter text-sm text-charcoal/60 mb-6">
              Join AAVJO to track orders and save your favorite items.
            </p>
            <button
              disabled
              className="w-full py-3 border border-charcoal text-charcoal font-inter text-[11px] tracking-[0.2em] uppercase hover:bg-ivory transition-colors disabled:opacity-50"
            >
              Register
            </button>
          </div>
        </div>

        {/* Dashboard Placeholders (Disabled state) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 opacity-50 pointer-events-none select-none">
          {/* Orders */}
          <div className="border border-sand p-6">
            <h3 className="font-cormorant text-xl text-charcoal mb-2">Orders</h3>
            <p className="font-inter text-sm text-charcoal/60 mb-4">
              View your order history and track deliveries.
            </p>
            <span className="font-inter text-[11px] tracking-[0.1em] uppercase text-charcoal/40 border-b border-charcoal/20 pb-0.5">
              View Orders
            </span>
          </div>

          {/* Addresses */}
          <div className="border border-sand p-6">
            <h3 className="font-cormorant text-xl text-charcoal mb-2">Saved Addresses</h3>
            <p className="font-inter text-sm text-charcoal/60 mb-4">
              Manage your shipping and billing addresses.
            </p>
            <span className="font-inter text-[11px] tracking-[0.1em] uppercase text-charcoal/40 border-b border-charcoal/20 pb-0.5">
              Manage Addresses
            </span>
          </div>

          {/* Details */}
          <div className="border border-sand p-6 sm:col-span-2">
            <h3 className="font-cormorant text-xl text-charcoal mb-2">Account Details</h3>
            <p className="font-inter text-sm text-charcoal/60 mb-4">
              Update your name, email, and password.
            </p>
            <span className="font-inter text-[11px] tracking-[0.1em] uppercase text-charcoal/40 border-b border-charcoal/20 pb-0.5">
              Edit Details
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
