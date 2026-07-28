import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/src/shared/Breadcrumbs";
import { journalPosts } from "@/src/data/journal";

export const metadata: Metadata = {
  title: "Journal — Hunsho",
  description: "Notes on gold purity, gifting, and dressing for occasion — from Hunsho.",
};

export default function JournalIndexPage() {
  return (
    <div className="section section--surface !pt-32">
      <div className="container max-w-3xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Journal", href: "/journal" }]} />
        <h1 className="mb-20">Journal</h1>

        <div className="flex flex-col">
          {journalPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group py-8 border-b border-[var(--color-border)] first:border-t"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">
                {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <h2 className="mt-2 mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                {post.title}
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-0 max-w-lg">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
