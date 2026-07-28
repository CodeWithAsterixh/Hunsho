import type { Metadata } from "next";
import { Breadcrumbs } from "@/src/shared/Breadcrumbs";
import { MagneticButton } from "@/src/shared/MagneticButton";

export const metadata: Metadata = {
  title: "Your Bag — Hunsho",
  description: "Review the items in your bag.",
};

// Genuinely empty state — there's no cart state/persistence wired up yet
// (needs a real state layer: React context + a persistence strategy, plus
// checkout and Flutterwave integration on top). This is the honest default
// render rather than a fake populated cart.
export default function BagPage() {
  return (
    <div className="section section--surface !pt-32 min-h-[60vh]">
      <div className="container max-w-lg text-center">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Bag", href: "/bag" }]} />
        <h1 className="mb-4">Your Bag</h1>
        <p className="lead mb-8">Your bag is empty.</p>
        <MagneticButton to="/shop" variant="primary" size="lg">
          Start Shopping
        </MagneticButton>
      </div>
    </div>
  );
}
