import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/src/shared/Breadcrumbs";
import { categories } from "@/src/data/categories";
import { stockImages } from "@/src/data/stock-images";

export const metadata: Metadata = {
  title: "Shop All Jewelry — Hunsho",
  description:
    "Rings, necklaces, earrings, bracelets, and traditional & ceremonial jewelry in 22k and 24k gold, hallmarked and certified.",
};

export default function ShopPage() {
  return (
    <div className="section section--surface !pt-32">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }]} />
        <h1 className="max-w-xl mb-4">Shop</h1>
        <p className="lead mb-12">
          Every category below links through to real subcategories — jump straight
          to what you&apos;re looking for, or browse.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const img = stockImages[cat.slug];
            return (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}`}
                className="group card-overlay-text relative aspect-[16/10] overflow-hidden bg-[var(--color-ink)]"
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/35 to-transparent transition-all duration-500 group-hover:from-[var(--color-ink)]/95 group-hover:via-[var(--color-ink)]/55" />

                {/* Content */}
                <div className="absolute inset-0 flex h-full flex-col justify-end p-6">
                  <div className="overflow-hidden">
                    {/* Always visible */}
                    <h2 className="text-(length:--text-xl) text-(--color-text-on-ink-muted)! transition-transform duration-500 group-hover:-translate-y-20">
                      {cat.label}
                    </h2>

                    {/* Hidden until hover */}
                    <div className="absolute bottom-6 left-6 right-6 translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="max-w-sm text-base text-(--color-text-on-ink-muted)">
                        {cat.description}
                      </p>

                      <span className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]">
                        {cat.subcategories.length} Subcategories →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
