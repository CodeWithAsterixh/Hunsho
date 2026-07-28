import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/src/shared/Breadcrumbs";
import { journalPosts, getJournalPost } from "@/src/data/journal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Hunsho Journal`, description: post.excerpt };
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
  };

  return (
    <div className="section section--surface !pt-32">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container max-w-2xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Journal", href: "/journal" },
            { label: post.title, href: `/journal/${post.slug}` },
          ]}
        />
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">
          {new Date(post.publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <h1 className="mt-2 mb-8">{post.title}</h1>
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}
