export interface Subcategory {
  slug: string;
  label: string;
}

export interface Category {
  slug: string;
  label: string;
  /** One-line description of what this category is, used on category landing pages */
  description: string;
  subcategories: Subcategory[];
}

// Matches PRD §8 (confirmed) / §10 (IA). Traditional & Ceremonial subcategory
// names were deliberately left to be picked using plain, widely understood
// English terms rather than guessed indigenous-language labels — see PRD §2.
export const categories: Category[] = [
  {
    slug: "rings",
    label: "Rings",
    description: "Engagement, wedding, and everyday rings in 22k and 24k gold.",
    subcategories: [
      { slug: "engagement", label: "Engagement" },
      { slug: "wedding-bands", label: "Wedding Bands" },
      { slug: "statement", label: "Statement Rings" },
      { slug: "everyday-stacking", label: "Everyday & Stacking" },
    ],
  },
  {
    slug: "necklaces",
    label: "Necklaces & Pendants",
    description: "Pendants, chains, and statement pieces for neck and chest.",
    subcategories: [
      { slug: "pendants", label: "Pendants" },
      { slug: "chains", label: "Chains" },
      { slug: "chokers", label: "Chokers" },
      { slug: "statement", label: "Statement Necklaces" },
    ],
  },
  {
    slug: "earrings",
    label: "Earrings",
    description: "Studs, hoops, and drops in solid gold.",
    subcategories: [
      { slug: "studs", label: "Studs" },
      { slug: "hoops", label: "Hoops" },
      { slug: "drops-dangles", label: "Drops & Dangles" },
      { slug: "statement", label: "Statement Earrings" },
    ],
  },
  {
    slug: "bracelets",
    label: "Bracelets & Bangles",
    description: "Bangles, chain bracelets, and cuffs for everyday and occasion wear.",
    subcategories: [
      { slug: "bangles", label: "Bangles" },
      { slug: "chain-bracelets", label: "Chain Bracelets" },
      { slug: "cuffs", label: "Cuffs" },
      { slug: "charm", label: "Charm Bracelets" },
    ],
  },
  {
    slug: "traditional-ceremonial",
    label: "Traditional & Ceremonial",
    description: "Coral beads, waist beads, and pieces for traditional wedding ceremonies.",
    subcategories: [
      { slug: "coral-beads", label: "Coral Beads" },
      { slug: "waist-beads", label: "Waist Beads" },
      { slug: "traditional-wedding-sets", label: "Traditional Wedding Sets" },
      { slug: "beaded-sets", label: "Beaded Sets" },
    ],
  },
  {
    slug: "gifting",
    label: "Gifting Edits",
    description: "Curated by occasion, pulling from every category.",
    subcategories: [
      { slug: "weddings-owambe", label: "Weddings & Owambe" },
      { slug: "anniversaries", label: "Anniversaries" },
      { slug: "birthdays", label: "Birthdays" },
      { slug: "festive-season", label: "Festive Season" },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
