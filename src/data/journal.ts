export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  publishedAt: string; // ISO date
}

// SAMPLE DATA. Topics chosen to match the SEO strategy in PRD §12 — karat/
// purity education doubles as trust content, occasion content targets real
// search terms (owambe, aso ebi) rather than generic "gift guide" filler.
export const journalPosts: JournalPost[] = [
  {
    slug: "understanding-gold-purity-22k-24k",
    title: "22k vs. 24k Gold: What the Numbers Actually Mean",
    excerpt:
      "A plain-language guide to gold purity, and why it matters more than it might seem.",
    body: [
      "Gold purity is measured in karats, out of a possible 24. 24k gold is 99.9% pure gold; 22k is 91.6% pure, with the remainder made up of other metals for durability.",
      "Neither is 'better' in an absolute sense — 24k is softer and shows its purity more visibly, while 22k holds fine detail and everyday wear slightly better. Every piece states its purity plainly, and comes with a certificate confirming it.",
    ],
    publishedAt: "2026-01-15",
  },
  {
    slug: "owambe-jewelry-guide",
    title: "Dressing for Owambe: Getting the Jewelry Right",
    excerpt: "Notes on pairing gold with aso ebi, from underdressed to overdone.",
    body: [
      "Owambe jewelry has its own logic — it needs to hold up against bold aso ebi fabric and photographs well under event lighting, which usually means more presence than an everyday piece.",
      "A solid bangle or a substantial chain tends to read better in a crowd than something delicate, without tipping into costume territory. Gold jewelry doesn't have to compete with the fabric to be noticed.",
    ],
    publishedAt: "2026-02-03",
  },
  {
    slug: "gifting-jewelry-what-to-know",
    title: "Buying Jewelry as a Gift: What to Know Before You Order",
    excerpt: "Sizing, returns, and a few honest notes for first-time gift buyers.",
    body: [
      "Jewelry is a genuinely difficult gift to size correctly without asking directly, which sometimes defeats the purpose of a surprise. Our size guide covers rings, bangles, and necklaces, and our returns policy accounts for exactly this — see Shipping & Returns for specifics.",
      "When in doubt, a piece with an adjustable chain length or a flexible bangle fit gives more room for error than a fixed ring size.",
    ],
    publishedAt: "2026-02-20",
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
