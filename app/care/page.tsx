import type { Metadata } from "next";
import { Breadcrumbs } from "@/src/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Jewelry Care & Sizing — Hunsho",
  description: "How to care for 22k and 24k gold jewelry, and how to measure yourself for rings, bangles, and necklaces.",
};

export default function CarePage() {
  return (
    <div className="section section--surface !pt-32">
      <div className="container max-w-2xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Jewelry Care", href: "/care" }]} />
        <h1 className="mb-20">Jewelry Care &amp; Sizing</h1>

        <h2 className="mb-3">Caring for Gold Jewelry</h2>
        <ul className="mb-10 pl-5 list-disc text-[var(--color-text-primary)] space-y-2">
          <li>Store pieces separately to avoid scratching — a soft pouch or lined box works well.</li>
          <li>Remove jewelry before swimming, bathing, or applying perfume and lotion directly to the piece.</li>
          <li>22k and 24k gold are softer than lower-karat alloys — they mark more easily, so day-to-day care matters more, not less.</li>
          <li>Clean gently with a soft cloth; avoid abrasive cleaners.</li>
        </ul>

        <h2 className="mb-3">Sizing Guide</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-6">
          <div className="card">
            <h3 className="mb-2 text-[length:var(--text-lg)]">Rings</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-0">
              Wrap a strip of paper around the base of your finger, mark where it
              overlaps, and measure the length in millimeters against a ruler.
            </p>
          </div>
          <div className="card">
            <h3 className="mb-2 text-[length:var(--text-lg)]">Bangles &amp; Bracelets</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-0">
              Measure your wrist circumference with a soft tape, just below the
              wrist bone. For bangles, measure across your knuckles at their
              widest to confirm it will pass over your hand.
            </p>
          </div>
          <div className="card">
            <h3 className="mb-2 text-[length:var(--text-lg)]">Necklaces</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-0">
              Most chains are adjustable within a range — check the product page
              for the exact length, and compare against a necklace you already
              own and like the fit of.
            </p>
          </div>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Still unsure? See the on-model 360° view on each product page for real
          scale reference, or get in touch via{" "}
          <a href="/contact" className="underline hover:text-[var(--color-accent)]">Contact</a>.
        </p>
      </div>
    </div>
  );
}
