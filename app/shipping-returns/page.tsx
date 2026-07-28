import type { Metadata } from "next";
import { Breadcrumbs } from "@/src/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Shipping & Returns — Hunsho",
  description: "Delivery timelines, payment methods, and our returns policy.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="section section--surface !pt-32">
      <div className="container max-w-2xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shipping & Returns", href: "/shipping-returns" }]} />
        <h1 className="mb-20">Shipping &amp; Returns</h1>

        <h2 className="mb-3">Delivery</h2>
        <ul className="mb-10 pl-5 list-disc space-y-2">
          <li>Lagos: 3 business days</li>
          <li>Outside Lagos: 5 business days</li>
          <li>All orders are tracked; you'll receive updates by SMS or email.</li>
        </ul>

        <h2 className="mb-3">Payment</h2>
        <p className="mb-20">
          Payments are processed securely in Naira via Flutterwave, supporting
          major cards and bank transfer.
        </p>

        <h2 className="mb-3">Returns</h2>
        <div className="card !bg-[var(--color-surface-raised)] mb-4">
          <p className="text-sm text-[var(--color-text-secondary)] mb-0">
            <strong className="text-[var(--color-ink)]">Draft policy — needs legal/ops sign-off before publishing.</strong>{" "}
            Proposing a 7-day return window from delivery for unworn pieces in
            original packaging with certificate intact, excluding made-to-measure
            items (e.g. waist beads sized to order) and pierced earrings for
            hygiene reasons. Adjust before this goes live.
          </p>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Jewelry bought as a gift carries real stakes if sizing is wrong — see
          the{" "}
          <a href="/care" className="underline hover:text-[var(--color-accent)]">
            sizing guide
          </a>{" "}
          before ordering, or get in touch and we'll help you get it right.
        </p>
      </div>
    </div>
  );
}
