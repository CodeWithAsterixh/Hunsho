import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/src/shared/Breadcrumbs";
import { SpinViewer } from "@/src/shared/SpinViewer";
import { MagneticButton } from "@/src/shared/MagneticButton";
import { ProductCard } from "@/src/shared/ProductCard";
import Image from "next/image";
import { getCategory } from "@/src/data/categories";
import { getProductBySlug, getProductsByCategory, formatNaira, products } from "@/src/data/products";

interface PageProps {
  params: Promise<{ category: string; product: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, product: productSlug } = await params;
  const product = getProductBySlug(categorySlug, productSlug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.purity} — Hunsho`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = getCategory(categorySlug);
  const product = getProductBySlug(categorySlug, productSlug);
  if (!category || !product) notFound();

  const related = getProductsByCategory(category.slug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: category.label,
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: product.priceNaira,
      availability: "https://schema.org/InStock",
    },
    material: product.purity,
  };

  return (
    <div className="section section--surface !pt-32">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: category.label, href: `/shop/${category.slug}` },
            { label: product.name, href: `/shop/${category.slug}/${product.slug}` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Product hero image */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden bg-[var(--color-surface-raised)] border border-[var(--color-border)]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            {/* 360° viewer */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]">360° On-Model View — Drag to rotate</span>
              <SpinViewer
                videoSrc="/ring-video.mp4"
                videoFrameCount={24}
                alt={`${product.name}, 360 degree on-model view`}
                className="border border-[var(--color-border)]"
              />
            </div>
          </div>

          <div>
            <span className="eyebrow mb-4">{category.label}</span>
            <h1 className="mb-2">{product.name}</h1>
            <p className="font-mono text-sm uppercase tracking-wide text-[var(--color-text-secondary)] mb-4">
              {product.purity}
            </p>
            <p className="text-[length:var(--text-xl)] font-display mb-6">
              {formatNaira(product.priceNaira)}
            </p>
            <p className="lead mb-8">{product.description}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              <MagneticButton variant="accent" size="lg">
                Add to Bag
              </MagneticButton>
              <MagneticButton to="/care" variant="secondary" size="lg">
                Sizing &amp; Care Guide
              </MagneticButton>
            </div>

            <div className="card !bg-[var(--color-surface-raised)]">
              <span className="step-index mb-2 block">
                <em>Hallmarked.</em> Certificate of authenticity included.
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] mb-0">
                3-day delivery within Lagos, 5-day delivery nationwide. See{" "}
                <a href="/shipping-returns" className="underline hover:text-[var(--color-accent)]">
                  Shipping &amp; Returns
                </a>{" "}
                for full details.
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20 lg:mt-28">
            <h2 className="mb-8">More from {category.label}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
