import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/src/shared/Breadcrumbs";
import { ProductCard } from "@/src/shared/ProductCard";
import { categories, getCategory } from "@/src/data/categories";
import { products as allProducts, getProductsByCategory, getProductsByOccasion } from "@/src/data/products";

// Next.js 16: params and searchParams are both Promises — must be awaited.
interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sub?: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};
  return {
    title: `${category.label} — Hunsho`,
    description: category.description,
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params;
  const { sub } = await searchParams;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const isGifting = category.slug === "gifting";
  const products = isGifting
    ? sub
      ? getProductsByOccasion(sub)
      : allProducts
    : sub
      ? getProductsByCategory(category.slug).filter((p) => p.subcategory === sub)
      : getProductsByCategory(category.slug);

  return (
    <div className="section section--surface !pt-32">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: category.label, href: `/shop/${category.slug}` },
          ]}
        />
        <h1 className="w-full mb-3">{category.label}</h1>
        <p className="lead mb-8">{category.description}</p>

        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href={`/shop/${category.slug}`}
            className={`badge ${!sub ? "border-(--color-accent)! text-(--color-accent-strong)!" : ""}`}
          >
            All
          </Link>
          {category.subcategories.map((s) => (
            <Link
              key={s.slug}
              href={`/shop/${category.slug}?sub=${s.slug}`}
              className={`badge ${sub === s.slug ? "border-(--color-accent)! text-(--color-accent-strong)!" : ""}`}
            >
              {s.label}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <p className="text-[var(--color-text-secondary)]">
            Nothing in this subcategory yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
