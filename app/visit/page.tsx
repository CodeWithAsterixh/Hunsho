import type { Metadata } from "next";
import { Breadcrumbs } from "@/src/shared/Breadcrumbs";
import Map from "@/src/shared/Map";

export const metadata: Metadata = {
  title: "Visit Us — Hunsho Boutique, Ikorodu",
  description: "Hunsho's flagship boutique in Gberigbe, Ikorodu, Lagos.",
};

export default function VisitPage() {
  return (
    <div className="section section--surface !pt-32">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Visit Us", href: "/visit" }]} />
        <h1 className="mb-20">Visit Our Flagship Boutique</h1>

        <div className="grid lg:grid-cols-2 items-center gap-10">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] border border-[var(--color-border)]">
            <Map address="Gberigbe, Ikorodu, Lagos, Nigeria" />
          </div>
          <div>
            <h2 className="mb-2 text-[length:var(--text-xl)]">Hunsho — Gberigbe, Ikorodu</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Exact street address to follow — placeholder area shown on the map
              above.
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">
                  Hours (placeholder — confirm before publishing)
                </span>
                <p className="mb-0">Monday – Saturday, 10:00 – 18:00</p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">
                  Contact
                </span>
                <p className="mb-0">See the <a href="/contact" className="underline hover:text-[var(--color-accent)]">Contact page</a> for phone and email.</p>
              </div>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)]">
              Every piece can be viewed and tried in person at the boutique — the
              on-model 360° views on each product page are there for when a visit
              isn&apos;t practical, not a replacement for it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
