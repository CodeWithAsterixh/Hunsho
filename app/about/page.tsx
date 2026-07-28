import type { Metadata } from "next";
import { Breadcrumbs } from "@/src/shared/Breadcrumbs";
import { SplitHeading } from "@/src/shared/SplitHeading";

export const metadata: Metadata = {
  title: "About — Hunsho",
  description:
    "Hunsho is a fine jewelry house in Lagos, working in 22k and 24k gold with an emphasis on hallmarked, certified craftsmanship.",
};

export default function AboutPage() {
  return (
    <div className="section section--surface !pt-32">
      <div className="container max-w-3xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />
        <span className="eyebrow mb-6">The House</span>
        <SplitHeading as="h1" text="A new house, built on old standards." className="mb-6" />
        <p className="lead mb-6">
          Hunsho is a new jewelry house — we're not going to claim a history we
          don't have. What we're building instead: every piece hallmarked, every
          piece certified, and purity stated plainly rather than assumed.
        </p>
        <p className="mb-6">
          We work predominantly in 22k and 24k gold, the standard most familiar
          to Nigerian buyers, across rings, necklaces, earrings, bracelets, and
          traditional and ceremonial pieces. Our flagship boutique sits in
          Ikorodu, Lagos — see{" "}
          <a href="/visit" className="underline hover:text-[var(--color-accent)]">
            Visit Us
          </a>{" "}
          for details.
        </p>
        <p className="mb-0">
          Because we're new, we're leaning on transparency rather than track
          record: clear purity disclosure, real photography of every piece worn
          on the body part it sits on, and a straightforward returns policy. Read
          more in the{" "}
          <a href="/journal" className="underline hover:text-[var(--color-accent)]">
            Journal
          </a>
          .
        </p>
      </div>
    </div>
  );
}
